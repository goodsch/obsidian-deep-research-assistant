import { App, Modal, Setting, TFile, Notice } from 'obsidian';
import DeepResearchPlugin from '../../../main';
import { Seed, Topic } from '../../types';

export class SeedModal extends Modal {
	private plugin: DeepResearchPlugin;
	private result: {
		title: string;
		summary: string;
		topic: string;
		priority: 'low' | 'medium' | 'high';
		questions: string[];
	};
	private onSubmit: (seed: any) => void;
	private topics: Topic[] = [];

	constructor(app: App, plugin: DeepResearchPlugin, onSubmit: (seed: any) => void) {
		super(app);
		this.plugin = plugin;
		this.onSubmit = onSubmit;
		this.result = {
			title: '',
			summary: '',
			topic: '',
			priority: 'medium',
			questions: ['']
		};
	}

	async onOpen(): Promise<void> {
		// Load available topics
		this.topics = await this.plugin.dataManager.getTopics();
		
		const { contentEl } = this;
		contentEl.empty();

		contentEl.createEl('h2', { text: 'Create New Research Seed' });

		// Title
		new Setting(contentEl)
			.setName('Title')
			.setDesc('Brief, descriptive title for this research idea')
			.addText(text => {
				text.setPlaceholder('e.g., "Role of self-trust in therapeutic outcomes"')
					.setValue(this.result.title)
					.onChange(async (value) => {
						this.result.title = value;
					});
			});

		// Topic
		new Setting(contentEl)
			.setName('Topic')
			.setDesc('Select an existing topic or create a new one')
			.addDropdown(dropdown => {
				dropdown.addOption('', 'Select a topic...');
				
				// Add existing topics
				this.topics.forEach(topic => {
					dropdown.addOption(topic.frontmatter.slug, topic.title);
				});
				
				dropdown.addOption('__new__', '+ Create New Topic');
				
				dropdown.setValue(this.result.topic)
					.onChange(async (value) => {
						if (value === '__new__') {
							this.showNewTopicInput();
						} else {
							this.result.topic = value;
						}
					});
			});

		// Priority
		new Setting(contentEl)
			.setName('Priority')
			.setDesc('How important is this research idea?')
			.addDropdown(dropdown => {
				dropdown.addOptions({
					'low': 'Low',
					'medium': 'Medium', 
					'high': 'High'
				});
				dropdown.setValue(this.result.priority)
					.onChange(async (value) => {
						this.result.priority = value as 'low' | 'medium' | 'high';
					});
			});

		// Summary
		new Setting(contentEl)
			.setName('Summary')
			.setDesc('Describe what sparked this research idea')
			.addTextArea(text => {
				text.setPlaceholder('Explain the key insight, observation, or question that led to this research idea...')
					.setValue(this.result.summary)
					.onChange(async (value) => {
						this.result.summary = value;
					});
				text.inputEl.rows = 4;
				text.inputEl.style.width = '100%';
			});

		// Initial Questions
		const questionsContainer = contentEl.createDiv('questions-container');
		this.renderQuestions(questionsContainer);

		// Buttons
		const buttonContainer = contentEl.createDiv('modal-button-container');
		buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;';

		const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelButton.addEventListener('click', () => this.close());

		const submitButton = buttonContainer.createEl('button', { 
			text: 'Create Seed',
			cls: 'mod-cta'
		});
		submitButton.addEventListener('click', () => this.handleSubmit());
	}

	private renderQuestions(container: HTMLElement): void {
		container.empty();
		
		const heading = container.createEl('h3', { text: 'Initial Questions' });
		const desc = container.createEl('p', { 
			text: 'What specific questions do you want to explore?',
			cls: 'setting-item-description'
		});

		this.result.questions.forEach((question, index) => {
			const questionDiv = container.createDiv('question-item');
			questionDiv.style.cssText = 'display: flex; gap: 10px; align-items: center; margin-bottom: 10px;';

			const input = questionDiv.createEl('input', {
				type: 'text',
				placeholder: 'Enter a research question...',
				value: question
			});
			input.style.cssText = 'flex: 1;';
			
			input.addEventListener('input', (e) => {
				this.result.questions[index] = (e.target as HTMLInputElement).value;
			});

			const removeBtn = questionDiv.createEl('button', {
				text: '×',
				cls: 'question-remove-btn'
			});
			removeBtn.style.cssText = 'width: 24px; height: 24px; border-radius: 50%; border: none; background: var(--background-modifier-error); color: white; cursor: pointer;';
			
			removeBtn.addEventListener('click', () => {
				this.result.questions.splice(index, 1);
				if (this.result.questions.length === 0) {
					this.result.questions.push('');
				}
				this.renderQuestions(container);
			});

			// Hide remove button if it's the only question
			if (this.result.questions.length === 1) {
				removeBtn.style.visibility = 'hidden';
			}
		});

		const addButton = container.createEl('button', {
			text: '+ Add Question',
			cls: 'add-question-btn'
		});
		addButton.style.cssText = 'margin-top: 10px;';
		
		addButton.addEventListener('click', () => {
			this.result.questions.push('');
			this.renderQuestions(container);
		});
	}

	private showNewTopicInput(): void {
		const modal = new Modal(this.app);
		const { contentEl } = modal;
		
		contentEl.createEl('h3', { text: 'Create New Topic' });
		
		let newTopicTitle = '';
		let newTopicSlug = '';
		let newTopicDescription = '';

		new Setting(contentEl)
			.setName('Topic Title')
			.addText(text => {
				text.setPlaceholder('e.g., "Confidence & Self-Trust"')
					.onChange((value) => {
						newTopicTitle = value;
						// Auto-generate slug
						newTopicSlug = value.toLowerCase()
							.replace(/[^a-z0-9\s]/g, '')
							.replace(/\s+/g, '_');
					});
			});

		new Setting(contentEl)
			.setName('Description')
			.addTextArea(text => {
				text.setPlaceholder('Brief description of this research topic...')
					.onChange((value) => {
						newTopicDescription = value;
					});
			});

		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;';

		const cancelBtn = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelBtn.addEventListener('click', () => modal.close());

		const createBtn = buttonContainer.createEl('button', { 
			text: 'Create Topic',
			cls: 'mod-cta'
		});
		createBtn.addEventListener('click', async () => {
			if (newTopicTitle) {
				await this.plugin.commandManager.createTopicHub({
					title: newTopicTitle,
					slug: newTopicSlug,
					description: newTopicDescription
				});
				
				this.result.topic = newTopicSlug;
				modal.close();
				
				// Refresh the topic dropdown
				this.onOpen();
			}
		});

		modal.open();
	}

	private async handleSubmit(): Promise<void> {
		// Validate required fields
		if (!this.result.title) {
			new Notice('Please enter a title for the seed');
			return;
		}

		if (!this.result.summary) {
			new Notice('Please enter a summary for the seed');
			return;
		}

		// Filter out empty questions
		this.result.questions = this.result.questions.filter(q => q.trim() !== '');

		try {
			await this.onSubmit(this.result);
			this.close();
			new Notice('Research seed created successfully!');
		} catch (error) {
			console.error('Error creating seed:', error);
			new Notice('Failed to create seed. Please try again.');
		}
	}

	onClose(): void {
		const { contentEl } = this;
		contentEl.empty();
	}
}