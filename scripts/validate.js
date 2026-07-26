#!/usr/bin/env node

/**
 * LoreWork JSON Schema Validator
 *
 * Validates JSON data files against LoreWork schemas.
 *
 * Usage:
 *   lw-validate --data <data.json> --schema <schema-type>
 *   lw-validate -d inception-deck.json -s inception-deck
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { program } = require('commander');

// Try to use chalk, fallback to plain text
let chalk;
try {
  chalk = require('chalk');
} catch (e) {
  chalk = {
    green: (s) => s,
    red: (s) => s,
    yellow: (s) => s,
    blue: (s) => s,
    gray: (s) => s,
    bold: (s) => s
  };
}

// Configure program (but don't parse yet - that happens at the bottom when run directly)
program
  .name('lw-validate')
  .description('Validate JSON data against LoreWork schemas')
  .version('1.0.0')
  .requiredOption('-d, --data <path>', 'Path to JSON data file')
  .requiredOption('-s, --schema <type>', 'Schema type: project-meta, inception-deck, specification, development')
  .option('-v, --verbose', 'Show detailed validation errors');

const schemaTypes = ['project-meta', 'inception-deck', 'specification', 'development'];

// =============================================================================
// Core Functions (testable, no I/O side effects)
// =============================================================================

/**
 * Create a configured AJV validator instance
 * @param {object} options - Validator options
 * @param {boolean} options.verbose - Include verbose error info
 * @returns {Ajv} Configured AJV instance
 */
function createValidator(options = {}) {
  const ajv = new Ajv({ allErrors: true, verbose: options.verbose });
  addFormats(ajv);
  return ajv;
}

/**
 * Validate data against a schema
 * @param {object} data - The data to validate
 * @param {object} schema - The JSON schema
 * @param {object} options - Validation options
 * @returns {object} Result with valid flag and errors array
 */
function validateData(data, schema, options = {}) {
  const ajv = createValidator(options);
  const validate = ajv.compile(schema);
  const valid = validate(data);

  return {
    valid,
    errors: valid ? [] : validate.errors
  };
}

/**
 * Format validation errors for display
 * @param {Array} errors - AJV error array
 * @param {boolean} verbose - Include detailed params
 * @returns {Array} Formatted error strings
 */
function formatValidationErrors(errors, verbose = false) {
  return errors.map(error => {
    const location = error.instancePath || '(root)';
    let message = `${location}: ${error.message}`;
    if (verbose && error.params) {
      message += ` (${JSON.stringify(error.params)})`;
    }
    return message;
  });
}

/**
 * Load and parse a schema file
 * @param {string} schemaType - Schema type name
 * @param {string} schemasDir - Path to schemas directory
 * @returns {object} Result with schema or error
 */
function loadSchema(schemaType, schemasDir) {
  if (!schemaTypes.includes(schemaType)) {
    return { error: `Invalid schema type. Must be one of: ${schemaTypes.join(', ')}` };
  }

  const schemaPath = path.join(schemasDir, `${schemaType}.schema.json`);

  if (!fs.existsSync(schemaPath)) {
    return { error: `Schema file not found: ${schemaPath}` };
  }

  try {
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    return { schema: JSON.parse(schemaContent), schemaPath };
  } catch (e) {
    return { error: `Invalid schema JSON: ${e.message}` };
  }
}

/**
 * Parse JSON data with error handling
 * @param {string} jsonString - The JSON string to parse
 * @returns {object} Result with data or error
 */
function parseData(jsonString) {
  try {
    return { data: JSON.parse(jsonString) };
  } catch (e) {
    return { error: `Invalid JSON: ${e.message}` };
  }
}

// =============================================================================
// CLI Main Function (handles I/O)
// =============================================================================

async function main(options) {
  const cwd = process.cwd();
  const schemasDir = path.join(cwd, 'schemas');

  // Load schema
  const schemaResult = loadSchema(options.schema, schemasDir);
  if (schemaResult.error) {
    console.error(chalk.red(`Error: ${schemaResult.error}`));
    process.exit(1);
  }

  // Find data file
  let dataPath = options.data;
  if (!fs.existsSync(dataPath)) {
    const cwdPath = path.join(cwd, dataPath);
    if (fs.existsSync(cwdPath)) {
      dataPath = cwdPath;
    } else {
      console.error(chalk.red(`Error: Data file not found: ${dataPath}`));
      process.exit(1);
    }
  }

  // Load and parse data
  const dataContent = fs.readFileSync(dataPath, 'utf-8');
  const dataResult = parseData(dataContent);
  if (dataResult.error) {
    console.error(chalk.red(`Error: ${dataResult.error}`));
    process.exit(1);
  }

  // Validate
  const result = validateData(dataResult.data, schemaResult.schema, { verbose: options.verbose });

  console.log('');
  console.log(chalk.bold(`Validating: ${path.basename(dataPath)}`));
  console.log(chalk.gray(`Schema: ${options.schema}`));
  console.log('');

  if (result.valid) {
    console.log(chalk.green('✓ Validation passed'));
    console.log('');
    showDataSummary(dataResult.data, options.schema);
  } else {
    console.log(chalk.red('✗ Validation failed'));
    console.log('');
    console.log(chalk.bold('Errors:'));
    const formattedErrors = formatValidationErrors(result.errors, options.verbose);
    for (const error of formattedErrors) {
      console.log(chalk.red(`  • ${error}`));
    }
    console.log('');
    process.exit(1);
  }
}

function showDataSummary(data, schemaType) {
  console.log(chalk.bold('Summary:'));

  switch (schemaType) {
    case 'project-meta':
      console.log(`  Project: ${data.project_name || 'N/A'}`);
      console.log(`  Status: ${data.status || 'N/A'}`);
      console.log(`  Created: ${data.created_date || 'N/A'}`);
      if (data.team) {
        console.log(`  Team: ${data.team.length} members`);
      }
      break;

    case 'inception-deck':
      console.log(`  Project: ${data.project_name || 'N/A'}`);
      const sections = [
        'section_1_why_are_we_here',
        'section_2_elevator_pitch',
        'section_3_product_box',
        'section_4_not_list',
        'section_5_meet_neighbors',
        'section_6_show_solution',
        'section_7_risks',
        'section_8_sizing',
        'section_9_tradeoffs',
        'section_10_what_it_takes'
      ];
      const completedSections = sections.filter(s => data[s] && Object.keys(data[s]).length > 0);
      console.log(`  Sections: ${completedSections.length}/10 completed`);
      if (data.section_7_risks && data.section_7_risks.risks) {
        console.log(`  Risks: ${data.section_7_risks.risks.length} identified`);
      }
      break;

    case 'specification':
      console.log(`  Project: ${data.project_name || 'N/A'}`);
      if (data.use_cases && data.use_cases.use_cases) {
        console.log(`  Use Cases: ${data.use_cases.use_cases.length}`);
      }
      if (data.adrs) {
        console.log(`  ADRs: ${data.adrs.length}`);
      }
      break;

    case 'development':
      console.log(`  Project: ${data.project_name || 'N/A'}`);
      if (data.task_breakdown && data.task_breakdown.tasks) {
        const tasks = data.task_breakdown.tasks;
        const completed = tasks.filter(t => t.status === 'done').length;
        const totalPoints = tasks.reduce((sum, t) => sum + (t.points || 0), 0);
        console.log(`  Tasks: ${completed}/${tasks.length} completed`);
        console.log(`  Story Points: ${totalPoints}`);
      }
      break;
  }

  console.log('');
}

// Export for testing
module.exports = {
  showDataSummary,
  schemaTypes,
  createValidator,
  validateData,
  formatValidationErrors,
  loadSchema,
  parseData
};

// Only run main when executed directly
if (require.main === module) {
  program.parse(process.argv);
  const options = program.opts();
  main(options);
}
