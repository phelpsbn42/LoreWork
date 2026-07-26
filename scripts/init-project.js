#!/usr/bin/env node

/**
 * LoreWork Project Initializer
 *
 * Creates a new project with the standard directory structure
 * and optionally initializes with metadata.
 *
 * Usage:
 *   lw-init <project-name>
 *   lw-init my-awesome-project --description "A great project"
 */

const fs = require('fs');
const path = require('path');

// Directory structure for new projects
const PROJECT_DIRECTORIES = [
  'input',
  'output/inception-deck',
  'output/specification',
  'output/development'
];

// Validate project name format
function isValidProjectName(name) {
  return /^[a-z0-9-]+$/.test(name);
}

// Convert project-name to Display Name
function toDisplayName(projectName) {
  return projectName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Generate project metadata
function createProjectMetadata(projectName, description = '') {
  return {
    project_name: projectName,
    display_name: toDisplayName(projectName),
    description: description,
    created_date: new Date().toISOString().split('T')[0],
    last_modified: new Date().toISOString(),
    status: 'inception',
    team: [],
    tags: [],
    artifacts: {
      inception_deck: {
        completed: false,
        last_updated: null
      },
      specification: {
        use_cases_completed: false,
        c4_diagrams_completed: false,
        wireframes_completed: false,
        adrs_count: 0,
        last_updated: null
      },
      development: {
        task_breakdown_completed: false,
        tasks_total: 0,
        tasks_completed: 0,
        last_updated: null
      }
    },
    contradictions: [],
    notes: ''
  };
}

// Generate project README content
function createProjectReadme(metadata) {
  return `# ${metadata.display_name}

${metadata.description || '*Add project description here*'}

## Status

- **Phase**: Inception
- **Created**: ${metadata.created_date}

## Structure

\`\`\`
${metadata.project_name}/
├── input/                  # User documents + upstream artifacts
├── output/
│   ├── inception-deck/     # Analyst outputs
│   ├── specification/      # Solution Architect outputs
│   └── development/        # Paired Developer outputs
└── project.json            # Project metadata
\`\`\`

## Getting Started

1. **Start with the Analyst persona** to create the Inception Deck
2. **Move to Solution Architect** to create technical specifications
3. **Implement with Paired Developer** using TDD

## Artifacts

| Phase | Status | Last Updated |
|-------|--------|--------------|
| Inception Deck | Not Started | - |
| Specification | Not Started | - |
| Development | Not Started | - |
`;
}

// Export for testing
module.exports = {
  PROJECT_DIRECTORIES,
  isValidProjectName,
  toDisplayName,
  createProjectMetadata,
  createProjectReadme
};

// Only run CLI when executed directly
if (require.main === module) {
  const { program } = require('commander');

  program
    .name('lw-init')
    .description('Initialize a new LoreWork project')
    .version('1.0.0')
    .argument('<project-name>', 'Name of the project (lowercase, hyphens allowed)')
    .option('-d, --description <text>', 'Project description')
    .option('--no-git', 'Skip git initialization')
    .parse(process.argv);

  const projectName = program.args[0];
  const options = program.opts();

  // Validate project name
  if (!isValidProjectName(projectName)) {
    console.error('Error: Project name must be lowercase with hyphens only');
    process.exit(1);
  }

  const projectsDir = path.join(process.cwd(), 'projects');
  const projectDir = path.join(projectsDir, projectName);

  // Check if project already exists
  if (fs.existsSync(projectDir)) {
    console.error(`Error: Project already exists: ${projectDir}`);
    process.exit(1);
  }

  console.log(`Creating project: ${projectName}`);
  console.log(`Location: ${projectDir}`);
  console.log('');

  // Create directory structure
  for (const dir of PROJECT_DIRECTORIES) {
    const fullPath = path.join(projectDir, dir);
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`  Created: ${dir}/`);
  }

  // Create project metadata file
  const metadata = createProjectMetadata(projectName, options.description);
  const metadataPath = path.join(projectDir, 'project.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  console.log(`  Created: project.json`);

  // Create a README for the project
  const readme = createProjectReadme(metadata);
  const readmePath = path.join(projectDir, 'README.md');
  fs.writeFileSync(readmePath, readme);
  console.log(`  Created: README.md`);

  // Create .gitkeep files in empty directories
  for (const dir of PROJECT_DIRECTORIES) {
    const gitkeepPath = path.join(projectDir, dir, '.gitkeep');
    fs.writeFileSync(gitkeepPath, '');
  }

  console.log('');
  console.log('Project initialized successfully!');
  console.log('');
  console.log('Next steps:');
  console.log(`  1. cd projects/${projectName}`);
  console.log('  2. Add any input documents to input/');
  console.log('  3. Start the Analyst persona:');
  console.log('     claude --system-prompt ../../personas/analyst.md');
  console.log('');
}
