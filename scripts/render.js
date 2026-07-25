#!/usr/bin/env node

/**
 * LoreWork Template Renderer
 *
 * Renders Handlebars/Mustache templates with JSON data to produce
 * final markdown artifacts.
 *
 * Usage:
 *   lw-render --template <template.md> --data <data.json> [--output <output.md>]
 *   lw-render -t templates/inception-deck/inception-deck.md -d project-data.json -o output.md
 */

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { program } = require('commander');

program
  .name('lw-render')
  .description('Render LoreWork templates with JSON data')
  .version('1.0.0')
  .requiredOption('-t, --template <path>', 'Path to template file (.md)')
  .requiredOption('-d, --data <path>', 'Path to JSON data file')
  .option('-o, --output <path>', 'Output file path (default: stdout)')
  .option('-p, --project <name>', 'Project name (auto-resolves paths)')
  .option('--partial <paths...>', 'Additional partial templates to register')
  .option('--strict', 'Fail on missing variables')
  .parse(process.argv);

const options = program.opts();

async function main() {
  try {
    // Resolve paths
    let templatePath = options.template;
    let dataPath = options.data;
    let outputPath = options.output;

    // If project is specified, resolve paths relative to project
    if (options.project) {
      const projectDir = path.join(process.cwd(), 'projects', options.project);
      if (!fs.existsSync(projectDir)) {
        console.error(`Error: Project directory not found: ${projectDir}`);
        process.exit(1);
      }

      // If data path is relative and doesn't exist, try project output directories
      if (!path.isAbsolute(dataPath) && !fs.existsSync(dataPath)) {
        const possiblePaths = [
          path.join(projectDir, 'output', 'inception-deck', dataPath),
          path.join(projectDir, 'output', 'specification', dataPath),
          path.join(projectDir, 'output', 'development', dataPath),
          path.join(projectDir, 'input', dataPath),
        ];
        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            dataPath = p;
            break;
          }
        }
      }
    }

    // Read template
    if (!fs.existsSync(templatePath)) {
      // Try relative to templates directory
      const templatesPath = path.join(process.cwd(), 'templates', templatePath);
      if (fs.existsSync(templatesPath)) {
        templatePath = templatesPath;
      } else {
        console.error(`Error: Template file not found: ${templatePath}`);
        process.exit(1);
      }
    }
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    // Read data
    if (!fs.existsSync(dataPath)) {
      console.error(`Error: Data file not found: ${dataPath}`);
      process.exit(1);
    }
    const dataContent = fs.readFileSync(dataPath, 'utf-8');
    let data;
    try {
      data = JSON.parse(dataContent);
    } catch (e) {
      console.error(`Error: Invalid JSON in data file: ${e.message}`);
      process.exit(1);
    }

    // Add metadata if not present
    if (!data.generated_date) {
      data.generated_date = new Date().toISOString().split('T')[0];
    }

    // Register any partial templates
    if (options.partial) {
      for (const partialPath of options.partial) {
        if (fs.existsSync(partialPath)) {
          const partialName = path.basename(partialPath, path.extname(partialPath));
          const partialContent = fs.readFileSync(partialPath, 'utf-8');
          Handlebars.registerPartial(partialName, partialContent);
        }
      }
    }

    // Compile and render
    const compileOptions = options.strict ? { strict: true } : {};
    const template = Handlebars.compile(templateContent, compileOptions);
    const rendered = template(data);

    // Output
    if (outputPath) {
      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      fs.writeFileSync(outputPath, rendered);
      console.log(`Rendered: ${outputPath}`);
    } else {
      console.log(rendered);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Register custom Handlebars helpers
 */
function registerHelpers() {
  // Format date
  Handlebars.registerHelper('formatDate', function(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  });

  // Conditional equality
  Handlebars.registerHelper('eq', function(a, b) {
    return a === b;
  });

  // Greater than
  Handlebars.registerHelper('gt', function(a, b) {
    return a > b;
  });

  // Less than
  Handlebars.registerHelper('lt', function(a, b) {
    return a < b;
  });

  // Increment
  Handlebars.registerHelper('inc', function(value) {
    return parseInt(value) + 1;
  });

  // Join array with delimiter
  Handlebars.registerHelper('join', function(array, delimiter) {
    if (!Array.isArray(array)) return '';
    return array.join(delimiter || ', ');
  });

  // Repeat block n times
  Handlebars.registerHelper('times', function(n, block) {
    let result = '';
    for (let i = 0; i < n; i++) {
      result += block.fn({ index: i, num: i + 1 });
    }
    return result;
  });

  // Default value if undefined
  Handlebars.registerHelper('default', function(value, defaultValue) {
    return value !== undefined && value !== null ? value : defaultValue;
  });

  // Markdown checkbox
  Handlebars.registerHelper('checkbox', function(checked) {
    return checked ? '[x]' : '[ ]';
  });

  // Risk score color/level
  Handlebars.registerHelper('riskLevel', function(score) {
    if (score >= 15) return 'High';
    if (score >= 8) return 'Medium';
    return 'Low';
  });

  // Story points badge
  Handlebars.registerHelper('pointsBadge', function(points) {
    const badges = {
      1: '🟢',
      2: '🟢',
      3: '🟡',
      5: '🟠',
      8: '🔴',
      13: '🔴',
      21: '⚫'
    };
    return badges[points] || '⚪';
  });

  // Tradeoff slider visualization
  Handlebars.registerHelper('slider', function(value) {
    const positions = ['', '↑', '', '↑', '', '↑', '', '↑', '', '↑', ''];
    let slider = '  1 -------- 2 -------- 3 -------- 4 -------- 5';
    // This is a simplified version - the template can format this better
    return `${value}`;
  });

  // Uppercase
  Handlebars.registerHelper('uppercase', function(str) {
    return str ? str.toUpperCase() : '';
  });

  // Lowercase
  Handlebars.registerHelper('lowercase', function(str) {
    return str ? str.toLowerCase() : '';
  });

  // Capitalize first letter
  Handlebars.registerHelper('capitalize', function(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  // Pluralize
  Handlebars.registerHelper('pluralize', function(count, singular, plural) {
    return count === 1 ? singular : (plural || singular + 's');
  });

  // Length of array
  Handlebars.registerHelper('length', function(array) {
    return Array.isArray(array) ? array.length : 0;
  });

  // Sum array of numbers or property
  Handlebars.registerHelper('sum', function(array, property) {
    if (!Array.isArray(array)) return 0;
    if (property) {
      return array.reduce((sum, item) => sum + (item[property] || 0), 0);
    }
    return array.reduce((sum, item) => sum + (item || 0), 0);
  });

  // Lookup helper for dynamic property access
  Handlebars.registerHelper('lookup', function(obj, key) {
    return obj && obj[key];
  });

  // JSON stringify for debugging
  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 2);
  });

  // Mermaid diagram wrapper
  Handlebars.registerHelper('mermaid', function(options) {
    return '```mermaid\n' + options.fn(this) + '\n```';
  });

  // Code block wrapper
  Handlebars.registerHelper('codeblock', function(language, options) {
    return '```' + language + '\n' + options.fn(this) + '\n```';
  });
}

// Export for testing
module.exports = { registerHelpers, Handlebars };

// Only run main when executed directly (not when required as a module)
if (require.main === module) {
  registerHelpers();
  main();
}
