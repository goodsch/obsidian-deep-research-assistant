# Obsidian Deep Research Assistant

An AI-powered research assistant plugin for Obsidian that integrates deep research workflows directly into your vault. Capture research seeds, score them intelligently, create structured research plans, and generate comprehensive reports with linked source notes.

## Features

### 🌱 Research Seeds
- **Quick Capture**: Create research ideas with title, summary, and initial questions
- **Smart Scoring**: AI-powered gatekeeper evaluates research worthiness across 5 criteria
- **Auto-Promotion**: High-scoring seeds can be automatically promoted to research plans

### 📋 Research Plans
- **Structured Planning**: Break down research into sub-questions across key categories
- **Search Strategies**: Define source types, quality filters, and diversity requirements  
- **AI Assistance**: Generate sub-questions automatically based on your thesis
- **Customizable Deliverables**: Executive briefs, concept maps, intervention tables

### 🔍 Research Console
- **Unified Dashboard**: View and manage seeds, plans, runs, sources, and claims
- **Advanced Filtering**: Filter by topic, status, score, date ranges
- **Batch Operations**: Process multiple items simultaneously
- **Real-time Updates**: Track research job progress and status

### 🏗️ Knowledge Organization  
- **Topic Hubs**: Centralized pages that aggregate all research for a topic
- **Source Notes**: Structured notes with quality ratings and clinical relevance
- **Automatic Linking**: Smart backlinks between seeds, plans, reports, and sources
- **Dataview Integration**: Dynamic tables and queries

### 🤖 AI Integration
- **Multiple Providers**: Support for Ollama (local), OpenAI, Anthropic, and custom endpoints
- **Intelligent Scoring**: Evidence-based assessment of research potential
- **Content Generation**: Auto-generate research questions and plans
- **Quality Assessment**: Evaluate source quality and flag contradictions

## Installation

### Prerequisites
- Obsidian 0.15.0 or later
- Node.js 16+ (for development)
- An AI provider (Ollama recommended for local use)

### From Release (Coming Soon)
1. Download the latest release from GitHub
2. Extract to your vault's `.obsidian/plugins/` directory
3. Enable the plugin in Obsidian Settings → Community Plugins

### Development Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/obsidian-deep-research-assistant.git
   cd obsidian-deep-research-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Copy the built files to your vault:
   ```bash
   # Replace /path/to/your/vault with your actual vault path
   cp main.js manifest.json styles.css /path/to/your/vault/.obsidian/plugins/deep-research-assistant/
   ```

5. Enable the plugin in Obsidian Settings → Community Plugins

## Quick Start

### 1. Configure Your AI Provider

**Option A: Ollama (Recommended - Local & Private)**
1. Install [Ollama](https://ollama.ai)
2. Pull a model: `ollama pull llama2`
3. In plugin settings, set LLM Provider to "Ollama" 
4. Set endpoint to `http://localhost:11434` (default)

**Option B: OpenAI**  
1. Get an API key from [OpenAI](https://platform.openai.com)
2. In plugin settings, set LLM Provider to "OpenAI"
3. Enter your API key

**Option C: Anthropic**
1. Get an API key from [Anthropic](https://console.anthropic.com)
2. In plugin settings, set LLM Provider to "Anthropic" 
3. Enter your API key

### 2. Set Up Your Vault Structure

The plugin will automatically create these folders on first run:
```
01_Inbox/Seeds/           # Research seeds
02_Research/Plans/        # Research plans  
02_Research/Reports/      # Generated reports
02_Research/Sources/      # Source notes
02_Research/Topics/       # Topic hubs
00_System/Templates/      # Note templates
```

### 3. Create Your First Research Seed

1. Use command palette: "Deep Research: Create New Research Seed"
2. Fill in:
   - **Title**: Brief description of your research idea
   - **Topic**: Select existing or create new topic  
   - **Summary**: What sparked this research idea?
   - **Questions**: Initial questions you want to explore

3. Click "Create Seed"

### 4. Score Your Seed

1. Open your seed note
2. Use command palette: "Deep Research: Score Current Seed"
3. The AI will evaluate across 5 criteria and provide a score (0-100)
4. Scores ≥70 are recommended for deep research

### 5. Create a Research Plan

1. For high-scoring seeds, use "Deep Research: Promote Seed to Research Plan"
2. Or create a plan directly: "Deep Research: Create Research Plan"
3. The AI can help generate sub-questions based on your thesis
4. Customize search strategy and deliverables

### 6. View the Research Console

1. Click the search icon in the ribbon, or
2. Use command palette: "Deep Research: Open Research Console"
3. Browse your seeds, plans, and research progress in one place

## Usage Guide

### Folder Configuration

You can customize folder paths in Settings → Deep Research Assistant:

- **Seeds Path**: Where research ideas are stored
- **Plans Path**: Where research plans are created  
- **Reports Path**: Where generated reports are saved
- **Sources Path**: Where source notes are stored
- **Topics Path**: Where topic hub pages live
- **Templates Path**: Where note templates are kept

### LLM Provider Settings

**Ollama Configuration:**
- Endpoint: Usually `http://localhost:11434`
- Models: Any model you've pulled (llama2, mistral, etc.)
- Pros: Completely local and private
- Cons: Requires local setup and powerful hardware

**OpenAI Configuration:**  
- API Key: Required (keep this secure)
- Models: GPT-3.5-turbo, GPT-4, etc.
- Pros: High quality, fast responses
- Cons: Costs per API call, data sent to OpenAI

**Anthropic Configuration:**
- API Key: Required (keep this secure)  
- Models: Claude-3-sonnet, etc.
- Pros: Great for research tasks, strong reasoning
- Cons: Costs per API call, data sent to Anthropic

### Gatekeeper Scoring

The AI evaluates research seeds on:

1. **Novelty (0-20)**: How original/underexplored is this topic?
2. **Clinical Value (0-20)**: How useful for therapeutic practice? 
3. **Research Readiness (0-20)**: Sufficient literature available?
4. **Synthesis Potential (0-20)**: Can this lead to actionable insights?
5. **Personal Relevance (0-20)**: Alignment with your interests?

**Score Ranges:**
- **80-100**: Deep research recommended (comprehensive investigation)
- **50-79**: Light scan sufficient (basic review) 
- **0-49**: Archive (not worth pursuing currently)

### Research Workflow

**Typical Flow:**
1. **Capture** → Create seed when inspiration strikes
2. **Score** → Let AI evaluate research potential  
3. **Plan** → Develop structured research approach
4. **Execute** → Run deep research (coming in future update)
5. **Synthesize** → Generate final outputs (essays, presentations)

### Integration Tips

**With Dataview:**
The plugin creates structured frontmatter that works great with Dataview:

```markdown
```dataview
TABLE title as "Title", score as "Score", status as "Status"
FROM "01_Inbox/Seeds" 
WHERE type = "seed"
SORT score DESC
```
```

**With Canvas:**
- Create visual research maps connecting seeds to plans to reports
- Use the concept maps generated in reports as starting points

**With Daily Notes:**
- Reference active research in your daily notes
- Track progress on research questions

## Troubleshooting

### Common Issues

**"LLM provider not available"**
- Check your API key or Ollama installation
- Test connection in plugin settings
- Ensure the endpoint URL is correct

**"Failed to create seed/plan"** 
- Check that target folders exist and are writable
- Verify template files are present in Templates folder
- Try refreshing the plugin (disable/enable)

**"Error parsing frontmatter"**
- The plugin uses simple YAML parsing
- Avoid complex formatting in frontmatter fields
- Check for syntax errors in note frontmatter

**Slow AI responses**
- Local models (Ollama) depend on your hardware
- Try smaller/faster models for development
- API-based providers are usually faster

### Getting Help

1. Check the console (Ctrl/Cmd + Shift + I) for error messages
2. Try refreshing research data: "Deep Research: Refresh Research Data"
3. Reset plugin settings if needed (Settings → Advanced → Reset Plugin)
4. File an issue on GitHub with error details

## Roadmap

### Current Status (v0.1.0)
- ✅ Research seed creation and management  
- ✅ AI-powered gatekeeper scoring
- ✅ Research plan creation with AI assistance
- ✅ Research console dashboard
- ✅ Topic hub organization
- ✅ Multiple LLM provider support

### Coming Soon (v0.2.0)
- 🚧 MCP deep research server integration
- 🚧 Automated research execution
- 🚧 Source note generation from citations
- 🚧 Report generation with concept maps

### Future Versions
- 🔲 Omnivore integration for highlight import
- 🔲 Zotero integration for reference management  
- 🔲 Scheduled research refresh
- 🔲 Export to various formats (Docx, slides)
- 🔲 Advanced analytics and insights

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev` (watches for changes)
4. Build for production: `npm run build`

### Architecture

- **TypeScript** for type safety and maintainability
- **Obsidian Plugin API** for vault integration  
- **Modular design** with separate managers for different concerns
- **Extensible adapters** for LLM providers and research tools

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for the Obsidian community
- Inspired by research workflows in academia and therapy
- Uses the Obsidian Plugin API
- Designed with privacy and local-first principles

---

**Note**: This plugin is in active development. Features and APIs may change. Always backup your vault before trying new versions.