/**
 * @file
 * Template utilities for Storybook stories
 * Provides helper functions to work with TWIG templates imported as raw text
 */

/**
 * Creates a template function from a raw TWIG template string
 * For now, returns a placeholder HTML string since we can't process TWIG directly
 * @param {string} twigTemplate - The raw TWIG template string
 * @param {string} componentName - The name of the component for the placeholder
 * @returns {Function} A function that returns HTML
 */
export function createTemplateFunction(twigTemplate, componentName) {
  return function(args) {
    return `
      <div class="storybook-component-placeholder">
        <h3>Component: ${componentName}</h3>
        <p>This is a placeholder for the ${componentName} component.</p>
        <p>In a full implementation, this would render the TWIG template with the provided args.</p>
        <details>
          <summary>View Args</summary>
          <pre>${JSON.stringify(args, null, 2)}</pre>
        </details>
        <details>
          <summary>View TWIG Template</summary>
          <pre>${twigTemplate}</pre>
        </details>
      </div>
      <style>
        .storybook-component-placeholder {
          border: 2px dashed #ccc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px;
          background: #f9f9f9;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .storybook-component-placeholder h3 {
          margin-top: 0;
          color: #333;
        }
        .storybook-component-placeholder pre {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          overflow-x: auto;
          max-height: 200px;
        }
        .storybook-component-placeholder details {
          margin: 10px 0;
        }
        .storybook-component-placeholder summary {
          cursor: pointer;
          font-weight: bold;
          color: #666;
        }
      </style>
    `;
  };
}

/**
 * Simple template replacer for basic TWIG variable substitution
 * Handles basic {{ variable }} syntax
 * @param {string} template - The template string
 * @param {Object} args - The variables to replace
 * @returns {string} The processed template
 */
export function simpleTemplateReplace(template, args) {
  let result = template;
  
  // Replace simple variables like {{ variable }}
  Object.keys(args).forEach(key => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, args[key] || '');
  });
  
  return result;
}

/**
 * Creates a story template function that tries to render HTML
 * @param {Function} htmlGenerator - Function that generates HTML from args
 * @returns {Function} Story template function
 */
export function createStoryTemplate(htmlGenerator) {
  const template = function(args) {
    return htmlGenerator(args);
  };
  
  // Add the bind method for compatibility
  template.bind = function(defaultArgs) {
    return function(args) {
      return htmlGenerator({ ...defaultArgs, ...args });
    };
  };
  
  return template;
}