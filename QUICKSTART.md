# Quick Start Guide

This guide will help you get started with LoreWork and the AI-powered personas.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Choose Your AI CLI](#choose-your-ai-cli)
  - [Claude CLI](#claude-cli-anthropic)
  - [Gemini CLI](#gemini-cli-google)
  - [GitHub Copilot CLI](#github-copilot-cli)
- [Setting Up LoreWork](#setting-up-lorework)
- [Your First Project](#your-first-project)
- [Using Each Persona](#using-each-persona)
- [Tips and Best Practices](#tips-and-best-practices)

---

## Prerequisites

- **Node.js** 18+ (for most CLI tools)
- **Git** (for version control with Paired Developer)
- **API Key** for your chosen AI provider

---

## Choose Your AI CLI

LoreWork is **AI-agnostic**. Choose whichever CLI tool works best for you:

| CLI | Provider | Best For |
|-----|----------|----------|
| Claude CLI | Anthropic | Deep reasoning, long context |
| Gemini CLI | Google | Google Cloud integration |
| GitHub Copilot | GitHub/Microsoft | VS Code users, GitHub integration |

---

## Claude CLI (Anthropic)

### Installation

**Option 1: Via npm (Recommended)**
```bash
npm install -g @anthropic-ai/claude-code
```

**Option 2: Via Homebrew (macOS)**
```bash
brew install claude
```

### Verify Installation

```bash
claude --version
```

### Authentication

```bash
# Interactive login (opens browser)
claude auth login

# Or set environment variable
export ANTHROPIC_API_KEY=your-api-key-here
```

### Usage with LoreWork

```bash
# Start with a persona
claude --system-prompt personas/analyst.md

# Work in a specific project directory
claude --system-prompt personas/paired-developer.md --cwd projects/my-project

# Interactive mode
claude
```

**Documentation:** [Claude CLI Docs](https://docs.anthropic.com/en/docs/claude-cli)

---

## Gemini CLI (Google)

### Installation

**Option 1: Via npm**
```bash
npm install -g @google/gemini-cli
```

**Option 2: Via Google Cloud SDK**
```bash
# Install Google Cloud SDK first
curl -sSL https://sdk.cloud.google.com | bash
exec -l $SHELL

# Then install the Gemini component
gcloud components install gemini-cli
```

### Verify Installation

```bash
gemini --version
```

### Authentication

```bash
# Using Google Cloud authentication
gcloud auth login
gcloud auth application-default login

# Or set API key directly
export GEMINI_API_KEY=your-api-key-here
```

### Usage with LoreWork

```bash
# Start with a persona (pass system instruction inline)
gemini --system-instruction "$(cat personas/analyst.md)"

# Interactive chat mode
gemini chat --system-instruction "$(cat personas/solution-architect.md)"

# With specific model
gemini --model gemini-pro --system-instruction "$(cat personas/paired-developer.md)"
```

**Documentation:** [Gemini API Docs](https://ai.google.dev/docs)

---

## GitHub Copilot CLI

### Installation

**Step 1: Install GitHub CLI**
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux (Debian/Ubuntu)
sudo apt install gh
```

**Step 2: Install Copilot Extension**
```bash
gh extension install github/gh-copilot
```

### Verify Installation

```bash
gh copilot --version
```

### Authentication

```bash
# Login to GitHub (opens browser)
gh auth login

# Ensure Copilot access
gh auth refresh -s copilot
```

### Usage with LoreWork

```bash
# Explain mode with persona context
gh copilot explain --system-prompt "$(cat personas/analyst.md)" "Help me start a new project"

# Suggest mode for code
gh copilot suggest --system-prompt "$(cat personas/paired-developer.md)"
```

**Note:** GitHub Copilot CLI has more limited system prompt support. For full persona functionality, consider using **GitHub Copilot Chat** in VS Code:

1. Open VS Code with GitHub Copilot extension
2. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
3. Paste the persona content as your first message
4. Continue the conversation

**Documentation:** [GitHub Copilot CLI Docs](https://docs.github.com/en/copilot/github-copilot-in-the-cli)

---

## Quick Comparison

| Feature | Claude CLI | Gemini CLI | Copilot CLI |
|---------|-----------|------------|-------------|
| System prompt file | `--system-prompt file.md` | `--system-instruction "$(cat file.md)"` | Limited support |
| Interactive mode | Yes | Yes | Via VS Code |
| Code execution | Yes | Limited | Via VS Code |
| Best IDE integration | Cursor, Zed | Google IDEs | VS Code |

---

## Setting Up LoreWork

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LoreWork
```

### 2. Explore the Structure

```bash
ls -la
```

You should see:
```
personas/           # AI persona system prompts
templates/          # Mustache templates for artifacts
schemas/            # JSON schemas for validation
projects/           # Your project workspaces
README.md
QUICKSTART.md
```

### 3. Install Dependencies

```bash
npm install
```

This installs the template renderer and validation tools.

### 4. Create Your First Project

```bash
# Using the init script (recommended)
npm run init -- my-first-project --description "My first LoreWork project"

# Or manually
mkdir -p projects/my-first-project/{input,output/{inception-deck,specification,development}}
```

---

## Your First Project

### Step 1: Start with the Analyst

The Analyst helps you build an Agile Inception Deck through discovery conversations.

**Choose your CLI:**
```bash
# Claude CLI
claude --system-prompt personas/analyst.md

# Gemini CLI
gemini chat --system-instruction "$(cat personas/analyst.md)"

# GitHub Copilot (in VS Code Copilot Chat)
# Paste contents of personas/analyst.md as first message
```

**What to expect:**
- The Analyst will greet you and ask about your project
- You'll be guided through 10 sections of the Inception Deck
- Answer questions about your problem, solution, stakeholders, risks, etc.

**Output:**
- `projects/<project>/output/inception-deck/inception-deck.md`
- `projects/<project>/output/inception-deck/inception-deck.json`
- Copies placed in `projects/<project>/input/` for next persona

### Step 2: Move to Solution Architect

Once your Inception Deck is complete, engage the Solution Architect.

**Choose your CLI:**
```bash
# Claude CLI
claude --system-prompt personas/solution-architect.md

# Gemini CLI
gemini chat --system-instruction "$(cat personas/solution-architect.md)"

# GitHub Copilot (in VS Code Copilot Chat)
# Paste contents of personas/solution-architect.md as first message
```

**What to expect:**
- The Solution Architect reads your Inception Deck from `input/`
- You'll create use cases, C4 diagrams, wireframes, and ADRs
- Any contradictions with the Inception Deck will be flagged

**Output:**
- `projects/<project>/output/specification/specification.md`
- `projects/<project>/output/specification/specification.json`
- Copies placed in `projects/<project>/input/` for next persona

### Step 3: Implement with Paired Developer

With specifications complete, start implementation.

**Choose your CLI:**
```bash
# Claude CLI
claude --system-prompt personas/paired-developer.md

# Gemini CLI
gemini chat --system-instruction "$(cat personas/paired-developer.md)"

# GitHub Copilot (in VS Code Copilot Chat)
# Paste contents of personas/paired-developer.md as first message
```

**What to expect:**
- The Paired Developer reads both Inception Deck and Specification
- Work is broken into the smallest possible increments
- Strict TDD: tests first, then implementation
- Each change goes through a PR for your approval
- Demos after each wave of value delivery

**Output:**
- Working, tested code
- `projects/<project>/output/development/task-breakdown.md`
- Code review checklists for each PR

---

## Using Each Persona

### Working with the Analyst

**Good prompts:**
- "I want to build a project management tool for small teams"
- "We're creating an API for integrating with payment providers"
- "Help me define a mobile app for tracking fitness goals"

**The Analyst will ask about:**
- The problem you're solving
- Who experiences the problem
- What success looks like
- Who the stakeholders are
- What's explicitly out of scope
- Risks and constraints

### Working with the Solution Architect

**Good prompts:**
- "Let's start with the use cases"
- "Show me the C4 context diagram"
- "What technology should we use for the database?"
- "I need to document why we chose REST over GraphQL"

**The Solution Architect will:**
- Reference your Inception Deck constantly
- Create Mermaid diagrams for visualization
- Document architectural decisions as ADRs
- Flag any contradictions with upstream artifacts

### Working with the Paired Developer

**Good prompts:**
- "Let's break down the user authentication feature"
- "Write a failing test for the login endpoint"
- "I'm ready to review the PR"
- "Show me a demo of what we've built"

**The Paired Developer will:**
- Split work into 1-3 point increments
- Always write tests before implementation
- Create a feature branch for each change
- Wait for your PR approval before merging
- Offer demos after completing value waves

---

## Rendering Artifacts

After collecting data through conversations with personas, render final artifacts:

### Render a Template

```bash
# Render inception deck
npm run render -- \
  --template templates/inception-deck/inception-deck.md \
  --data projects/my-project/output/inception-deck/inception-deck.json \
  --output projects/my-project/output/inception-deck/inception-deck.md

# Render specification
npm run render -- \
  --template templates/specification/specification.md \
  --data projects/my-project/output/specification/specification.json \
  --output projects/my-project/output/specification/specification.md
```

### Validate Data Before Rendering

```bash
# Validate your JSON data against the schema
npm run validate -- --data inception-deck.json --schema inception-deck

# With verbose error output
npm run validate -- --data specification.json --schema specification --verbose
```

### Template Helpers

The renderer includes Handlebars helpers for common patterns:

| Helper | Usage | Description |
|--------|-------|-------------|
| `{{formatDate date}}` | Format ISO date | `2024-01-15` |
| `{{#eq a b}}...{{/eq}}` | Equality check | Conditional block |
| `{{join array ", "}}` | Join array | `a, b, c` |
| `{{sum array "points"}}` | Sum property | Total story points |
| `{{checkbox checked}}` | Markdown checkbox | `[x]` or `[ ]` |
| `{{riskLevel score}}` | Risk level | High/Medium/Low |

---

## Tips and Best Practices

### General Tips

1. **Be specific** - The more context you provide, the better the output
2. **Iterate** - Don't expect perfection on the first pass
3. **Review artifacts** - Check the generated markdown and JSON files
4. **Use the templates** - They ensure consistency across projects

### For Discovery (Analyst)

- Bring any existing documentation to the conversation
- Don't skip the NOT List - explicit exclusions prevent scope creep
- Identify all stakeholders early, even skeptics

### For Design (Solution Architect)

- Start with C4 Context before diving into details
- Create ADRs for any significant technical decision
- Use Mermaid diagrams - they render directly in GitHub

### For Development (Paired Developer)

- **Embrace small increments** - If a task feels big, split it
- **Trust TDD** - The tests will guide your design
- **Review every PR** - This is your quality gate
- **Request demos** - See working software frequently

### Contradiction Handling

If a persona flags a contradiction:
1. Don't ignore it
2. Go back to the upstream persona
3. Resolve the conflict explicitly
4. Update the affected artifacts
5. Continue with the downstream work

---

## Web Interfaces & IDEs

The personas work with any AI interface. Here's how to use them:

### Web Chat Interfaces

| Interface | How to Load Persona |
|-----------|---------------------|
| **Claude.ai** | Paste: "Please adopt this persona: [contents]" |
| **ChatGPT** | Paste: "Use this as your system prompt: [contents]" |
| **Gemini Web** | Paste: "Follow these instructions: [contents]" |
| **Perplexity** | Paste persona as context in first message |

### IDE Integrations

| IDE | AI Tool | How to Use |
|-----|---------|------------|
| **VS Code** | GitHub Copilot Chat | Paste persona in chat, or set as custom instructions |
| **VS Code** | Continue.dev | Add persona to `.continue/config.json` |
| **Cursor** | Built-in AI | Set persona in AI settings or paste in chat |
| **JetBrains** | AI Assistant | Paste persona in chat window |
| **Zed** | Claude Integration | Configure in settings |

### Custom Instructions Setup

Some tools support persistent custom instructions:

**GitHub Copilot (VS Code):**
1. Open Settings → GitHub Copilot
2. Find "Custom Instructions"
3. Paste persona content

**Continue.dev:**
```json
// .continue/config.json
{
  "systemMessage": "contents of persona file here"
}
```

**Cursor:**
1. Open Settings → AI
2. Paste persona in "Custom Instructions"

---

## Troubleshooting

### Claude CLI Issues

**CLI not found:**
```bash
# Check if npm bin is in PATH
npm bin -g

# Add to your shell profile if needed
export PATH="$PATH:$(npm bin -g)"
```

**Authentication issues:**
```bash
# Re-authenticate
claude auth logout
claude auth login
```

### Gemini CLI Issues

**CLI not found:**
```bash
# Ensure Google Cloud SDK is installed
gcloud --version

# Reinstall Gemini component
gcloud components install gemini-cli
```

**Authentication issues:**
```bash
# Re-authenticate with Google
gcloud auth login
gcloud auth application-default login
```

### GitHub Copilot CLI Issues

**Extension not found:**
```bash
# Reinstall the extension
gh extension remove gh-copilot
gh extension install github/gh-copilot
```

**Authentication issues:**
```bash
# Refresh authentication with Copilot scope
gh auth refresh -s copilot
```

### General Issues

**Persona not loading correctly:**
- Ensure you're using the full path to the persona file
- Check that the file exists: `cat personas/analyst.md`
- Verify file is valid UTF-8 markdown

**System instruction too long:**
- Some CLIs have token limits for system prompts
- Try using a web interface for very long personas
- Consider splitting the persona into sections

---

## Next Steps

1. **Complete your first Inception Deck** with the Analyst
2. **Create a technical specification** with the Solution Architect
3. **Implement a small feature** with the Paired Developer
4. **Customize the templates** to match your team's needs
5. **Create project-specific personas** if needed

---

## Getting Help

- Check the [README.md](README.md) for an overview
- Review the persona files in `personas/` for detailed behavior
- Examine the templates in `templates/` for output format
- Validate against schemas in `schemas/` for data structure

Happy building! 🏗️
