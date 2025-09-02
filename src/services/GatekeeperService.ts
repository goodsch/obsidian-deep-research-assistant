import { Seed } from '../types';
import { GATEKEEPER_PROMPT, GATEKEEPER_VERDICTS } from '../constants';
import { LLMService } from './LLMService';

export interface GatekeeperAssessment {
	score: number;
	verdict: 'deep-research' | 'light-scan' | 'archive';
	rationale: string;
	topSubTopics: string[];
	novelty: number;
	clinicalValue: number;
	researchReadiness: number;
	synthesisPotential: number;
	personalRelevance: number;
}

export class GatekeeperService {
	private llmService: LLMService;

	constructor(llmService: LLMService) {
		this.llmService = llmService;
	}

	async scoreSeed(seed: Seed): Promise<GatekeeperAssessment> {
		const prompt = this.buildGatekeeperPrompt(seed);
		
		try {
			const response = await this.llmService.generateText(prompt, {
				temperature: 0.3,
				maxTokens: 500
			});

			return this.parseGatekeeperResponse(response);
		} catch (error) {
			console.error('Error in gatekeeper scoring:', error);
			throw new Error('Failed to score seed. Please check your LLM configuration.');
		}
	}

	private buildGatekeeperPrompt(seed: Seed): string {
		return `${GATEKEEPER_PROMPT}

**Research Seed to Evaluate:**

**Title:** ${seed.title}
**Topic:** ${seed.frontmatter.topic || 'Unspecified'}
**Summary:** ${seed.summary}
**Initial Questions:**
${seed.questions?.map(q => `- ${q}`).join('\n') || 'No specific questions provided'}
**Priority Level:** ${seed.frontmatter.priority}

**Context:**
This seed is being evaluated for potential deep research in a therapeutic/clinical context. The researcher is particularly interested in evidence-based practices and theories that can be applied in therapy.

Please evaluate this seed based on the five criteria and provide your assessment in the following format:

**Scoring Breakdown:**
- Novelty (0-20): [score] - [brief explanation]
- Clinical Value (0-20): [score] - [brief explanation]  
- Research Readiness (0-20): [score] - [brief explanation]
- Synthesis Potential (0-20): [score] - [brief explanation]
- Personal Relevance (0-20): [score] - [brief explanation]

**Overall Assessment:**
Score: [total score out of 100]
Verdict: [deep-research/light-scan/archive]
Rationale: [2-3 sentences explaining your scoring decision]

**Research Directions:**
Top sub-topics to explore:
1. [specific area]
2. [specific area]  
3. [specific area]
4. [specific area]
5. [specific area]`;
	}

	private parseGatekeeperResponse(response: string): GatekeeperAssessment {
		// Initialize default assessment
		let assessment: GatekeeperAssessment = {
			score: 0,
			verdict: 'archive',
			rationale: 'Unable to parse response',
			topSubTopics: [],
			novelty: 0,
			clinicalValue: 0,
			researchReadiness: 0,
			synthesisPotential: 0,
			personalRelevance: 0
		};

		try {
			// Parse scoring breakdown
			const noveltyMatch = response.match(/Novelty \(0-20\):\s*(\d+)/i);
			if (noveltyMatch) assessment.novelty = parseInt(noveltyMatch[1]);

			const clinicalMatch = response.match(/Clinical Value \(0-20\):\s*(\d+)/i);
			if (clinicalMatch) assessment.clinicalValue = parseInt(clinicalMatch[1]);

			const readinessMatch = response.match(/Research Readiness \(0-20\):\s*(\d+)/i);
			if (readinessMatch) assessment.researchReadiness = parseInt(readinessMatch[1]);

			const synthesisMatch = response.match(/Synthesis Potential \(0-20\):\s*(\d+)/i);
			if (synthesisMatch) assessment.synthesisPotential = parseInt(synthesisMatch[1]);

			const relevanceMatch = response.match(/Personal Relevance \(0-20\):\s*(\d+)/i);
			if (relevanceMatch) assessment.personalRelevance = parseInt(relevanceMatch[1]);

			// Parse overall score
			const scoreMatch = response.match(/Score:\s*(\d+)/i);
			if (scoreMatch) {
				assessment.score = parseInt(scoreMatch[1]);
			} else {
				// Calculate from breakdown if available
				assessment.score = assessment.novelty + assessment.clinicalValue + 
					assessment.researchReadiness + assessment.synthesisPotential + 
					assessment.personalRelevance;
			}

			// Parse verdict
			const verdictMatch = response.match(/Verdict:\s*(deep-research|light-scan|archive)/i);
			if (verdictMatch) {
				assessment.verdict = verdictMatch[1].toLowerCase() as 'deep-research' | 'light-scan' | 'archive';
			} else {
				// Determine verdict from score
				if (assessment.score >= 80) {
					assessment.verdict = 'deep-research';
				} else if (assessment.score >= 50) {
					assessment.verdict = 'light-scan';
				} else {
					assessment.verdict = 'archive';
				}
			}

			// Parse rationale
			const rationaleMatch = response.match(/Rationale:\s*([^\n]+(?:\n[^\n]+)*?)(?=\n\n|\n\*|$)/i);
			if (rationaleMatch) {
				assessment.rationale = rationaleMatch[1].trim();
			}

			// Parse top sub-topics
			const topicsSection = response.match(/Top sub-topics to explore:(.*?)(?=\n\n|$)/is);
			if (topicsSection) {
				const topicLines = topicsSection[1].split('\n')
					.map(line => line.trim())
					.filter(line => line.match(/^\d+\.\s+/))
					.map(line => line.replace(/^\d+\.\s+/, ''))
					.slice(0, 5);
				assessment.topSubTopics = topicLines;
			}

			// Fallback topic generation if none found
			if (assessment.topSubTopics.length === 0) {
				assessment.topSubTopics = this.generateFallbackTopics(assessment);
			}

		} catch (error) {
			console.error('Error parsing gatekeeper response:', error);
			// Return a basic assessment with error indication
			assessment.rationale = 'Error parsing LLM response. Manual review recommended.';
		}

		// Validate and constrain values
		assessment.score = Math.max(0, Math.min(100, assessment.score));
		assessment.novelty = Math.max(0, Math.min(20, assessment.novelty));
		assessment.clinicalValue = Math.max(0, Math.min(20, assessment.clinicalValue));
		assessment.researchReadiness = Math.max(0, Math.min(20, assessment.researchReadiness));
		assessment.synthesisPotential = Math.max(0, Math.min(20, assessment.synthesisPotential));
		assessment.personalRelevance = Math.max(0, Math.min(20, assessment.personalRelevance));

		return assessment;
	}

	private generateFallbackTopics(assessment: GatekeeperAssessment): string[] {
		// Generate generic research topics based on the verdict and score
		if (assessment.verdict === 'deep-research') {
			return [
				'Theoretical foundations and definitions',
				'Empirical measurement approaches',
				'Intervention development and testing',
				'Individual differences and moderators',
				'Clinical applications and effectiveness'
			];
		} else if (assessment.verdict === 'light-scan') {
			return [
				'Current theoretical understanding',
				'Available assessment tools',
				'Preliminary intervention studies'
			];
		} else {
			return [
				'Basic definitional clarity',
				'Initial empirical evidence'
			];
		}
	}

	// Batch scoring for multiple seeds
	async scoreSeeds(seeds: Seed[]): Promise<Map<string, GatekeeperAssessment>> {
		const results = new Map<string, GatekeeperAssessment>();
		
		// Process seeds in parallel but limit concurrency to avoid rate limits
		const concurrentLimit = 3;
		const batches = [];
		
		for (let i = 0; i < seeds.length; i += concurrentLimit) {
			batches.push(seeds.slice(i, i + concurrentLimit));
		}

		for (const batch of batches) {
			const promises = batch.map(async (seed) => {
				try {
					const assessment = await this.scoreSeed(seed);
					results.set(seed.id, assessment);
				} catch (error) {
					console.error(`Error scoring seed ${seed.id}:`, error);
					// Add a fallback assessment
					results.set(seed.id, {
						score: 0,
						verdict: 'archive',
						rationale: 'Scoring failed - manual review required',
						topSubTopics: [],
						novelty: 0,
						clinicalValue: 0,
						researchReadiness: 0,
						synthesisPotential: 0,
						personalRelevance: 0
					});
				}
			});

			await Promise.all(promises);
			
			// Brief delay between batches to be respectful of API limits
			if (batches.indexOf(batch) < batches.length - 1) {
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}

		return results;
	}

	// Quality check for assessments
	validateAssessment(assessment: GatekeeperAssessment): { isValid: boolean; issues: string[] } {
		const issues: string[] = [];

		// Check score consistency
		const calculatedScore = assessment.novelty + assessment.clinicalValue + 
			assessment.researchReadiness + assessment.synthesisPotential + 
			assessment.personalRelevance;
		
		if (Math.abs(calculatedScore - assessment.score) > 5) {
			issues.push('Score inconsistent with breakdown components');
		}

		// Check verdict alignment with score
		if (assessment.verdict === 'deep-research' && assessment.score < 70) {
			issues.push('Verdict "deep-research" but score below typical threshold');
		} else if (assessment.verdict === 'light-scan' && (assessment.score < 40 || assessment.score >= 80)) {
			issues.push('Verdict "light-scan" but score outside typical range');
		} else if (assessment.verdict === 'archive' && assessment.score > 60) {
			issues.push('Verdict "archive" but score above typical threshold');
		}

		// Check rationale quality
		if (!assessment.rationale || assessment.rationale.length < 20) {
			issues.push('Rationale too brief or missing');
		}

		// Check sub-topics
		if (assessment.topSubTopics.length === 0) {
			issues.push('No sub-topics identified');
		}

		return {
			isValid: issues.length === 0,
			issues
		};
	}

	// Analytics and insights
	getAssessmentStats(assessments: GatekeeperAssessment[]): {
		averageScore: number;
		verdictDistribution: Record<string, number>;
		topCriteria: string[];
		commonTopics: string[];
	} {
		if (assessments.length === 0) {
			return {
				averageScore: 0,
				verdictDistribution: {},
				topCriteria: [],
				commonTopics: []
			};
		}

		const averageScore = assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length;
		
		const verdictCounts = assessments.reduce((counts, a) => {
			counts[a.verdict] = (counts[a.verdict] || 0) + 1;
			return counts;
		}, {} as Record<string, number>);

		// Find which criteria tend to score highest
		const criteriaScores = {
			novelty: assessments.reduce((sum, a) => sum + a.novelty, 0) / assessments.length,
			clinicalValue: assessments.reduce((sum, a) => sum + a.clinicalValue, 0) / assessments.length,
			researchReadiness: assessments.reduce((sum, a) => sum + a.researchReadiness, 0) / assessments.length,
			synthesisPotential: assessments.reduce((sum, a) => sum + a.synthesisPotential, 0) / assessments.length,
			personalRelevance: assessments.reduce((sum, a) => sum + a.personalRelevance, 0) / assessments.length
		};

		const topCriteria = Object.entries(criteriaScores)
			.sort(([,a], [,b]) => b - a)
			.map(([criterion]) => criterion);

		// Find most common topics
		const allTopics = assessments.flatMap(a => a.topSubTopics);
		const topicCounts = allTopics.reduce((counts, topic) => {
			counts[topic] = (counts[topic] || 0) + 1;
			return counts;
		}, {} as Record<string, number>);

		const commonTopics = Object.entries(topicCounts)
			.sort(([,a], [,b]) => b - a)
			.slice(0, 10)
			.map(([topic]) => topic);

		return {
			averageScore,
			verdictDistribution: verdictCounts,
			topCriteria,
			commonTopics
		};
	}
}