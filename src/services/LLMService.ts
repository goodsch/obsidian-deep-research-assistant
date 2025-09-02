import { DeepResearchSettings, LLMAdapter } from '../types';
import { requestUrl, RequestUrlParam } from 'obsidian';

export class LLMService {
	private settings: DeepResearchSettings;
	private adapters: Map<string, LLMAdapter> = new Map();

	constructor(settings: DeepResearchSettings) {
		this.settings = settings;
		this.initializeAdapters();
	}

	private initializeAdapters(): void {
		// Initialize available LLM adapters
		this.adapters.set('ollama', new OllamaAdapter(this.settings));
		this.adapters.set('openai', new OpenAIAdapter(this.settings));
		this.adapters.set('anthropic', new AnthropicAdapter(this.settings));
		this.adapters.set('local', new LocalLLMAdapter(this.settings));
	}

	async generateText(prompt: string, options?: {
		temperature?: number;
		maxTokens?: number;
		model?: string;
	}): Promise<string> {
		const adapter = this.adapters.get(this.settings.defaultLLMProvider);
		
		if (!adapter) {
			throw new Error(`LLM adapter '${this.settings.defaultLLMProvider}' not found`);
		}

		const isAvailable = await adapter.isAvailable();
		if (!isAvailable) {
			throw new Error(`LLM provider '${this.settings.defaultLLMProvider}' is not available. Please check your configuration.`);
		}

		return await adapter.generateText(prompt, options);
	}

	async generateSubQuestions(thesis: string, seedSummary: string, topic: string): Promise<string[]> {
		const prompt = `Based on the following research thesis and context, generate 6-9 specific sub-questions that would guide a comprehensive literature review. Organize them into these categories:

**Research Context:**
- Thesis: ${thesis}
- Topic: ${topic}
- Background: ${seedSummary}

Generate sub-questions covering these areas:

1. **Definitions & Distinctions** (1-2 questions)
2. **Causal Mechanisms** (1-2 questions)  
3. **Measurement & Assessment** (1-2 questions)
4. **Intervention Strategies** (1-2 questions)
5. **Individual Differences & Moderators** (1-2 questions)
6. **Contradictory Evidence & Limitations** (1 question)

Format your response as a simple numbered list:

1. [Definition question]
2. [Mechanism question]
3. [Assessment question]
4. [Intervention question]
5. [Individual differences question]
6. [Limitations question]
...

Each question should be:
- Specific and researchable
- Relevant to clinical/therapeutic practice
- Focused on empirical evidence
- Clear and actionable`;

		const response = await this.generateText(prompt, {
			temperature: 0.4,
			maxTokens: 600
		});

		return this.parseSubQuestions(response);
	}

	private parseSubQuestions(response: string): string[] {
		const lines = response.split('\n');
		const questions: string[] = [];

		for (const line of lines) {
			const trimmed = line.trim();
			// Match numbered list items (1., 2., etc.)
			const match = trimmed.match(/^\d+\.\s*(.+)$/);
			if (match) {
				questions.push(match[1].trim());
			}
		}

		// Ensure we have at least 6 questions
		while (questions.length < 6) {
			questions.push(`Additional research question needed for category ${questions.length + 1}`);
		}

		return questions.slice(0, 9); // Cap at 9 questions
	}

	updateSettings(settings: DeepResearchSettings): void {
		this.settings = settings;
		// Reinitialize adapters with new settings
		this.initializeAdapters();
	}

	async testConnection(provider?: string): Promise<{ success: boolean; message: string }> {
		const providerToTest = provider || this.settings.defaultLLMProvider;
		const adapter = this.adapters.get(providerToTest);

		if (!adapter) {
			return { success: false, message: `Adapter '${providerToTest}' not found` };
		}

		try {
			const isAvailable = await adapter.isAvailable();
			if (!isAvailable) {
				return { success: false, message: `Provider '${providerToTest}' is not available` };
			}

			// Test with a simple prompt
			const testResponse = await adapter.generateText('Respond with just "OK" if you can understand this message.', {
				maxTokens: 10
			});

			if (testResponse.toLowerCase().includes('ok')) {
				return { success: true, message: `Connection to ${providerToTest} successful` };
			} else {
				return { success: false, message: `Unexpected response from ${providerToTest}` };
			}
		} catch (error) {
			return { success: false, message: `Connection failed: ${error.message}` };
		}
	}
}

// Ollama Adapter
class OllamaAdapter implements LLMAdapter {
	name = 'ollama';
	private settings: DeepResearchSettings;

	constructor(settings: DeepResearchSettings) {
		this.settings = settings;
	}

	async generateText(prompt: string, options?: any): Promise<string> {
		const endpoint = this.settings.ollamaEndpoint || 'http://localhost:11434';
		
		const requestData: RequestUrlParam = {
			url: `${endpoint}/api/generate`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: options?.model || 'llama2',
				prompt: prompt,
				stream: false,
				options: {
					temperature: options?.temperature || 0.7,
					num_predict: options?.maxTokens || 800
				}
			})
		};

		const response = await requestUrl(requestData);
		const data = response.json;

		if (data.response) {
			return data.response;
		} else {
			throw new Error('Invalid response from Ollama');
		}
	}

	async isAvailable(): Promise<boolean> {
		try {
			const endpoint = this.settings.ollamaEndpoint || 'http://localhost:11434';
			const response = await requestUrl({
				url: `${endpoint}/api/version`,
				method: 'GET'
			});
			return response.status === 200;
		} catch (error) {
			return false;
		}
	}
}

// OpenAI Adapter
class OpenAIAdapter implements LLMAdapter {
	name = 'openai';
	private settings: DeepResearchSettings;

	constructor(settings: DeepResearchSettings) {
		this.settings = settings;
	}

	async generateText(prompt: string, options?: any): Promise<string> {
		if (!this.settings.openaiApiKey) {
			throw new Error('OpenAI API key not configured');
		}

		const requestData: RequestUrlParam = {
			url: 'https://api.openai.com/v1/chat/completions',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.settings.openaiApiKey}`
			},
			body: JSON.stringify({
				model: options?.model || 'gpt-3.5-turbo',
				messages: [
					{ role: 'user', content: prompt }
				],
				temperature: options?.temperature || 0.7,
				max_tokens: options?.maxTokens || 800
			})
		};

		const response = await requestUrl(requestData);
		const data = response.json;

		if (data.choices && data.choices[0] && data.choices[0].message) {
			return data.choices[0].message.content;
		} else {
			throw new Error('Invalid response from OpenAI');
		}
	}

	async isAvailable(): Promise<boolean> {
		return !!this.settings.openaiApiKey;
	}
}

// Anthropic Adapter
class AnthropicAdapter implements LLMAdapter {
	name = 'anthropic';
	private settings: DeepResearchSettings;

	constructor(settings: DeepResearchSettings) {
		this.settings = settings;
	}

	async generateText(prompt: string, options?: any): Promise<string> {
		if (!this.settings.anthropicApiKey) {
			throw new Error('Anthropic API key not configured');
		}

		const requestData: RequestUrlParam = {
			url: 'https://api.anthropic.com/v1/messages',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': this.settings.anthropicApiKey,
				'anthropic-version': '2023-06-01'
			},
			body: JSON.stringify({
				model: options?.model || 'claude-3-sonnet-20240229',
				max_tokens: options?.maxTokens || 800,
				temperature: options?.temperature || 0.7,
				messages: [
					{ role: 'user', content: prompt }
				]
			})
		};

		const response = await requestUrl(requestData);
		const data = response.json;

		if (data.content && data.content[0] && data.content[0].text) {
			return data.content[0].text;
		} else {
			throw new Error('Invalid response from Anthropic');
		}
	}

	async isAvailable(): Promise<boolean> {
		return !!this.settings.anthropicApiKey;
	}
}

// Local LLM Adapter (for custom endpoints)
class LocalLLMAdapter implements LLMAdapter {
	name = 'local';
	private settings: DeepResearchSettings;

	constructor(settings: DeepResearchSettings) {
		this.settings = settings;
	}

	async generateText(prompt: string, options?: any): Promise<string> {
		if (!this.settings.localEndpoint) {
			throw new Error('Local LLM endpoint not configured');
		}

		// This is a generic adapter that assumes an OpenAI-compatible API
		const requestData: RequestUrlParam = {
			url: `${this.settings.localEndpoint}/v1/completions`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: prompt,
				temperature: options?.temperature || 0.7,
				max_tokens: options?.maxTokens || 800
			})
		};

		const response = await requestUrl(requestData);
		const data = response.json;

		if (data.choices && data.choices[0] && data.choices[0].text) {
			return data.choices[0].text;
		} else {
			throw new Error('Invalid response from local LLM');
		}
	}

	async isAvailable(): Promise<boolean> {
		try {
			if (!this.settings.localEndpoint) return false;
			
			const response = await requestUrl({
				url: `${this.settings.localEndpoint}/v1/models`,
				method: 'GET'
			});
			return response.status === 200;
		} catch (error) {
			return false;
		}
	}
}