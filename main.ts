import { App, Plugin, PluginSettingTab, Setting, WorkspaceLeaf, Notice, Modal } from 'obsidian';
import { DeepResearchSettings } from './src/types';
import { DEFAULT_SETTINGS } from './src/constants';
import { DataManager } from './src/managers/DataManager';
import { CommandManager } from './src/managers/CommandManager';
import { TemplateManager } from './src/templates/TemplateManager';
import { LLMService } from './src/services/LLMService';
import { GatekeeperService } from './src/services/GatekeeperService';
import { ResearchConsoleView, RESEARCH_CONSOLE_VIEW_TYPE } from './src/ui/ResearchConsole';

export default class DeepResearchPlugin extends Plugin {
	settings: DeepResearchSettings;
	dataManager: DataManager;
	commandManager: CommandManager;
	templateManager: TemplateManager;
	llmService: LLMService;
	gatekeeperService: GatekeeperService;
	jobManager: any; // Will be implemented later

	async onload() {
		await this.loadSettings();

		// Initialize services
		this.llmService = new LLMService(this.settings);
		this.gatekeeperService = new GatekeeperService(this.llmService);
		this.dataManager = new DataManager(this.app, this.settings);
		this.templateManager = new TemplateManager(this.app, this.settings);
		this.commandManager = new CommandManager(this.app, this);

		// Mock job manager for now
		this.jobManager = {
			getJobs: async (): Promise<any[]> => []
		};

		// Register view
		this.registerView(
			RESEARCH_CONSOLE_VIEW_TYPE,
			(leaf) => new ResearchConsoleView(leaf, this)
		);

		// Register commands
		this.commandManager.registerCommands();

		// Add ribbon icon
		this.addRibbonIcon('search', 'Open Research Console', () => {
			this.activateView();
		});

		// Add settings tab
		this.addSettingTab(new DeepResearchSettingTab(this.app, this));

		// Create template files on first run
		if (this.isFirstRun()) {
			await this.initializePlugin();
		}

		console.log('Deep Research Assistant plugin loaded');
	}

	onunload() {
		console.log('Deep Research Assistant plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		
		// Update services with new settings
		if (this.llmService) {
			this.llmService.updateSettings(this.settings);
		}
	}

	private isFirstRun(): boolean {
		return !this.settings.templatesPath || this.settings.templatesPath === DEFAULT_SETTINGS.templatesPath;
	}

	private async initializePlugin(): Promise<void> {
		try {
			// Create template files
			await this.templateManager.createTemplateFiles();
			
			// Create folder structure
			await this.createFolderStructure();
			
			new Notice('Deep Research Assistant initialized! Template files and folder structure created.');
		} catch (error) {
			console.error('Error initializing plugin:', error);
			new Notice('Error initializing Deep Research Assistant. Check console for details.');
		}
	}

	private async createFolderStructure(): Promise<void> {
		const folders = [
			this.settings.seedsPath,
			this.settings.plansPath,
			this.settings.reportsPath,
			this.settings.sourcesPath,
			this.settings.topicsPath,
			this.settings.templatesPath
		];

		for (const folderPath of folders) {
			try {
				const existingFolder = this.app.vault.getAbstractFileByPath(folderPath);
				if (!existingFolder) {
					await this.app.vault.createFolder(folderPath);
				}
			} catch (error) {
				console.warn(`Could not create folder ${folderPath}:`, error);
			}
		}
	}

	async activateView() {
		const { workspace } = this.app;

		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(RESEARCH_CONSOLE_VIEW_TYPE);

		if (leaves.length > 0) {
			// If view already exists, focus it
			leaf = leaves[0];
		} else {
			// Create new view in right sidebar
			leaf = workspace.getRightLeaf(false);
			await leaf.setViewState({
				type: RESEARCH_CONSOLE_VIEW_TYPE,
				active: true,
			});
		}

		// Focus the view
		workspace.revealLeaf(leaf);
	}
}

class DeepResearchSettingTab extends PluginSettingTab {
	plugin: DeepResearchPlugin;

	constructor(app: App, plugin: DeepResearchPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Deep Research Assistant Settings' });

		// Folder Paths Section
		containerEl.createEl('h3', { text: 'Folder Paths' });
		
		new Setting(containerEl)
			.setName('Seeds Path')
			.setDesc('Where to store research seeds')
			.addText(text => text
				.setPlaceholder('01_Inbox/Seeds')
				.setValue(this.plugin.settings.seedsPath)
				.onChange(async (value) => {
					this.plugin.settings.seedsPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Plans Path')
			.setDesc('Where to store research plans')
			.addText(text => text
				.setPlaceholder('02_Research/Plans')
				.setValue(this.plugin.settings.plansPath)
				.onChange(async (value) => {
					this.plugin.settings.plansPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Reports Path')
			.setDesc('Where to store research reports')
			.addText(text => text
				.setPlaceholder('02_Research/Reports')
				.setValue(this.plugin.settings.reportsPath)
				.onChange(async (value) => {
					this.plugin.settings.reportsPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Sources Path')
			.setDesc('Where to store source notes')
			.addText(text => text
				.setPlaceholder('02_Research/Sources')
				.setValue(this.plugin.settings.sourcesPath)
				.onChange(async (value) => {
					this.plugin.settings.sourcesPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Topics Path')
			.setDesc('Where to store topic hubs')
			.addText(text => text
				.setPlaceholder('02_Research/Topics')
				.setValue(this.plugin.settings.topicsPath)
				.onChange(async (value) => {
					this.plugin.settings.topicsPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Templates Path')
			.setDesc('Where to store note templates')
			.addText(text => text
				.setPlaceholder('00_System/Templates')
				.setValue(this.plugin.settings.templatesPath)
				.onChange(async (value) => {
					this.plugin.settings.templatesPath = value;
					await this.plugin.saveSettings();
				}));

		// LLM Provider Section
		containerEl.createEl('h3', { text: 'LLM Provider' });
		
		new Setting(containerEl)
			.setName('Default LLM Provider')
			.setDesc('Choose your preferred language model provider')
			.addDropdown(dropdown => {
				dropdown.addOptions({
					'ollama': 'Ollama (Local)',
					'openai': 'OpenAI',
					'anthropic': 'Anthropic',
					'local': 'Local/Custom Endpoint'
				});
				dropdown.setValue(this.plugin.settings.defaultLLMProvider)
					.onChange(async (value) => {
						this.plugin.settings.defaultLLMProvider = value as any;
						await this.plugin.saveSettings();
						this.display(); // Refresh to show relevant settings
					});
			});

		// Provider-specific settings
		if (this.plugin.settings.defaultLLMProvider === 'ollama') {
			new Setting(containerEl)
				.setName('Ollama Endpoint')
				.setDesc('URL for your Ollama instance')
				.addText(text => text
					.setPlaceholder('http://localhost:11434')
					.setValue(this.plugin.settings.ollamaEndpoint || '')
					.onChange(async (value) => {
						this.plugin.settings.ollamaEndpoint = value;
						await this.plugin.saveSettings();
					}));
		}

		if (this.plugin.settings.defaultLLMProvider === 'openai') {
			new Setting(containerEl)
				.setName('OpenAI API Key')
				.setDesc('Your OpenAI API key')
				.addText(text => {
					text.setPlaceholder('sk-...')
						.setValue(this.plugin.settings.openaiApiKey || '')
						.onChange(async (value) => {
							this.plugin.settings.openaiApiKey = value;
							await this.plugin.saveSettings();
						});
					text.inputEl.type = 'password';
				});
		}

		if (this.plugin.settings.defaultLLMProvider === 'anthropic') {
			new Setting(containerEl)
				.setName('Anthropic API Key')
				.setDesc('Your Anthropic API key')
				.addText(text => {
					text.setPlaceholder('sk-ant-...')
						.setValue(this.plugin.settings.anthropicApiKey || '')
						.onChange(async (value) => {
							this.plugin.settings.anthropicApiKey = value;
							await this.plugin.saveSettings();
						});
					text.inputEl.type = 'password';
				});
		}

		if (this.plugin.settings.defaultLLMProvider === 'local') {
			new Setting(containerEl)
				.setName('Local Endpoint')
				.setDesc('URL for your local LLM server')
				.addText(text => text
					.setPlaceholder('http://localhost:8080')
					.setValue(this.plugin.settings.localEndpoint || '')
					.onChange(async (value) => {
						this.plugin.settings.localEndpoint = value;
						await this.plugin.saveSettings();
					}));
		}

		// Test connection button
		new Setting(containerEl)
			.setName('Test LLM Connection')
			.setDesc('Verify that your LLM provider is working')
			.addButton(button => {
				button.setButtonText('Test Connection')
					.onClick(async () => {
						button.setButtonText('Testing...');
						button.setDisabled(true);
						
						try {
							const result = await this.plugin.llmService.testConnection();
							if (result.success) {
								new Notice('✅ ' + result.message);
							} else {
								new Notice('❌ ' + result.message);
							}
						} catch (error) {
							new Notice('❌ Connection test failed: ' + error.message);
						}
						
						button.setButtonText('Test Connection');
						button.setDisabled(false);
					});
			});

		// Gatekeeper Settings
		containerEl.createEl('h3', { text: 'Gatekeeper Settings' });
		
		new Setting(containerEl)
			.setName('Scoring Threshold')
			.setDesc('Minimum score for deep research recommendation')
			.addSlider(slider => slider
				.setLimits(0, 100, 5)
				.setValue(this.plugin.settings.gatekeeperThreshold)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.gatekeeperThreshold = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Auto-promote High Scores')
			.setDesc('Automatically offer to create plans for seeds that score above threshold')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.autoPromoteHighScore)
				.onChange(async (value) => {
					this.plugin.settings.autoPromoteHighScore = value;
					await this.plugin.saveSettings();
				}));

		// Omnivore Integration Section
		containerEl.createEl('h3', { text: 'Omnivore Integration' });
		
		new Setting(containerEl)
			.setName('Enable Omnivore')
			.setDesc('Connect to Omnivore for importing highlights')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.omnivoreEnabled)
				.onChange(async (value) => {
					this.plugin.settings.omnivoreEnabled = value;
					await this.plugin.saveSettings();
					this.display(); // Refresh to show/hide Omnivore settings
				}));

		if (this.plugin.settings.omnivoreEnabled) {
			new Setting(containerEl)
				.setName('Omnivore API Key')
				.setDesc('Your Omnivore API key')
				.addText(text => {
					text.setPlaceholder('Your API key...')
						.setValue(this.plugin.settings.omnivoreApiKey || '')
						.onChange(async (value) => {
							this.plugin.settings.omnivoreApiKey = value;
							await this.plugin.saveSettings();
						});
					text.inputEl.type = 'password';
				});

			new Setting(containerEl)
				.setName('Auto-sync Highlights')
				.setDesc('Automatically sync highlights from Omnivore')
				.addToggle(toggle => toggle
					.setValue(this.plugin.settings.omnivoreAutoSync)
					.onChange(async (value) => {
						this.plugin.settings.omnivoreAutoSync = value;
						await this.plugin.saveSettings();
					}));
		}

		// Advanced Settings
		containerEl.createEl('h3', { text: 'Advanced' });
		
		new Setting(containerEl)
			.setName('Reset Plugin')
			.setDesc('Reset all settings and recreate template files')
			.addButton(button => {
				button.setButtonText('Reset Plugin')
					.setWarning()
					.onClick(async () => {
						const confirmed = confirm(
							'This will reset all plugin settings and recreate template files. Are you sure?'
						);
						if (confirmed) {
							this.plugin.settings = { ...DEFAULT_SETTINGS };
							await this.plugin.saveSettings();
							await this.plugin.templateManager.createTemplateFiles();
							new Notice('Plugin reset successfully. Please reload Obsidian.');
						}
					});
			});
	}
}