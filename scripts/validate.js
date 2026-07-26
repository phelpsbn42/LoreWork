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

program
  .name('lw-validate')
  .description('Validate JSON data against LoreWork schemas')
  .version('1.0.0')
  .requiredOption('-d, --data <path>', 'Path to JSON data file')
  .requiredOption('-s, --schema <type>', 'Schema type: project-meta, inception-deck, specification, development')
  .option('-v, --verbose', 'Show detailed validation errors')
  .parse(process.argv);

const options = program.opts();

const schemaTypes = ['project-meta', 'inception-deck', 'specification', 'development'];

if (!schemaTypes.includes(options.schema)) {
  console.error(chalk.red(`Error: Invalid schema type. Must be one of: ${schemaTypes.join(', ')}`));
  process.exit(1);
}

async function main() {
  try {
    // Find schema file
    const schemaPath = path.join(process.cwd(), 'schemas', `${options.schema}.schema.json`);
    if (!fs.existsSync(schemaPath)) {
      console.error(chalk.red(`Error: Schema file not found: ${schemaPath}`));
      process.exit(1);
    }

    // Find data file
    let dataPath = options.data;
    if (!fs.existsSync(dataPath)) {
      // Try relative to current directory
      const cwdPath = path.join(process.cwd(), dataPath);
      if (fs.existsSync(cwdPath)) {
        dataPath = cwdPath;
      } else {
        console.error(chalk.red(`Error: Data file not found: ${dataPath}`));
        process.exit(1);
      }
    }

    // Load schema
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    const schema = JSON.parse(schemaContent);

    // Load data
    const dataContent = fs.readFileSync(dataPath, 'utf-8');
    let data;
    try {
      data = JSON.parse(dataContent);
    } catch (e) {
      console.error(chalk.red(`Error: Invalid JSON in data file: ${e.message}`));
      process.exit(1);
    }

    // Set up validator
    const ajv = new Ajv({ allErrors: true, verbose: options.verbose });
    addFormats(ajv);

    // Validate
    const validate = ajv.compile(schema);
    const valid = validate(data);

    console.log('');
    console.log(chalk.bold(`Validating: ${path.basename(dataPath)}`));
    console.log(chalk.gray(`Schema: ${options.schema}`));
    console.log('');

    if (valid) {
      console.log(chalk.green('✓ Validation passed'));
      console.log('');

      // Show summary
      showDataSummary(data, options.schema);

    } else {
      console.log(chalk.red('✗ Validation failed'));
      console.log('');

      // Show errors
      console.log(chalk.bold('Errors:'));
      for (const error of validate.errors) {
        const location = error.instancePath || '(root)';
        console.log(chalk.red(`  • ${location}: ${error.message}`));
        if (options.verbose && error.params) {
          console.log(chalk.gray(`    ${JSON.stringify(error.params)}`));
        }
      }
      console.log('');
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
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
module.exports = { showDataSummary, schemaTypes };

// Only run main when executed directly
if (require.main === module) {
  main();
}
