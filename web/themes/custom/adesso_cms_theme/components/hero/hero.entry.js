/**
 * @file
 * Hero component entry point for Vite library mode
 * PreviousNext Frontend Architecture: Component-specific entry
 */

// Import the hero behavior
import './hero.behavior.js';

// Export any component-specific functionality for library mode
export { default as heroInit } from './hero.behavior.js';

console.log('[hero] Component entry loaded for library mode compilation');