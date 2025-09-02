// Constants for the Deep Research Assistant plugin

export const DEFAULT_SETTINGS = {
	// Paths
	seedsPath: '01_Inbox/Seeds',
	plansPath: '02_Research/Plans',
	reportsPath: '02_Research/Reports',
	sourcesPath: '02_Research/Sources',
	topicsPath: '02_Research/Topics',
	templatesPath: '00_System/Templates',
	
	// Omnivore integration
	omnivoreEnabled: false,
	omnivoreAutoSync: false,
	omnivoreSyncInterval: 60, // minutes
	
	// LLM providers
	defaultLLMProvider: 'ollama' as const,
	ollamaEndpoint: 'http://localhost:11434',
	
	// Deep Research MCP
	mcpEnabled: false,
	
	// Gatekeeper settings
	gatekeeperThreshold: 70,
	autoPromoteHighScore: false,
	
	// Auto-run settings
	autoRunPlans: false,
	autoRunThreshold: 80,
	
	// Refresh settings
	scheduledRefresh: false,
	refreshInterval: 7, // days
};

export const FRONTMATTER_TYPES = {
	TOPIC: 'topic',
	SEED: 'seed',
	PLAN: 'dr-plan',
	REPORT: 'dr-report',
	SOURCE: 'source',
} as const;

export const SEED_STATUSES = {
	CAPTURED: 'captured',
	SCORED: 'scored',
	PROMOTED: 'promoted',
	ARCHIVED: 'archived',
} as const;

export const PLAN_STATUSES = {
	PLANNED: 'planned',
	RUNNING: 'running',
	COMPLETED: 'completed',
	FAILED: 'failed',
} as const;

export const TOPIC_STATUSES = {
	ACTIVE: 'active',
	ARCHIVED: 'archived',
	PAUSED: 'paused',
} as const;

export const QUALITY_RATINGS = {
	STRONG: 'strong',
	MIXED: 'mixed',
	WEAK: 'weak',
} as const;

export const PRIORITY_LEVELS = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
} as const;

export const GATEKEEPER_VERDICTS = {
	DEEP_RESEARCH: 'deep-research',
	LIGHT_SCAN: 'light-scan',
	ARCHIVE: 'archive',
} as const;

export const JOB_STATUSES = {
	QUEUED: 'queued',
	RUNNING: 'running',
	COMPLETED: 'completed',
	FAILED: 'failed',
} as const;

export const TEMPLATE_FILES = {
	SEED: 'DR_Seed.md',
	PLAN: 'DR_Plan.md',
	REPORT: 'DR_Report.md',
	SOURCE_NOTE: 'DR_SourceNote.md',
	TOPIC_HUB: 'Topic_Hub.md',
} as const;

export const DEFAULT_DELIVERABLES = [
	'Executive Brief (800-1200 words)',
	'Concept Map (Mermaid diagram)',
	'Intervention Table',
	'Source Notes with quality ratings',
];

export const DEFAULT_SEARCH_STRATEGY = {
	sourceTypes: [
		'peer-reviewed journals',
		'meta-analyses',
		'systematic reviews',
		'clinical handbooks',
		'reputable organizations',
	],
	qualityFilters: [
		'minimum sample size > 50',
		'effect sizes reported',
		'limitations acknowledged',
		'potential confounds addressed',
	],
	diversityRequirements: [
		'multiple theoretical frameworks',
		'cross-cultural perspectives',
		'neurodivergent considerations',
	],
};

export const GATEKEEPER_PROMPT = `You are evaluating whether a research seed deserves deep research. Consider:

1. **Novelty**: How original or underexplored is this topic?
2. **Clinical Value**: How useful would this be for therapeutic practice?
3. **Research Readiness**: Is there sufficient literature to research?
4. **Synthesis Potential**: Can this lead to actionable insights?
5. **Personal Relevance**: How well does this align with the researcher's interests?

Score from 0-100 and provide verdict:
- 80-100: deep-research (comprehensive investigation warranted)
- 50-79: light-scan (basic review sufficient)
- 0-49: archive (not worth pursuing now)

Format your response as:
Score: [number]
Verdict: [deep-research/light-scan/archive]
Rationale: [2-3 sentences explaining your scoring]
Top sub-topics: [3-5 specific areas to explore]`;

export const PLAN_BUILDER_PROMPT = `Create a comprehensive research plan for this topic. Include:

1. **Refined Thesis**: A 1-2 sentence testable proposition
2. **Sub-Questions**: 5-9 specific questions covering:
   - Definitions and distinctions
   - Causal mechanisms
   - Measurement approaches
   - Intervention strategies
   - Individual differences/moderators
   - Contradictory evidence

3. **Search Strategy**: Specify source priorities, quality filters, and diversity requirements

4. **Deliverables**: Executive brief, concept map, intervention table format

5. **Quality Rubric**: Minimum evidence standards and citation requirements`;

export const REPORT_SECTIONS = {
	EXECUTIVE_BRIEF: '## Executive Brief',
	KEY_CLAIMS: '## Key Claims',
	CONCEPT_MAP: '## Concept Map',
	INTERVENTION_TABLE: '## Intervention Table',
	SOURCES: '## Sources',
	LIMITATIONS: '## Limitations & Uncertainties',
	CHANGELOG: '## Change Log',
} as const;