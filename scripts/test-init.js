#!/usr/bin/env node

/**
 * LoreWork Project Initializer Tests
 *
 * Unit tests for the project initialization script.
 *
 * Usage:
 *   node scripts/test-init.js
 */

const assert = require('assert');

// Import init-project module
const {
  PROJECT_DIRECTORIES,
  isValidProjectName,
  toDisplayName,
  createProjectMetadata,
  createProjectReadme
} = require('./init-project.js');

// Test utilities
let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passCount++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failCount++;
    failures.push({ name, error });
    console.log(`  ✗ ${name}`);
    console.log(`    ${error.message}`);
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

// =============================================================================
// PROJECT_DIRECTORIES Tests
// =============================================================================

describe('PROJECT_DIRECTORIES', () => {
  test('includes input directory', () => {
    assert(PROJECT_DIRECTORIES.includes('input'));
  });

  test('includes output directory', () => {
    assert(PROJECT_DIRECTORIES.includes('output'));
  });

  test('has exactly 2 directories (flat structure)', () => {
    assert.strictEqual(PROJECT_DIRECTORIES.length, 2);
  });
});

// =============================================================================
// isValidProjectName Tests
// =============================================================================

describe('isValidProjectName', () => {
  test('accepts lowercase letters', () => {
    assert(isValidProjectName('myproject'));
  });

  test('accepts lowercase with hyphens', () => {
    assert(isValidProjectName('my-project'));
  });

  test('accepts lowercase with numbers', () => {
    assert(isValidProjectName('project123'));
  });

  test('accepts complex valid names', () => {
    assert(isValidProjectName('my-awesome-project-2024'));
  });

  test('rejects uppercase letters', () => {
    assert(!isValidProjectName('MyProject'));
  });

  test('rejects spaces', () => {
    assert(!isValidProjectName('my project'));
  });

  test('rejects underscores', () => {
    assert(!isValidProjectName('my_project'));
  });

  test('rejects special characters', () => {
    assert(!isValidProjectName('my@project'));
    assert(!isValidProjectName('my.project'));
    assert(!isValidProjectName('my/project'));
  });

  test('rejects empty string', () => {
    assert(!isValidProjectName(''));
  });
});

// =============================================================================
// toDisplayName Tests
// =============================================================================

describe('toDisplayName', () => {
  test('capitalizes single word', () => {
    assert.strictEqual(toDisplayName('project'), 'Project');
  });

  test('capitalizes multiple hyphenated words', () => {
    assert.strictEqual(toDisplayName('my-project'), 'My Project');
  });

  test('handles complex names', () => {
    assert.strictEqual(toDisplayName('my-awesome-project'), 'My Awesome Project');
  });

  test('handles names with numbers', () => {
    assert.strictEqual(toDisplayName('project-2024'), 'Project 2024');
  });
});

// =============================================================================
// createProjectMetadata Tests
// =============================================================================

describe('createProjectMetadata', () => {
  test('includes project_name', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.project_name, 'test-project');
  });

  test('generates display_name', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.display_name, 'Test Project');
  });

  test('includes description when provided', () => {
    const meta = createProjectMetadata('test-project', 'A test project');
    assert.strictEqual(meta.description, 'A test project');
  });

  test('defaults description to empty string', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.description, '');
  });

  test('includes created_date in YYYY-MM-DD format', () => {
    const meta = createProjectMetadata('test-project');
    assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.created_date));
  });

  test('includes last_modified as ISO string', () => {
    const meta = createProjectMetadata('test-project');
    assert(meta.last_modified);
    // Should be a valid ISO date
    assert(!isNaN(new Date(meta.last_modified).getTime()));
  });

  test('sets status to inception', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.status, 'inception');
  });

  test('initializes team as empty array', () => {
    const meta = createProjectMetadata('test-project');
    assert(Array.isArray(meta.team));
    assert.strictEqual(meta.team.length, 0);
  });

  test('initializes tags as empty array', () => {
    const meta = createProjectMetadata('test-project');
    assert(Array.isArray(meta.tags));
    assert.strictEqual(meta.tags.length, 0);
  });

  test('includes artifacts structure', () => {
    const meta = createProjectMetadata('test-project');
    assert(meta.artifacts);
    assert(meta.artifacts.inception_deck);
    assert(meta.artifacts.specification);
    assert(meta.artifacts.development);
  });

  test('artifacts default to not completed', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.artifacts.inception_deck.completed, false);
    assert.strictEqual(meta.artifacts.specification.use_cases_completed, false);
    assert.strictEqual(meta.artifacts.development.task_breakdown_completed, false);
  });

  test('initializes contradictions as empty array', () => {
    const meta = createProjectMetadata('test-project');
    assert(Array.isArray(meta.contradictions));
    assert.strictEqual(meta.contradictions.length, 0);
  });

  test('initializes notes as empty string', () => {
    const meta = createProjectMetadata('test-project');
    assert.strictEqual(meta.notes, '');
  });
});

// =============================================================================
// createProjectReadme Tests
// =============================================================================

describe('createProjectReadme', () => {
  const metadata = createProjectMetadata('test-project', 'A test project description');

  test('includes display name as title', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes('# Test Project'));
  });

  test('includes description', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes('A test project description'));
  });

  test('includes placeholder when no description', () => {
    const meta = createProjectMetadata('test-project');
    const readme = createProjectReadme(meta);
    assert(readme.includes('*Add project description here*'));
  });

  test('includes created date', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes(metadata.created_date));
  });

  test('includes directory structure', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes('input/'));
    assert(readme.includes('output/'));
  });

  test('includes getting started section', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes('## Getting Started'));
    assert(readme.includes('Analyst persona'));
    assert(readme.includes('Solution Architect'));
    assert(readme.includes('Paired Developer'));
  });

  test('includes artifacts table', () => {
    const readme = createProjectReadme(metadata);
    assert(readme.includes('## Artifacts'));
    assert(readme.includes('Inception Deck'));
    assert(readme.includes('Specification'));
    assert(readme.includes('Development'));
    assert(readme.includes('Not Started'));
  });
});

// =============================================================================
// Run Tests
// =============================================================================

console.log('\n========================================');
console.log('LoreWork Init Tests');
console.log('========================================');

console.log('\n========================================');
console.log(`Results: ${passCount} passed, ${failCount} failed`);
console.log('========================================\n');

if (failCount > 0) {
  console.log('Failures:');
  failures.forEach(({ name, error }) => {
    console.log(`\n  ${name}:`);
    console.log(`    ${error.stack}`);
  });
  process.exit(1);
} else {
  console.log('All tests passed!\n');
  process.exit(0);
}
