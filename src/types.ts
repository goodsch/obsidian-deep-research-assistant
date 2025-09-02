// Core data models for the Deep Research Assistant plugin

export interface BaseFrontmatter {
	type: string;
	created?: string;
	modified?: string;
}

export interface TopicFrontmatter extends BaseFrontmatter {
	type: 'topic';
	slug: string;
	title: string;
	status: 'active' | 'archived' | 'paused';
	tags?: string[];
	description?: string;
}

export interface SeedFrontmatter extends BaseFrontmatter {
	type: 'seed';
	topic?: string;
	status: 'captured' | 'scored' | 'promoted' | 'archived';
	priority: 'low' | 'medium' | 'high';
	score?: number;
	verdict?: 'deep-research' | 'light-scan' | 'archive';
}

export interface PlanFrontmatter extends BaseFrontmatter {
	type: 'dr-plan';
	topic: string;
	seed?: string;
	status: 'planned' | 'running' | 'completed' | 'failed';
	deliverables: string[];
	run_id?: string;
}

export interface ReportFrontmatter extends BaseFrontmatter {
	type: 'dr-report';
	topic: string;
	plan: string;
	run_id: string;
	status: 'complete' | 'partial' | 'failed';
	sources: string[];
	claims_count?: number;
	quality_score?: number;
}

export interface SourceNoteFrontmatter extends BaseFrontmatter {
	type: 'source';
	id: string;
	title: string;
	authors?: string[];
	year?: number;
	pub?: string;
	doi?: string;
	url?: string;
	quality: 'strong' | 'mixed' | 'weak';
	supports_claims?: string[];
	notes_from?: string;
}

// Research workflow interfaces
export interface Seed {
	id: string;
	frontmatter: SeedFrontmatter;
	title: string;
	summary: string;
	questions?: string[];
	filePath: string;
}

export interface Plan {
	id: string;
	frontmatter: PlanFrontmatter;
	title: string;
	thesis: string;
	subQuestions: string[];
	searchStrategy: SearchStrategy;
	deliverables: string[];
	rubric: string;
	filePath: string;
}

export interface SearchStrategy {
	sourceTypes: string[];
	qualityFilters: string[];
	recencyWindow?: string;
	minSources?: number;
	diversityRequirements?: string[];
}

export interface ResearchJob {
	id: string;
	planId: string;
	status: 'queued' | 'running' | 'completed' | 'failed';
	startTime?: Date;
	endTime?: Date;
	progress?: number;
	logs: JobLog[];
	artifacts?: ResearchArtifacts;
}

export interface JobLog {
	timestamp: Date;
	level: 'info' | 'warn' | 'error';
	message: string;
	details?: any;
}

export interface ResearchArtifacts {
	brief: string;
	conceptMap?: string;
	interventionTable?: InterventionEntry[];
	citations: Citation[];
}

export interface InterventionEntry {
	protocol: string;
	target: string;
	evidence: string;
	rct: boolean;
	duration: string;
	notes: string;
}

export interface Citation {
	id: string;
	title: string;
	authors: string[];
	year: number;
	publication: string;
	doi?: string;
	url?: string;
	abstract?: string;
	relevanceScore: number;
	qualityRating: 'strong' | 'mixed' | 'weak';
	keyFindings: string[];
}

export interface Topic {
	id: string;
	frontmatter: TopicFrontmatter;
	title: string;
	description: string;
	seeds: Seed[];
	plans: Plan[];
	reports: Report[];
	sources: SourceNote[];
	filePath: string;
}

export interface Report {
	id: string;
	frontmatter: ReportFrontmatter;
	title: string;
	brief: string;
	claims: Claim[];
	conceptMap?: string;
	interventions?: InterventionEntry[];
	sources: SourceNote[];
	filePath: string;
}

export interface Claim {
	id: string;
	text: string;
	sourceIds: string[];
	confidence: 'high' | 'medium' | 'low';
	contradictions?: string[];
}

export interface SourceNote {
	id: string;
	frontmatter: SourceNoteFrontmatter;
	title: string;
	tldr: {
		oneSentence: string;
		bullets: string[];
		paragraph: string;
	};
	methods?: string;
	findings: string[];
	clinicalRelevance?: string;
	quotes: Quote[];
	filePath: string;
}

export interface Quote {
	text: string;
	page?: string;
	context?: string;
}

// Plugin settings
export interface DeepResearchSettings {
	// Paths
	seedsPath: string;
	plansPath: string;
	reportsPath: string;
	sourcesPath: string;
	topicsPath: string;
	templatesPath: string;
	
	// Omnivore integration
	omnivoreApiKey?: string;
	omnivoreEnabled: boolean;
	omnivoreAutoSync: boolean;
	omnivoreSyncInterval: number; // minutes
	
	// LLM providers
	defaultLLMProvider: 'openai' | 'anthropic' | 'ollama' | 'local';
	openaiApiKey?: string;
	anthropicApiKey?: string;
	ollamaEndpoint?: string;
	localEndpoint?: string;
	
	// Deep Research MCP
	mcpEnabled: boolean;
	mcpServerUrl?: string;
	mcpApiKey?: string;
	
	// Gatekeeper settings
	gatekeeperThreshold: number;
	autoPromoteHighScore: boolean;
	
	// Auto-run settings
	autoRunPlans: boolean;
	autoRunThreshold: number;
	
	// Refresh settings
	scheduledRefresh: boolean;
	refreshInterval: number; // days
}

// UI State
export interface ResearchConsoleState {
	activeTab: 'seeds' | 'plans' | 'runs' | 'sources' | 'claims';
	filters: {
		topic?: string;
		status?: string;
		score?: number;
		dateRange?: [Date, Date];
	};
	selectedItems: string[];
}

// Adapter interfaces
export interface LLMAdapter {
	name: string;
	generateText(prompt: string, options?: any): Promise<string>;
	isAvailable(): Promise<boolean>;
}

export interface DeepResearchAdapter {
	name: string;
	executeResearch(plan: Plan): Promise<ResearchArtifacts>;
	isAvailable(): Promise<boolean>;
}

export interface OmnivoreAdapter {
	syncHighlights(since?: Date): Promise<SourceNote[]>;
	isAvailable(): Promise<boolean>;
}