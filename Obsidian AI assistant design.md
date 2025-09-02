---
title: "Obsidian AI assistant design"
source: "https://chatgpt.com/c/68b5f00f-eefc-8320-8093-8e51005156c6"
author:
  - "[[ChatGPT]]"
published:
created: 2025-09-01
description: "ChatGPT helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and ChatGPT can help with writing, learning, brainstorming and more."
tags:
  - "clippings"
---
Help me design an obsidian based ai research and note taking assistant and layout.

---

Got it — let’s design an **Obsidian-based AI research and note-taking assistant + layout** that plays well with your workflows.  
I’ll break this into **(1) system design**, **(2) vault layout**, and **(3) AI workflow integration**.

---

## 1\. System Design Goals

The assistant should:

- **Capture** information quickly (web clippings, highlights, AI summaries, quick thoughts).
- **Organize** notes into a structured vault (research, projects, references, daily logs).
- **Transform** content into useful forms (summaries, Q&A, flashcards, timelines, relationship maps).
- **Surface** insights (search, embeddings, graph queries, auto-links).
- **Automate** repetitive tasks (templating, summarization, reference formatting).

---

## 2\. Suggested Vault Layout

Here’s a modular layout tailored for **AI-assisted research**:

```markdown
bash📂 00_System
    ├─ Templates/         # Note-taking, research, daily log templates
    ├─ Config/            # Settings, metadata, automation configs
    └─ Prompts/           # AI prompt patterns/snippets you reuse

📂 01_Inbox
    ├─ Quick_Capture/     # Raw snippets from web, Kindle, PDFs
    ├─ AI_Drafts/         # First-pass AI notes, auto-summaries
    └─ To_Process/        # Things waiting for organization

📂 02_Research
    ├─ Topics/            # Individual topic hubs (e.g. "ADHD", "Neuroplasticity")
    ├─ Sources/           # Notes per article, book, paper, podcast
    ├─ Summaries/         # AI-generated layered summaries
    └─ Maps/              # Concept maps, timelines, relationship diagrams

📂 03_Projects
    ├─ Active/            # Research projects you’re actively working on
    └─ Archive/           # Finished research outputs

📂 04_References
    ├─ Bibliography.md    # Master reference list (Zotero / AI export)
    ├─ Authors/           # Individual notes per author
    └─ Glossary/          # Terms + definitions

📂 05_Daily
    ├─ Daily_Notes/       # Standard daily capture
    └─ Research_Journal/  # Reflections on what you’re reading/learning

📂 06_Harvest
    ├─ Essays/            # Synthesized writing
    ├─ Presentations/     # Slide outlines, talk prep
    └─ Publications/      # Final research products

📂 07_Archive
```

💡 You can link this to your **NeuroGarden metaphor**:

- 📥 Inbox = **Seedlings**
- 02\_Research/Topics = **Trellis**
- 06\_Harvest = **Harvest**
- Daily reflection = **Lotus Pad**

---

## 3\. AI Workflow Integration

### Capture

- Use **Readwise Reader / Omnivore → Obsidian** to bring in highlights.
- Add an **AI ingestion step**: first-pass summary, metadata extraction (title, author, keywords).
- Shortcut/QuickAdd to drop raw notes into `01_Inbox`.

### Processing

- Templates with **AI-assisted note prompts**, e.g.:
	- *"Summarize this article at 3 depths: 1 sentence, 3 bullet points, full outline."*
	- *"Extract glossary terms with definitions from this text."*
	- *"Map out relationships between main actors/concepts."*
- Embed callouts (❗ Key ideas, 📌 Definitions, 🔗 References) to structure notes.

### Organization

- Use **Dataview** or **Omnisearch** to query notes by tag (`#topic/ADHD`, `#source/podcast`).
- Build **topic hubs**: AI can auto-generate summaries that pull from linked sources.

### Synthesis

- Create layered “Maps of Content” (MOCs) per research theme.
- Use **Mermaid diagrams** (or AI-generated ones) for timelines & relationship maps.
- Prompt AI to *“compare and contrast 5 sources on \[topic\]”* → output goes to `Summaries/`.

### Reflection

- Daily note prompt: *“What did I learn today? How does it connect to past notes?”*
- AI can generate **questions for further exploration** based on yesterday’s notes.

### Tools/Plugins

- **Core**: Daily Notes, Templates, Dataview, Canvas
- **Plugins**:
	- QuickAdd (capture & automation)
	- Templater (AI prompts baked into templates)
	- Omnisearch / Smart Connections (semantic search)
	- Citations/Zotero Integration
	- Excalidraw / Obsidian Canvas (maps & diagrams)
	- Obsidian Linter (keep notes clean)

---

✅ End Result:  
You’ll have an **AI-augmented research flow** where:

- Raw → Inbox → Processed Notes → Research Projects → Harvest.
- Each step has **templates + AI prompts** to reduce friction.
- Layout mirrors **NeuroGarden** growth stages so it feels intuitive.

---

Do you want me to **draft a starter set of AI-powered Obsidian templates** (capture note, source note, topic hub, daily reflection) so you can drop them into `00_System/Templates` and immediately test?

---

So let’s apply and expand / modify this by thinking through a real use case. I have been thinking a lot about 1) in my work as a therapist I have been wanting to work toward coming as close as I can to understanding and identifying my specific idea of how and why an individual “is who they are”. 2) in my work I also want to understand and create my own theory about the essential role of confidence and self-trust in a human being’s happiness and satisfaction with life. Pick one of these to use

---

Perfect — let’s pick one and walk it through the **Obsidian AI-assisted research workflow** so you can see how it would function in practice.

I’ll suggest we start with **your second idea**:

> *The essential role of confidence and self-trust in a human being’s happiness and satisfaction with life.*

This one has a nice balance between clinical theory, research literature, and personal synthesis — great for testing how the assistant helps you move from **seed → trellis → harvest**.

---

## 1\. Seeding the Idea (Capture Stage)

**Folder:**`01_Inbox/Seedlings`  
**Template:***Idea Capture*

When you first think this, drop a note like:

💡 AI role: When you create this note, your assistant can automatically generate:

- A **literature starting point** (key terms, researchers, journals).
- Suggested **frameworks** (timeline of how confidence has been theorized).

---

## 2\. Trellis (Structuring Research)

**Folder:**`02_Research/Topics/Confidence_and_SelfTrust`  
This becomes your **Topic Hub**.

**Template:***Topic Hub*

💡 AI role:

- Crawl your **Sources/** notes and auto-summarize into a “compare & contrast” section.
- Build **Mermaid diagrams** or canvases mapping theories.

---

## 3\. Source Notes (Gathering Evidence)

Whenever you read something (article, book, podcast), create a **Source Note** in `02_Research/Sources`.

Template example:

---

## 4\. Reflection (Daily Integration)

**Folder:**`05_Daily/Research_Journal`

Template:

---

## 5\. Harvest (Synthesis)

**Folder:**`06_Harvest/Essays`

Example synthesis outline AI could generate:

---

✅ This way:

- Your **seed** becomes a **structured research hub**.
- AI helps you **gather, map, and compare** sources.
- You reflect daily, then synthesize into **your own working theory**.

---

Would you like me to **draft the exact Obsidian template files (Markdown with Templater/QuickAdd fields + AI prompts)** for this use case so you can drop them into `00_System/Templates`? That way, the workflow becomes plug-and-play.

---

What if it could also incorporate ai “deep research”? Like it could have a workflow that understands ai deep research, identifies useful topics for deep research, creates carefully crafted deep research prompts for those topics and the specific context of the current research, executes deep research jobs using open source tools like https://github.com/reading-plus-ai/mcp-server-deep-research, and creates notes from the results, all interactively or automatically

---

Love it. Let’s bolt **AI deep-research** into your Obsidian workflow so it can (a) decide *what* deserves deep research, (b) craft bespoke prompts, (c) run an MCP deep-research job, and (d) ingest results into clean, linked notes—either interactively or on autopilot.

Below is a drop-in design tailored to your NeuroGarden vibe.

---

## 1) The Flow at a Glance

**Seed → Gatekeeper → Plan → Execute → Ingest → Synthesize → Revisit**

1. **Seed**  
	You capture an idea/source like “Confidence & Self-Trust → life satisfaction.”
2. **Gatekeeper (Should we go deep?)**  
	A small agent scores the topic for *depth-worthiness* (novelty, clinical value, literature spread, ripeness for synthesis). If ≥ threshold, it proceeds; otherwise it parks it with a lighter scan.
3. **Plan (auto prompt-crafting)**  
	An “Expander” agent turns the seed into a *research plan* (clear thesis, sub-questions, search facets, source types, quality bar, evaluation rubric, deliverables).
4. **Execute (MCP deep research)**  
	Kick off a job on an **MCP Deep Research** server (open-source), which iteratively searches, reads, and writes a well-cited brief. (Good options listed/cited below.)
5. **Ingest (structured notes)**  
	Results land in `02_Research/Sources/` (one note per source) + a compact **Research Report** in `02_Research/Summaries/`, both linked to your Topic Hub.
6. **Synthesize (Harvest draft)**  
	A “Scribe” agent composes a **Position Paper** draft (or slide outline) in `06_Harvest/Essays/`.
7. **Revisit (scheduled refresh)**  
	A “Curator” task revisits findings after X weeks to update with new literature.

---

## 2) Minimal Setup (tools you already like)

- **Obsidian Plugins:** Dataview, Templater, QuickAdd, Canvas, Excalidraw, Linter.
- **MCP deep-research server:**
	- *ReadingPlus Deep Research MCP* (iterative search + report, citations).
	- *Open Deep Research MCP* (iterative, search + scraping + report).
	- Others exist (similar servers; marketplaces list them).
- **Why MCP?** It’s a standard way for AI clients/agents to call tools (Claude Desktop, Cursor, etc.).
- **Optional glue:** n8n (you already run it) to orchestrate: watch folder → trigger MCP job → save artifacts → post-process. (There are community MCP servers bridging n8n/Obsidian.)
- **Reference patterns:** OpenAI’s cookbook has a minimal “deep research MCP server” example—useful for customizing logic.

---

## 3) Folder & File Conventions (adds 3 new things)

---

## 4) The Four Templates (copy/paste ready)

## A) DR\_Seed.md (quick capture + decision)

**`gatekeeper.prompt.md`** (keeps your style terse but clinical):

---

## B) DR\_Plan.md (auto prompt-crafting)

```markdown
markdown---
type: dr-plan
topic: [[../Topic_Hub]]
seed-note: [[<seed note>]]
status: planned
created: {{date:YYYY-MM-DD}}
---

# Deep Research Plan: {{title}}

## Thesis (draft)
AI: Craft a 1–2 sentence thesis to test.

## Sub-questions (coverage)
AI: Propose 5–9 sub-questions spanning:
- Definitions & distinctions
- Mechanisms (causal paths)
- Measures/assessments
- Interventions (protocols, dosage, durability)
- Moderators (developmental stage, culture, ND profiles)
- Counterarguments / null findings

## Search strategy
- Priority source types: (peer-review, meta-analyses, clinical handbooks, reputable orgs)
- Quality filters: (sample size, prereg, effect sizes, confounds noted)
- Diversity: (theoretical schools, cross-cultural, ND perspectives)

## Deliverables
- 1 x Executive Brief (≈800–1200 words) + key claims with citations
- 1 x Map (Mermaid/Canvas) of constructs & links
- 1 x Intervention Table (fields: protocol, target, evidence, RCT?, durability)

## Rubric (for the MCP server)
- Min sources ≥ 12; peer-reviewed ≥ 8; recency bias with anchor classics
- Each claim ↔ citation; flag weak or disputed findings
- Quote ≤ 25 words/source; prefer paraphrase with page/section anchors
```

---

## C) DR\_Report.md (the MCP job’s landing page)

## Intervention Table

| Protocol | Target | Evidence | RCT? | Duration | Notes |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

## Sources (auto-backlinks)

- \[\[Source - …\]\] (one per citation, auto-created via template)
```markdown
yaml
---

## D) DR_SourceNote.md  (one per source; keeps it clinical)
\`\`\`markdown
---
type: source
title: 
authors: 
year: 
pub: 
doi: 
url: 
claim_links: []       # filled by AI: which report claims this supports
quality:              # strong | mixed | weak (AI)
notes_from: dr-run-{{run_id}}
---

# {{title}} ({{authors}}, {{year}})

## TL;DR (3 levels)
- 1 sentence:
- 3 bullets:
- 1 paragraph:

## Methods snapshot
Design, N, measures, stats, limitations:

## Findings (with effect sizes if available)
- 

## Clinical relevance
- Assessment:
- Intervention:
- Contraindications / moderators:

## Pull-quotes (≤25 words each)
> …

---
Backlinks: [[<Topic_Hub>]] • [[<DR_Report>]]
```

---

## 5) Orchestration (how it actually runs)

### Option A — Pure MCP client (Claude Desktop / Cursor)

1. Configure the **Deep Research MCP server** (ReadingPlus or Open Deep Research) in your client.
2. From the **Plan** note, run a command (via QuickAdd/Templater macro) that:
	- Sends the plan → MCP deep-research tool as the job payload.
	- Specifies deliverables & rubric.
	- Writes outputs to `Reports/` and `Sources/` using the templates.

### Option B — n8n in the middle (nice for scheduled refresh & vault writes)

- **Trigger:** File created in `02_Research/Topics/*/Plans/` OR a frontmatter flag `status: planned`.
- **n8n steps:**
	1. Read Plan.md → build JSON payload (thesis, sub-Qs, rubric).
	2. **HTTP call** to MCP server (or to your MCP client’s local API if available).
	3. Wait/poll until “done.”
	4. Write **Report.md** + **SourceNote.md** files into the correct folders.
	5. Run **Linter** & add backlinks.
- Community references show MCP↔n8n patterns and Obsidian MCP tool servers you can adapt.

> If you want your *own* server flavor, the OpenAI cookbook “deep research MCP server” example is a great starting skeleton to customize (e.g., force effect sizes, require counter-evidence section).

---

## 6) Prompt Snippets your Plan passes to the MCP server

**A. Search Phase Prompt (excerpt)**

**B. Analyst Phase Prompt (excerpt)**

**C. Writer Phase Prompt (excerpt)**

---

## 7) Making it Interactive vs. Automatic

- **Interactive mode:** The Gatekeeper shows you the score/rationale and the draft Plan; you tweak sub-questions and hit “Run.”
- **Automatic mode:** If `verdict: deep-research` and `priority: high`, n8n runs immediately; you review the finished Report later.
- **Scheduled refresh:** A weekly n8n job re-runs the plan with a “new since YYYY-MM-DD” constraint and appends “What changed?”

---

## 8) Quality, Ethics, and Safety Rails (for clinical work)

- **Evidence rubric baked in** (min peer-reviewed count, conflict checks).
- **Citations mandatory** with URLs/DOIs; annotate *limitations* and *applicability to ND clients*.
- **Quotations capped** (≤25 words each) to avoid copyright overreach.
- **Transparent notes**: every claim in a Report links to one or more **SourceNote.md** with quality labels.

---

## 9) How this applies to your current topic

For **Confidence & Self-Trust → life satisfaction** the Gatekeeper should light up. The Plan will likely generate sub-Qs around:

- Distinctions: self-efficacy (Bandura) vs. self-trust vs. trait confidence.
- Mechanisms: appraisal → approach behavior → mastery → resilience → SWB.
- Measures: GSE, SCS, self-trust scales; validity in ADHD/ASD.
- Interventions: graded mastery, behavioral activation, self-compassion training, parts-work for self-betrayal patterns.
- Moderators: attachment style, ND profiles, cultural scripts around confidence.  
	That maps perfectly to your clinical interests, then cascades into a **Position Paper** draft.

---

## 10) Want me to generate the actual 4 Markdown templates + 3 prompt files now?

I can output them exactly as files you can paste into `00_System/Templates/` and `00_System/Prompts/`, plus a **QuickAdd** macro snippet and a simple **n8n** JSON workflow skeleton that: watch → call MCP deep-research → write notes → backlink → lint.

---

Well I’m thinking about building this out and creating an obsidian plugin for working directly in obsidian and integrating other tools like something like https://github.com/omnivore-app/omnivore?tab=readme-ov-file for working on mobile etc. can you help flesh out what the entire thing would / could look like?

---

awesome—let’s flesh this into a real, shippable **Obsidian plugin** that runs your whole AI research flow (capture → deep research → synthesis) and plays nicely with **Omnivore** for mobile.

I’ll outline the **product**, **UX**, **data model**, **pipeline**, **integrations**, and a sensible **roadmap**. You can hand this to yourself as a spec.

## Vision (TL;DR)

An Obsidian plugin that:

- Captures sources/ideas (incl. mobile via **Omnivore**).
- Decides what deserves **AI deep research**.
- Auto-crafts research plans & prompts.
- Executes deep-research jobs (via MCP servers or local tools).
- Generates clean, linked notes (Topic hubs, Reports, Source notes, Maps).
- Keeps everything auditable, local-first, and extensible.

## Architecture Overview

- **UI Layer (Obsidian)**
	- Research Console (sidebar view)
	- Topic Hub view (per-topic dashboard)
	- Job Runner panel (status/progress/logs)
	- “New Seed” & “Plan Builder” modals
- **Core (Plugin)**
	- Settings & Secrets (Omnivore token, MCP endpoints, model prefs)
	- Job Queue + State Machine (Seed → Gate → Plan → Run → Ingest → Synthesize → Refresh)
	- Note Generator (templates + file ops)
	- Linker (auto-backlinks, tags, IDs)
	- Provenance & Audit logger
- **Integrations**
	- **Omnivore** adapter (pull highlights/reads → Source notes)
	- **Deep Research** adapter (MCP server or local tool)
	- **LLM** adapter (Ollama/LM Studio/OpenAI/etc.)
	- Optional: n8n webhook endpoints for long jobs / scheduled refresh
- **Storage**
	- Everything as Markdown + frontmatter in your vault
	- Small `.json` cache for job metadata & Omnivore cursors (in `.obsidian/plugins/.../data/`)

## Vault Layout (recommended)

## Data Model (frontmatter contracts)

Minimal, human-readable fields the plugin trusts.

### Topic

### Seed

### Plan

### Report (one per run)

### Source Note (one per citation)

> These contracts let you power **Dataview/Bases** tables (Sources, Claims, Interventions) without a database.

## Core Pipelines

## 1) Capture (incl. Omnivore)

**Goal:** get reading + highlights into `Sources/` with provenance.

- **Omnivore adapter (poll or on-demand):**
	- Fetch recent “Saved/Archived/Highlights since <cursor>”
	- Create/merge a Source note per article/book
	- Normalize fields (title/authors/year/url/source\_type/tags)
	- Embed highlights under `## Highlights` with anchors (timestamp/loc)
	- Link Source → Topic Hub if the note contains `topic:` tags or you choose from a picker
- **Quick Seeds (desktop & mobile):**
	- Command: “New Seed” → opens **DR\_Seed** form with title/tags
	- iOS Shortcut: Append to `01_Inbox/Seedlings/Today.md` or create a dedicated Seed note (plugin parses later)

## 2) Gatekeeper (Should we go deep?)

- Command: **“Score for Deep Research”** on a Seed.
- Runs the `gatekeeper.prompt.md` via your chosen LLM (local or API).
- Returns **score**, **verdict**, **top sub-topics**.
- UI shows rationale + a “Promote to Plan” button.

## 3) Plan Builder (auto prompt-crafting)

- Modal with:
	- Draft **thesis**, editable
	- Generated **sub-questions** (you can add/remove/reorder)
	- **Search strategy** toggles: peer-review bias, include gray literature, recency window, min N, etc.
	- **Deliverables** checkboxes
- Saves a Plan note + a **JSON payload** in `.plugin-data` for the run.

## 4) Execute Deep Research (MCP or local)

- **Adapter A (MCP):** connect to an MCP Deep Research server; send the Plan payload + rubric; stream status/logs into a **Job Runner panel**.
- **Adapter B (Local chain):** Node child-process that uses your toolchain (browserless/crawler + reranker + summarizer) with the same payload contract.
- Job produces:
	- **Executive Brief** (markdown)
	- **Concept Map** (Mermaid text)
	- **Intervention Table** (CSV/MD)
	- **Citations** (list with metadata)

## 5) Ingest (Note Generator)

- Creates/updates a **Report** note (drops brief/map/table into the template).
- For each citation: creates/updates **Source Note** with TL;DRs and fields.
- Auto-links:
	- Report ↔ Topic Hub
	- Report ↔ all Source Notes
	- Source Notes ↔ Topic Hub
- Writes a compact **ChangeLog** section with date & counts (new/updated/removed sources).

## 6) Synthesize (Harvest)

- Command: **“Draft Position Paper”** from a Topic Hub:
	- Pulls from your latest Reports + personal reflections.
	- Writes an outline into `06_Harvest/Essays/…`
- Command: **“Make Slides Outline”** (headings only, speaker notes section created).

## 7) Refresh (Keep it living)

- Optional scheduled job (or manual command):
	- Re-run Plan with “new since {last\_run\_date}”
	- Append “What Changed” to the Report ChangeLog and suggest updates to your essay.

## UI/UX

## A) Research Console (right sidebar)

- **Tabs:** Seeds | Plans | Runs | Sources | Claims
- Filters by `topic`, `status`, `score`, `date`
- Multi-select → “Promote to Plan”, “Batch tag”, “Link to Topic”

## B) Topic Hub view

A custom view for `type: topic` that shows:

- KPI bar: last run date, # sources, # strong evidence, # open questions
- Cards:
	- **Active Plan(s)** with “Run” button
	- **Latest Report** with quick links (open brief / map / table)
	- **Source Table** (Dataview/Bases)
	- **Interventions** table (if present)
	- **Canvas** button to open an auto-generated concept map

## C) Job Runner

- Status stream (phase, step, doc processed, tokens/time)
- Pause/Resume/Cancel
- “Explain step” tooltip (what the agent is doing & why)
- **Audit** tab: prompt fragments used, rubric applied, warnings flagged

## D) Mobile-friendly flows

- “Quick Seed” and “Dictation to Seed” iOS Shortcuts
- Omnivore → plugin import can be triggered from mobile (run later on desktop if heavy)
- Report/Sources are pure Markdown; readable anywhere

## Integrations & Adapters

## Omnivore

- **Settings:** API token, sync window (days), collections to include/exclude
- **Mode:** on-demand pull (button) or background interval on desktop
- **De-dupe:** by URL/hash; merge highlights; keep original link

## Deep Research (pluggable)

- **MCP client:** server URL/name, auth if needed
- **Payload contract** (JSON): topic, thesis, subQs, rubric, deliverables, constraints
- **Result contract**: brief.md, conceptMap.mmd, interventions.csv/md, citations.json
- Fallback: local chain (so the plugin works even without MCP)

## LLMs (promptable bits)

- Local: **Ollama/LM Studio** HTTP adapters
- Cloud: OpenAI, Anthropic, etc. (toggle per action: gatekeeper, planner, writer)
- Per-action model choice + token/timeout limits

## Optional: n8n

- Webhook for long runs; n8n calls MCP & returns a job URL
- After completion, n8n POSTs results back; plugin ingests

## Templates (ship defaults, user-editable)

- **DR\_Seed.md** (seed + gatekeeper section)
- **DR\_Plan.md** (thesis, subQs, search strategy, deliverables, rubric)
- **DR\_Report.md** (brief, mermaid map, table, sources list)
- **DR\_SourceNote.md** (methods, findings, clinical relevance, quotes ≤25 words)
- **Topic\_Hub.md** (header fields + embed of Dataview/Bases blocks)

## Commands (palette)

- New Seed
- Score for Deep Research
- Create Plan from Seed
- Run Deep Research Plan
- Ingest Run Results
- Draft Position Paper
- Build Slides Outline
- Sync from Omnivore (pull recent)
- Open Topic Hub

## Provenance, Safety, & Quality Rails

- Every claim in a Report links to **Source Notes**
- Quality flag per Source (strong/mixed/weak) + reason
- Quote length guard (≤25 words) to reduce copyright risk
- “Uncertainty” box auto-inserted when findings conflict
- Full prompt/rubric log stored per run (audit tab)

## Settings (per-vault)

- Paths (where to create Seeds/Plans/Reports/Sources)
- Topic defaults (tags, templates)
- Omnivore token + sync behavior
- LLM providers & model per action
- Deep Research backend (MCP/local) + endpoints
- Auto-run rules (e.g., run if score ≥ 70 & topic=high-priority)
- Refresh cadence (off / weekly / monthly)

## Developer Notes (how you’ll implement)

**Tech stack:** TypeScript, Obsidian API, Zustand-like store for plugin state, unified file ops.

**Key modules:**

**Job state machine:** XState or simple reducer:

- `queued → planning → executing(search,analysis,writing) → ingesting → complete|error`

**Long-running ops:** stream logs to a panel via EventEmitter.

**Testing:** snapshot tests for note generation; mock adapters for Omnivore & MCP.

## MVP → v1.0 Roadmap

**MVP (weeks 1–3)**

- Seeds/Plans/Reports basic flow
- Omnivore on-demand import
- Gatekeeper + Plan Builder with local LLM
- Deep Research adapter that accepts a stub payload and returns mock artifacts
- Note generation + linking + Topic Hub view (minimal)

**v0.2**

- Real MCP adapter + streaming logs
- Source Note generation with highlight merging
- Concept Map (Mermaid) + Interventions table
- Bases/Dataview blocks baked into Topic Hub

**v0.3**

- Auto-run rules & scheduled refresh
- Quality rubric tuning + “contradiction finder”
- iOS Shortcuts for “Quick Seed” and “Dictate Seed”

**v0.4**

- n8n webhook option for long jobs
- Per-action model selection & budgets
- Canvas map generator from Report graph

**v1.0**

- Plugin API for third-party adapters (Zotero, Readwise, Hypothes.is)
- Multi-topic dashboards, cross-topic claim registry
- Export pack (Markdown → Docx/Slides via Pandoc)

---

If you want, I can generate:

1. The **default templates** + prompt files (ready to drop into `00_System/...`), and
2. A **skeleton TypeScript plugin** (folder scaffolding with the views, commands, and adapter interfaces stubbed in).

Say the word and I’ll spit out the files so you can open the project and start wiring your adapters.

---

Generate a zip file that will contain a directory with everything needed to begin this project and build it using Claude code, including a custom Claude.md file

---

---

I want to clarify: this don’t want you to actually code this, but to create a complete and comprehensive set of requirements documentation to use Claude code as a developer - so things like project description, requirements, etc,

---

Got it — thanks for clarifying. You don’t want a coded plugin starter, you want a **complete requirements + documentation package** that you could hand directly to Claude (or any dev agent) and say: *“Build this.”*

Here’s what I’ll do:

- Generate a **ZIP structure** in text form with a directory layout.
- Inside are **Markdown docs** that cover: project description, scope, features, architecture, data model, workflows, UI/UX, integration details, and development notes.
- Include a **Claude.md** file written like a system prompt / developer guide for Claude code, with explicit instructions on how to proceed.

---

## 📦 Project Package Layout

---

## 📖 File Contents (summaries)

### README.md

- Short intro: what this project is, why it exists.
- Key value proposition: Obsidian-native deep research assistant integrating Omnivore + MCP servers.
- Links to other docs in this folder.

---

### PROJECT\_OVERVIEW.md

- Problem statement: researchers & therapists need structured AI-assisted research inside their note-taking system.
- Goals: capture, organize, run deep research, generate linked notes.
- Non-goals: not a general-purpose AI chatbot; not replacing literature review judgment.
- Users: Obsidian power-users, therapists, academics, ADHD-friendly workflows.

---

### REQUIREMENTS.md

- **Functional Requirements** (Seeds, Gatekeeper scoring, Plan Builder, Deep Research execution, Note generation, Topic Hub, Source tracking, Refresh).
- **Non-functional Requirements** (local-first, auditable, extensible, privacy-preserving, mobile capture-friendly).
- **Plugin Commands** (New Seed, Score, Create Plan, Run Plan, Ingest Results, Draft Position Paper, Sync from Omnivore, Open Topic Hub).
- **Safety Rails** (citation requirement, source quality flags, transparency).

---

### ARCHITECTURE.md

- Plugin architecture:
	- UI Layer (panels, modals, dashboards)
	- Core (job queue, state machine, note generator)
	- Adapters (Omnivore, Deep Research MCP, LLMs, n8n optional)
	- Storage (Markdown notes, `.json` plugin cache)
- Module responsibilities and relationships.
- Diagram of the flow: Seed → Plan → Run → Report → Source Notes → Topic Hub → Harvest.

---

### DATA\_MODEL.md

- Frontmatter contracts for each entity: Topic, Seed, Plan, Report, Source Note.
- Fields and allowed values.
- Example snippets.

---

### WORKFLOWS.md

- End-to-end user workflows:
	- Capture seed → gatekeeper → plan → run → report → harvest.
	- Mobile capture via Omnivore → Source Notes.
	- Scheduled refresh → updated Reports.
- State transitions (status: captured → scored → planned → run → ingested).

---

### UI\_UX.md

- Sidebar Research Console: tabs for Seeds | Plans | Runs | Sources | Claims.
- Topic Hub view: dashboard-style summary.
- Job Runner panel: logs, status, audit tab.
- Modal flows: New Seed, Plan Builder, Run status.
- Mobile-friendly flows: Quick Seed capture, highlight import.

---

### INTEGRATIONS.md

- **Omnivore**: how to pull highlights and convert to Source Notes.
- **MCP Deep Research servers**: supported payload contract and return artifacts.
- **LLMs**: local (Ollama, LM Studio) and API-based (OpenAI, Anthropic).
- **Optional n8n**: webhook orchestration for long jobs or scheduled refresh.

---

### ROADMAP.md

- MVP → v1.0 roadmap (MVP seeds/plans/reports; Omnivore sync; MCP integration; refresh; cross-topic dashboards).
- Later features: Zotero/Readwise/Hypothes.is adapters, plugin API, Canvas maps, export packs.

---

### CLAUDE.md

- **Role definition:** Claude is a developer assistant for this project.
- **Instructions:**
	- Read all project docs before coding.
	- Use Obsidian plugin best practices (TypeScript, Obsidian API, modular structure).
	- Implement defined data models and workflows exactly.
	- Maintain transparency: always log job state and prompt/rubric usage.
	- Ask for clarification if requirements conflict.
- **Coding guidelines:**
	- Local-first, minimal dependencies.
	- Generate stubs for adapters (Omnivore, Deep Research).
	- Ensure templates and prompts load from vault, not hardcoded.

---

### templates/

Contains starter Markdown templates for notes:

- `DR_Seed.md`
- `DR_Plan.md`
- `DR_Report.md`
- `DR_SourceNote.md`
- `Topic_Hub.md`

Each matches the frontmatter + structure we outlined earlier.

---

✅ End Result: This package = **project blueprint**. A dev (human or Claude code) could open it, read the docs, and immediately start building the plugin.

---

Would you like me to **actually draft the full text of each of these files** (so you have a ready-to-export directory), or just keep it at this high-level structure?

---

Make sure you understand how Claude code uses CLAUDE.md files

---

Great call. Here’s a crisp summary of how **Claude Code** treats `CLAUDE.md`, plus the practical implications for our package.

## How CLAUDE.md is used by Claude Code (what actually happens)

- **Auto-ingested context:** Claude Code automatically pulls a `CLAUDE.md` found in the repo into its working context when it starts on a project. It treats this as the project’s operating manual (standards, constraints, tasks, and workflow).
- **Hierarchical support:** You can have multiple `CLAUDE.md` files (root + subfolders). Claude Code reads them hierarchically and prioritizes the **most specific** one relevant to the current scope, while still considering the root file. This lets you keep the root doc lean and push module-specific rules down a level.
- **Sent (or referenced) across sessions/requests:** Treat it as a persistent “pre-flight brief” that Claude carries during coding; teams report a big quality gap when a strong `CLAUDE.md` is present vs missing.
- **Guides behavior & standards:** It should contain project rules, code style, review criteria, tool usage policies, and “how to work here.” Anthropic’s docs and GitHub Actions guidance explicitly position it as the place to define project-specific conventions.
- **Living doc:** Keep it short, directive, and updated as the project evolves; many practitioners maintain folder-level `CLAUDE.md` files for large codebases so Claude can fetch only what’s relevant.
- **Not just philosophy—operational instructions:** Anthropic’s best-practices recommend including concrete tasks, step sequences, evaluation rubrics, and how to use external tools (e.g., MCP servers) so the agent can act, not just read.
- **Works across entry points:** Whether you invoke Claude Code in terminal/IDE or via GitHub workflows, `CLAUDE.md` is the primary place to encode expectations.

## What this means for our project package

For your “Obsidian Deep-Research Assistant” repo, we should:

1. **Keep the root `CLAUDE.md` tight (2–4 pages max)** with:
	- Mission & success criteria for the plugin (what “done” looks like).
	- Constraints (local-first, privacy, Obsidian API patterns).
	- **Canonical workflows** the agent should implement (Seed → Gatekeep → Plan → Run → Ingest → Synthesize → Refresh).
	- **Step-by-step build plan** (MVP → v0.2 → v0.3…), each with acceptance checks.
	- **Tooling instructions** (how to call the Deep-Research MCP, Omnivore adapter contract, how to run/dev).
	- **Coding standards** (TypeScript, Obsidian API, testing/linting, file layout).
	- **Ask-before-acting rules** (e.g., confirm file ops, respect templates, don’t hardcode secrets).
2. **Add folder-level `CLAUDE.md` files** where specificity helps:
	- `/adapters/` – how to implement MCP & Omnivore adapters (payload/return contracts, error handling).
	- `/ui/` – Obsidian views/panels conventions, state management, component boundaries.
	- `/notes/` – template loaders, frontmatter contracts, file-ops rules.
	- `/workflows/` – job state machine transitions and logging/audit norms.
3. **Cross-link from `CLAUDE.md` to our requirements docs** (Overview, Requirements, Architecture, Data Model, Workflows). Claude Code will read the `CLAUDE.md` and then open linked files as needed; keeping the root doc opinionated but compact is ideal.

If you’re good with this, I’ll generate the **complete documentation package** we discussed—with a root `CLAUDE.md` written specifically for Claude Code (short, operational, and linked to the deeper specs), plus optional subfolder `CLAUDE.md` stubs that teach the agent how to work inside each module.

---

Go ahead

---

Perfect — let’s generate the **full project documentation package**.  
Below is the text content for every file in the repo layout. You can save these into a folder named `obsidian-deep-research-assistant/` and zip it.

---

## 📦 Directory & Files

---

## README.md

```markdown
markdown# Obsidian Deep Research Assistant

An Obsidian plugin that integrates AI deep research directly into your vault.  
It helps you capture seeds, decide which ideas deserve deep research, craft structured plans, execute iterative deep research jobs (via MCP servers or local tools), and generate linked notes (Topic Hubs, Reports, Source Notes, Maps, Harvest outputs).

## Highlights
- **Capture:** Seeds from quick notes or Omnivore highlights.
- **Gatekeeper:** Scores which ideas deserve deep research.
- **Planning:** Auto-generated sub-questions, rubrics, deliverables.
- **Execution:** Runs jobs against Deep Research MCP servers.
- **Ingestion:** Creates structured notes in your vault.
- **Synthesis:** Drafts essays, presentations, or clinical theories.

Read the requirements in [\`PROJECT_OVERVIEW.md\`](PROJECT_OVERVIEW.md).
```

---

## PROJECT\_OVERVIEW.md

```markdown
markdown# Project Overview

## Problem
Researchers, therapists, and knowledge workers want structured AI-assisted research that lives directly in their notes. Current tools are scattered, opaque, or siloed.

## Goals
- **Local-first:** Store all outputs in Obsidian markdown notes.
- **Structured flow:** Seed → Gatekeep → Plan → Run → Ingest → Synthesize.
- **Evidence-first:** Require citations, quality flags, uncertainty boxes.
- **Integrations:** Omnivore for capture, MCP servers for research, optional n8n for orchestration.
- **Extensible:** Support additional adapters (Zotero, Readwise, Hypothes.is).

## Users
- Obsidian power users.
- Therapists building theories or client materials.
- Academics and knowledge workers with ADHD who benefit from structured workflows.

## Non-Goals
- Not a general AI chatbot.
- Not a replacement for human judgment in clinical or academic work.
```

---

## REQUIREMENTS.md

```markdown
markdown# Functional Requirements

- Create and manage Seeds.
- Score Seeds for deep research worthiness.
- Build Plans (sub-questions, search strategies, deliverables).
- Execute Plans with Deep Research MCP servers.
- Generate Reports with executive briefs, maps, and tables.
- Create Source Notes per citation.
- Build Topic Hubs that aggregate outputs.
- Draft Harvest outputs (essays, slides).
- Refresh Reports with new literature.

# Non-Functional Requirements
- Local-first storage in Markdown.
- Transparent provenance for every claim.
- Extensible adapters for Omnivore, MCP, LLMs.
- Minimal dependencies; plugin must run offline (except during research).

# Commands
- \`New Seed\`
- \`Score Seed\`
- \`Create Plan\`
- \`Run Plan\`
- \`Ingest Results\`
- \`Draft Position Paper\`
- \`Sync from Omnivore\`
- \`Open Topic Hub\`

# Safety
- Every claim must link to a Source Note.
- All quotes ≤25 words.
- Quality flags required per Source (strong/mixed/weak).
- Contradictions highlighted.
```

---

## ARCHITECTURE.md

---

## DATA\_MODEL.md

## Seed

## Plan

## Report

## Source Note

---

## UI\_UX.md

---

## INTEGRATIONS.md

---

## ROADMAP.md

---

## CLAUDE.md (root)

```markdown
markdown# CLAUDE.md — Obsidian Deep Research Assistant

## Role
You are a developer agent building an Obsidian plugin.

## Mission
Implement a plugin that manages the research workflow:  
Seed → Gatekeeper → Plan → Run (Deep Research MCP) → Report + Source Notes → Topic Hub → Harvest.

## Standards
- Use TypeScript + Obsidian API.
- Local-first: all data as Markdown + frontmatter.
- Transparent: every claim must link to Source Notes.
- Respect templates in \`/templates\`.
- Don’t hardcode secrets (Omnivore tokens, MCP endpoints).
- Keep logs and audit trails.

## Build Plan
1. **MVP:** Seeds/Plans/Reports + Omnivore import + mock Deep Research adapter.
2. **MCP integration:** add real job runner and ingest artifacts.
3. **Notes:** implement Source Note generator.
4. **UI:** Research Console, Topic Hub, Job Runner.
5. **Harvest:** essay and slides drafts.
6. **Refresh:** scheduled updates.
7. **Adapters:** pluggable design.

## Key Files
- [REQUIREMENTS.md](REQUIREMENTS.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [DATA_MODEL.md](DATA_MODEL.md)
- [WORKFLOWS.md](WORKFLOWS.md)
- [UI_UX.md](UI_UX.md)
- [INTEGRATIONS.md](INTEGRATIONS.md)
- [ROADMAP.md](ROADMAP.md)

## Ask-before-acting rules
- Confirm before deleting or overwriting user files.
- Validate payloads before sending to MCP.
- If requirements conflict, ask the user for clarification.
```

---

## adapters/CLAUDE.md

---

## ui/CLAUDE.md

---

## notes/CLAUDE.md

---

## workflows/CLAUDE.md

---

## templates/DR\_Seed.md

---

## templates/DR\_Plan.md

---

## templates/DR\_Report.md

## Intervention Table

| Protocol | Target | Evidence | RCT? | Duration | Notes |
| --- | --- | --- | --- | --- | --- |

---

## templates/Topic\_Hub.md

---

✅ This gives you a **ready-to-zip directory** with every requirements doc, templates, and a Claude-ready `CLAUDE.md` system file.

Do you want me to also generate a **shell script** that auto-creates this directory and files on your machine (so you can run `bash init.sh` to build the structure)?

---

Sure

---

Awesome — here’s a single-file shell script that will create the full repo, write all the docs/templates (including the Claude-aware `CLAUDE.md` files), and zip the folder.

1. Copy everything below into a file named `init.sh`
2. Run: `bash init.sh`
3. You’ll get a folder `obsidian-deep-research-assistant/` and `obsidian-deep-research-assistant.zip`

---

```bash
bash#!/usr/bin/env bash
set -euo pipefail

ROOT="obsidian-deep-research-assistant"
mkdir -p "$ROOT"/{templates,adapters,ui,notes,workflows}

write() {
  local path="$1"
  shift
  mkdir -p "$(dirname "$path")"
  cat > "$path" <<'EOF'
'"$@"'
EOF
}

# README.md
cat > "$ROOT/README.md" <<'EOF'
# Obsidian Deep Research Assistant

An Obsidian plugin that integrates AI deep research directly into your vault.  
It helps you capture seeds, decide which ideas deserve deep research, craft structured plans, execute iterative deep research jobs (via MCP servers or local tools), and generate linked notes (Topic Hubs, Reports, Source Notes, Maps, Harvest outputs).

## Highlights
- **Capture:** Seeds from quick notes or Omnivore highlights.
- **Gatekeeper:** Scores which ideas deserve deep research.
- **Planning:** Auto-generated sub-questions, rubrics, deliverables.
- **Execution:** Runs jobs against Deep Research MCP servers.
- **Ingestion:** Creates structured notes in your vault.
- **Synthesis:** Drafts essays, presentations, or clinical theories.

Read the requirements in [\`PROJECT_OVERVIEW.md\`](PROJECT_OVERVIEW.md).
EOF

# PROJECT_OVERVIEW.md
cat > "$ROOT/PROJECT_OVERVIEW.md" <<'EOF'
# Project Overview

## Problem
Researchers, therapists, and knowledge workers want structured AI-assisted research that lives directly in their notes. Current tools are scattered, opaque, or siloed.

## Goals
- **Local-first:** Store all outputs in Obsidian markdown notes.
- **Structured flow:** Seed → Gatekeep → Plan → Run → Ingest → Synthesize.
- **Evidence-first:** Require citations, quality flags, uncertainty boxes.
- **Integrations:** Omnivore for capture, MCP servers for research, optional n8n for orchestration.
- **Extensible:** Support additional adapters (Zotero, Readwise, Hypothes.is).

## Users
- Obsidian power users.
- Therapists building theories or client materials.
- Academics and knowledge workers with ADHD who benefit from structured workflows.

## Non-Goals
- Not a general AI chatbot.
- Not a replacement for human judgment in clinical or academic work.
EOF

# REQUIREMENTS.md
cat > "$ROOT/REQUIREMENTS.md" <<'EOF'
# Functional Requirements

- Create and manage Seeds.
- Score Seeds for deep research worthiness.
- Build Plans (sub-questions, search strategies, deliverables).
- Execute Plans with Deep Research MCP servers.
- Generate Reports with executive briefs, maps, and tables.
- Create Source Notes per citation.
- Build Topic Hubs that aggregate outputs.
- Draft Harvest outputs (essays, slides).
- Refresh Reports with new literature.

# Non-Functional Requirements
- Local-first storage in Markdown.
- Transparent provenance for every claim.
- Extensible adapters for Omnivore, MCP, LLMs.
- Minimal dependencies; plugin must run offline (except during research).

# Commands
- \`New Seed\`
- \`Score Seed\`
- \`Create Plan\`
- \`Run Plan\`
- \`Ingest Results\`
- \`Draft Position Paper\`
- \`Sync from Omnivore\`
- \`Open Topic Hub\`

# Safety
- Every claim must link to a Source Note.
- All quotes ≤25 words.
- Quality flags required per Source (strong/mixed/weak).
- Contradictions highlighted.
EOF

# ARCHITECTURE.md
cat > "$ROOT/ARCHITECTURE.md" <<'EOF'
# Architecture

## Layers
- **UI Layer**
  - Research Console (sidebar)
  - Topic Hub dashboards
  - Job Runner panel
  - Modals for Seeds/Plans

- **Core**
  - Job Queue + State Machine
  - Note Generator
  - Linker & Provenance Logger

- **Adapters**
  - Omnivore API
  - Deep Research MCP servers
  - LLM endpoints
  - Optional n8n webhook

- **Storage**
  - Notes in Markdown with frontmatter contracts.
  - \`.json\` cache for metadata and Omnivore cursors.

## Flow
Seed → Gatekeeper → Plan → Run → Report + Source Notes → Topic Hub → Harvest.
EOF

# DATA_MODEL.md
cat > "$ROOT/DATA_MODEL.md" <<'EOF'
# Data Models

## Topic
\`\`\`yaml
---
type: topic
slug: confidence_and_self_trust
title: Confidence & Self-Trust
status: active
tags: [theory, clinical]
---
```

## Seed

## Plan

## Report

## Source Note

EOF

## WORKFLOWS.md

cat > "$ROOT/WORKFLOWS.md" <<'EOF'

## Workflows

## Seed → Plan → Run → Report

1. Capture Seed.
2. Gatekeeper scores depth-worthiness.
3. Promote to Plan (generate thesis, sub-questions, strategy).
4. Run Plan with Deep Research adapter.
5. Receive Report + Source Notes.
6. Topic Hub auto-updates.

## Mobile Capture via Omnivore

1. Save article/highlights in Omnivore.
2. Plugin syncs, creates/updates Source Note.
3. Link to Topic Hub manually or automatically.

## Scheduled Refresh

1. Weekly cron (via n8n or plugin setting).
2. Re-run Plan with `new since` constraint.
3. Append “What Changed” section to Report.  
	EOF

## UI\_UX.md

cat > "$ROOT/UI\_UX.md" <<'EOF'

## UI / UX

## Research Console (sidebar)

- Tabs: Seeds | Plans | Runs | Sources | Claims
- Filters by topic, score, status.

## Topic Hub

- Dashboard with KPIs: last run, sources count, strong evidence, open questions.
- Latest Report preview.
- Source table (Dataview/Bases).
- Interventions table.
- “Open Canvas Map” button.

## Job Runner

- Streaming logs of deep research job.
- Tabs: Status | Audit (prompts/rubrics) | Artifacts.

## Mobile

- Quick Seed capture command.
- Sync Omnivore highlights into Source Notes.  
	EOF

## INTEGRATIONS.md

cat > "$ROOT/INTEGRATIONS.md" <<'EOF'

## Integrations

## Omnivore

- Pull highlights since last sync.
- Merge into Source Notes.
- De-dupe by URL/hash.

## Deep Research MCP

- Send Plan JSON payload: thesis, sub-questions, rubric, deliverables.
- Receive artifacts: brief.md, map.mmd, interventions.csv, citations.json.

## LLMs

- Local: Ollama/LM Studio.
- Cloud: OpenAI, Anthropic.
- Select per action: Gatekeeper, Plan Builder, Writer.

## Optional n8n

- Webhook to run long jobs outside Obsidian.
- n8n executes MCP, posts back results.  
	EOF

## ROADMAP.md

cat > "$ROOT/ROADMAP.md" <<'EOF'

## Roadmap

## MVP

- Seeds, Plans, Reports.
- Omnivore import.
- Gatekeeper scoring.
- Mock Deep Research adapter.

## v0.2

- Real MCP integration.
- Source Note generation.
- Mermaid maps + Intervention tables.

## v0.3

- Scheduled refresh.
- Quality rubric + contradiction detection.
- Mobile capture enhancements.

## v0.4

- n8n orchestration.
- Per-action model selection.
- Auto-generated Canvas maps.

## v1.0

- Plugin API for adapters (Zotero, Readwise).
- Cross-topic dashboards.
- Export packs (Docx/Slides).  
	EOF

## Root CLAUDE.md

cat > "$ROOT/CLAUDE.md" <<'EOF'

## CLAUDE.md — Obsidian Deep Research Assistant

## Role

You are a developer agent building an Obsidian plugin.

## Mission

Implement a plugin that manages the research workflow:  
Seed → Gatekeeper → Plan → Run (Deep Research MCP) → Report + Source Notes → Topic Hub → Harvest.

## Standards

- Use TypeScript + Obsidian API.
- Local-first: all data as Markdown + frontmatter.
- Transparent: every claim must link to Source Notes.
- Respect templates in `/templates`.
- Don’t hardcode secrets (Omnivore tokens, MCP endpoints

---

Make sure this is formatted correctly. So far it is not in one code block

---

Got it 👍 — I’ll give you the **entire `init.sh` script in one properly formatted code block**, no interruptions. You can copy/paste it as-is and run it.

---

```bash
bash#!/usr/bin/env bash
set -euo pipefail

ROOT="obsidian-deep-research-assistant"
mkdir -p "$ROOT"/{templates,adapters,ui,notes,workflows}

# README.md
cat > "$ROOT/README.md" <<'EOF'
# Obsidian Deep Research Assistant

An Obsidian plugin that integrates AI deep research directly into your vault.  
It helps you capture seeds, decide which ideas deserve deep research, craft structured plans, execute iterative deep research jobs (via MCP servers or local tools), and generate linked notes (Topic Hubs, Reports, Source Notes, Maps, Harvest outputs).

## Highlights
- **Capture:** Seeds from quick notes or Omnivore highlights.
- **Gatekeeper:** Scores which ideas deserve deep research.
- **Planning:** Auto-generated sub-questions, rubrics, deliverables.
- **Execution:** Runs jobs against Deep Research MCP servers.
- **Ingestion:** Creates structured notes in your vault.
- **Synthesis:** Drafts essays, presentations, or clinical theories.

Read the requirements in [\`PROJECT_OVERVIEW.md\`](PROJECT_OVERVIEW.md).
EOF

# PROJECT_OVERVIEW.md
cat > "$ROOT/PROJECT_OVERVIEW.md" <<'EOF'
# Project Overview

## Problem
Researchers, therapists, and knowledge workers want structured AI-assisted research that lives directly in their notes. Current tools are scattered, opaque, or siloed.

## Goals
- **Local-first:** Store all outputs in Obsidian markdown notes.
- **Structured flow:** Seed → Gatekeep → Plan → Run → Ingest → Synthesize.
- **Evidence-first:** Require citations, quality flags, uncertainty boxes.
- **Integrations:** Omnivore for capture, MCP servers for research, optional n8n for orchestration.
- **Extensible:** Support additional adapters (Zotero, Readwise, Hypothes.is).

## Users
- Obsidian power users.
- Therapists building theories or client materials.
- Academics and knowledge workers with ADHD who benefit from structured workflows.

## Non-Goals
- Not a general AI chatbot.
- Not a replacement for human judgment in clinical or academic work.
EOF

# REQUIREMENTS.md
cat > "$ROOT/REQUIREMENTS.md" <<'EOF'
# Functional Requirements

- Create and manage Seeds.
- Score Seeds for deep research worthiness.
- Build Plans (sub-questions, search strategies, deliverables).
- Execute Plans with Deep Research MCP servers.
- Generate Reports with executive briefs, maps, and tables.
- Create Source Notes per citation.
- Build Topic Hubs that aggregate outputs.
- Draft Harvest outputs (essays, slides).
- Refresh Reports with new literature.

# Non-Functional Requirements
- Local-first storage in Markdown.
- Transparent provenance for every claim.
- Extensible adapters for Omnivore, MCP, LLMs.
- Minimal dependencies; plugin must run offline (except during research).

# Commands
- \`New Seed\`
- \`Score Seed\`
- \`Create Plan\`
- \`Run Plan\`
- \`Ingest Results\`
- \`Draft Position Paper\`
- \`Sync from Omnivore\`
- \`Open Topic Hub\`

# Safety
- Every claim must link to a Source Note.
- All quotes ≤25 words.
- Quality flags required per Source (strong/mixed/weak).
- Contradictions highlighted.
EOF

# ARCHITECTURE.md
cat > "$ROOT/ARCHITECTURE.md" <<'EOF'
# Architecture

## Layers
- **UI Layer**
  - Research Console (sidebar)
  - Topic Hub dashboards
  - Job Runner panel
  - Modals for Seeds/Plans

- **Core**
  - Job Queue + State Machine
  - Note Generator
  - Linker & Provenance Logger

- **Adapters**
  - Omnivore API
  - Deep Research MCP servers
  - LLM endpoints
  - Optional n8n webhook

- **Storage**
  - Notes in Markdown with frontmatter contracts.
  - \`.json\` cache for metadata and Omnivore cursors.

## Flow
Seed → Gatekeeper → Plan → Run → Report + Source Notes → Topic Hub → Harvest.
EOF

# DATA_MODEL.md
cat > "$ROOT/DATA_MODEL.md" <<'EOF'
# Data Models

## Topic
\`\`\`yaml
---
type: topic
slug: confidence_and_self_trust
title: Confidence & Self-Trust
status: active
tags: [theory, clinical]
---
```

## Seed

## Plan

## Report

## Source Note

EOF

## WORKFLOWS.md

cat > "$ROOT/WORKFLOWS.md" <<'EOF'

## Workflows

## Seed → Plan → Run → Report

1. Capture Seed.
2. Gatekeeper scores depth-worthiness.
3. Promote to Plan (generate thesis, sub-questions, strategy).
4. Run Plan with Deep Research adapter.
5. Receive Report + Source Notes.
6. Topic Hub auto-updates.

## Mobile Capture via Omnivore

1. Save article/highlights in Omnivore.
2. Plugin syncs, creates/updates Source Note.
3. Link to Topic Hub manually or automatically.

## Scheduled Refresh

1. Weekly cron (via n8n or plugin setting).
2. Re-run Plan with `new since` constraint.
3. Append “What Changed” section to Report.  
	EOF

## UI\_UX.md

cat > "$ROOT/UI\_UX.md" <<'EOF'

## UI / UX

## Research Console (sidebar)

- Tabs: Seeds | Plans | Runs | Sources | Claims
- Filters by topic, score, status.

## Topic Hub

- Dashboard with KPIs: last run, sources count, strong evidence, open questions.
- Latest Report preview.
- Source table (Dataview/Bases).
- Interventions table.
- “Open Canvas Map” button.

## Job Runner

- Streaming logs of deep research job.
- Tabs: Status | Audit (prompts/rubrics) | Artifacts.

## Mobile

- Quick Seed capture command.
- Sync Omnivore highlights into Source Notes.  
	EOF

## INTEGRATIONS.md

cat > "$ROOT/INTEGRATIONS.md" <<'EOF'

## Integrations

## Omnivore

- Pull highlights since last sync.
- Merge into Source Notes.
- De-dupe by URL/hash.

## Deep Research MCP

- Send Plan JSON payload: thesis, sub-questions, rubric, deliverables.
- Receive artifacts: brief.md, map.mmd, interventions.csv, citations.json.

## LLMs

- Local: Ollama/LM Studio.
- Cloud: OpenAI, Anthropic.
- Select per action: Gatekeeper, Plan Builder, Writer.

## Optional n8n

- Webhook to run long jobs outside Obsidian.
- n8n executes MCP, posts back results.  
	EOF

## ROADMAP.md

cat > "$ROOT/ROADMAP.md" <<'EOF'

## Roadmap

## MVP

- Seeds, Plans, Reports.
- Omnivore import.
- Gatekeeper scoring.
- Mock Deep Research adapter.

## v0.2

- Real MCP integration.
- Source Note generation.
- Mermaid maps + Intervention tables.

## v0.3

- Scheduled refresh.
- Quality rubric + contradiction detection.
- Mobile capture enhancements.

## v0.4

- n8n orchestration.
- Per-action model selection.
- Auto-generated Canvas maps.

## v1.0

- Plugin API for adapters (Zotero, Readwise).
- Cross-topic dashboards.
- Export packs (Docx/Slides).  
	EOF

## Root CLAUDE.md

cat > "$ROOT/CLAUDE.md" <<'EOF'

## CLAUDE.md — Obsidian Deep Research Assistant

## Role

You are a developer agent building an Obsidian plugin.

## Mission

Implement a plugin that manages the research workflow:  
Seed → Gatekeeper → Plan → Run (Deep Research MCP) → Report + Source Notes → Topic Hub → Harvest.

## Standards

- Use TypeScript + Obsidian API.
- Local-first: all data as Markdown + frontmatter.
- Transparent: every claim must link to Source Notes.
- Respect templates in `/templates`.
- Don’t hardcode secrets (Omnivore tokens, MCP endpoints).
- Keep logs and audit trails.

## Build Plan

1. MVP: Seeds/Plans/Reports + Omnivore import + mock adapter.
2. Add MCP integration.
3. Implement Source Note generator.
4. Build Research Console, Topic Hub, Job Runner.
5. Add Harvest drafting (essays/slides).
6. Scheduled refresh support.
7. Pluggable adapters.

## Ask-before-acting rules

- Confirm before overwriting or deleting files.
- Validate payloads before sending to MCP.
- If requirements conflict, ask for clarification.  
	EOF

## Subfolder CLAUDE.md files

for sub in adapters ui notes workflows; do  
cat > "$ROOT/$sub/CLAUDE.md" <<EOF

## CLAUDE.md — ${sub^}

## Role

Implement components in the \`$sub\` module.

## Standards

- Follow contracts in DATA\_MODEL.md.
- Keep code modular and documented.
- Respect Obsidian plugin API patterns.  
	EOF  
	done

## Templates

## cat > "$ROOT/templates/DR\_Seed.md" <<'EOF'

## type: seed topic: status: captured priority: medium

## Seed: {{title}}

## Spark

{{summary}}

## Initial Questions

## Gatekeeper

- Verdict:
- Score:
- Rationale:  
	EOF

## cat > "$ROOT/templates/DR\_Plan.md" <<'EOF'

## type: dr-plan topic: status: planned

## Deep Research Plan: {{title}}

## Thesis

## Sub-Questions

## Search Strategy

## Deliverables

## Rubric

EOF

## cat > "$ROOT/templates/DR\_Report.md" <<'EOF'

## type: dr-report topic: status: complete sources: \[\]

## Deep Research Report — {{title}}

## Executive Brief

## Key Claims

## Concept Map

## Intervention Table

| Protocol | Target | Evidence | RCT? | Duration | Notes |
| --- | --- | --- | --- | --- | --- |
| EOF |  |  |  |  |  |

## cat > "$ROOT/templates/DR\_SourceNote.md" <<'EOF'

## type: source title: authors: year: pub: doi: url: quality:

## {{title}}

## TL;DR

- 1 sentence
- 3 bullets
- 1 paragraph

## Methods

## Findings

## Clinical Relevance

## Quotes

EOF

## cat > "$ROOT/templates/Topic\_Hub.md" <<'EOF'

## type: topic slug: title: status: active

## Topic Hub: {{title}}

## Overview

## Source Notes

## Reports

## Open Questions

## Next Steps

EOF

## Zip it

zip -r "${ROOT}.zip" "$ROOT"  
echo "✅ Project skeleton created: ${ROOT}.zip"

---

Look at your output from the previous message a correct it so that is one SH file Got it 👍 — I’ll give you the entire init.sh script in one properly formatted code block, no interruptions. You can copy/paste it as-is and run it. ⸻ #!/usr/bin/env bash set -euo pipefail ROOT="obsidian-deep-research-assistant" mkdir -p "$ROOT"/{templates,adapters,ui,notes,workflows} # README.md cat > "$ROOT/README.md" <<'EOF' # Obsidian Deep Research Assistant An Obsidian plugin that integrates AI deep research directly into your vault. It helps you capture seeds, decide which ideas deserve deep research, craft structured plans, execute iterative deep research jobs (via MCP servers or local tools), and generate linked notes (Topic Hubs, Reports, Source Notes, Maps, Harvest outputs). ## Highlights - \*\*Capture:\*\* Seeds from quick notes or Omnivore highlights. - \*\*Gatekeeper:\*\* Scores which ideas deserve deep research. - \*\*Planning:\*\* Auto-generated sub-questions, rubrics, deliverables. - \*\*Execution:\*\* Runs jobs against Deep Research MCP servers. - \*\*Ingestion:\*\* Creates structured notes in your vault. - \*\*Synthesis:\*\* Drafts essays, presentations, or clinical theories. Read the requirements in \[`PROJECT_OVERVIEW.md`\](PROJECT\_OVERVIEW.md). EOF # PROJECT\_OVERVIEW.md cat > "$ROOT/PROJECT\_OVERVIEW.md" <<'EOF' # Project Overview ## Problem Researchers, therapists, and knowledge workers want structured AI-assisted research that lives directly in their notes. Current tools are scattered, opaque, or siloed. ## Goals - \*\*Local-first:\*\* Store all outputs in Obsidian markdown notes. - \*\*Structured flow:\*\* Seed → Gatekeep → Plan → Run → Ingest → Synthesize. - \*\*Evidence-first:\*\* Require citations, quality flags, uncertainty boxes. - \*\*Integrations:\*\* Omnivore for capture, MCP servers for research, optional n8n for orchestration. - \*\*Extensible:\*\* Support additional adapters (Zotero, Readwise, Hypothes.is). ## Users - Obsidian power users. - Therapists building theories or client materials. - Academics and knowledge workers with ADHD who benefit from structured workflows. ## Non-Goals - Not a general AI chatbot. - Not a replacement for human judgment in clinical or academic work. EOF # REQUIREMENTS.md cat > "$ROOT/REQUIREMENTS.md" <<'EOF' # Functional Requirements - Create and manage Seeds. - Score Seeds for deep research worthiness. - Build Plans (sub-questions, search strategies, deliverables). - Execute Plans with Deep Research MCP servers. - Generate Reports with executive briefs, maps, and tables. - Create Source Notes per citation. - Build Topic Hubs that aggregate outputs. - Draft Harvest outputs (essays, slides). - Refresh Reports with new literature. # Non-Functional Requirements - Local-first storage in Markdown. - Transparent provenance for every claim. - Extensible adapters for Omnivore, MCP, LLMs. - Minimal dependencies; plugin must run offline (except during research). # Commands - `New Seed` - `Score Seed` - `Create Plan` - `Run Plan` - `Ingest Results` - `Draft Position Paper` - `Sync from Omnivore` - `Open Topic Hub` # Safety - Every claim must link to a Source Note. - All quotes ≤25 words. - Quality flags required per Source (strong/mixed/weak). - Contradictions highlighted. EOF # ARCHITECTURE.md cat > "$ROOT/ARCHITECTURE.md" <<'EOF' # Architecture ## Layers - \*\*UI Layer\*\* - Research Console (sidebar) - Topic Hub dashboards - Job Runner panel - Modals for Seeds/Plans - \*\*Core\*\* - Job Queue + State Machine - Note Generator - Linker & Provenance Logger - \*\*Adapters\*\* - Omnivore API - Deep Research MCP servers - LLM endpoints - Optional n8n webhook - \*\*Storage\*\* - Notes in Markdown with frontmatter contracts. - `.json` cache for metadata and Omnivore cursors. ## Flow Seed → Gatekeeper → Plan → Run → Report + Source Notes → Topic Hub → Harvest. EOF # DATA\_MODEL.md cat > "$ROOT/DATA\_MODEL.md" <<'EOF' # Data Models ## Topic
```markdown
yaml
---
type: topic
slug: confidence_and_self_trust
title: Confidence & Self-Trust
status: active
tags: [theory, clinical]
---

Seed

---
type: seed
topic: confidence_and_self_trust
status: captured
priority: medium
score: 0
---

Plan

---
type: dr-plan
topic: confidence_and_self_trust
seed: Seed-2025-09-01.md
deliverables: [brief, map, table]
status: planned
---

Report

---
type: dr-report
topic: confidence_and_self_trust
plan: DR_Plan-2025-09-01.md
run_id: dr-20250901-1150
status: complete
sources: [source_abc123, source_def456]
---

Source Note

---
type: source
id: source_abc123
title: "Self-Efficacy"
authors: ["Bandura, A."]
year: 1977
pub: Psychological Review
doi: 10.xxxx/xxxx
quality: strong
supports_claims: [claim_1]
---

EOF

WORKFLOWS.md

cat > “$ROOT/WORKFLOWS.md” <<‘EOF’

Workflows

Seed → Plan → Run → Report
    1.    Capture Seed.
    2.    Gatekeeper scores depth-worthiness.
    3.    Promote to Plan (generate thesis, sub-questions, strategy).
    4.    Run Plan with Deep Research adapter.
    5.    Receive Report + Source Notes.
    6.    Topic Hub auto-updates.

Mobile Capture via Omnivore
    1.    Save article/highlights in Omnivore.
    2.    Plugin syncs, creates/updates Source Note.
    3.    Link to Topic Hub manually or automatically.

Scheduled Refresh
    1.    Weekly cron (via n8n or plugin setting).
    2.    Re-run Plan with new since constraint.
    3.    Append “What Changed” section to Report.
EOF

UI_UX.md

cat > “$ROOT/UI_UX.md” <<‘EOF’

UI / UX

Research Console (sidebar)
    •    Tabs: Seeds | Plans | Runs | Sources | Claims
    •    Filters by topic, score, status.

Topic Hub
    •    Dashboard with KPIs: last run, sources count, strong evidence, open questions.
    •    Latest Report preview.
    •    Source table (Dataview/Bases).
    •    Interventions table.
    •    “Open Canvas Map” button.

Job Runner
    •    Streaming logs of deep research job.
    •    Tabs: Status | Audit (prompts/rubrics) | Artifacts.

Mobile
    •    Quick Seed capture command.
    •    Sync Omnivore highlights into Source Notes.
EOF

INTEGRATIONS.md

cat > “$ROOT/INTEGRATIONS.md” <<‘EOF’

Integrations

Omnivore
    •    Pull highlights since last sync.
    •    Merge into Source Notes.
    •    De-dupe by URL/hash.

Deep Research MCP
    •    Send Plan JSON payload: thesis, sub-questions, rubric, deliverables.
    •    Receive artifacts: brief.md, map.mmd, interventions.csv, citations.json.

LLMs
    •    Local: Ollama/LM Studio.
    •    Cloud: OpenAI, Anthropic.
    •    Select per action: Gatekeeper, Plan Builder, Writer.

Optional n8n
    •    Webhook to run long jobs outside Obsidian.
    •    n8n executes MCP, posts back results.
EOF

ROADMAP.md

cat > “$ROOT/ROADMAP.md” <<‘EOF’

Roadmap

MVP
    •    Seeds, Plans, Reports.
    •    Omnivore import.
    •    Gatekeeper scoring.
    •    Mock Deep Research adapter.

v0.2
    •    Real MCP integration.
    •    Source Note generation.
    •    Mermaid maps + Intervention tables.

v0.3
    •    Scheduled refresh.
    •    Quality rubric + contradiction detection.
    •    Mobile capture enhancements.

v0.4
    •    n8n orchestration.
    •    Per-action model selection.
    •    Auto-generated Canvas maps.

v1.0
    •    Plugin API for adapters (Zotero, Readwise).
    •    Cross-topic dashboards.
    •    Export packs (Docx/Slides).
EOF

Root CLAUDE.md

cat > “$ROOT/CLAUDE.md” <<‘EOF’

CLAUDE.md — Obsidian Deep Research Assistant

Role

You are a developer agent building an Obsidian plugin.

Mission

Implement a plugin that manages the research workflow:
Seed → Gatekeeper → Plan → Run (Deep Research MCP) → Report + Source Notes → Topic Hub → Harvest.

Standards
    •    Use TypeScript + Obsidian API.
    •    Local-first: all data as Markdown + frontmatter.
    •    Transparent: every claim must link to Source Notes.
    •    Respect templates in /templates.
    •    Don’t hardcode secrets (Omnivore tokens, MCP endpoints).
    •    Keep logs and audit trails.

Build Plan
    1.    MVP: Seeds/Plans/Reports + Omnivore import + mock adapter.
    2.    Add MCP integration.
    3.    Implement Source Note generator.
    4.    Build Research Console, Topic Hub, Job Runner.
    5.    Add Harvest drafting (essays/slides).
    6.    Scheduled refresh support.
    7.    Pluggable adapters.

Ask-before-acting rules
    •    Confirm before overwriting or deleting files.
    •    Validate payloads before sending to MCP.
    •    If requirements conflict, ask for clarification.
EOF

Subfolder CLAUDE.md files

for sub in adapters ui notes workflows; do
cat > “$ROOT/$sub/CLAUDE.md” <<EOF

CLAUDE.md — ${sub^}

Role

Implement components in the \`$sub\` module.

Standards
    •    Follow contracts in DATA_MODEL.md.
    •    Keep code modular and documented.
    •    Respect Obsidian plugin API patterns.
EOF
done

Templates

cat > “$ROOT/templates/DR_Seed.md” <<‘EOF’

type: seed
topic:
status: captured
priority: medium

Seed: {{title}}

Spark

{{summary}}

Initial Questions
    •    

Gatekeeper
    •    Verdict:
    •    Score:
    •    Rationale:
EOF

cat > “$ROOT/templates/DR_Plan.md” <<‘EOF’

type: dr-plan
topic:
status: planned

Deep Research Plan: {{title}}

Thesis

Sub-Questions

Search Strategy

Deliverables

Rubric

EOF

cat > “$ROOT/templates/DR_Report.md” <<‘EOF’

type: dr-report
topic:
status: complete
sources: []

Deep Research Report — {{title}}

Executive Brief

Key Claims

Concept Map

graph TD

Intervention Table

Protocol    Target    Evidence    RCT?    Duration    Notes
EOF                    

cat > “$ROOT/templates/DR_SourceNote.md” <<‘EOF’

type: source
title:
authors:
year:
pub:
doi:
url:
quality:

{{title}}

TL;DR
    •    1 sentence
    •    3 bullets
    •    1 paragraph

Methods

Findings

Clinical Relevance

Quotes

EOF

cat > “$ROOT/templates/Topic_Hub.md” <<‘EOF’

type: topic
slug:
title:
status: active

Topic Hub: {{title}}

Overview

Source Notes

Reports

Open Questions

Next Steps

EOF

Zip it

zip -r “${ROOT}.zip” “$ROOT”
echo “✅ Project skeleton created: ${ROOT}.zip”

---

Would you like me to also trim the long \`CLAUDE.md\` subfolder stubs into more detailed ones (adapters/ui/notes/workflows) — or keep them short like I did here?
```

---

You're right — that version had smart quotes and broken here-docs. Here’s a **single, clean `init.sh`** you can paste and run as-is. It creates the full folder, writes all docs (with proper YAML fences), and zips it.

```bash
bash#!/usr/bin/env bash
set -euo pipefail

ROOT="obsidian-deep-research-assistant"
mkdir -p "$ROOT"/{templates,adapters,ui,notes,workflows}

# README.md
cat > "$ROOT/README.md" <<'EOF'
# Obsidian Deep Research Assistant

An Obsidian plugin that integrates AI deep research directly into your vault.  
It helps you capture seeds, decide which ideas deserve deep research, craft structured plans, execute iterative deep research jobs (via MCP servers or local tools), and generate linked notes (Topic Hubs, Reports, Source Notes, Maps, Harvest outputs).

## Highlights
- **Capture:** Seeds from quick notes or Omnivore highlights.
- **Gatekeeper:** Scores which ideas deserve deep research.
- **Planning:** Auto-generated sub-questions, rubrics, deliverables.
- **Execution:** Runs jobs against Deep Research MCP servers.
- **Ingestion:** Creates structured notes in your vault.
- **Synthesis:** Drafts essays, presentations, or clinical theories.

Read the requirements in [\`PROJECT_OVERVIEW.md\`](PROJECT_OVERVIEW.md).
EOF

# PROJECT_OVERVIEW.md
cat > "$ROOT/PROJECT_OVERVIEW.md" <<'EOF'
# Project Overview

## Problem
Researchers, therapists, and knowledge workers want structured AI-assisted research that lives directly in their notes. Current tools are scattered, opaque, or siloed.

## Goals
- **Local-first:** Store all outputs in Obsidian markdown notes.
- **Structured flow:** Seed → Gatekeep → Plan → Run → Ingest → Synthesize.
- **Evidence-first:** Require citations, quality flags, uncertainty boxes.
- **Integrations:** Omnivore for capture, MCP servers for research, optional n8n for orchestration.
- **Extensible:** Support additional adapters (Zotero, Readwise, Hypothes.is).

## Users
- Obsidian power users.
- Therapists building theories or client materials.
- Academics and knowledge workers with ADHD who benefit from structured workflows.

## Non-Goals
- Not a general AI chatbot.
- Not a replacement for human judgment in clinical or academic work.
EOF

# REQUIREMENTS.md
cat > "$ROOT/REQUIREMENTS.md" <<'EOF'
# Functional Requirements

- Create and manage Seeds.
- Score Seeds for deep research worthiness.
- Build Plans (sub-questions, search strategies, deliverables).
- Execute Plans with Deep Research MCP servers.
- Generate Reports with executive briefs, maps, and tables.
- Create Source Notes per citation.
- Build Topic Hubs that aggregate outputs.
- Draft Harvest outputs (essays, slides).
- Refresh Reports with new literature.

# Non-Functional Requirements
- Local-first storage in Markdown.
- Transparent provenance for every claim.
- Extensible adapters for Omnivore, MCP, LLMs.
- Minimal dependencies; plugin must run offline (except during research).

# Commands
- \`New Seed\`
- \`Score Seed\`
- \`Create Plan\`
- \`Run Plan\`
- \`Ingest Results\`
- \`Draft Position Paper\`
- \`Sync from Omnivore\`
- \`Open Topic Hub\`

# Safety
- Every claim must link to a Source Note.
- All quotes ≤25 words.
- Quality flags required per Source (strong/mixed/weak).
- Contradictions highlighted.
EOF

# ARCHITECTURE.md
cat > "$ROOT/ARCHITECTURE.md" <<'EOF'
# Architecture

## Layers
- **UI Layer**
  - Research Console (sidebar)
  - Topic Hub dashboards
  - Job Runner panel
  - Modals for Seeds/Plans

- **Core**
  - Job Queue + State Machine
  - Note Generator
  - Linker & Provenance Logger

- **Adapters**
  - Omnivore API
  - Deep Research MCP servers
  - LLM endpoints
  - Optional n8n webhook

- **Storage**
  - Notes in Markdown with frontmatter contracts.
  - \`.json\` cache for metadata and Omnivore cursors.

## Flow
Seed → Gatekeeper → Plan → Run → Report + Source Notes → Topic Hub → Harvest.
EOF

# DATA_MODEL.md
cat > "$ROOT/DATA_MODEL.md" <<'EOF'
# Data Models

## Topic
\`\`\`yaml
---
type: topic
slug: confidence_and_self_trust
title: Confidence & Self-Trust
status: active
tags: [theory, clinical]
---
```

## Seed

## Plan

## Report

## Source Note

EOF

## WORKFLOWS.md

cat > "$ROOT/WORKFLOWS.md" <<'EOF'

## Workflows

## Seed → Plan → Run → Report

1. Capture Seed.
2. Gatekeeper scores depth-worthiness.
3. Promote to Plan (generate thesis, sub-questions, strategy).
4. Run Plan with Deep Research adapter.
5. Receive Report + Source Notes.
6. Topic Hub auto-updates.

## Mobile Capture via Omnivore

1. Save article/highlights in Omnivore.
2. Plugin syncs, creates/updates Source Note.
3. Link to Topic Hub manually or automatically.

## Scheduled Refresh

1. Weekly cron (via n8n or plugin setting).
2. Re-run Plan with `new since` constraint.
3. Append “What Changed” section to Report.  
	EOF

## UI\_UX.md

cat > "$ROOT/UI\_UX.md" <<'EOF'

## UI / UX

## Research Console (sidebar)

- Tabs: Seeds | Plans | Runs | Sources | Claims
- Filters by topic, score, status.

## Topic Hub

- Dashboard with KPIs: last run, sources count, strong evidence, open questions.
- Latest Report preview.
- Source table (Dataview/Bases).
- Interventions table.
- “Open Canvas Map” button.

## Job Runner

- Streaming logs of deep research job.
- Tabs: Status | Audit (prompts/rubrics) | Artifacts.

## Mobile

- Quick Seed capture command.
- Sync Omnivore highlights into Source Notes.  
	EOF

## INTEGRATIONS.md

cat > "$ROOT/INTEGRATIONS.md" <<'EOF'

## Integrations

## Omnivore

- Pull highlights since last sync.
- Merge into Source Notes.
- De-dupe by URL/hash.

## Deep Research MCP

- Send Plan JSON payload: thesis, sub-questions, rubric, deliverables.
- Receive artifacts: brief.md, map.mmd, interventions.csv, citations.json.

## LLMs

- Local: Ollama/LM Studio.
- Cloud: OpenAI, Anthropic.
- Select per action: Gatekeeper, Plan Builder, Writer.

## Optional n8n

- Webhook to run long jobs outside Obsidian.

---

It is still not formatting correctly. Maybe just create the complete thing in a zip file

---

---

Like not the init script but the directory with all files in a zip file

---

Here you go — I’ve created the full project directory with all the docs, templates, and `CLAUDE.md` files, and packaged it into a zip:

📦

This contains:

- Core docs (`README.md`, `PROJECT_OVERVIEW.md`, `REQUIREMENTS.md`, etc.)
- A root `CLAUDE.md` plus module-level ones in `adapters/`, `ui/`, `notes/`, and `workflows/`
- Templates in `/templates` for Seeds, Plans, Reports, Source Notes, and Topic Hubs

Do you want me to **expand each doc with the full detailed content** we drafted earlier, or keep this zip as a lightweight scaffold?