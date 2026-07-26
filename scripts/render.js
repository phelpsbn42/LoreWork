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

// Configure program (but don't parse yet - that happens at the bottom when run directly)
program
  .name('lw-render')
  .description('Render LoreWork templates with JSON data')
  .version('1.0.0')
  .requiredOption('-t, --template <path>', 'Path to template file (.md)')
  .requiredOption('-d, --data <path>', 'Path to JSON data file')
  .option('-o, --output <path>', 'Output file path (default: stdout)')
  .option('-p, --project <name>', 'Project name (auto-resolves paths)')
  .option('--partial <paths...>', 'Additional partial templates to register')
  .option('--strict', 'Fail on missing variables');

// =============================================================================
// Core Functions (testable, no I/O side effects)
// =============================================================================

/**
 * Render a template with data
 * @param {string} templateContent - The Handlebars template string
 * @param {object} data - The data to render
 * @param {object} options - Render options
 * @param {boolean} options.strict - Fail on missing variables
 * @returns {string} The rendered output
 */
function renderTemplate(templateContent, data, options = {}) {
  // Add generated_date if not present
  const renderData = { ...data };
  if (!renderData.generated_date) {
    renderData.generated_date = new Date().toISOString().split('T')[0];
  }

  const compileOptions = options.strict ? { strict: true } : {};
  const template = Handlebars.compile(templateContent, compileOptions);
  return template(renderData);
}

/**
 * Parse JSON data with error handling
 * @param {string} jsonString - The JSON string to parse
 * @returns {object} Parsed data
 * @throws {Error} If JSON is invalid
 */
function parseJsonData(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    throw new Error(`Invalid JSON: ${e.message}`);
  }
}

/**
 * Register a partial template
 * @param {string} name - The partial name
 * @param {string} content - The partial template content
 */
function registerPartial(name, content) {
  Handlebars.registerPartial(name, content);
}

/**
 * Resolve project-relative paths
 * @param {string} dataPath - The data file path
 * @param {string} projectName - The project name
 * @param {string} cwd - Current working directory
 * @returns {object} Resolved paths or null if project not found
 */
function resolveProjectPaths(dataPath, projectName, cwd) {
  const projectDir = path.join(cwd, 'projects', projectName);

  if (!fs.existsSync(projectDir)) {
    return { error: `Project directory not found: ${projectDir}` };
  }

  let resolvedDataPath = dataPath;

  // If data path is relative and doesn't exist, try project directories
  if (!path.isAbsolute(dataPath) && !fs.existsSync(dataPath)) {
    const possiblePaths = [
      path.join(projectDir, 'output', dataPath),
      path.join(projectDir, 'input', dataPath),
    ];
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        resolvedDataPath = p;
        break;
      }
    }
  }

  return { projectDir, dataPath: resolvedDataPath };
}

/**
 * Resolve template path
 * @param {string} templatePath - The template file path
 * @param {string} cwd - Current working directory
 * @returns {object} Resolved path or error
 */
function resolveTemplatePath(templatePath, cwd) {
  if (fs.existsSync(templatePath)) {
    return { templatePath };
  }

  // Try relative to templates directory
  const templatesPath = path.join(cwd, 'templates', templatePath);
  if (fs.existsSync(templatesPath)) {
    return { templatePath: templatesPath };
  }

  return { error: `Template file not found: ${templatePath}` };
}

// =============================================================================
// CLI Main Function (handles I/O)
// =============================================================================

async function main(options) {
  try {
    // Resolve paths
    let templatePath = options.template;
    let dataPath = options.data;
    let outputPath = options.output;
    const cwd = process.cwd();

    // If project is specified, resolve paths relative to project
    if (options.project) {
      const resolved = resolveProjectPaths(dataPath, options.project, cwd);
      if (resolved.error) {
        console.error(`Error: ${resolved.error}`);
        process.exit(1);
      }
      dataPath = resolved.dataPath;
    }

    // Resolve template path
    const templateResolved = resolveTemplatePath(templatePath, cwd);
    if (templateResolved.error) {
      console.error(`Error: ${templateResolved.error}`);
      process.exit(1);
    }
    templatePath = templateResolved.templatePath;

    // Read template
    const templateContent = fs.readFileSync(templatePath, 'utf-8');

    // Read and parse data
    if (!fs.existsSync(dataPath)) {
      console.error(`Error: Data file not found: ${dataPath}`);
      process.exit(1);
    }
    const dataContent = fs.readFileSync(dataPath, 'utf-8');

    let data;
    try {
      data = parseJsonData(dataContent);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      process.exit(1);
    }

    // Register any partial templates
    if (options.partial) {
      for (const partialPath of options.partial) {
        if (fs.existsSync(partialPath)) {
          const partialName = path.basename(partialPath, path.extname(partialPath));
          const partialContent = fs.readFileSync(partialPath, 'utf-8');
          registerPartial(partialName, partialContent);
        }
      }
    }

    // Render template
    const rendered = renderTemplate(templateContent, data, { strict: options.strict });

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
  Handlebars.registerHelper('join', function(array, delimiter, options) {
    if (!Array.isArray(array)) return '';
    // If delimiter is the Handlebars options object, use default
    const sep = (typeof delimiter === 'string') ? delimiter : ', ';
    return array.join(sep);
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
  Handlebars.registerHelper('pluralize', function(count, singular, plural, options) {
    // If plural is the Handlebars options object, use default pluralization
    const pluralForm = (typeof plural === 'string') ? plural : singular + 's';
    return count === 1 ? singular : pluralForm;
  });

  // Length of array
  Handlebars.registerHelper('length', function(array) {
    return Array.isArray(array) ? array.length : 0;
  });

  // Sum array of numbers or property
  Handlebars.registerHelper('sum', function(array, property, options) {
    if (!Array.isArray(array)) return 0;
    // If property is a string (not Handlebars options object), sum that property
    if (typeof property === 'string') {
      return array.reduce((sum, item) => sum + (item[property] || 0), 0);
    }
    // Otherwise sum the array values directly
    return array.reduce((sum, item) => sum + (item || 0), 0);
  });

  // Lookup helper for dynamic property access
  Handlebars.registerHelper('lookup', function(obj, key) {
    return obj && obj[key];
  });

  // JSON stringify for debugging
  Handlebars.registerHelper('json', function(context) {
    return new Handlebars.SafeString(JSON.stringify(context, null, 2));
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
module.exports = {
  registerHelpers,
  Handlebars,
  renderTemplate,
  parseJsonData,
  registerPartial,
  resolveProjectPaths,
  resolveTemplatePath
};

// Only run main when executed directly (not when required as a module)
if (require.main === module) {
  program.parse(process.argv);
  const options = program.opts();
  registerHelpers();
  main(options);
}
