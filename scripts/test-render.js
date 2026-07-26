#!/usr/bin/env node

/**
 * LoreWork Renderer Tests
 *
 * Unit tests for the template renderer and Handlebars helpers.
 *
 * Usage:
 *   npm test
 *   node scripts/test-render.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Import the renderer module
const {
  registerHelpers,
  Handlebars,
  renderTemplate,
  parseJsonData,
  registerPartial,
  resolveProjectPaths,
  resolveTemplatePath
} = require('./render.js');

// Register helpers before tests
registerHelpers();

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

function render(template, data) {
  return Handlebars.compile(template)(data);
}

// =============================================================================
// Helper Tests
// =============================================================================

describe('formatDate helper', () => {
  test('formats ISO date string', () => {
    const result = render('{{formatDate date}}', { date: '2024-01-15T10:30:00Z' });
    assert.strictEqual(result, '2024-01-15');
  });

  test('formats date object', () => {
    const result = render('{{formatDate date}}', { date: new Date('2024-06-20') });
    assert.strictEqual(result, '2024-06-20');
  });

  test('returns empty string for null', () => {
    const result = render('{{formatDate date}}', { date: null });
    assert.strictEqual(result, '');
  });

  test('returns empty string for undefined', () => {
    const result = render('{{formatDate date}}', {});
    assert.strictEqual(result, '');
  });
});

describe('eq helper', () => {
  test('returns true for equal values', () => {
    const result = render('{{#if (eq a b)}}yes{{else}}no{{/if}}', { a: 5, b: 5 });
    assert.strictEqual(result, 'yes');
  });

  test('returns false for different values', () => {
    const result = render('{{#if (eq a b)}}yes{{else}}no{{/if}}', { a: 5, b: 10 });
    assert.strictEqual(result, 'no');
  });

  test('works with strings', () => {
    const result = render('{{#if (eq a b)}}yes{{else}}no{{/if}}', { a: 'hello', b: 'hello' });
    assert.strictEqual(result, 'yes');
  });

  test('strict equality (type matters)', () => {
    const result = render('{{#if (eq a b)}}yes{{else}}no{{/if}}', { a: '5', b: 5 });
    assert.strictEqual(result, 'no');
  });
});

describe('gt helper', () => {
  test('returns true when a > b', () => {
    const result = render('{{#if (gt a b)}}yes{{else}}no{{/if}}', { a: 10, b: 5 });
    assert.strictEqual(result, 'yes');
  });

  test('returns false when a < b', () => {
    const result = render('{{#if (gt a b)}}yes{{else}}no{{/if}}', { a: 3, b: 5 });
    assert.strictEqual(result, 'no');
  });

  test('returns false when equal', () => {
    const result = render('{{#if (gt a b)}}yes{{else}}no{{/if}}', { a: 5, b: 5 });
    assert.strictEqual(result, 'no');
  });
});

describe('lt helper', () => {
  test('returns true when a < b', () => {
    const result = render('{{#if (lt a b)}}yes{{else}}no{{/if}}', { a: 3, b: 5 });
    assert.strictEqual(result, 'yes');
  });

  test('returns false when a > b', () => {
    const result = render('{{#if (lt a b)}}yes{{else}}no{{/if}}', { a: 10, b: 5 });
    assert.strictEqual(result, 'no');
  });

  test('returns false when equal', () => {
    const result = render('{{#if (lt a b)}}yes{{else}}no{{/if}}', { a: 5, b: 5 });
    assert.strictEqual(result, 'no');
  });
});

describe('inc helper', () => {
  test('increments a number', () => {
    const result = render('{{inc value}}', { value: 5 });
    assert.strictEqual(result, '6');
  });

  test('increments zero', () => {
    const result = render('{{inc value}}', { value: 0 });
    assert.strictEqual(result, '1');
  });

  test('handles string numbers', () => {
    const result = render('{{inc value}}', { value: '10' });
    assert.strictEqual(result, '11');
  });
});

describe('join helper', () => {
  test('joins array with default delimiter', () => {
    const result = render('{{join items}}', { items: ['a', 'b', 'c'] });
    assert.strictEqual(result, 'a, b, c');
  });

  test('joins array with custom delimiter', () => {
    const result = render('{{join items " | "}}', { items: ['a', 'b', 'c'] });
    assert.strictEqual(result, 'a | b | c');
  });

  test('returns empty string for non-array', () => {
    const result = render('{{join items}}', { items: 'not an array' });
    assert.strictEqual(result, '');
  });

  test('handles empty array', () => {
    const result = render('{{join items}}', { items: [] });
    assert.strictEqual(result, '');
  });
});

describe('times helper', () => {
  test('repeats block n times', () => {
    const result = render('{{#times 3}}*{{/times}}', {});
    assert.strictEqual(result, '***');
  });

  test('provides index and num in context', () => {
    const result = render('{{#times 3}}{{num}}{{/times}}', {});
    assert.strictEqual(result, '123');
  });

  test('provides zero-based index', () => {
    const result = render('{{#times 3}}{{index}}{{/times}}', {});
    assert.strictEqual(result, '012');
  });
});

describe('default helper', () => {
  test('returns value when defined', () => {
    const result = render('{{default name "Unknown"}}', { name: 'Alice' });
    assert.strictEqual(result, 'Alice');
  });

  test('returns default when undefined', () => {
    const result = render('{{default name "Unknown"}}', {});
    assert.strictEqual(result, 'Unknown');
  });

  test('returns default when null', () => {
    const result = render('{{default name "Unknown"}}', { name: null });
    assert.strictEqual(result, 'Unknown');
  });

  test('returns empty string value (not default)', () => {
    const result = render('{{default name "Unknown"}}', { name: '' });
    assert.strictEqual(result, '');
  });
});

describe('checkbox helper', () => {
  test('returns checked box for true', () => {
    const result = render('{{checkbox done}}', { done: true });
    assert.strictEqual(result, '[x]');
  });

  test('returns unchecked box for false', () => {
    const result = render('{{checkbox done}}', { done: false });
    assert.strictEqual(result, '[ ]');
  });

  test('returns unchecked box for undefined', () => {
    const result = render('{{checkbox done}}', {});
    assert.strictEqual(result, '[ ]');
  });
});

describe('riskLevel helper', () => {
  test('returns High for score >= 15', () => {
    assert.strictEqual(render('{{riskLevel score}}', { score: 15 }), 'High');
    assert.strictEqual(render('{{riskLevel score}}', { score: 20 }), 'High');
  });

  test('returns Medium for score >= 8 and < 15', () => {
    assert.strictEqual(render('{{riskLevel score}}', { score: 8 }), 'Medium');
    assert.strictEqual(render('{{riskLevel score}}', { score: 14 }), 'Medium');
  });

  test('returns Low for score < 8', () => {
    assert.strictEqual(render('{{riskLevel score}}', { score: 7 }), 'Low');
    assert.strictEqual(render('{{riskLevel score}}', { score: 0 }), 'Low');
  });
});

describe('pointsBadge helper', () => {
  test('returns green for 1-2 points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 1 }), '🟢');
    assert.strictEqual(render('{{pointsBadge points}}', { points: 2 }), '🟢');
  });

  test('returns yellow for 3 points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 3 }), '🟡');
  });

  test('returns orange for 5 points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 5 }), '🟠');
  });

  test('returns red for 8-13 points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 8 }), '🔴');
    assert.strictEqual(render('{{pointsBadge points}}', { points: 13 }), '🔴');
  });

  test('returns black for 21 points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 21 }), '⚫');
  });

  test('returns white for unknown points', () => {
    assert.strictEqual(render('{{pointsBadge points}}', { points: 4 }), '⚪');
    assert.strictEqual(render('{{pointsBadge points}}', { points: 100 }), '⚪');
  });
});

describe('uppercase helper', () => {
  test('converts to uppercase', () => {
    const result = render('{{uppercase text}}', { text: 'hello' });
    assert.strictEqual(result, 'HELLO');
  });

  test('returns empty string for null', () => {
    const result = render('{{uppercase text}}', { text: null });
    assert.strictEqual(result, '');
  });
});

describe('lowercase helper', () => {
  test('converts to lowercase', () => {
    const result = render('{{lowercase text}}', { text: 'HELLO' });
    assert.strictEqual(result, 'hello');
  });

  test('returns empty string for null', () => {
    const result = render('{{lowercase text}}', { text: null });
    assert.strictEqual(result, '');
  });
});

describe('capitalize helper', () => {
  test('capitalizes first letter', () => {
    const result = render('{{capitalize text}}', { text: 'hello world' });
    assert.strictEqual(result, 'Hello world');
  });

  test('returns empty string for empty input', () => {
    const result = render('{{capitalize text}}', { text: '' });
    assert.strictEqual(result, '');
  });

  test('returns empty string for null', () => {
    const result = render('{{capitalize text}}', { text: null });
    assert.strictEqual(result, '');
  });
});

describe('pluralize helper', () => {
  test('returns singular for count 1', () => {
    const result = render('{{pluralize count "item" "items"}}', { count: 1 });
    assert.strictEqual(result, 'item');
  });

  test('returns plural for count > 1', () => {
    const result = render('{{pluralize count "item" "items"}}', { count: 5 });
    assert.strictEqual(result, 'items');
  });

  test('returns plural for count 0', () => {
    const result = render('{{pluralize count "item" "items"}}', { count: 0 });
    assert.strictEqual(result, 'items');
  });

  test('auto-pluralizes with s when no plural provided', () => {
    const result = render('{{pluralize count "item"}}', { count: 5 });
    assert.strictEqual(result, 'items');
  });
});

describe('length helper', () => {
  test('returns array length', () => {
    const result = render('{{length items}}', { items: [1, 2, 3, 4, 5] });
    assert.strictEqual(result, '5');
  });

  test('returns 0 for empty array', () => {
    const result = render('{{length items}}', { items: [] });
    assert.strictEqual(result, '0');
  });

  test('returns 0 for non-array', () => {
    const result = render('{{length items}}', { items: 'not array' });
    assert.strictEqual(result, '0');
  });
});

describe('sum helper', () => {
  test('sums array of numbers', () => {
    const result = render('{{sum numbers}}', { numbers: [1, 2, 3, 4, 5] });
    assert.strictEqual(result, '15');
  });

  test('sums property of objects', () => {
    const result = render('{{sum tasks "points"}}', {
      tasks: [{ points: 3 }, { points: 5 }, { points: 2 }]
    });
    assert.strictEqual(result, '10');
  });

  test('returns 0 for empty array', () => {
    const result = render('{{sum numbers}}', { numbers: [] });
    assert.strictEqual(result, '0');
  });

  test('returns 0 for non-array', () => {
    const result = render('{{sum numbers}}', { numbers: 'not array' });
    assert.strictEqual(result, '0');
  });

  test('handles missing properties gracefully', () => {
    const result = render('{{sum tasks "points"}}', {
      tasks: [{ points: 3 }, { name: 'no points' }, { points: 2 }]
    });
    assert.strictEqual(result, '5');
  });
});

describe('lookup helper', () => {
  test('looks up property dynamically', () => {
    const result = render('{{lookup obj key}}', { obj: { foo: 'bar' }, key: 'foo' });
    assert.strictEqual(result, 'bar');
  });

  test('returns undefined for missing key', () => {
    const result = render('{{lookup obj key}}', { obj: { foo: 'bar' }, key: 'baz' });
    assert.strictEqual(result, '');
  });
});

describe('json helper', () => {
  test('stringifies object', () => {
    const result = render('{{json data}}', { data: { name: 'test', value: 42 } });
    const parsed = JSON.parse(result);
    assert.strictEqual(parsed.name, 'test');
    assert.strictEqual(parsed.value, 42);
  });

  test('stringifies array', () => {
    const result = render('{{json items}}', { items: [1, 2, 3] });
    const parsed = JSON.parse(result);
    assert.deepStrictEqual(parsed, [1, 2, 3]);
  });
});

describe('mermaid helper', () => {
  test('wraps content in mermaid code block', () => {
    const result = render('{{#mermaid}}graph TD\nA-->B{{/mermaid}}', {});
    assert.strictEqual(result, '```mermaid\ngraph TD\nA-->B\n```');
  });
});

describe('codeblock helper', () => {
  test('wraps content in code block with language', () => {
    const result = render('{{#codeblock "javascript"}}const x = 1;{{/codeblock}}', {});
    assert.strictEqual(result, '```javascript\nconst x = 1;\n```');
  });

  test('works with different languages', () => {
    const result = render('{{#codeblock "python"}}print("hello"){{/codeblock}}', {});
    assert.strictEqual(result, '```python\nprint("hello")\n```');
  });
});

// =============================================================================
// Integration Tests
// =============================================================================

describe('Template Integration', () => {
  test('renders complex template with multiple helpers', () => {
    const template = `
# {{uppercase project_name}}

Generated: {{formatDate generated_date}}

## Tasks ({{length tasks}} total, {{sum tasks "points"}} points)

{{#each tasks}}
- {{checkbox completed}} {{title}} ({{pointsBadge points}} {{points}} {{pluralize points "point"}})
{{/each}}
`;
    const data = {
      project_name: 'my project',
      generated_date: '2024-01-15',
      tasks: [
        { title: 'Task 1', points: 2, completed: true },
        { title: 'Task 2', points: 3, completed: false },
        { title: 'Task 3', points: 1, completed: true }
      ]
    };

    const result = render(template, data);

    assert(result.includes('# MY PROJECT'));
    assert(result.includes('Generated: 2024-01-15'));
    assert(result.includes('3 total, 6 points'));
    assert(result.includes('[x] Task 1'));
    assert(result.includes('[ ] Task 2'));
    assert(result.includes('🟢 2 points'));
    assert(result.includes('🟡 3 points'));
    assert(result.includes('🟢 1 point'));
  });

  test('handles nested conditionals', () => {
    const template = `
{{#if (gt score 10)}}
High score!
{{else}}
{{#if (gt score 5)}}
Medium score
{{else}}
Low score
{{/if}}
{{/if}}
`;
    assert(render(template, { score: 15 }).includes('High score!'));
    assert(render(template, { score: 7 }).includes('Medium score'));
    assert(render(template, { score: 3 }).includes('Low score'));
  });

  test('handles empty data gracefully', () => {
    const template = `
Items: {{default (length items) 0}}
Name: {{default name "Unknown"}}
`;
    const result = render(template, {});
    assert(result.includes('Items: 0'));
    assert(result.includes('Name: Unknown'));
  });
});

// =============================================================================
// Core Function Tests
// =============================================================================

describe('renderTemplate', () => {
  test('renders simple template', () => {
    const result = renderTemplate('Hello {{name}}!', { name: 'World' });
    assert.strictEqual(result, 'Hello World!');
  });

  test('adds generated_date if not present', () => {
    const result = renderTemplate('Date: {{generated_date}}', {});
    assert(/^\d{4}-\d{2}-\d{2}$/.test(result.replace('Date: ', '')));
  });

  test('preserves existing generated_date', () => {
    const result = renderTemplate('Date: {{generated_date}}', { generated_date: '2024-01-15' });
    assert.strictEqual(result, 'Date: 2024-01-15');
  });

  test('respects strict option', () => {
    try {
      renderTemplate('Hello {{name}}!', {}, { strict: true });
      assert.fail('Should have thrown');
    } catch (e) {
      assert(e.message.includes('name'));
    }
  });

  test('renders complex template with helpers', () => {
    const template = '{{uppercase name}} has {{length items}} items';
    const result = renderTemplate(template, { name: 'test', items: [1, 2, 3] });
    assert.strictEqual(result, 'TEST has 3 items');
  });
});

describe('parseJsonData', () => {
  test('parses valid JSON', () => {
    const result = parseJsonData('{"name": "test", "value": 42}');
    assert.strictEqual(result.name, 'test');
    assert.strictEqual(result.value, 42);
  });

  test('parses JSON array', () => {
    const result = parseJsonData('[1, 2, 3]');
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  test('throws on invalid JSON', () => {
    try {
      parseJsonData('{ invalid json }');
      assert.fail('Should have thrown');
    } catch (e) {
      assert(e.message.includes('Invalid JSON'));
    }
  });

  test('throws on empty string', () => {
    try {
      parseJsonData('');
      assert.fail('Should have thrown');
    } catch (e) {
      assert(e.message.includes('Invalid JSON'));
    }
  });
});

describe('registerPartial', () => {
  test('registers and uses partial', () => {
    registerPartial('testPartial', 'Hello from partial!');
    const result = render('{{> testPartial}}', {});
    assert.strictEqual(result, 'Hello from partial!');
  });

  test('registers partial with variables', () => {
    registerPartial('greeting', 'Hello {{name}}!');
    const result = render('{{> greeting}}', { name: 'World' });
    assert.strictEqual(result, 'Hello World!');
  });
});

describe('resolveTemplatePath', () => {
  const cwd = process.cwd();

  test('returns path if file exists', () => {
    const result = resolveTemplatePath('scripts/render.js', cwd);
    assert(result.templatePath);
    assert(!result.error);
  });

  test('resolves relative to templates directory', () => {
    const result = resolveTemplatePath('inception-deck/inception-deck.md', cwd);
    assert(result.templatePath);
    assert(result.templatePath.includes('templates'));
  });

  test('returns error for non-existent file', () => {
    const result = resolveTemplatePath('nonexistent.md', cwd);
    assert(result.error);
    assert(result.error.includes('not found'));
  });
});

describe('resolveProjectPaths', () => {
  const cwd = process.cwd();

  test('returns error for non-existent project', () => {
    const result = resolveProjectPaths('data.json', 'nonexistent-project', cwd);
    assert(result.error);
    assert(result.error.includes('not found'));
  });

  test('returns dataPath unchanged for absolute paths', () => {
    // Create a temp project for testing
    const tempDir = path.join(os.tmpdir(), 'lorework-test-' + Date.now());
    const projectDir = path.join(tempDir, 'projects', 'test-project');
    fs.mkdirSync(projectDir, { recursive: true });

    const absPath = '/absolute/path/data.json';
    const result = resolveProjectPaths(absPath, 'test-project', tempDir);

    assert(!result.error);
    assert.strictEqual(result.dataPath, absPath);

    // Cleanup
    fs.rmSync(tempDir, { recursive: true });
  });
});

// =============================================================================
// Run Tests
// =============================================================================

console.log('\n========================================');
console.log('LoreWork Renderer Tests');
console.log('========================================');

// Tests are run during description/test calls above

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
