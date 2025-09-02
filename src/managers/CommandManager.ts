import { App, Notice, TFile, Modal, Setting } from 'obsidian';
import DeepResearchPlugin from '../../main';
import { SeedModal } from '../ui/modals/SeedModal';
import { PlanModal } from '../ui/modals/PlanModal';

export class CommandManager {
	private app: App;
	private plugin: DeepResearchPlugin;

	constructor(app: App, plugin: DeepResearchPlugin) {
		this.app = app;
		this.plugin = plugin;
	}

	registerCommands(): void {
		// Seed Commands
		this.plugin.addCommand({
			id: 'create-seed',
			name: 'Create New Research Seed',
			callback: () => this.createSeed()
		});

		this.plugin.addCommand({
			id: 'score-seed',
			name: 'Score Current Seed',
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && this.isSeedFile(activeFile)) {
					if (!checking) {
						this.scoreSeedFromFile(activeFile);
					}
					return true;
				}
				return false;
			}
		});

		this.plugin.addCommand({
			id: 'promote-seed',
			name: 'Promote Seed to Research Plan',
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && this.isSeedFile(activeFile)) {
					if (!checking) {
						this.promoteSeedFromFile(activeFile);
					}
					return true;
				}
				return false;
			}
		});

		// Plan Commands
		this.plugin.addCommand({
			id: 'create-plan',
			name: 'Create Research Plan',
			callback: () => this.createPlan()
		});

		this.plugin.addCommand({
			id: 'run-plan',
			name: 'Run Research Plan',
			checkCallback: (checking: boolean) => {
				const activeFile = this.app.workspace.getActiveFile();
				if (activeFile && this.isPlanFile(activeFile)) {
					if (!checking) {
						this.runPlanFromFile(activeFile);
					}
					return true;
				}
				return false;
			}
		});

		// Topic Commands
		this.plugin.addCommand({
			id: 'create-topic-hub',
			name: 'Create Topic Hub',
			callback: () => this.createTopicHub()
		});

		// Console Commands
		this.plugin.addCommand({
			id: 'open-research-console',
			name: 'Open Research Console',
			callback: () => this.openResearchConsole()
		});

		// Utility Commands
		this.plugin.addCommand({
			id: 'refresh-data',
			name: 'Refresh Research Data',
			callback: () => this.refreshData()
		});
	}

	// Seed Management
	async createSeed(): Promise<void> {
		const modal = new SeedModal(this.app, this.plugin, async (data) => {
			try {
				const seed = await this.plugin.dataManager.createSeed(data);
				new Notice(`Research seed "${seed.title}" created successfully!`);
				
				// Open the created seed
				const file = this.app.vault.getAbstractFileByPath(seed.filePath);
				if (file instanceof TFile) {
					await this.app.workspace.getLeaf().openFile(file);
				}
			} catch (error) {
				console.error('Error creating seed:', error);
				new Notice('Failed to create research seed. Please try again.');
			}
		});
		
		modal.open();
	}

	async scoreSeed(seedId: string): Promise<void> {
		try {
			const seed = await this.plugin.dataManager.getSeed(seedId);
			if (!seed) {
				new Notice('Seed not found');
				return;
			}

			// Show loading notice
			const loadingNotice = new Notice('Scoring seed...', 0);

			// Run gatekeeper assessment
			const assessment = await this.plugin.gatekeeperService.scoreSeed(seed);
			
			// Update seed with score
			await this.plugin.dataManager.updateSeed(seedId, {
				score: assessment.score,
				verdict: assessment.verdict,
				modified: new Date().toISOString().split('T')[0]
			});

			// Update the file content with the assessment
			await this.updateSeedFileWithAssessment(seed.filePath, assessment);

			loadingNotice.hide();
			new Notice(`Seed scored: ${assessment.score}/100 (${assessment.verdict})`);

			// Auto-promote if score is high enough and setting is enabled
			if (this.plugin.settings.autoPromoteHighScore && 
				assessment.score >= this.plugin.settings.gatekeeperThreshold) {
				
				const shouldPromote = await this.confirmAutoPromotion(assessment.score);
				if (shouldPromote) {
					await this.promoteSeedToPlan(seedId);
				}
			}

		} catch (error) {
			console.error('Error scoring seed:', error);
			new Notice('Failed to score seed. Please check your LLM configuration.');
		}
	}

	private async scoreSeedFromFile(file: TFile): Promise<void> {
		const seedId = file.path; // Using file path as ID for now
		await this.scoreSeed(seedId);
	}

	private async updateSeedFileWithAssessment(filePath: string, assessment: any): Promise<void> {
		const file = this.app.vault.getAbstractFileByPath(filePath);
		if (!(file instanceof TFile)) return;

		const content = await this.app.vault.read(file);
		const lines = content.split('\n');

		// Find the gatekeeper section and update it
		let gatekeeperStart = lines.findIndex(line => line.includes('## Gatekeeper Assessment'));
		if (gatekeeperStart === -1) return;

		// Find the results section
		let resultsStart = lines.findIndex((line, index) => 
			index > gatekeeperStart && line.includes('### Results')
		);
		
		if (resultsStart === -1) {
			// Add results section if it doesn't exist
			resultsStart = gatekeeperStart + 1;
			lines.splice(resultsStart, 0, '', '### Results');
		}

		// Update the results
		const resultsEnd = lines.findIndex((line, index) => 
			index > resultsStart && line.startsWith('##')
		);

		const newResults = [
			`- **Score**: ${assessment.score}/100`,
			`- **Verdict**: ${assessment.verdict}`,
			`- **Rationale**: ${assessment.rationale}`,
			`- **Top Sub-topics**: `,
			...assessment.topSubTopics.map((topic: string) => `  - ${topic}`),
			''
		];

		// Replace the results section
		const endIndex = resultsEnd === -1 ? lines.length : resultsEnd;
		lines.splice(resultsStart + 1, endIndex - resultsStart - 1, ...newResults);

		await this.app.vault.modify(file, lines.join('\n'));
	}

	private async confirmAutoPromotion(score: number): Promise<boolean> {
		return new Promise((resolve) => {
			const modal = new Modal(this.app);
			const { contentEl } = modal;
			
			contentEl.createEl('h3', { text: 'Auto-promote Seed?' });
			contentEl.createEl('p', { 
				text: `This seed scored ${score}/100, which exceeds the auto-promotion threshold. Would you like to create a research plan?`
			});

			const buttonContainer = contentEl.createDiv();
			buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: center; margin-top: 20px;';

			const noBtn = buttonContainer.createEl('button', { text: 'No, Later' });
			noBtn.addEventListener('click', () => {
				modal.close();
				resolve(false);
			});

			const yesBtn = buttonContainer.createEl('button', { 
				text: 'Yes, Create Plan',
				cls: 'mod-cta'
			});
			yesBtn.addEventListener('click', () => {
				modal.close();
				resolve(true);
			});

			modal.open();
		});
	}

	async promoteSeedToPlan(seedId: string): Promise<void> {
		try {
			const seed = await this.plugin.dataManager.getSeed(seedId);
			if (!seed) {
				new Notice('Seed not found');
				return;
			}

			const modal = new PlanModal(this.app, this.plugin, async (planData) => {
				try {
					const plan = await this.plugin.dataManager.createPlan({
						...planData,
						seedId: seedId
					});

					// Update seed status
					await this.plugin.dataManager.updateSeed(seedId, {
						status: 'promoted',
						modified: new Date().toISOString().split('T')[0]
					});

					new Notice(`Research plan "${plan.title}" created from seed!`);
					
					// Open the created plan
					const file = this.app.vault.getAbstractFileByPath(plan.filePath);
					if (file instanceof TFile) {
						await this.app.workspace.getLeaf().openFile(file);
					}
				} catch (error) {
					console.error('Error creating plan:', error);
					new Notice('Failed to create research plan. Please try again.');
				}
			}, seedId);

			modal.open();
		} catch (error) {
			console.error('Error promoting seed:', error);
			new Notice('Failed to promote seed to plan.');
		}
	}

	private async promoteSeedFromFile(file: TFile): Promise<void> {
		const seedId = file.path;
		await this.promoteSeedToPlan(seedId);
	}

	// Plan Management
	async createPlan(seedId?: string): Promise<void> {
		const modal = new PlanModal(this.app, this.plugin, async (data) => {
			try {
				const plan = await this.plugin.dataManager.createPlan(data);
				new Notice(`Research plan "${plan.title}" created successfully!`);
				
				// Open the created plan
				const file = this.app.vault.getAbstractFileByPath(plan.filePath);
				if (file instanceof TFile) {
					await this.app.workspace.getLeaf().openFile(file);
				}
			} catch (error) {
				console.error('Error creating plan:', error);
				new Notice('Failed to create research plan. Please try again.');
			}
		}, seedId);
		
		modal.open();
	}

	async runPlan(planId: string): Promise<void> {
		try {
			new Notice('Starting research job...', 2000);
			
			// TODO: Implement actual research execution
			// For now, just show a placeholder
			new Notice('Research execution not yet implemented. Coming soon!');
			
		} catch (error) {
			console.error('Error running plan:', error);
			new Notice('Failed to run research plan.');
		}
	}

	private async runPlanFromFile(file: TFile): Promise<void> {
		const planId = file.path;
		await this.runPlan(planId);
	}

	// Topic Management
	async createTopicHub(data?: {
		title: string;
		slug: string;
		description: string;
	}): Promise<void> {
		if (data) {
			// Direct creation (called from seed modal)
			try {
				const topic = await this.plugin.dataManager.createTopic(data);
				new Notice(`Topic hub "${topic.title}" created successfully!`);
			} catch (error) {
				console.error('Error creating topic hub:', error);
				new Notice('Failed to create topic hub. Please try again.');
			}
			return;
		}

		// Interactive creation
		const modal = new Modal(this.app);
		const { contentEl } = modal;
		
		contentEl.createEl('h2', { text: 'Create Topic Hub' });
		
		let topicData = {
			title: '',
			slug: '',
			description: '',
			tags: [] as string[]
		};

		new Setting(contentEl)
			.setName('Topic Title')
			.addText(text => {
				text.setPlaceholder('e.g., "Confidence & Self-Trust"')
					.onChange((value) => {
						topicData.title = value;
						// Auto-generate slug
						topicData.slug = value.toLowerCase()
							.replace(/[^a-z0-9\s]/g, '')
							.replace(/\s+/g, '_');
					});
			});

		new Setting(contentEl)
			.setName('Description')
			.addTextArea(text => {
				text.setPlaceholder('Brief description of this research topic...')
					.onChange((value) => {
						topicData.description = value;
					});
			});

		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;';

		const cancelBtn = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelBtn.addEventListener('click', () => modal.close());

		const createBtn = buttonContainer.createEl('button', { 
			text: 'Create Topic Hub',
			cls: 'mod-cta'
		});
		createBtn.addEventListener('click', async () => {
			if (topicData.title && topicData.description) {
				try {
					const topic = await this.plugin.dataManager.createTopic(topicData);
					new Notice(`Topic hub "${topic.title}" created successfully!`);
					modal.close();
					
					// Open the created topic hub
					const file = this.app.vault.getAbstractFileByPath(topic.filePath);
					if (file instanceof TFile) {
						await this.app.workspace.getLeaf().openFile(file);
					}
				} catch (error) {
					console.error('Error creating topic hub:', error);
					new Notice('Failed to create topic hub. Please try again.');
				}
			} else {
				new Notice('Please fill in all required fields');
			}
		});

		modal.open();
	}

	// UI Commands
	async openResearchConsole(): Promise<void> {
		this.plugin.activateView();
	}

	// Utility Commands
	async refreshData(): Promise<void> {
		const notice = new Notice('Refreshing research data...', 0);
		try {
			await this.plugin.dataManager.refreshCache();
			notice.hide();
			new Notice('Research data refreshed successfully!');
		} catch (error) {
			notice.hide();
			console.error('Error refreshing data:', error);
			new Notice('Failed to refresh data. Please try again.');
		}
	}

	// Helper methods
	private isSeedFile(file: TFile): boolean {
		// Check if file is in seeds folder or has seed frontmatter
		return file.path.startsWith(this.plugin.settings.seedsPath) ||
			   file.basename.toLowerCase().includes('seed');
	}

	private isPlanFile(file: TFile): boolean {
		// Check if file is in plans folder or has plan frontmatter
		return file.path.startsWith(this.plugin.settings.plansPath) ||
			   file.basename.toLowerCase().includes('plan');
	}
}