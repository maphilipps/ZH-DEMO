/**
 * @file
 * Button component entry point for Vite library mode
 * PreviousNext Frontend Architecture: Component-specific entry
 */

// Import the button behavior
import './button.behavior.js';

// Export any component-specific functionality for library mode
export { default as buttonInit } from './button.behavior.js';

console.log('[button] Component entry loaded for library mode compilation');