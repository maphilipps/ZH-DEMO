/**
 * @file
 * Accordion component entry point for Vite library mode
 * PreviousNext Frontend Architecture: Component-specific entry
 */

// Import the accordion behavior
import './accordion.behavior.js';

// Export any component-specific functionality for library mode
export { default as accordionInit } from './accordion.behavior.js';

console.log('[accordion] Component entry loaded for library mode compilation');