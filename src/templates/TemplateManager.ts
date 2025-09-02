import { App, TFile, TFolder, normalizePath } from 'obsidian';
import { DeepResearchSettings } from '../types';

export class TemplateManager {
	private app: App;
	private settings: DeepResearchSettings;
	private templateCache: Map<string, string> = new Map();

	constructor(app: App, settings: DeepResearchSettings) {
		this.app = app;
		this.settings = settings;
	}

	async loadTemplate(templateName: string): Promise<string> {
		if (this.templateCache.has(templateName)) {
			return this.templateCache.get(templateName)!;
		}

		const templatePath = normalizePath(`${this.settings.templatesPath}/${templateName}`);
		const templateFile = this.app.vault.getAbstractFileByPath(templatePath);

		if (templateFile instanceof TFile) {
			const content = await this.app.vault.read(templateFile);
			this.templateCache.set(templateName, content);
			return content;
		}

		// Fallback to built-in templates if user template doesn't exist
		const builtInTemplate = this.getBuiltInTemplate(templateName);
		if (builtInTemplate) {
			this.templateCache.set(templateName, builtInTemplate);
			return builtInTemplate;
		}

		throw new Error(`Template ${templateName} not found`);
	}

	async renderTemplate(templateName: string, variables: Record<string, any>): Promise<string> {
		const template = await this.loadTemplate(templateName);
		return this.substituteVariables(template, variables);
	}

	private substituteVariables(template: string, variables: Record<string, any>): string {
		let result = template;
		
		// Replace {{variable}} patterns
		for (const [key, value] of Object.entries(variables)) {
			const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
			result = result.replace(pattern, String(value));
		}

		// Add default values for common variables
		const now = new Date();
		const defaultVars = {
			date: now.toISOString().split('T')[0],
			datetime: now.toISOString(),
			timestamp: now.getTime().toString(),
		};

		for (const [key, value] of Object.entries(defaultVars)) {
			const pattern = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
			result = result.replace(pattern, value);
		}

		return result;
	}

	private getBuiltInTemplate(templateName: string): string | null {
		const templates: Record<string, string> = {
			'DR_Seed.md': `---
type: seed
topic: "{{topic}}"
status: captured
priority: medium
created: "{{date}}"
score: 0
verdict: ""
---

# Seed: {{title}}

## Spark

{{summary}}

## Initial Questions

- 

## Gatekeeper Assessment

- **Score**: 
- **Verdict**: 
- **Rationale**: 
- **Top Sub-topics**: 
  - 
`,

			'DR_Plan.md': `---
type: dr-plan
topic: "{{topic}}"
seed: "{{seed_note}}"
status: planned
created: "{{date}}"
deliverables: ["brief", "map", "table"]
---

# Deep Research Plan: {{title}}

## Research Question

**Primary Question**: {{research_question}}

**Refined Thesis**: {{thesis}}

## Sub-Questions

{{sub_questions}}

## Search Strategy

{{search_strategy}}

## Deliverables

- Executive Brief (800-1200 words)
- Concept Map (Mermaid diagram)  
- Intervention Table
- Source Notes with quality ratings

## Quality Rubric

- Minimum 15 sources, 10 peer-reviewed
- Every claim must link to source
- Quality ratings: Strong/Mixed/Weak
- Quote length ≤ 25 words
`,

			'DR_Report.md': `---
type: dr-report
topic: "{{topic}}"
plan: "{{plan_note}}"
run_id: "{{run_id}}"
status: complete
created: "{{date}}"
sources: []
---

# Deep Research Report: {{title}}

## Executive Brief

{{brief}}

## Key Claims

{{claims}}

## Concept Map

\`\`\`mermaid
{{concept_map}}
\`\`\`

## Intervention Table

{{intervention_table}}

## Sources

{{sources}}
`,

			'DR_SourceNote.md': `---
type: source
id: "{{source_id}}"
title: "{{title}}"
authors: [{{authors}}]
year: {{year}}
quality: "{{quality}}"
created: "{{date}}"
---

# {{title}}

## TL;DR

- **One Sentence**: {{one_sentence}}
- **Key Points**: {{key_points}}
- **Summary**: {{summary}}

## Methods

{{methods}}

## Findings

{{findings}}

## Clinical Relevance

{{clinical_relevance}}

## Quotes

{{quotes}}
`,

			'Topic_Hub.md': `---
type: topic
slug: "{{slug}}"
title: "{{title}}"
status: active
created: "{{date}}"
---

# Topic Hub: {{title}}

## Overview

{{description}}

## Research Questions

{{research_questions}}

## Sources

{{sources}}

## Reports

{{reports}}
`
		};

		return templates[templateName] || null;
	}

	async createTemplateFiles(): Promise<void> {
		const templatesFolder = this.settings.templatesPath;
		
		// Ensure templates folder exists
		await this.ensureFolderExists(templatesFolder);

		// Create each template file if it doesn't exist
		const templateFiles = [
			'DR_Seed.md',
			'DR_Plan.md', 
			'DR_Report.md',
			'DR_SourceNote.md',
			'Topic_Hub.md'
		];

		for (const templateFile of templateFiles) {
			const templatePath = normalizePath(`${templatesFolder}/${templateFile}`);
			const existingFile = this.app.vault.getAbstractFileByPath(templatePath);
			
			if (!existingFile) {
				const builtInTemplate = this.getBuiltInTemplate(templateFile);
				if (builtInTemplate) {
					await this.app.vault.create(templatePath, builtInTemplate);
				}
			}
		}
	}

	private async ensureFolderExists(folderPath: string): Promise<void> {
		const normalizedPath = normalizePath(folderPath);
		const existingFolder = this.app.vault.getAbstractFileByPath(normalizedPath);
		
		if (!existingFolder) {
			await this.app.vault.createFolder(normalizedPath);
		}
	}

	clearCache(): void {
		this.templateCache.clear();
	}
}