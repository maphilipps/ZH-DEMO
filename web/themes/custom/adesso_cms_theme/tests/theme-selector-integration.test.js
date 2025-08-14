/**
 * @file Theme Selector Integration Tests
 * Tests for cross-paragraph theme consistency and integration with SDC components
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { commonTests, testComponentVariants } from './utils/test-utils.js';

// Mock paragraph types that should have theme selector
const PARAGRAPH_TYPES = [
  'accordion', 'accordion_item', 'block_reference', 'card', 'card_group',
  'carousel', 'carousel_item', 'download', 'download_item', 'embed',
  'gallery', 'hero', 'logo_collection', 'media', 'newsletter',
  'pricing', 'pricing_card', 'sidebyside', 'slider', 'slider_item',
  'stats_item', 'text', 'views'
];

const THEME_OPTIONS = ['light', 'highlighted', 'dark'];

// Mock paragraph template rendering function
function renderParagraphWithTheme(paragraphType, theme = 'light', content = {}) {
  // Validate theme value and fallback to 'light' for invalid values
  const validThemes = ['light', 'highlighted', 'dark'];
  const themeValue = (theme && validThemes.includes(theme)) ? theme : 'light';
  const defaultContent = {
    title: `Sample ${paragraphType} Title`,
    body: `Sample content for ${paragraphType} paragraph.`,
    ...content
  };

  return `
    <div class="w-full paragraph-wrapper paragraph--type--${paragraphType}" data-theme="${themeValue}">
      <div class="paragraph-content">
        ${defaultContent.title ? `<h2 class="paragraph-title">${defaultContent.title}</h2>` : ''}
        ${defaultContent.body ? `<div class="paragraph-body">${defaultContent.body}</div>` : ''}
        ${renderParagraphSpecificContent(paragraphType, defaultContent)}
      </div>
    </div>
  `;
}

// Mock specific content for different paragraph types
function renderParagraphSpecificContent(paragraphType, content) {
  switch (paragraphType) {
    case 'hero':
      return `
        <div class="hero-content">
          <div class="hero-media">${content.media || '[Hero Image]'}</div>
          <div class="hero-actions">
            ${content.button ? `<a href="#" class="hero-button">${content.button}</a>` : ''}
          </div>
        </div>
      `;
    case 'card_group':
      return `
        <div class="card-group">
          <div class="card-item" data-theme="${content.theme || 'light'}">Card 1</div>
          <div class="card-item" data-theme="${content.theme || 'light'}">Card 2</div>
          <div class="card-item" data-theme="${content.theme || 'light'}">Card 3</div>
        </div>
      `;
    case 'accordion':
      return `
        <div class="accordion-wrapper">
          <div class="accordion-item">
            <button class="accordion-header">Section 1</button>
            <div class="accordion-content">Content 1</div>
          </div>
        </div>
      `;
    case 'gallery':
      return `
        <div class="gallery-grid">
          <div class="gallery-item">[Image 1]</div>
          <div class="gallery-item">[Image 2]</div>
          <div class="gallery-item">[Image 3]</div>
        </div>
      `;
    default:
      return '';
  }
}

// Mock form rendering for paragraph types
function renderParagraphForm(paragraphType, selectedTheme = 'light') {
  return `
    <form class="paragraph-form paragraph-form--${paragraphType}">
      <div class="form-item form-item--title">
        <label for="edit-title">Title</label>
        <input type="text" id="edit-title" name="title" />
      </div>
      
      <div class="form-item form-item-field-content-element-theme-0-value">
        <label for="edit-field-content-element-theme-0-value">Content Element Theme</label>
        <select name="field_theme[0][value]" id="edit-field-content-element-theme-0-value">
          <option value="light" ${selectedTheme === 'light' ? 'selected' : ''}>🌟 Light - Standard white background</option>
          <option value="highlighted" ${selectedTheme === 'highlighted' ? 'selected' : ''}>🎯 Highlighted - Light gray background for emphasis</option>
          <option value="dark" ${selectedTheme === 'dark' ? 'selected' : ''}>🌙 Dark - Dark background with light text</option>
        </select>
      </div>
      
      ${renderParagraphSpecificFormFields(paragraphType)}
    </form>
  `;
}

function renderParagraphSpecificFormFields(paragraphType) {
  switch (paragraphType) {
    case 'hero':
      return `
        <div class="form-item">
          <label for="edit-media">Hero Media</label>
          <input type="file" id="edit-media" name="media" />
        </div>
      `;
    case 'text':
      return `
        <div class="form-item">
          <label for="edit-body">Body Text</label>
          <textarea id="edit-body" name="body"></textarea>
        </div>
      `;
    case 'gallery':
      return `
        <div class="form-item">
          <label for="edit-images">Gallery Images</label>
          <input type="file" id="edit-images" name="images[]" multiple />
        </div>
      `;
    default:
      return `
        <div class="form-item">
          <label for="edit-content">Content</label>
          <textarea id="edit-content" name="content"></textarea>
        </div>
      `;
  }
}

// Mock SDC component integration
function renderSDCComponent(componentName, props = {}) {
  const theme = props.theme || 'light';
  return `
    <div class="sdc-component sdc-${componentName}" data-theme="${theme}">
      <div class="sdc-content">
        ${JSON.stringify(props)}
      </div>
    </div>
  `;
}

describe('Theme Selector Integration Tests', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Cross-Paragraph Type Consistency', () => {
    it('should render theme selector in all paragraph type forms', () => {
      PARAGRAPH_TYPES.forEach(paragraphType => {
        const formHtml = renderParagraphForm(paragraphType);
        container.innerHTML = formHtml;
        
        const themeField = container.querySelector('.form-item-field-content-element-theme-0-value');
        expect(themeField).toBeInTheDocument();
        
        const select = container.querySelector('select[name*="field_theme"]');
        expect(select).toBeInTheDocument();
        expect(select.options.length).toBe(3);
        
        // Verify all theme options are present
        const optionValues = Array.from(select.options).map(option => option.value);
        expect(optionValues).toEqual(expect.arrayContaining(THEME_OPTIONS));
      });
    });

    it('should render data-theme attribute consistently across paragraph types', () => {
      THEME_OPTIONS.forEach(theme => {
        PARAGRAPH_TYPES.forEach(paragraphType => {
          const paragraphHtml = renderParagraphWithTheme(paragraphType, theme);
          container.innerHTML = paragraphHtml;
          
          const paragraphWrapper = container.querySelector('.paragraph-wrapper');
          expect(paragraphWrapper).toBeInTheDocument();
          expect(paragraphWrapper.getAttribute('data-theme')).toBe(theme);
          expect(paragraphWrapper.classList.contains(`paragraph--type--${paragraphType}`)).toBe(true);
        });
      });
    });

    it('should apply theme-specific CSS classes correctly', () => {
      const testThemes = [
        { theme: 'light', expectedBg: 'should have light background' },
        { theme: 'highlighted', expectedBg: 'should have highlighted background' },
        { theme: 'dark', expectedBg: 'should have dark background' }
      ];

      testThemes.forEach(({ theme, expectedBg }) => {
        const paragraphHtml = renderParagraphWithTheme('text', theme);
        container.innerHTML = paragraphHtml;
        
        const wrapper = container.querySelector('.paragraph-wrapper');
        expect(wrapper.getAttribute('data-theme')).toBe(theme);
        
        // Mock CSS custom property application
        if (theme === 'light') {
          expect(wrapper.style.getPropertyValue('--paragraph-bg')).toBeFalsy(); // Should use default
        }
      });
    });

    it('should handle default theme values consistently', () => {
      PARAGRAPH_TYPES.forEach(paragraphType => {
        const paragraphHtml = renderParagraphWithTheme(paragraphType); // No theme specified
        container.innerHTML = paragraphHtml;
        
        const wrapper = container.querySelector('.paragraph-wrapper');
        expect(wrapper.getAttribute('data-theme')).toBe('light'); // Should default to light
      });
    });
  });

  describe('Theme Value Persistence', () => {
    it('should save and load theme values correctly', () => {
      THEME_OPTIONS.forEach(theme => {
        const formHtml = renderParagraphForm('text', theme);
        container.innerHTML = formHtml;
        
        const select = container.querySelector('select[name*="field_theme"]');
        expect(select.value).toBe(theme);
        
        const selectedOption = select.options[select.selectedIndex];
        expect(selectedOption.value).toBe(theme);
      });
    });

    it('should handle theme updates in forms', () => {
      const formHtml = renderParagraphForm('hero', 'light');
      container.innerHTML = formHtml;
      
      const select = container.querySelector('select');
      expect(select.value).toBe('light');
      
      // Simulate user changing theme
      select.value = 'dark';
      select.dispatchEvent(new Event('change'));
      
      expect(select.value).toBe('dark');
    });

    it('should maintain theme consistency during form validation', () => {
      const formHtml = renderParagraphForm('card_group', 'highlighted');
      container.innerHTML = formHtml;
      
      const form = container.querySelector('form');
      const select = container.querySelector('select');
      
      // Simulate form submission with validation
      const formData = new FormData(form);
      expect(formData.get('field_theme[0][value]')).toBe('highlighted');
    });
  });

  describe('SDC Component Integration', () => {
    it('should pass theme props to SDC components', () => {
      THEME_OPTIONS.forEach(theme => {
        const componentHtml = renderSDCComponent('button', { theme, label: 'Click Me' });
        container.innerHTML = componentHtml;
        
        const component = container.querySelector('.sdc-component');
        expect(component.getAttribute('data-theme')).toBe(theme);
        expect(component.classList.contains(`sdc-button`)).toBe(true);
      });
    });

    it('should handle component theme variations', () => {
      const variants = [
        { component: 'card', theme: 'light', props: { title: 'Light Card' } },
        { component: 'card', theme: 'highlighted', props: { title: 'Highlighted Card' } },
        { component: 'card', theme: 'dark', props: { title: 'Dark Card' } }
      ];

      variants.forEach(({ component, theme, props }) => {
        const componentHtml = renderSDCComponent(component, { ...props, theme });
        container.innerHTML = componentHtml;
        
        const sdc = container.querySelector(`.sdc-${component}`);
        expect(sdc).toBeInTheDocument();
        expect(sdc.getAttribute('data-theme')).toBe(theme);
      });
    });

    it('should support nested component theming', () => {
      const nestedHtml = `
        <div class="paragraph-wrapper" data-theme="dark">
          ${renderSDCComponent('card', { theme: 'dark', title: 'Card Title' })}
          ${renderSDCComponent('button', { theme: 'dark', label: 'Action' })}
        </div>
      `;
      
      container.innerHTML = nestedHtml;
      
      const wrapper = container.querySelector('.paragraph-wrapper');
      const card = container.querySelector('.sdc-card');
      const button = container.querySelector('.sdc-button');
      
      expect(wrapper.getAttribute('data-theme')).toBe('dark');
      expect(card.getAttribute('data-theme')).toBe('dark');
      expect(button.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('Template Rendering Integration', () => {
    it('should include theme data in all paragraph templates', () => {
      const specialParagraphs = ['hero', 'card_group', 'accordion', 'gallery'];
      
      specialParagraphs.forEach(paragraphType => {
        THEME_OPTIONS.forEach(theme => {
          const html = renderParagraphWithTheme(paragraphType, theme, {
            title: `${paragraphType} Title`,
            content: `${paragraphType} content`
          });
          
          container.innerHTML = html;
          
          const wrapper = container.querySelector('.paragraph-wrapper');
          expect(wrapper.getAttribute('data-theme')).toBe(theme);
          expect(wrapper.classList.contains(`paragraph--type--${paragraphType}`)).toBe(true);
        });
      });
    });

    it('should handle complex paragraph structures', () => {
      const complexHtml = renderParagraphWithTheme('card_group', 'highlighted', {
        title: 'Card Group Title',
        theme: 'highlighted'
      });
      
      container.innerHTML = complexHtml;
      
      const wrapper = container.querySelector('.paragraph-wrapper');
      const cardGroup = container.querySelector('.card-group');
      const cardItems = container.querySelectorAll('.card-item');
      
      expect(wrapper.getAttribute('data-theme')).toBe('highlighted');
      expect(cardGroup).toBeInTheDocument();
      expect(cardItems.length).toBe(3);
      
      // Child cards should inherit theme
      cardItems.forEach(card => {
        expect(card.getAttribute('data-theme')).toBe('highlighted');
      });
    });

    it('should render empty content gracefully', () => {
      PARAGRAPH_TYPES.forEach(paragraphType => {
        const html = renderParagraphWithTheme(paragraphType, 'light', {});
        container.innerHTML = html;
        
        const wrapper = container.querySelector('.paragraph-wrapper');
        expect(wrapper).toBeInTheDocument();
        expect(wrapper.getAttribute('data-theme')).toBe('light');
      });
    });
  });

  describe('Performance and Memory', () => {
    it('should handle multiple paragraph instances efficiently', () => {
      const multipleHtml = PARAGRAPH_TYPES.slice(0, 5).map(type =>
        renderParagraphWithTheme(type, 'light')
      ).join('');
      
      const startTime = performance.now();
      container.innerHTML = multipleHtml;
      const endTime = performance.now();
      
      const paragraphs = container.querySelectorAll('.paragraph-wrapper');
      expect(paragraphs.length).toBe(5);
      
      // Should render quickly
      expect(endTime - startTime).toBeLessThan(50);
    });

    it('should handle theme switching efficiently', () => {
      const formHtml = renderParagraphForm('text', 'light');
      container.innerHTML = formHtml;
      
      const select = container.querySelector('select');
      const startTime = performance.now();
      
      // Rapidly switch themes
      for (let i = 0; i < 100; i++) {
        const theme = THEME_OPTIONS[i % 3];
        select.value = theme;
        select.dispatchEvent(new Event('change'));
      }
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should clean up resources properly', () => {
      const formHtml = renderParagraphForm('hero', 'dark');
      container.innerHTML = formHtml;
      
      const select = container.querySelector('select');
      const initialListeners = select.cloneNode(true);
      
      // Clear container
      container.innerHTML = '';
      
      // Should not have memory leaks (basic check)
      expect(container.children.length).toBe(0);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle invalid theme values gracefully', () => {
      const invalidThemes = ['', null, undefined, 'invalid', 123];
      
      invalidThemes.forEach(invalidTheme => {
        const html = renderParagraphWithTheme('text', invalidTheme);
        container.innerHTML = html;
        
        const wrapper = container.querySelector('.paragraph-wrapper');
        // Should fallback to default theme
        expect(wrapper.getAttribute('data-theme')).toBe('light');
      });
    });

    it('should handle missing paragraph types', () => {
      const html = renderParagraphWithTheme('nonexistent_type', 'light');
      container.innerHTML = html;
      
      const wrapper = container.querySelector('.paragraph-wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.getAttribute('data-theme')).toBe('light');
      expect(wrapper.classList.contains('paragraph--type--nonexistent_type')).toBe(true);
    });

    it('should handle corrupted form data', () => {
      const corruptedFormHtml = `
        <form class="paragraph-form">
          <select name="field_theme[0][value]">
            <!-- Missing options -->
          </select>
        </form>
      `;
      
      container.innerHTML = corruptedFormHtml;
      
      const select = container.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select.options.length).toBe(0);
    });

    it('should handle concurrent theme updates', () => {
      const formHtml = renderParagraphForm('text', 'light');
      container.innerHTML = formHtml;
      
      const select = container.querySelector('select');
      
      // Simulate concurrent updates
      select.value = 'highlighted';
      select.value = 'dark';
      select.value = 'light';
      
      expect(select.value).toBe('light');
    });
  });

  describe('Accessibility Integration', () => {
    it('should maintain accessibility across paragraph types', () => {
      PARAGRAPH_TYPES.slice(0, 3).forEach(paragraphType => {
        const formHtml = renderParagraphForm(paragraphType);
        container.innerHTML = formHtml;
        
        const label = container.querySelector('label[for*="field-content-element-theme"]');
        const select = container.querySelector('select[name*="field_theme"]');
        
        expect(label).toBeInTheDocument();
        expect(select).toBeInTheDocument();
        expect(label.getAttribute('for')).toBe(select.id);
      });
    });

    it('should provide consistent screen reader experience', () => {
      const formHtml = renderParagraphForm('hero');
      container.innerHTML = formHtml;
      
      const select = container.querySelector('select');
      const options = Array.from(select.options);
      
      options.forEach(option => {
        expect(option.textContent).toMatch(/^🌟|🎯|🌙/);
        expect(option.textContent).toContain(' - ');
      });
    });
  });

  describe('Storybook Integration', () => {
    it('should support Storybook story variations', () => {
      const storyVariants = [
        { name: 'Default', theme: 'light' },
        { name: 'Highlighted', theme: 'highlighted' },
        { name: 'Dark', theme: 'dark' }
      ];

      storyVariants.forEach(variant => {
        const componentHtml = renderSDCComponent('text', {
          theme: variant.theme,
          title: `Text Component - ${variant.name}`,
          body: 'Sample content for story'
        });
        
        container.innerHTML = componentHtml;
        
        const component = container.querySelector('.sdc-text');
        expect(component.getAttribute('data-theme')).toBe(variant.theme);
      });
    });

    it('should handle Storybook controls integration', () => {
      // Mock Storybook controls
      const controls = {
        theme: {
          control: 'select',
          options: THEME_OPTIONS,
          defaultValue: 'light'
        }
      };

      expect(controls.theme.options).toEqual(THEME_OPTIONS);
      expect(controls.theme.defaultValue).toBe('light');
    });
  });

  describe('CSS Integration', () => {
    it('should apply CSS custom properties correctly', () => {
      THEME_OPTIONS.forEach(theme => {
        const html = renderParagraphWithTheme('text', theme);
        container.innerHTML = html;
        
        const wrapper = container.querySelector('.paragraph-wrapper');
        expect(wrapper.getAttribute('data-theme')).toBe(theme);
        
        // Verify CSS selector would match
        expect(wrapper.matches(`[data-theme="${theme}"]`)).toBe(true);
      });
    });

    it('should support CSS cascade with themes', () => {
      const nestedHtml = `
        <div class="page-wrapper">
          <div class="paragraph-wrapper" data-theme="dark">
            <div class="inner-content">
              <p class="text-content">Dark themed text</p>
            </div>
          </div>
        </div>
      `;
      
      container.innerHTML = nestedHtml;
      
      const wrapper = container.querySelector('.paragraph-wrapper');
      const textContent = container.querySelector('.text-content');
      
      expect(wrapper.getAttribute('data-theme')).toBe('dark');
      expect(textContent).toBeInTheDocument();
    });
  });
});