#!/usr/bin/env node

/**
 * LoreWork Validator Tests
 *
 * Unit tests for the JSON schema validator.
 *
 * Usage:
 *   node scripts/test-validate.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Import validator module
const { showDataSummary, schemaTypes } = require('./validate.js');

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
// Schema Types Tests
// =============================================================================

describe('schemaTypes', () => {
  test('includes project-meta', () => {
    assert(schemaTypes.includes('project-meta'));
  });

  test('includes inception-deck', () => {
    assert(schemaTypes.includes('inception-deck'));
  });

  test('includes specification', () => {
    assert(schemaTypes.includes('specification'));
  });

  test('includes development', () => {
    assert(schemaTypes.includes('development'));
  });

  test('has exactly 4 schema types', () => {
    assert.strictEqual(schemaTypes.length, 4);
  });
});

// =============================================================================
// Schema File Existence Tests
// =============================================================================

describe('Schema Files', () => {
  const schemasDir = path.join(__dirname, '..', 'schemas');

  test('project-meta.schema.json exists', () => {
    const schemaPath = path.join(schemasDir, 'project-meta.schema.json');
    assert(fs.existsSync(schemaPath), `Schema not found: ${schemaPath}`);
  });

  test('inception-deck.schema.json exists', () => {
    const schemaPath = path.join(schemasDir, 'inception-deck.schema.json');
    assert(fs.existsSync(schemaPath), `Schema not found: ${schemaPath}`);
  });

  test('specification.schema.json exists', () => {
    const schemaPath = path.join(schemasDir, 'specification.schema.json');
    assert(fs.existsSync(schemaPath), `Schema not found: ${schemaPath}`);
  });

  test('development.schema.json exists', () => {
    const schemaPath = path.join(schemasDir, 'development.schema.json');
    assert(fs.existsSync(schemaPath), `Schema not found: ${schemaPath}`);
  });
});

// =============================================================================
// Schema Validation Tests
// =============================================================================

describe('Schema Structure', () => {
  const schemasDir = path.join(__dirname, '..', 'schemas');

  test('all schemas are valid JSON', () => {
    for (const type of schemaTypes) {
      const schemaPath = path.join(schemasDir, `${type}.schema.json`);
      const content = fs.readFileSync(schemaPath, 'utf-8');
      JSON.parse(content); // Will throw if invalid
    }
  });

  test('all schemas have $schema property', () => {
    for (const type of schemaTypes) {
      const schemaPath = path.join(schemasDir, `${type}.schema.json`);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
      assert(schema.$schema, `Schema ${type} missing $schema property`);
    }
  });

  test('all schemas have $id property with lorework.local', () => {
    for (const type of schemaTypes) {
      const schemaPath = path.join(schemasDir, `${type}.schema.json`);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
      assert(schema.$id, `Schema ${type} missing $id property`);
      assert(schema.$id.includes('lorework.local'), `Schema ${type} $id should contain lorework.local`);
    }
  });

  test('all schemas have title property', () => {
    for (const type of schemaTypes) {
      const schemaPath = path.join(schemasDir, `${type}.schema.json`);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
      assert(schema.title, `Schema ${type} missing title property`);
    }
  });

  test('all schemas require project_name', () => {
    for (const type of schemaTypes) {
      const schemaPath = path.join(schemasDir, `${type}.schema.json`);
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
      if (schema.required) {
        assert(
          schema.required.includes('project_name') || type === 'project-meta',
          `Schema ${type} should require project_name`
        );
      }
    }
  });
});

// =============================================================================
// Data Summary Tests (capture console output)
// =============================================================================

describe('showDataSummary', () => {
  // Capture console.log output
  let logs = [];
  const originalLog = console.log;

  function captureStart() {
    logs = [];
    console.log = (...args) => logs.push(args.join(' '));
  }

  function captureEnd() {
    console.log = originalLog;
    return logs;
  }

  test('shows project-meta summary', () => {
    captureStart();
    showDataSummary({
      project_name: 'test-project',
      status: 'development',
      created_date: '2024-01-15',
      team: [{ name: 'Alice' }, { name: 'Bob' }]
    }, 'project-meta');
    const output = captureEnd();

    assert(output.some(line => line.includes('test-project')));
    assert(output.some(line => line.includes('development')));
    assert(output.some(line => line.includes('2 members')));
  });

  test('shows inception-deck summary', () => {
    captureStart();
    showDataSummary({
      project_name: 'test-project',
      section_1_why_are_we_here: { problem: 'test' },
      section_2_elevator_pitch: { pitch: 'test' },
      section_7_risks: { risks: [{ name: 'risk1' }, { name: 'risk2' }] }
    }, 'inception-deck');
    const output = captureEnd();

    assert(output.some(line => line.includes('test-project')));
    assert(output.some(line => line.includes('2/10')));
    assert(output.some(line => line.includes('2 identified')));
  });

  test('shows specification summary', () => {
    captureStart();
    showDataSummary({
      project_name: 'test-project',
      use_cases: { use_cases: [{ id: 'UC1' }, { id: 'UC2' }, { id: 'UC3' }] },
      adrs: [{ id: 'ADR1' }, { id: 'ADR2' }]
    }, 'specification');
    const output = captureEnd();

    assert(output.some(line => line.includes('test-project')));
    assert(output.some(line => line.includes('Use Cases: 3')));
    assert(output.some(line => line.includes('ADRs: 2')));
  });

  test('shows development summary', () => {
    captureStart();
    showDataSummary({
      project_name: 'test-project',
      task_breakdown: {
        tasks: [
          { id: 'T1', points: 3, status: 'done' },
          { id: 'T2', points: 5, status: 'in-progress' },
          { id: 'T3', points: 2, status: 'done' }
        ]
      }
    }, 'development');
    const output = captureEnd();

    assert(output.some(line => line.includes('test-project')));
    assert(output.some(line => line.includes('2/3 completed')));
    assert(output.some(line => line.includes('Story Points: 10')));
  });

  test('handles missing data gracefully', () => {
    captureStart();
    showDataSummary({}, 'project-meta');
    const output = captureEnd();

    assert(output.some(line => line.includes('N/A')));
  });
});

// =============================================================================
// Run Tests
// =============================================================================

console.log('\n========================================');
console.log('LoreWork Validator Tests');
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
