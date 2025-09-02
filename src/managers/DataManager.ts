import { App, TFile, TFolder, normalizePath } from 'obsidian';
import { 
	Seed, Plan, Report, SourceNote, Topic, 
	SeedFrontmatter, PlanFrontmatter, ReportFrontmatter, 
	SourceNoteFrontmatter, TopicFrontmatter,
	DeepResearchSettings
} from '../types';
import { FRONTMATTER_TYPES } from '../constants';

export class DataManager {
	private app: App;
	private settings: DeepResearchSettings;
	private cache: {
		seeds: Map<string, Seed>;
		plans: Map<string, Plan>;
		reports: Map<string, Report>;
		sources: Map<string, SourceNote>;
		topics: Map<string, Topic>;
	};
	private lastCacheUpdate: number = 0;

	constructor(app: App, settings: DeepResearchSettings) {
		this.app = app;
		this.settings = settings;
		this.cache = {
			seeds: new Map(),
			plans: new Map(),
			reports: new Map(),
			sources: new Map(),
			topics: new Map()
		};

		// Set up file system watchers
		this.setupWatchers();
	}

	private setupWatchers(): void {
		// Watch for file changes and update cache
		this.app.vault.on('create', (file) => {
			if (file instanceof TFile && file.extension === 'md') {
				this.handleFileChange(file);
			}
		});

		this.app.vault.on('modify', (file) => {
			if (file instanceof TFile && file.extension === 'md') {
				this.handleFileChange(file);
			}
		});

		this.app.vault.on('delete', (file) => {
			if (file instanceof TFile && file.extension === 'md') {
				this.handleFileDelete(file);
			}
		});
	}

	private async handleFileChange(file: TFile): Promise<void> {
		try {
			const content = await this.app.vault.read(file);
			const frontmatter = this.parseFrontmatter(content);
			
			if (!frontmatter?.type) return;

			switch (frontmatter.type) {
				case FRONTMATTER_TYPES.SEED:
					await this.updateSeedCache(file, content, frontmatter as SeedFrontmatter);
					break;
				case FRONTMATTER_TYPES.PLAN:
					await this.updatePlanCache(file, content, frontmatter as PlanFrontmatter);
					break;
				case FRONTMATTER_TYPES.REPORT:
					// await this.updateReportCache(file, content, frontmatter as ReportFrontmatter);
					break;
				case FRONTMATTER_TYPES.SOURCE:
					// await this.updateSourceCache(file, content, frontmatter as SourceNoteFrontmatter);
					break;
				case FRONTMATTER_TYPES.TOPIC:
					await this.updateTopicCache(file, content, frontmatter as TopicFrontmatter);
					break;
			}
		} catch (error) {
			console.error('Error handling file change:', error);
		}
	}

	private handleFileDelete(file: TFile): void {
		// Remove from all caches
		const fileId = this.getFileId(file);
		this.cache.seeds.delete(fileId);
		this.cache.plans.delete(fileId);
		this.cache.reports.delete(fileId);
		this.cache.sources.delete(fileId);
		this.cache.topics.delete(fileId);
	}

	private getFileId(file: TFile): string {
		return file.path;
	}

	private parseFrontmatter(content: string): any {
		const lines = content.split('\n');
		if (lines[0] !== '---') return null;
		
		let endIndex = -1;
		for (let i = 1; i < lines.length; i++) {
			if (lines[i] === '---') {
				endIndex = i;
				break;
			}
		}
		
		if (endIndex === -1) return null;
		
		const frontmatterText = lines.slice(1, endIndex).join('\n');
		try {
			// Simple YAML parsing - in a real implementation you'd want a proper YAML parser
			const lines = frontmatterText.split('\n');
			const result: any = {};
			
			lines.forEach(line => {
				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
					
					// Handle arrays
					if (value.startsWith('[') && value.endsWith(']')) {
						result[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
					} else {
						result[key] = value;
					}
				}
			});
			
			return result;
		} catch (error) {
			console.error('Error parsing frontmatter:', error);
			return null;
		}
	}

	// Seed Management
	async createSeed(data: {
		title: string;
		summary: string;
		topic: string;
		priority: 'low' | 'medium' | 'high';
		questions: string[];
	}): Promise<Seed> {
		const seedId = this.generateId();
		const fileName = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_${seedId}.md`;
		const filePath = normalizePath(`${this.settings.seedsPath}/${fileName}`);

		const frontmatter: SeedFrontmatter = {
			type: 'seed',
			topic: data.topic,
			status: 'captured',
			priority: data.priority,
			created: new Date().toISOString().split('T')[0],
			score: 0,
			verdict: undefined
		};

		const content = this.buildSeedContent(frontmatter, data);
		
		await this.ensureFolderExists(this.settings.seedsPath);
		const file = await this.app.vault.create(filePath, content);

		const seed: Seed = {
			id: seedId,
			frontmatter,
			title: data.title,
			summary: data.summary,
			questions: data.questions,
			filePath: file.path
		};

		this.cache.seeds.set(seedId, seed);
		return seed;
	}

	private buildSeedContent(frontmatter: SeedFrontmatter, data: any): string {
		const yamlFrontmatter = this.stringifyYaml(frontmatter);
		
		return `---
${yamlFrontmatter}---

# Seed: ${data.title}

## Spark

${data.summary}

## Initial Questions

${data.questions.map((q: string) => `- ${q}`).join('\n')}

## Context & Relevance

- Why is this important now?
- How does this connect to my existing knowledge?
- What practical applications might this have?

## Gatekeeper Assessment

### Evaluation Criteria
- [ ] **Novelty**: Is this underexplored or original?
- [ ] **Clinical Value**: Would this benefit therapeutic practice?
- [ ] **Research Readiness**: Is there sufficient literature?
- [ ] **Synthesis Potential**: Can this lead to actionable insights?
- [ ] **Personal Relevance**: Does this align with my interests?

### Results
- **Score**: 
- **Verdict**: 
- **Rationale**: 
- **Top Sub-topics**: 
  - 
  - 
  - 

## Next Steps

- [ ] Run gatekeeper assessment
- [ ] Promote to research plan (if score ≥ 70)
- [ ] Link to relevant topic hub`;
	}

	async getSeed(seedId: string): Promise<Seed | undefined> {
		if (this.cache.seeds.has(seedId)) {
			return this.cache.seeds.get(seedId);
		}

		// Try to find by file path if not in cache
		await this.refreshSeedsCache();
		return this.cache.seeds.get(seedId);
	}

	async getSeeds(filters?: {
		topic?: string;
		status?: string;
		score?: number;
		dateRange?: [Date, Date];
	}): Promise<Seed[]> {
		await this.refreshSeedsCache();
		
		let seeds = Array.from(this.cache.seeds.values());

		if (filters) {
			if (filters.topic) {
				seeds = seeds.filter(seed => seed.frontmatter.topic === filters.topic);
			}
			if (filters.status) {
				seeds = seeds.filter(seed => seed.frontmatter.status === filters.status);
			}
			if (filters.score !== undefined) {
				seeds = seeds.filter(seed => (seed.frontmatter.score || 0) >= filters.score!);
			}
			if (filters.dateRange) {
				seeds = seeds.filter(seed => {
					if (!seed.frontmatter.created) return false;
					const seedDate = new Date(seed.frontmatter.created);
					return seedDate >= filters.dateRange![0] && seedDate <= filters.dateRange![1];
				});
			}
		}

		return seeds.sort((a, b) => {
			const dateA = a.frontmatter.created || '';
			const dateB = b.frontmatter.created || '';
			return dateB.localeCompare(dateA);
		});
	}

	async updateSeed(seedId: string, updates: Partial<SeedFrontmatter>): Promise<void> {
		const seed = await this.getSeed(seedId);
		if (!seed) throw new Error(`Seed ${seedId} not found`);

		const file = this.app.vault.getAbstractFileByPath(seed.filePath) as TFile;
		if (!file) throw new Error(`Seed file ${seed.filePath} not found`);

		const content = await this.app.vault.read(file);
		const updatedContent = this.updateFrontmatter(content, updates);
		
		await this.app.vault.modify(file, updatedContent);
	}

	private async updateSeedCache(file: TFile, content: string, frontmatter: SeedFrontmatter): Promise<void> {
		const seedId = this.getFileId(file);
		const bodyContent = this.extractBodyContent(content);
		
		// Parse title and summary from content
		const lines = bodyContent.split('\n');
		const titleMatch = lines.find(line => line.startsWith('# Seed:'))?.replace('# Seed:', '').trim();
		const summaryStart = lines.findIndex(line => line.trim() === '## Spark') + 1;
		const summaryEnd = lines.findIndex((line, index) => index > summaryStart && line.startsWith('##'));
		const summary = lines.slice(summaryStart, summaryEnd === -1 ? summaryStart + 5 : summaryEnd)
			.join('\n').trim();

		// Parse questions
		const questionsStart = lines.findIndex(line => line.trim() === '## Initial Questions') + 1;
		const questionsEnd = lines.findIndex((line, index) => index > questionsStart && line.startsWith('##'));
		const questions = lines.slice(questionsStart, questionsEnd === -1 ? questionsStart + 10 : questionsEnd)
			.filter(line => line.trim().startsWith('-'))
			.map(line => line.replace(/^-\s*/, '').trim())
			.filter(q => q.length > 0);

		const seed: Seed = {
			id: seedId,
			frontmatter,
			title: titleMatch || 'Untitled Seed',
			summary: summary || '',
			questions: questions || [],
			filePath: file.path
		};

		this.cache.seeds.set(seedId, seed);
	}

	// Plan Management
	async createPlan(data: {
		title: string;
		topic: string;
		thesis: string;
		subQuestions: string[];
		deliverables: string[];
		searchStrategy: any;
		rubric: string;
		seedId?: string;
	}): Promise<Plan> {
		const planId = this.generateId();
		const fileName = `${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_${planId}.md`;
		const filePath = normalizePath(`${this.settings.plansPath}/${fileName}`);

		const frontmatter: PlanFrontmatter = {
			type: 'dr-plan',
			topic: data.topic,
			seed: data.seedId,
			status: 'planned',
			created: new Date().toISOString().split('T')[0],
			deliverables: data.deliverables,
			run_id: ''
		};

		const content = this.buildPlanContent(frontmatter, data);
		
		await this.ensureFolderExists(this.settings.plansPath);
		const file = await this.app.vault.create(filePath, content);

		const plan: Plan = {
			id: planId,
			frontmatter,
			title: data.title,
			thesis: data.thesis,
			subQuestions: data.subQuestions,
			searchStrategy: data.searchStrategy,
			deliverables: data.deliverables,
			rubric: data.rubric,
			filePath: file.path
		};

		this.cache.plans.set(planId, plan);
		return plan;
	}

	private buildPlanContent(frontmatter: PlanFrontmatter, data: any): string {
		const yamlFrontmatter = this.stringifyYaml(frontmatter);
		
		return `---
${yamlFrontmatter}---

# Deep Research Plan: ${data.title}

## Research Question

**Primary Question**: ${data.subQuestions[0] || ''}

**Refined Thesis**: ${data.thesis}

## Sub-Questions

${data.subQuestions.map((q: string, i: number) => `${i + 1}. ${q}`).join('\n')}

## Search Strategy

### Priority Source Types
${data.searchStrategy.sourceTypes?.map((type: string) => `- ${type}`).join('\n') || ''}

### Quality Filters
- Minimum sample size > 50 (for quantitative studies)
- Effect sizes reported
- Limitations and potential confounds acknowledged

### Diversity Requirements
${data.searchStrategy.diversityRequirements?.map((req: string) => `- ${req}`).join('\n') || ''}

## Deliverables

${data.deliverables.map((deliverable: string) => `- ${deliverable}`).join('\n')}

## Quality Rubric

${data.rubric}

## Execution Plan

- [ ] Literature search phase
- [ ] Source evaluation and quality assessment
- [ ] Synthesis and analysis
- [ ] Output generation

## Timeline

- **Estimated Duration**: TBD
- **Target Completion**: TBD
- **Review Date**: TBD`;
	}

	async getPlans(filters?: any): Promise<Plan[]> {
		await this.refreshPlansCache();
		
		let plans = Array.from(this.cache.plans.values());

		if (filters) {
			if (filters.topic) {
				plans = plans.filter(plan => plan.frontmatter.topic === filters.topic);
			}
			if (filters.status) {
				plans = plans.filter(plan => plan.frontmatter.status === filters.status);
			}
		}

		return plans.sort((a, b) => {
			const dateA = a.frontmatter.created || '';
			const dateB = b.frontmatter.created || '';
			return dateB.localeCompare(dateA);
		});
	}

	private async updatePlanCache(file: TFile, content: string, frontmatter: PlanFrontmatter): Promise<void> {
		const planId = this.getFileId(file);
		const bodyContent = this.extractBodyContent(content);
		
		const lines = bodyContent.split('\n');
		const titleMatch = lines.find(line => line.startsWith('# Deep Research Plan:'))?.replace('# Deep Research Plan:', '').trim();
		
		// Parse thesis
		const thesisLine = lines.find(line => line.includes('**Refined Thesis**:'));
		const thesis = thesisLine?.split('**Refined Thesis**:')[1]?.trim() || '';

		// Parse sub-questions
		const subQuestionStart = lines.findIndex(line => line.trim() === '## Sub-Questions') + 1;
		const subQuestionEnd = lines.findIndex((line, index) => index > subQuestionStart && line.startsWith('##'));
		const subQuestions = lines.slice(subQuestionStart, subQuestionEnd === -1 ? lines.length : subQuestionEnd)
			.filter(line => /^\d+\./.test(line.trim()))
			.map(line => line.replace(/^\d+\.\s*/, '').trim());

		const plan: Plan = {
			id: planId,
			frontmatter,
			title: titleMatch || 'Untitled Plan',
			thesis,
			subQuestions,
			searchStrategy: {
				sourceTypes: [],
				qualityFilters: []
			},
			deliverables: frontmatter.deliverables || [],
			rubric: '',
			filePath: file.path
		};

		this.cache.plans.set(planId, plan);
	}

	// Topic Management
	async createTopic(data: {
		title: string;
		slug: string;
		description: string;
		tags?: string[];
	}): Promise<Topic> {
		const topicId = data.slug;
		const fileName = `${data.slug}.md`;
		const filePath = normalizePath(`${this.settings.topicsPath}/${fileName}`);

		const frontmatter: TopicFrontmatter = {
			type: 'topic',
			slug: data.slug,
			title: data.title,
			status: 'active',
			created: new Date().toISOString().split('T')[0],
			tags: data.tags || [],
			description: data.description
		};

		const content = this.buildTopicContent(frontmatter, data);
		
		await this.ensureFolderExists(this.settings.topicsPath);
		const file = await this.app.vault.create(filePath, content);

		const topic: Topic = {
			id: topicId,
			frontmatter,
			title: data.title,
			description: data.description,
			seeds: [],
			plans: [],
			reports: [],
			sources: [],
			filePath: file.path
		};

		this.cache.topics.set(topicId, topic);
		return topic;
	}

	private buildTopicContent(frontmatter: TopicFrontmatter, data: any): string {
		const yamlFrontmatter = this.stringifyYaml(frontmatter);
		
		return `---
${yamlFrontmatter}---

# Topic Hub: ${data.title}

## Overview

${data.description}

## Research Questions

### Primary Questions
- 

### Secondary Questions
- 

## Active Research

### Current Plans
*Links to active research plans will appear here*

### Recent Reports
*Links to completed research reports will appear here*

## Knowledge Base

### Source Notes
\`\`\`dataview
TABLE title as "Title", authors as "Authors", year as "Year", quality as "Quality"
FROM "02_Research/Sources"
WHERE contains(file.frontmatter.topic, "${data.slug}")
SORT quality DESC, year DESC
\`\`\`

### Key Claims
*Major findings and assertions with source support*

## Research Gaps

### Identified Gaps
- 

### Priority Areas
- 

## Next Steps

- [ ] Review pending seeds
- [ ] Execute planned research
- [ ] Update knowledge base`;
	}

	async getTopics(): Promise<Topic[]> {
		await this.refreshTopicsCache();
		return Array.from(this.cache.topics.values())
			.sort((a, b) => a.title.localeCompare(b.title));
	}

	private async updateTopicCache(file: TFile, content: string, frontmatter: TopicFrontmatter): Promise<void> {
		const topicId = frontmatter.slug;
		
		const topic: Topic = {
			id: topicId,
			frontmatter,
			title: frontmatter.title,
			description: frontmatter.description || '',
			seeds: [],
			plans: [],
			reports: [],
			sources: [],
			filePath: file.path
		};

		this.cache.topics.set(topicId, topic);
	}

	// Cache management
	async refreshCache(): Promise<void> {
		await Promise.all([
			this.refreshSeedsCache(),
			this.refreshPlansCache(),
			this.refreshTopicsCache(),
			this.refreshReportsCache(),
			this.refreshSourcesCache()
		]);
		this.lastCacheUpdate = Date.now();
	}

	private async refreshSeedsCache(): Promise<void> {
		const seedsFolder = this.app.vault.getAbstractFileByPath(this.settings.seedsPath);
		if (!(seedsFolder instanceof TFolder)) return;

		for (const file of seedsFolder.children) {
			if (file instanceof TFile && file.extension === 'md') {
				try {
					const content = await this.app.vault.read(file);
					const frontmatter = this.parseFrontmatter(content);
					if (frontmatter?.type === 'seed') {
						await this.updateSeedCache(file, content, frontmatter);
					}
				} catch (error) {
					console.error(`Error processing seed file ${file.path}:`, error);
				}
			}
		}
	}

	private async refreshPlansCache(): Promise<void> {
		const plansFolder = this.app.vault.getAbstractFileByPath(this.settings.plansPath);
		if (!(plansFolder instanceof TFolder)) return;

		for (const file of plansFolder.children) {
			if (file instanceof TFile && file.extension === 'md') {
				try {
					const content = await this.app.vault.read(file);
					const frontmatter = this.parseFrontmatter(content);
					if (frontmatter?.type === 'dr-plan') {
						await this.updatePlanCache(file, content, frontmatter);
					}
				} catch (error) {
					console.error(`Error processing plan file ${file.path}:`, error);
				}
			}
		}
	}

	private async refreshTopicsCache(): Promise<void> {
		const topicsFolder = this.app.vault.getAbstractFileByPath(this.settings.topicsPath);
		if (!(topicsFolder instanceof TFolder)) return;

		for (const file of topicsFolder.children) {
			if (file instanceof TFile && file.extension === 'md') {
				try {
					const content = await this.app.vault.read(file);
					const frontmatter = this.parseFrontmatter(content);
					if (frontmatter?.type === 'topic') {
						await this.updateTopicCache(file, content, frontmatter);
					}
				} catch (error) {
					console.error(`Error processing topic file ${file.path}:`, error);
				}
			}
		}
	}

	// Stub methods for reports and sources - will be implemented later
	async getReports(filters?: any): Promise<Report[]> {
		return [];
	}

	async getSources(filters?: any): Promise<SourceNote[]> {
		return [];
	}

	private async refreshReportsCache(): Promise<void> {
		// TODO: Implement
	}

	private async refreshSourcesCache(): Promise<void> {
		// TODO: Implement
	}

	// Utility methods
	private generateId(): string {
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
	}

	private stringifyYaml(obj: any): string {
		// Simple YAML stringifier - in production, use a proper library
		let result = '';
		
		for (const [key, value] of Object.entries(obj)) {
			if (Array.isArray(value)) {
				result += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
			} else if (typeof value === 'string') {
				result += `${key}: "${value}"\n`;
			} else {
				result += `${key}: ${value}\n`;
			}
		}
		
		return result.trim();
	}

	private async ensureFolderExists(folderPath: string): Promise<void> {
		const normalizedPath = normalizePath(folderPath);
		const existingFolder = this.app.vault.getAbstractFileByPath(normalizedPath);
		
		if (!existingFolder) {
			await this.app.vault.createFolder(normalizedPath);
		}
	}

	private extractBodyContent(content: string): string {
		const lines = content.split('\n');
		const frontmatterEnd = lines.indexOf('---', 1);
		if (frontmatterEnd === -1) return content;
		return lines.slice(frontmatterEnd + 1).join('\n');
	}

	private updateFrontmatter(content: string, updates: any): string {
		const lines = content.split('\n');
		const frontmatterStart = lines.indexOf('---');
		const frontmatterEnd = lines.indexOf('---', 1);
		
		if (frontmatterStart === -1 || frontmatterEnd === -1) {
			return content;
		}

		const frontmatterText = lines.slice(frontmatterStart + 1, frontmatterEnd).join('\n');
		let frontmatter: any;
		
		try {
			// Use the same simple parsing as above
			const lines = frontmatterText.split('\n');
			frontmatter = {} as any;
			
			lines.forEach(line => {
				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
					
					if (value.startsWith('[') && value.endsWith(']')) {
						frontmatter[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
					} else {
						frontmatter[key] = value;
					}
				}
			});
		} catch (error) {
			console.error('Error parsing frontmatter for update:', error);
			return content;
		}

		// Apply updates
		Object.assign(frontmatter, updates);

		// Rebuild content
		const newFrontmatterText = this.stringifyYaml(frontmatter);
		const newLines = [
			'---',
			...newFrontmatterText.split('\n'),
			'---',
			...lines.slice(frontmatterEnd + 1)
		];

		return newLines.join('\n');
	}
}