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
const {
  showDataSummary,
  schemaTypes,
  createValidator,
  validateData,
  formatValidationErrors,
  loadSchema,
  parseData
} = require('./validate.js');

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
    assert(output.some(line => line.includes('3/10'))); // 3 sections have content
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
// New Schema Fields Tests
// =============================================================================

describe('Specification Schema Fields', () => {
  const schemasDir = path.join(__dirname, '..', 'schemas');
  const schemaPath = path.join(schemasDir, 'specification.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

  test('has assumptions property', () => {
    assert(schema.properties.assumptions, 'Missing assumptions property');
    assert.strictEqual(schema.properties.assumptions.type, 'array');
  });

  test('has technology_stack property', () => {
    assert(schema.properties.technology_stack, 'Missing technology_stack property');
    assert.strictEqual(schema.properties.technology_stack.type, 'array');
  });

  test('has technology_details property', () => {
    assert(schema.properties.technology_details, 'Missing technology_details property');
    assert.strictEqual(schema.properties.technology_details.type, 'array');
  });

  test('has architectural_patterns property', () => {
    assert(schema.properties.architectural_patterns, 'Missing architectural_patterns property');
    assert.strictEqual(schema.properties.architectural_patterns.type, 'array');
  });

  test('assumptions items have required fields', () => {
    const assumptionSchema = schema.properties.assumptions.items;
    assert(assumptionSchema.properties.id, 'assumptions missing id');
    assert(assumptionSchema.properties.description, 'assumptions missing description');
    assert(assumptionSchema.properties.status, 'assumptions missing status');
  });

  test('architectural_patterns items have required fields', () => {
    const patternSchema = schema.properties.architectural_patterns.items;
    assert(patternSchema.properties.name, 'patterns missing name');
    assert(patternSchema.properties.where_applied, 'patterns missing where_applied');
    assert(patternSchema.properties.problem_solved, 'patterns missing problem_solved');
  });
});

describe('Development Schema Fields', () => {
  const schemasDir = path.join(__dirname, '..', 'schemas');
  const schemaPath = path.join(schemasDir, 'development.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

  test('has dev_findings property', () => {
    assert(schema.properties.dev_findings, 'Missing dev_findings property');
    assert.strictEqual(schema.properties.dev_findings.type, 'object');
  });

  test('dev_findings has active_findings array', () => {
    const devFindings = schema.properties.dev_findings;
    assert(devFindings.properties.active_findings, 'Missing active_findings');
    assert.strictEqual(devFindings.properties.active_findings.type, 'array');
  });

  test('dev_findings has resolved_findings array', () => {
    const devFindings = schema.properties.dev_findings;
    assert(devFindings.properties.resolved_findings, 'Missing resolved_findings');
    assert.strictEqual(devFindings.properties.resolved_findings.type, 'array');
  });

  test('active_findings items have severity enum', () => {
    const findingSchema = schema.properties.dev_findings.properties.active_findings.items;
    assert(findingSchema.properties.severity, 'findings missing severity');
    assert(findingSchema.properties.severity.enum, 'severity should have enum');
    assert(findingSchema.properties.severity.enum.includes('Critical'));
    assert(findingSchema.properties.severity.enum.includes('High'));
    assert(findingSchema.properties.severity.enum.includes('Medium'));
    assert(findingSchema.properties.severity.enum.includes('Low'));
  });

  test('active_findings items have category enum', () => {
    const findingSchema = schema.properties.dev_findings.properties.active_findings.items;
    assert(findingSchema.properties.category, 'findings missing category');
    assert(findingSchema.properties.category.enum, 'category should have enum');
    assert(findingSchema.properties.category.enum.includes('Security'));
    assert(findingSchema.properties.category.enum.includes('Resiliency'));
    assert(findingSchema.properties.category.enum.includes('Architecture'));
  });
});

// =============================================================================
// Core Function Tests
// =============================================================================

describe('createValidator', () => {
  test('returns an AJV instance', () => {
    const ajv = createValidator();
    assert(ajv, 'createValidator should return an instance');
    assert(typeof ajv.compile === 'function', 'Instance should have compile method');
  });

  test('accepts verbose option', () => {
    const ajv = createValidator({ verbose: true });
    assert(ajv, 'createValidator should accept options');
  });
});

describe('validateData', () => {
  const simpleSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: { type: 'number' }
    },
    required: ['name']
  };

  test('returns valid: true for valid data', () => {
    const result = validateData({ name: 'Test', age: 25 }, simpleSchema);
    assert.strictEqual(result.valid, true);
    assert(Array.isArray(result.errors));
    assert.strictEqual(result.errors.length, 0);
  });

  test('returns valid: false for invalid data', () => {
    const result = validateData({ age: 25 }, simpleSchema);
    assert.strictEqual(result.valid, false);
    assert(result.errors.length > 0);
  });

  test('catches type errors', () => {
    const result = validateData({ name: 'Test', age: 'not a number' }, simpleSchema);
    assert.strictEqual(result.valid, false);
    assert(result.errors.some(e => e.instancePath === '/age'));
  });
});

describe('formatValidationErrors', () => {
  const mockErrors = [
    { instancePath: '/name', message: 'must be string' },
    { instancePath: '', message: 'must have required property', params: { missingProperty: 'id' } }
  ];

  test('formats errors with path and message', () => {
    const formatted = formatValidationErrors(mockErrors);
    assert(formatted[0].includes('/name'));
    assert(formatted[0].includes('must be string'));
  });

  test('uses (root) for empty path', () => {
    const formatted = formatValidationErrors(mockErrors);
    assert(formatted[1].includes('(root)'));
  });

  test('includes params in verbose mode', () => {
    const formatted = formatValidationErrors(mockErrors, true);
    assert(formatted[1].includes('missingProperty'));
  });

  test('excludes params in non-verbose mode', () => {
    const formatted = formatValidationErrors(mockErrors, false);
    assert(!formatted[1].includes('missingProperty'));
  });
});

describe('loadSchema', () => {
  const schemasDir = path.join(__dirname, '..', 'schemas');

  test('loads valid schema type', () => {
    const result = loadSchema('project-meta', schemasDir);
    assert(result.schema, 'Should return schema object');
    assert(result.schemaPath, 'Should return schema path');
    assert(!result.error, 'Should not have error');
  });

  test('returns error for invalid schema type', () => {
    const result = loadSchema('invalid-type', schemasDir);
    assert(result.error, 'Should return error');
    assert(result.error.includes('Invalid schema type'));
  });

  test('returns error for missing schema file', () => {
    const result = loadSchema('project-meta', '/nonexistent/path');
    assert(result.error, 'Should return error');
    assert(result.error.includes('not found'));
  });

  test('loads all valid schema types', () => {
    for (const type of schemaTypes) {
      const result = loadSchema(type, schemasDir);
      assert(result.schema, `Should load ${type} schema`);
    }
  });
});

describe('parseData', () => {
  test('parses valid JSON', () => {
    const result = parseData('{"name": "test", "value": 123}');
    assert(result.data, 'Should return data');
    assert.strictEqual(result.data.name, 'test');
    assert.strictEqual(result.data.value, 123);
  });

  test('returns error for invalid JSON', () => {
    const result = parseData('{ invalid json }');
    assert(result.error, 'Should return error');
    assert(result.error.includes('Invalid JSON'));
  });

  test('parses arrays', () => {
    const result = parseData('[1, 2, 3]');
    assert(Array.isArray(result.data));
    assert.strictEqual(result.data.length, 3);
  });

  test('parses nested objects', () => {
    const result = parseData('{"outer": {"inner": "value"}}');
    assert.strictEqual(result.data.outer.inner, 'value');
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
