import { App, Modal, Setting, TFile, Notice } from 'obsidian';
import DeepResearchPlugin from '../../../main';
import { Seed, Topic } from '../../types';
import { DEFAULT_DELIVERABLES, DEFAULT_SEARCH_STRATEGY } from '../../constants';

export class PlanModal extends Modal {
	private plugin: DeepResearchPlugin;
	private seedId?: string;
	private result: {
		title: string;
		topic: string;
		thesis: string;
		subQuestions: string[];
		deliverables: string[];
		searchStrategy: any;
		rubric: string;
	};
	private onSubmit: (plan: any) => void;
	private topics: Topic[] = [];
	private seed?: Seed;

	constructor(app: App, plugin: DeepResearchPlugin, onSubmit: (plan: any) => void, seedId?: string) {
		super(app);
		this.plugin = plugin;
		this.onSubmit = onSubmit;
		this.seedId = seedId;
		
		this.result = {
			title: '',
			topic: '',
			thesis: '',
			subQuestions: [''],
			deliverables: [...DEFAULT_DELIVERABLES],
			searchStrategy: { ...DEFAULT_SEARCH_STRATEGY },
			rubric: 'Minimum 15 sources, 10 peer-reviewed. Every claim must link to source. Quality ratings required.'
		};
	}

	async onOpen(): Promise<void> {
		// Load data
		this.topics = await this.plugin.dataManager.getTopics();
		
		if (this.seedId) {
			this.seed = await this.plugin.dataManager.getSeed(this.seedId);
			if (this.seed) {
				this.result.title = `Research Plan: ${this.seed.title}`;
				this.result.topic = this.seed.frontmatter.topic || '';
			}
		}

		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Create Research Plan' });
		
		if (this.seed) {
			const seedInfo = contentEl.createDiv('seed-info');
			seedInfo.innerHTML = `
				<div class="callout" style="margin-bottom: 20px;">
					<div class="callout-title">Based on Seed</div>
					<div class="callout-content">
						<strong>${this.seed.title}</strong><br>
						<em>${this.seed.summary}</em>
					</div>
				</div>
			`;
		}

		// Basic Info Section
		this.renderBasicInfo(contentEl);

		// Research Design Section
		this.renderResearchDesign(contentEl);

		// Deliverables Section
		this.renderDeliverables(contentEl);

		// Search Strategy Section
		this.renderSearchStrategy(contentEl);

		// Quality Rubric Section
		this.renderQualityRubric(contentEl);

		// Buttons
		this.renderButtons(contentEl);
	}

	private renderBasicInfo(container: HTMLElement): void {
		const section = container.createDiv('plan-section');
		section.createEl('h3', { text: 'Basic Information' });

		// Title
		new Setting(section)
			.setName('Plan Title')
			.setDesc('Descriptive title for this research plan')
			.addText(text => {
				text.setPlaceholder('e.g., "Deep Research: Self-Trust and Therapeutic Outcomes"')
					.setValue(this.result.title)
					.onChange((value) => {
						this.result.title = value;
					});
			});

		// Topic
		new Setting(section)
			.setName('Topic')
			.setDesc('Select the research topic this plan belongs to')
			.addDropdown(dropdown => {
				dropdown.addOption('', 'Select a topic...');
				
				this.topics.forEach(topic => {
					dropdown.addOption(topic.frontmatter.slug, topic.title);
				});
				
				dropdown.setValue(this.result.topic)
					.onChange((value) => {
						this.result.topic = value;
					});
			});
	}

	private renderResearchDesign(container: HTMLElement): void {
		const section = container.createDiv('plan-section');
		section.createEl('h3', { text: 'Research Design' });

		// Thesis
		new Setting(section)
			.setName('Research Thesis')
			.setDesc('A clear, testable proposition (1-2 sentences)')
			.addTextArea(text => {
				text.setPlaceholder('e.g., "Self-trust acts as a mediator between therapeutic alliance and positive outcomes, with stronger effects in anxiety and depression treatments."')
					.setValue(this.result.thesis)
					.onChange((value) => {
						this.result.thesis = value;
					});
				text.inputEl.rows = 3;
			});

		// Sub-questions
		const questionsContainer = section.createDiv('sub-questions');
		this.renderSubQuestions(questionsContainer);

		// AI Assistance Button
		const aiButton = section.createEl('button', {
			text: '✨ Generate Sub-Questions',
			cls: 'ai-assist-btn'
		});
		aiButton.style.cssText = 'margin-top: 10px;';
		aiButton.addEventListener('click', () => this.generateSubQuestions());
	}

	private renderSubQuestions(container: HTMLElement): void {
		container.empty();
		
		container.createEl('h4', { text: 'Sub-Questions' });
		container.createEl('p', { 
			text: 'Specific questions that will guide the research',
			cls: 'setting-item-description'
		});

		const categorizedQuestions: Array<{category: string; questions: string[]}> = [
			{ category: 'Definitions & Distinctions', questions: [] },
			{ category: 'Causal Mechanisms', questions: [] },
			{ category: 'Measurement & Assessment', questions: [] },
			{ category: 'Intervention Strategies', questions: [] },
			{ category: 'Individual Differences', questions: [] },
			{ category: 'Contradictory Evidence', questions: [] }
		];

		// Distribute existing questions across categories
		this.result.subQuestions.forEach((question, index) => {
			const categoryIndex = Math.floor(index / Math.ceil(this.result.subQuestions.length / 6));
			if (categorizedQuestions[categoryIndex]) {
				categorizedQuestions[categoryIndex].questions.push(question);
			}
		});

		categorizedQuestions.forEach((category, categoryIndex) => {
			const categoryDiv = container.createDiv('question-category');
			categoryDiv.createEl('h5', { text: category.category });

			// Ensure each category has at least one question
			if (category.questions.length === 0) {
				category.questions.push('');
			}

			category.questions.forEach((question, questionIndex) => {
				const questionDiv = categoryDiv.createDiv('question-item');
				questionDiv.style.cssText = 'display: flex; gap: 10px; align-items: center; margin-bottom: 8px;';

				const input = questionDiv.createEl('input', {
					type: 'text',
					placeholder: `Enter ${category.category.toLowerCase()} question...`,
					value: question
				});
				input.style.cssText = 'flex: 1;';

				const globalIndex = this.getGlobalQuestionIndex(categoryIndex, questionIndex);
				input.addEventListener('input', (e) => {
					this.updateSubQuestion(globalIndex, (e.target as HTMLInputElement).value);
				});

				const addBtn = questionDiv.createEl('button', {
					text: '+',
					cls: 'question-add-btn'
				});
				addBtn.addEventListener('click', () => {
					category.questions.push('');
					this.rebuildSubQuestions();
					this.renderSubQuestions(container);
				});

				const removeBtn = questionDiv.createEl('button', {
					text: '×',
					cls: 'question-remove-btn'
				});
				removeBtn.addEventListener('click', () => {
					if (category.questions.length > 1) {
						category.questions.splice(questionIndex, 1);
						this.rebuildSubQuestions();
						this.renderSubQuestions(container);
					}
				});
			});
		});
	}

	private getGlobalQuestionIndex(categoryIndex: number, questionIndex: number): number {
		let globalIndex = 0;
		for (let i = 0; i < categoryIndex; i++) {
			const categoryQuestions = Math.ceil(this.result.subQuestions.length / 6);
			globalIndex += categoryQuestions;
		}
		return globalIndex + questionIndex;
	}

	private updateSubQuestion(index: number, value: string): void {
		if (index < this.result.subQuestions.length) {
			this.result.subQuestions[index] = value;
		}
	}

	private rebuildSubQuestions(): void {
		// This method rebuilds the subQuestions array from the categorized inputs
		// Implementation would depend on how you want to maintain the structure
	}

	private renderDeliverables(container: HTMLElement): void {
		const section = container.createDiv('plan-section');
		section.createEl('h3', { text: 'Deliverables' });
		
		section.createEl('p', { 
			text: 'What outputs should this research produce?',
			cls: 'setting-item-description'
		});

		const deliverablesDiv = section.createDiv('deliverables-list');
		
		DEFAULT_DELIVERABLES.forEach((deliverable, index) => {
			const item = deliverablesDiv.createDiv('deliverable-item');
			item.style.cssText = 'display: flex; align-items: center; margin-bottom: 8px;';

			const checkbox = item.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.checked = this.result.deliverables.includes(deliverable);
			checkbox.style.cssText = 'margin-right: 10px;';

			const label = item.createEl('label', { text: deliverable });
			
			checkbox.addEventListener('change', (e) => {
				if ((e.target as HTMLInputElement).checked) {
					if (!this.result.deliverables.includes(deliverable)) {
						this.result.deliverables.push(deliverable);
					}
				} else {
					const index = this.result.deliverables.indexOf(deliverable);
					if (index > -1) {
						this.result.deliverables.splice(index, 1);
					}
				}
			});
		});
	}

	private renderSearchStrategy(container: HTMLElement): void {
		const section = container.createDiv('plan-section');
		section.createEl('h3', { text: 'Search Strategy' });

		// Source Types
		const sourceTypesDiv = section.createDiv('source-types');
		sourceTypesDiv.createEl('h4', { text: 'Priority Source Types' });
		
		DEFAULT_SEARCH_STRATEGY.sourceTypes.forEach(sourceType => {
			const item = sourceTypesDiv.createDiv('source-type-item');
			item.style.cssText = 'display: flex; align-items: center; margin-bottom: 8px;';

			const checkbox = item.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.checked = this.result.searchStrategy.sourceTypes?.includes(sourceType) ?? true;
			checkbox.style.cssText = 'margin-right: 10px;';

			const label = item.createEl('label', { text: sourceType });
			
			checkbox.addEventListener('change', (e) => {
				if (!this.result.searchStrategy.sourceTypes) {
					this.result.searchStrategy.sourceTypes = [];
				}
				
				if ((e.target as HTMLInputElement).checked) {
					if (!this.result.searchStrategy.sourceTypes.includes(sourceType)) {
						this.result.searchStrategy.sourceTypes.push(sourceType);
					}
				} else {
					const index = this.result.searchStrategy.sourceTypes.indexOf(sourceType);
					if (index > -1) {
						this.result.searchStrategy.sourceTypes.splice(index, 1);
					}
				}
			});
		});

		// Quality Filters
		new Setting(section)
			.setName('Minimum Sources')
			.setDesc('Minimum number of sources to find')
			.addText(text => {
				text.setPlaceholder('15')
					.setValue(this.result.searchStrategy.minSources?.toString() || '15')
					.onChange((value) => {
						this.result.searchStrategy.minSources = parseInt(value) || 15;
					});
			});

		new Setting(section)
			.setName('Recency Window')
			.setDesc('How recent should sources be? (e.g., "last 10 years")')
			.addText(text => {
				text.setPlaceholder('last 10 years')
					.setValue(this.result.searchStrategy.recencyWindow || 'last 10 years')
					.onChange((value) => {
						this.result.searchStrategy.recencyWindow = value;
					});
			});
	}

	private renderQualityRubric(container: HTMLElement): void {
		const section = container.createDiv('plan-section');
		section.createEl('h3', { text: 'Quality Rubric' });

		new Setting(section)
			.setName('Evidence Standards')
			.setDesc('Define minimum quality standards for this research')
			.addTextArea(text => {
				text.setValue(this.result.rubric)
					.onChange((value) => {
						this.result.rubric = value;
					});
				text.inputEl.rows = 6;
			});
	}

	private renderButtons(container: HTMLElement): void {
		const buttonContainer = container.createDiv('modal-button-container');
		buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;';

		const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelButton.addEventListener('click', () => this.close());

		const submitButton = buttonContainer.createEl('button', { 
			text: 'Create Plan',
			cls: 'mod-cta'
		});
		submitButton.addEventListener('click', () => this.handleSubmit());
	}

	private async generateSubQuestions(): Promise<void> {
		if (!this.result.thesis) {
			new Notice('Please enter a research thesis first');
			return;
		}

		try {
			const generatedQuestions = await this.plugin.llmService.generateSubQuestions(
				this.result.thesis,
				this.seed?.summary || '',
				this.result.topic
			);

			this.result.subQuestions = generatedQuestions;
			
			// Re-render the questions section
			const questionsContainer = this.contentEl.querySelector('.sub-questions');
			if (questionsContainer) {
				this.renderSubQuestions(questionsContainer as HTMLElement);
			}

			new Notice('Sub-questions generated successfully!');
		} catch (error) {
			console.error('Error generating sub-questions:', error);
			new Notice('Failed to generate sub-questions. Please try again.');
		}
	}

	private async handleSubmit(): Promise<void> {
		// Validate required fields
		if (!this.result.title) {
			new Notice('Please enter a title for the plan');
			return;
		}

		if (!this.result.topic) {
			new Notice('Please select a topic');
			return;
		}

		if (!this.result.thesis) {
			new Notice('Please enter a research thesis');
			return;
		}

		// Filter out empty sub-questions
		this.result.subQuestions = this.result.subQuestions.filter(q => q.trim() !== '');

		if (this.result.subQuestions.length === 0) {
			new Notice('Please add at least one sub-question');
			return;
		}

		try {
			await this.onSubmit({
				...this.result,
				seedId: this.seedId
			});
			this.close();
			new Notice('Research plan created successfully!');
		} catch (error) {
			console.error('Error creating plan:', error);
			new Notice('Failed to create plan. Please try again.');
		}
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}