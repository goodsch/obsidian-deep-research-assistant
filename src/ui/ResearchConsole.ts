import { ItemView, WorkspaceLeaf, Menu } from 'obsidian';
import { ResearchConsoleState } from '../types';
import DeepResearchPlugin from '../../main';

export const RESEARCH_CONSOLE_VIEW_TYPE = 'deep-research-console';

export class ResearchConsoleView extends ItemView {
	private plugin: DeepResearchPlugin;
	private state: ResearchConsoleState;

	constructor(leaf: WorkspaceLeaf, plugin: DeepResearchPlugin) {
		super(leaf);
		this.plugin = plugin;
		this.state = {
			activeTab: 'seeds',
			filters: {},
			selectedItems: []
		};
	}

	getViewType(): string {
		return RESEARCH_CONSOLE_VIEW_TYPE;
	}

	getDisplayText(): string {
		return 'Research Console';
	}

	getIcon(): string {
		return 'search';
	}

	async onOpen(): Promise<void> {
		await this.render();
	}

	async onClose(): Promise<void> {
		// Cleanup if needed
	}

	private async render(): Promise<void> {
		const container = this.containerEl.children[1];
		container.empty();
		container.addClass('deep-research-console');

		// Header
		const header = container.createDiv('console-header');
		const title = header.createEl('h2', { text: 'Research Console' });
		
		// Add refresh button
		const refreshBtn = header.createEl('button', { 
			cls: 'mod-cta',
			text: 'Refresh'
		});
		refreshBtn.addEventListener('click', () => this.refresh());

		// Tab Navigation
		const tabNav = container.createDiv('tab-nav');
		const tabs = [
			{ id: 'seeds', label: 'Seeds', icon: 'lightbulb' },
			{ id: 'plans', label: 'Plans', icon: 'clipboard-list' },
			{ id: 'runs', label: 'Runs', icon: 'play' },
			{ id: 'sources', label: 'Sources', icon: 'book-open' },
			{ id: 'claims', label: 'Claims', icon: 'check-circle' }
		];

		tabs.forEach(tab => {
			const tabEl = tabNav.createDiv(`tab ${this.state.activeTab === tab.id ? 'active' : ''}`);
			tabEl.innerHTML = `
				<span class="tab-icon" data-icon="${tab.icon}"></span>
				<span class="tab-label">${tab.label}</span>
			`;
			tabEl.addEventListener('click', () => this.switchTab(tab.id as any));
		});

		// Filters
		const filtersDiv = container.createDiv('filters');
		await this.renderFilters(filtersDiv);

		// Content Area
		const contentDiv = container.createDiv('tab-content');
		await this.renderTabContent(contentDiv);

		// Actions Bar
		const actionsDiv = container.createDiv('actions-bar');
		await this.renderActions(actionsDiv);
	}

	private async renderFilters(container: HTMLElement): Promise<void> {
		container.innerHTML = `
			<div class="filter-group">
				<label for="topic-filter">Topic:</label>
				<select id="topic-filter">
					<option value="">All Topics</option>
				</select>
			</div>
			<div class="filter-group">
				<label for="status-filter">Status:</label>
				<select id="status-filter">
					<option value="">All Statuses</option>
				</select>
			</div>
			<div class="filter-group">
				<label for="score-filter">Min Score:</label>
				<input type="number" id="score-filter" min="0" max="100" placeholder="0">
			</div>
		`;

		// Load filter options
		await this.populateFilterOptions();

		// Add event listeners
		container.querySelectorAll('select, input').forEach(el => {
			el.addEventListener('change', () => this.updateFilters());
		});
	}

	private async populateFilterOptions(): Promise<void> {
		// Get unique topics from existing notes
		const topics = await this.plugin.dataManager.getTopics();
		const topicSelect = this.containerEl.querySelector('#topic-filter') as HTMLSelectElement;
		
		topics.forEach(topic => {
			const option = topicSelect.createEl('option', {
				value: topic.id,
				text: topic.title
			});
		});

		// Populate status options based on active tab
		const statusSelect = this.containerEl.querySelector('#status-filter') as HTMLSelectElement;
		const statusOptions = this.getStatusOptionsForTab(this.state.activeTab);
		
		statusOptions.forEach(status => {
			statusSelect.createEl('option', {
				value: status,
				text: status.charAt(0).toUpperCase() + status.slice(1)
			});
		});
	}

	private getStatusOptionsForTab(tab: string): string[] {
		switch (tab) {
			case 'seeds':
				return ['captured', 'scored', 'promoted', 'archived'];
			case 'plans':
				return ['planned', 'running', 'completed', 'failed'];
			case 'runs':
				return ['queued', 'running', 'completed', 'failed'];
			default:
				return [];
		}
	}

	private async renderTabContent(container: HTMLElement): Promise<void> {
		container.empty();

		switch (this.state.activeTab) {
			case 'seeds':
				await this.renderSeedsTab(container);
				break;
			case 'plans':
				await this.renderPlansTab(container);
				break;
			case 'runs':
				await this.renderRunsTab(container);
				break;
			case 'sources':
				await this.renderSourcesTab(container);
				break;
			case 'claims':
				await this.renderClaimsTab(container);
				break;
		}
	}

	private async renderSeedsTab(container: HTMLElement): Promise<void> {
		const seeds = await this.plugin.dataManager.getSeeds(this.state.filters);
		
		if (seeds.length === 0) {
			container.innerHTML = `
				<div class="empty-state">
					<p>No seeds found matching your filters.</p>
					<button class="mod-cta" id="create-seed">Create New Seed</button>
				</div>
			`;
			
			container.querySelector('#create-seed')?.addEventListener('click', () => {
				this.plugin.commandManager.createSeed();
			});
			return;
		}

		const table = container.createDiv('data-table');
		table.innerHTML = `
			<table>
				<thead>
					<tr>
						<th><input type="checkbox" id="select-all"></th>
						<th>Title</th>
						<th>Topic</th>
						<th>Score</th>
						<th>Status</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					${seeds.map(seed => `
						<tr data-id="${seed.id}">
							<td><input type="checkbox" class="item-select" value="${seed.id}"></td>
							<td><a href="${seed.filePath}">${seed.title}</a></td>
							<td>${seed.frontmatter.topic || '-'}</td>
							<td>${seed.frontmatter.score || 0}</td>
							<td><span class="status-badge ${seed.frontmatter.status}">${seed.frontmatter.status}</span></td>
							<td>${seed.frontmatter.created || '-'}</td>
							<td>
								<button class="score-btn" data-id="${seed.id}">Score</button>
								<button class="promote-btn" data-id="${seed.id}">Promote</button>
							</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;

		// Add event listeners
		this.addTableEventListeners(table);
	}

	private async renderPlansTab(container: HTMLElement): Promise<void> {
		const plans = await this.plugin.dataManager.getPlans(this.state.filters);
		
		if (plans.length === 0) {
			container.innerHTML = '<div class="empty-state"><p>No plans found.</p></div>';
			return;
		}

		const table = container.createDiv('data-table');
		table.innerHTML = `
			<table>
				<thead>
					<tr>
						<th><input type="checkbox" id="select-all"></th>
						<th>Title</th>
						<th>Topic</th>
						<th>Status</th>
						<th>Deliverables</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					${plans.map(plan => `
						<tr data-id="${plan.id}">
							<td><input type="checkbox" class="item-select" value="${plan.id}"></td>
							<td><a href="${plan.filePath}">${plan.title}</a></td>
							<td>${plan.frontmatter.topic}</td>
							<td><span class="status-badge ${plan.frontmatter.status}">${plan.frontmatter.status}</span></td>
							<td>${plan.frontmatter.deliverables.join(', ')}</td>
							<td>${plan.frontmatter.created || '-'}</td>
							<td>
								<button class="run-btn" data-id="${plan.id}">Run</button>
								<button class="edit-btn" data-id="${plan.id}">Edit</button>
							</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;

		this.addTableEventListeners(table);
	}

	private async renderRunsTab(container: HTMLElement): Promise<void> {
		const jobs = await this.plugin.jobManager.getJobs();
		
		if (jobs.length === 0) {
			container.innerHTML = '<div class="empty-state"><p>No research runs found.</p></div>';
			return;
		}

		const table = container.createDiv('data-table');
		table.innerHTML = `
			<table>
				<thead>
					<tr>
						<th>Run ID</th>
						<th>Plan</th>
						<th>Status</th>
						<th>Progress</th>
						<th>Started</th>
						<th>Duration</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					${jobs.map((job: any) => `
						<tr data-id="${job.id}">
							<td><code>${job.id}</code></td>
							<td>${job.planId}</td>
							<td><span class="status-badge ${job.status}">${job.status}</span></td>
							<td>
								<div class="progress-bar">
									<div class="progress-fill" style="width: ${job.progress || 0}%"></div>
								</div>
								<span class="progress-text">${job.progress || 0}%</span>
							</td>
							<td>${job.startTime?.toLocaleDateString() || '-'}</td>
							<td>${this.formatDuration(job.startTime, job.endTime)}</td>
							<td>
								<button class="view-btn" data-id="${job.id}">View</button>
								${job.status === 'running' ? `<button class="cancel-btn" data-id="${job.id}">Cancel</button>` : ''}
							</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;

		this.addTableEventListeners(table);
	}

	private async renderSourcesTab(container: HTMLElement): Promise<void> {
		const sources = await this.plugin.dataManager.getSources(this.state.filters);
		
		if (sources.length === 0) {
			container.innerHTML = '<div class="empty-state"><p>No sources found.</p></div>';
			return;
		}

		const table = container.createDiv('data-table');
		table.innerHTML = `
			<table>
				<thead>
					<tr>
						<th><input type="checkbox" id="select-all"></th>
						<th>Title</th>
						<th>Authors</th>
						<th>Year</th>
						<th>Quality</th>
						<th>Claims</th>
						<th>Added</th>
					</tr>
				</thead>
				<tbody>
					${sources.map(source => `
						<tr data-id="${source.id}">
							<td><input type="checkbox" class="item-select" value="${source.id}"></td>
							<td><a href="${source.filePath}">${source.title}</a></td>
							<td>${source.frontmatter.authors?.join(', ') || '-'}</td>
							<td>${source.frontmatter.year || '-'}</td>
							<td><span class="quality-badge ${source.frontmatter.quality}">${source.frontmatter.quality}</span></td>
							<td>${source.frontmatter.supports_claims?.length || 0}</td>
							<td>${source.frontmatter.created || '-'}</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;

		this.addTableEventListeners(table);
	}

	private async renderClaimsTab(container: HTMLElement): Promise<void> {
		const reports = await this.plugin.dataManager.getReports(this.state.filters);
		const claims = reports.flatMap(report => report.claims || []);
		
		if (claims.length === 0) {
			container.innerHTML = '<div class="empty-state"><p>No claims found.</p></div>';
			return;
		}

		const table = container.createDiv('data-table');
		table.innerHTML = `
			<table>
				<thead>
					<tr>
						<th>Claim</th>
						<th>Confidence</th>
						<th>Sources</th>
						<th>Contradictions</th>
					</tr>
				</thead>
				<tbody>
					${claims.map(claim => `
						<tr data-id="${claim.id}">
							<td>${claim.text}</td>
							<td><span class="confidence-badge ${claim.confidence}">${claim.confidence}</span></td>
							<td>${claim.sourceIds.length}</td>
							<td>${claim.contradictions ? '⚠️' : '✅'}</td>
						</tr>
					`).join('')}
				</tbody>
			</table>
		`;
	}

	private async renderActions(container: HTMLElement): Promise<void> {
		const selectedCount = this.state.selectedItems.length;
		
		container.innerHTML = `
			<div class="selection-info">
				<span>${selectedCount} item(s) selected</span>
			</div>
			<div class="bulk-actions">
				<button class="batch-btn" ${selectedCount === 0 ? 'disabled' : ''}>Batch Process</button>
				<button class="delete-btn" ${selectedCount === 0 ? 'disabled' : ''}>Delete</button>
			</div>
			<div class="create-actions">
				<button class="mod-cta" id="create-new">Create New</button>
			</div>
		`;

		// Add event listeners
		container.querySelector('#create-new')?.addEventListener('click', () => {
			this.showCreateMenu();
		});
	}

	private addTableEventListeners(table: HTMLElement): void {
		// Select all checkbox
		const selectAllCheckbox = table.querySelector('#select-all') as HTMLInputElement;
		selectAllCheckbox?.addEventListener('change', (e) => {
			const isChecked = (e.target as HTMLInputElement).checked;
			const itemCheckboxes = table.querySelectorAll('.item-select') as NodeListOf<HTMLInputElement>;
			
			itemCheckboxes.forEach(checkbox => {
				checkbox.checked = isChecked;
			});
			
			this.updateSelection();
		});

		// Individual checkboxes
		table.querySelectorAll('.item-select').forEach(checkbox => {
			checkbox.addEventListener('change', () => this.updateSelection());
		});

		// Action buttons
		table.querySelectorAll('.score-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const seedId = (e.target as HTMLElement).dataset.id!;
				this.plugin.commandManager.scoreSeed(seedId);
			});
		});

		table.querySelectorAll('.promote-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const seedId = (e.target as HTMLElement).dataset.id!;
				this.plugin.commandManager.promoteSeedToPlan(seedId);
			});
		});

		table.querySelectorAll('.run-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const planId = (e.target as HTMLElement).dataset.id!;
				this.plugin.commandManager.runPlan(planId);
			});
		});
	}

	private updateSelection(): void {
		const checkboxes = this.containerEl.querySelectorAll('.item-select:checked') as NodeListOf<HTMLInputElement>;
		this.state.selectedItems = Array.from(checkboxes).map(cb => cb.value);
		
		// Re-render actions to update button states
		const actionsDiv = this.containerEl.querySelector('.actions-bar');
		if (actionsDiv) {
			this.renderActions(actionsDiv as HTMLElement);
		}
	}

	private updateFilters(): void {
		const topicFilter = (this.containerEl.querySelector('#topic-filter') as HTMLSelectElement)?.value;
		const statusFilter = (this.containerEl.querySelector('#status-filter') as HTMLSelectElement)?.value;
		const scoreFilter = (this.containerEl.querySelector('#score-filter') as HTMLInputElement)?.value;

		this.state.filters = {
			topic: topicFilter || undefined,
			status: statusFilter || undefined,
			score: scoreFilter ? parseInt(scoreFilter) : undefined
		};

		// Re-render tab content with new filters
		const contentDiv = this.containerEl.querySelector('.tab-content');
		if (contentDiv) {
			this.renderTabContent(contentDiv as HTMLElement);
		}
	}

	private switchTab(tabId: 'seeds' | 'plans' | 'runs' | 'sources' | 'claims'): void {
		this.state.activeTab = tabId;
		this.state.selectedItems = []; // Clear selection when switching tabs
		this.render();
	}

	private showCreateMenu(): void {
		const menu = new Menu();
		
		menu.addItem((item) => {
			item.setTitle('New Seed')
				.setIcon('lightbulb')
				.onClick(() => this.plugin.commandManager.createSeed());
		});

		menu.addItem((item) => {
			item.setTitle('New Topic Hub')
				.setIcon('folder')
				.onClick(() => this.plugin.commandManager.createTopicHub());
		});

		menu.showAtMouseEvent(event as MouseEvent);
	}

	private formatDuration(start?: Date, end?: Date): string {
		if (!start) return '-';
		
		const endTime = end || new Date();
		const durationMs = endTime.getTime() - start.getTime();
		const minutes = Math.floor(durationMs / 60000);
		const seconds = Math.floor((durationMs % 60000) / 1000);
		
		if (minutes > 0) {
			return `${minutes}m ${seconds}s`;
		}
		return `${seconds}s`;
	}

	private async refresh(): Promise<void> {
		await this.plugin.dataManager.refreshCache();
		await this.render();
	}
}