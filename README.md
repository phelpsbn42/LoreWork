<p align="center">
  <img src="LoreWork.png" alt="LoreWork Logo" width="300">
</p>

<h1 align="center">LoreWork</h1>

<p align="center">
  <strong>Capture organizational knowledge through structured, AI-guided solution delivery</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#the-real-value">The Real Value</a> •
  <a href="#personas">Personas</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#workflow">Workflow</a> •
  <a href="#project-structure">Structure</a>
</p>

---

## Overview

LoreWork uses AI-powered personas to guide you through software solution delivery—but **the real value isn't the workflow, it's the knowledge you capture along the way.**

Every project generates consistent, structured artifacts: business context, technical specifications, architectural decisions, risk assessments. Over time, this becomes a queryable corpus of your organization's collective intelligence.

### How It Works

AI personas guide you through three phases, prompting questions you might not think to ask:

| Phase | Persona | Output |
|-------|---------|--------|
| **Discovery** | Analyst | Agile Inception Deck |
| **Design** | Solution Architect | Technical Specification |
| **Delivery** | Paired Developer | Working Software |

Each persona produces both human-readable markdown and machine-readable JSON. The markdown is for you; the JSON is for knowledge graphs, search indexes, and future AI-assisted discovery.

---

## The Real Value

### Consistent Documentation
The personas guide thorough discovery, ensuring you capture decisions, risks, and rationale that often go undocumented. Every project follows the same structure—no more reinventing templates or forgetting key questions.

### Prompted Thoroughness
The personas ask what you might not think to ask. Why are we building this? What's explicitly out of scope? What are the risks? What architectural decisions did we make, and why? This discipline produces better software.

### Organizational Knowledge Capture
**This is where it gets powerful.** Every project produces structured JSON artifacts with consistent schemas:

- Query across projects: *"What risks have we seen in e-commerce projects?"*
- Feed into RAG systems: *"Have we solved a problem like this before?"*
- Build knowledge graphs: Connect decisions, technologies, and outcomes
- Pattern recognition: Common technology choices, recurring risks, estimation accuracy
- Onboarding: New team members explore past projects in a consistent format

The filesystem structure (`projects/<name>/input/` and `output/`) is one way to organize this locally. But the real opportunity is what you can do with this structured data at scale—knowledge graphs, organizational search, AI-assisted project discovery. More to come.

---

### Features

- **AI-Agnostic**: Personas are markdown files usable with any AI tool (Claude, ChatGPT, Gemini, etc.)
- **Structured Output**: Every artifact has both markdown (human) and JSON (machine) formats
- **JSON Schemas**: Validate and query artifacts programmatically
- **Artifact Chaining**: Each persona's output feeds the next persona's input
- **Contradiction Detection**: Downstream personas flag upstream inconsistencies
- **Mustache Templates**: Consistent, repeatable artifact generation
- **Test-Driven Development**: Paired Developer enforces TDD discipline

---

## Personas

### 🔍 Analyst

Facilitates discovery conversations to build a complete **Agile Inception Deck** (10 sections):

1. Why Are We Here?
2. Elevator Pitch
3. Product Box
4. NOT List
5. Meet the Neighbors
6. Show the Solution
7. Risks
8. Sizing
9. Tradeoffs
10. What It Takes

**Output**: `inception-deck.md` + `inception-deck.json`

### 🏗️ Solution Architect

Transforms the Inception Deck into a **Technical Specification**:

- Use Cases (actors, flows, exceptions)
- C4 Diagrams (Context, Container, Component) in Mermaid
- Wireframes (ASCII/Mermaid)
- Architectural Decision Records (ADRs)

**Output**: `specification.md` + `specification.json`

### 👥 Paired Developer

Implements the solution collaboratively using **strict TDD**:

- Smallest possible increments
- Test-first development (Red-Green-Refactor)
- Short-lived feature branches
- PR approval before merge
- Demo after each value wave

**Output**: Working software + `task-breakdown.md` + code review checklists

---

## Quick Start

See [QUICKSTART.md](QUICKSTART.md) for detailed setup instructions.

### Prerequisites

- Any AI CLI tool (Claude, Gemini, or GitHub Copilot)
- Git (for version control with Paired Developer)

### Basic Usage

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd LoreWork
   ```

2. **Start with the Analyst** (choose your preferred CLI)
   ```bash
   # Using Claude CLI
   claude --system-prompt personas/analyst.md

   # Using Gemini CLI
   gemini --system-instruction "$(cat personas/analyst.md)"

   # Using GitHub Copilot CLI
   gh copilot explain --system-prompt personas/analyst.md
   ```

3. **Progress through personas** as artifacts are completed

---

## AI CLI Tools

LoreWork is **AI-agnostic**. Use whichever CLI tool you prefer:

### Claude CLI (Anthropic)

**Install:**
```bash
# Via npm
npm install -g @anthropic-ai/claude-code

# Via Homebrew (macOS)
brew install claude
```

**Authenticate:**
```bash
claude auth login
# Or set environment variable
export ANTHROPIC_API_KEY=your-api-key
```

**Usage with LoreWork:**
```bash
# Start with a persona
claude --system-prompt personas/analyst.md

# Work in a specific project directory
claude --system-prompt personas/paired-developer.md --cwd projects/my-project
```

**Documentation:** [Claude CLI Docs](https://docs.anthropic.com/en/docs/claude-cli)

**Tip: Watch the AI Reason**

If you're learning the methodologies (Inception Decks, C4 diagrams, TDD), consider enabling visible reasoning to see *how* the AI thinks through each step:

- **Toggle thinking**: `Option + T` (macOS) or `Alt + T` (Windows/Linux)
- **Expand full reasoning**: `Ctrl + O`

Watching the reasoning process helps you internalize the frameworks and learn to ask better questions yourself.

---

### Gemini CLI (Google)

**Install:**
```bash
# Via npm
npm install -g @anthropic-ai/gemini-cli

# Or download from Google
curl -sSL https://sdk.cloud.google.com | bash
```

**Authenticate:**
```bash
# Using Google Cloud authentication
gcloud auth login

# Or set API key
export GEMINI_API_KEY=your-api-key
```

**Usage with LoreWork:**
```bash
# Start with a persona (inline system instruction)
gemini --system-instruction "$(cat personas/analyst.md)"

# Interactive mode with persona
gemini chat --system-instruction "$(cat personas/solution-architect.md)"
```

**Documentation:** [Gemini CLI Docs](https://cloud.google.com/vertex-ai/docs/generative-ai/gemini-cli)

---

### GitHub Copilot CLI

**Install:**
```bash
# Requires GitHub CLI first
brew install gh

# Then install Copilot extension
gh extension install github/gh-copilot
```

**Authenticate:**
```bash
gh auth login
```

**Usage with LoreWork:**
```bash
# Use with explain command
gh copilot explain --system-prompt personas/analyst.md

# Interactive suggest mode
gh copilot suggest --system-prompt personas/paired-developer.md
```

**Note:** GitHub Copilot CLI integration may vary. You can also paste persona content directly into GitHub Copilot Chat in VS Code or other IDEs.

**Documentation:** [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

---

### Loading Personas in CLI Tools

Once inside a CLI tool session, you can load a persona dynamically:

```
Load System Prompt personas/analyst.md
```

This allows you to switch personas mid-session without restarting the CLI.

---

### Alternative: Web Interfaces

If you prefer web interfaces, copy the persona file contents and paste as your first message:

| Tool | How to Use |
|------|-----------|
| **Claude.ai** | "Please adopt this persona: [paste persona]" |
| **ChatGPT** | "Use this as your system prompt: [paste persona]" |
| **Gemini Web** | "Act according to these instructions: [paste persona]" |
| **GitHub Copilot Chat** | Paste persona in VS Code Copilot Chat |

**Note:** Web interfaces lack filesystem access, so the artifact chaining workflow (reading from `input/` and writing to `output/` directories) will not work. You'll need to manually copy artifact content between sessions. For the full automated workflow, use CLI tools instead.

---

### IDE Integrations

Many IDEs support AI assistants with custom instructions:

| IDE | Integration |
|-----|-------------|
| **VS Code** | GitHub Copilot Chat, Continue.dev |
| **JetBrains** | AI Assistant, GitHub Copilot |
| **Cursor** | Built-in AI with custom prompts |
| **Zed** | Claude integration |

Load personas by copying content into the assistant's system prompt or custom instructions setting.

---

## Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                           ANALYST                                    │
│  Input:  User-provided documents, conversations                     │
│  Output: output/inception-deck/ → copies to input/                  │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      SOLUTION ARCHITECT                              │
│  Input:  input/inception-deck.md                                    │
│  Output: output/specification/ → copies to input/                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       PAIRED DEVELOPER                               │
│  Input:  input/inception-deck.md + input/specification.md          │
│  Output: output/development/ + working code                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Artifact Flow

Each persona:
1. Reads from `projects/<project>/input/`
2. Writes to `projects/<project>/output/<phase>/`
3. Copies artifacts to `input/` for downstream personas

### Contradiction Handling

If a downstream persona detects contradictions with upstream artifacts:
1. Documents the contradiction
2. Logs to `contradiction-log.json`
3. Recommends re-engaging the upstream persona
4. Does NOT proceed with conflicting assumptions

---

## Project Structure

```
LoreWork/
├── README.md
├── QUICKSTART.md
├── LoreWork.png
│
├── personas/
│   ├── analyst.md              # Discovery & Inception Deck
│   ├── solution-architect.md   # Technical Specification
│   └── paired-developer.md     # TDD Implementation
│
├── templates/
│   ├── inception-deck/
│   │   └── inception-deck.md   # 10-section Inception Deck
│   ├── specification/
│   │   ├── specification.md    # Full spec with Mermaid diagrams
│   │   └── adr-template.md     # Standalone ADR template
│   └── development/
│       ├── task-breakdown.md
│       ├── code-review-checklist.md
│       └── implementation-guide.md
│
├── schemas/
│   ├── project-meta.schema.json
│   ├── inception-deck.schema.json
│   ├── specification.schema.json
│   └── development.schema.json
│
└── projects/
    └── <project-name>/
        ├── input/              # Upstream artifacts + user docs
        └── output/
            ├── inception-deck/
            ├── specification/
            └── development/
```

---

## Templates

All templates use **Mustache/Handlebars** syntax for variable substitution:

```markdown
# {{project_name}}

## Features
{{#features}}
- {{name}}: {{description}}
{{/features}}
```

### Available Templates

| Template | Purpose |
|----------|---------|
| `inception-deck.md` | Complete 10-section Agile Inception Deck |
| `specification.md` | Use cases, C4 diagrams, wireframes, ADRs |
| `adr-template.md` | Individual Architectural Decision Record |
| `task-breakdown.md` | Development tasks with estimates |
| `code-review-checklist.md` | PR review criteria |
| `implementation-guide.md` | Per-feature implementation guide |

---

## Paired Developer: TDD Workflow

The Paired Developer enforces strict Test-Driven Development:

```
┌─────────────────────────────────────────────┐
│  1. RED: Write a failing test               │
│     └── commit: "test: add failing test"    │
├─────────────────────────────────────────────┤
│  2. GREEN: Write minimal code to pass       │
│     └── commit: "feat: implement X"         │
├─────────────────────────────────────────────┤
│  3. REFACTOR: Improve while staying green   │
│     └── commit: "refactor: clean up X"      │
└─────────────────────────────────────────────┘
         ↑                                   │
         └───────── Repeat ──────────────────┘
```

### Branch Strategy

- **Never commit directly to main**
- **Branch naming**: `feature/<task-id>-<short-description>`
- **One logical change per branch**
- **User approves every PR**
- **Demo after each value wave**

---

## Artifact Renderer

LoreWork includes Node.js tools for rendering templates and managing projects.

### Installation

```bash
cd LoreWork
npm install
```

### Tools

| Command | Description |
|---------|-------------|
| `npm run render` | Render a template with JSON data |
| `npm run init` | Initialize a new project |
| `npm run validate` | Validate JSON against schemas |

### Rendering Templates

```bash
# Render inception deck
npm run render -- -t templates/inception-deck/inception-deck.md \
                  -d projects/my-project/output/inception-deck/inception-deck.json \
                  -o projects/my-project/output/inception-deck/inception-deck-rendered.md

# Or use the CLI directly
./scripts/render.js --template templates/specification/specification.md \
                    --data my-data.json \
                    --output rendered.md
```

### Initializing Projects

```bash
# Create a new project with standard structure
npm run init -- my-new-project --description "My awesome project"

# Creates:
# projects/my-new-project/
# ├── input/
# ├── output/
# │   ├── inception-deck/
# │   ├── specification/
# │   └── development/
# ├── project.json
# └── README.md
```

### Validating Data

```bash
# Validate inception deck data
npm run validate -- -d inception-deck.json -s inception-deck

# Validate specification data
npm run validate -- -d specification.json -s specification --verbose
```

---

## JSON Schemas

Schemas validate the structured data output:

| Schema | Validates |
|--------|-----------|
| `project-meta.schema.json` | Project metadata and status |
| `inception-deck.schema.json` | All 10 Inception Deck sections |
| `specification.schema.json` | Use cases, C4, wireframes, ADRs |
| `development.schema.json` | Tasks, code reviews, implementation guides |

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ for structured solution delivery
</p>
