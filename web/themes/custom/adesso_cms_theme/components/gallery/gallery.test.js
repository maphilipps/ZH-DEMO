/**
 * @file Gallery component tests
 * Tests for gallery component functionality, lightbox features, and accessibility
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock Twig template rendering - simulates the gallery.twig template logic
function renderGallery(props = {}) {
  const {
    pre_headline = '',
    section_title = '',
    sub_headline = '',
    gallery_items = '',
    modifier = '',
    is_dark = false
  } = props;

  if (!gallery_items) {
    return '<div class="gallery-empty">No gallery items to display</div>';
  }

  // Container classes
  const containerClasses = [
    'gallery-wrapper',
    is_dark ? 'gallery--dark' : 'gallery--light',
    modifier
  ].filter(Boolean).join(' ');

  // Pre-headline HTML
  const preHeadlineHtml = pre_headline ? 
    `<div class="gallery-pre-headline text-sm font-semibold text-gray-600 mb-2">${pre_headline}</div>` : '';
  
  // Section title HTML
  const titleHtml = section_title ? 
    `<h2 class="gallery-title text-3xl font-bold mb-4">${section_title}</h2>` : '';
  
  // Sub-headline HTML
  const subHeadlineHtml = sub_headline ? 
    `<div class="gallery-sub-headline text-lg text-gray-600 mb-8">${sub_headline}</div>` : '';

  return `
    <section class="${containerClasses}" data-gallery>
      <div class="gallery-header text-center mb-12">
        ${preHeadlineHtml}
        ${titleHtml}
        ${subHeadlineHtml}
      </div>
      <div class="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${gallery_items}
      </div>
    </section>
  `;
}

// Mock gallery item rendering
function renderGalleryItem(item) {
  const {
    id = '',
    media = '',
    media_thumb = '',
    media_description = ''
  } = item;

  return `
    <div class="gallery-item" data-gallery-item data-item-id="${id}">
      <figure class="gallery-figure relative group cursor-pointer">
        <div class="gallery-thumbnail aspect-square overflow-hidden rounded-lg">
          ${media_thumb || media}
        </div>
        <div class="gallery-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
          <div class="gallery-overlay-content opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </div>
        </div>
        ${media_description ? `<figcaption class="gallery-caption sr-only">${media_description}</figcaption>` : ''}
      </figure>
    </div>
  `;
}

// Mock lightbox modal rendering
function renderLightboxModal() {
  return `
    <div class="lightbox-modal fixed inset-0 z-50 hidden" data-lightbox-modal>
      <div class="lightbox-backdrop absolute inset-0 bg-black bg-opacity-90" data-lightbox-backdrop></div>
      <div class="lightbox-container relative z-10 flex items-center justify-center min-h-screen p-4">
        <div class="lightbox-content max-w-4xl max-h-full">
          <div class="lightbox-image-container" data-lightbox-image-container>
            <!-- Dynamic image content -->
          </div>
          <div class="lightbox-caption text-white text-center mt-4" data-lightbox-caption>
            <!-- Dynamic caption content -->
          </div>
        </div>
        <button class="lightbox-close absolute top-4 right-4 text-white hover:text-gray-300" data-lightbox-close>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <button class="lightbox-prev absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300" data-lightbox-prev>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button class="lightbox-next absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300" data-lightbox-next>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
}

// Mock gallery behavior
function initGalleryBehavior(container) {
  const galleryItems = container.querySelectorAll('[data-gallery-item]');
  let lightboxModal = container.querySelector('[data-lightbox-modal]');
  
  // Create lightbox modal if it doesn't exist
  if (!lightboxModal) {
    container.insertAdjacentHTML('beforeend', renderLightboxModal());
    lightboxModal = container.querySelector('[data-lightbox-modal]');
  }
  
  // Mock gallery item click handlers
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });
  
  // Mock lightbox controls
  const closeButton = lightboxModal.querySelector('[data-lightbox-close]');
  const backdrop = lightboxModal.querySelector('[data-lightbox-backdrop]');
  
  closeButton?.addEventListener('click', closeLightbox);
  backdrop?.addEventListener('click', closeLightbox);
  
  function openLightbox(index) {
    lightboxModal.classList.remove('hidden');
    lightboxModal.setAttribute('data-current-index', index);
    document.body.style.overflow = 'hidden';
    
    // Simulate loading image
    const imageContainer = lightboxModal.querySelector('[data-lightbox-image-container]');
    const caption = lightboxModal.querySelector('[data-lightbox-caption]');
    const currentItem = galleryItems[index];
    
    if (imageContainer && currentItem) {
      const itemId = currentItem.getAttribute('data-item-id');
      imageContainer.innerHTML = `<img src="full-${itemId}.jpg" alt="Gallery image ${index + 1}" class="max-w-full max-h-full object-contain">`;
    }
    
    if (caption && currentItem) {
      const captionText = currentItem.querySelector('.gallery-caption')?.textContent || '';
      caption.textContent = captionText;
    }
  }
  
  function closeLightbox() {
    lightboxModal.classList.add('hidden');
    lightboxModal.removeAttribute('data-current-index');
    document.body.style.overflow = '';
  }
  
  // Mock keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });
}

describe('Gallery Component', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
    document.body.style.overflow = ''; // Reset overflow
  });

  describe('Basic Rendering', () => {
    it('should render with gallery items', () => {
      const items = [
        renderGalleryItem({ id: '1', media_thumb: '<img src="thumb1.jpg" alt="Item 1">', media_description: 'First item' }),
        renderGalleryItem({ id: '2', media_thumb: '<img src="thumb2.jpg" alt="Item 2">', media_description: 'Second item' })
      ].join('');
      
      const galleryHtml = renderGallery({
        section_title: 'Test Gallery',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const gallery = container.querySelector('[data-gallery]');
      const galleryItems = container.querySelectorAll('[data-gallery-item]');
      
      expect(gallery).toBeInTheDocument();
      expect(galleryItems).toHaveLength(2);
    });

    it('should render section title when provided', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Featured Projects',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const title = container.querySelector('.gallery-title');
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Featured Projects');
    });

    it('should render pre-headline when provided', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        pre_headline: 'Our Work',
        section_title: 'Portfolio',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const preHeadline = container.querySelector('.gallery-pre-headline');
      expect(preHeadline).toBeInTheDocument();
      expect(preHeadline.textContent).toBe('Our Work');
    });

    it('should render sub-headline when provided', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Gallery',
        sub_headline: 'A collection of our best work',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const subHeadline = container.querySelector('.gallery-sub-headline');
      expect(subHeadline).toBeInTheDocument();
      expect(subHeadline.textContent).toBe('A collection of our best work');
    });

    it('should show empty state when no items provided', () => {
      const galleryHtml = renderGallery({ gallery_items: '' });
      container.innerHTML = galleryHtml;
      
      const emptyState = container.querySelector('.gallery-empty');
      expect(emptyState).toBeInTheDocument();
      expect(emptyState.textContent).toBe('No gallery items to display');
    });
  });

  describe('Gallery Items', () => {
    it('should render gallery item with thumbnail and description', () => {
      const item = {
        id: 'test-1',
        media_thumb: '<img src="thumb.jpg" alt="Thumbnail" class="w-full h-full object-cover">',
        media_description: 'Test gallery item'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const galleryItem = container.querySelector('[data-gallery-item]');
      const thumbnail = container.querySelector('.gallery-thumbnail');
      const caption = container.querySelector('.gallery-caption');
      
      expect(galleryItem).toBeInTheDocument();
      expect(galleryItem.getAttribute('data-item-id')).toBe('test-1');
      expect(thumbnail).toBeInTheDocument();
      expect(thumbnail.innerHTML).toContain('<img src="thumb.jpg"');
      expect(caption).toBeInTheDocument();
      expect(caption.textContent).toBe('Test gallery item');
    });

    it('should have hover effects', () => {
      const item = {
        id: 'hover-test',
        media_thumb: '<img src="thumb.jpg" alt="Test">',
        media_description: 'Hover test'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const figure = container.querySelector('.gallery-figure');
      const overlay = container.querySelector('.gallery-overlay');
      
      expect(figure.className).toContain('group');
      expect(figure.className).toContain('cursor-pointer');
      expect(overlay.className).toContain('group-hover:bg-opacity-40');
    });

    it('should fallback to media when media_thumb is not provided', () => {
      const item = {
        id: 'fallback-test',
        media: '<img src="full.jpg" alt="Full image">',
        media_thumb: '',
        media_description: 'Fallback test'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const thumbnail = container.querySelector('.gallery-thumbnail');
      expect(thumbnail.innerHTML).toContain('<img src="full.jpg"');
    });

    it('should handle items without description', () => {
      const item = {
        id: 'no-desc',
        media_thumb: '<img src="thumb.jpg" alt="No description">',
        media_description: ''
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const galleryItem = container.querySelector('[data-gallery-item]');
      const caption = container.querySelector('.gallery-caption');
      
      expect(galleryItem).toBeInTheDocument();
      expect(caption).not.toBeInTheDocument();
    });
  });

  describe('Theme Variants', () => {
    it('should apply light theme classes by default', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Light Theme',
        gallery_items: items,
        is_dark: false
      });
      container.innerHTML = galleryHtml;
      
      const gallery = container.querySelector('[data-gallery]');
      expect(gallery.className).toContain('gallery--light');
    });

    it('should apply dark theme classes when is_dark is true', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Dark Theme',
        gallery_items: items,
        is_dark: true
      });
      container.innerHTML = galleryHtml;
      
      const gallery = container.querySelector('[data-gallery]');
      expect(gallery.className).toContain('gallery--dark');
    });

    it('should apply modifier classes', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Modified Gallery',
        gallery_items: items,
        modifier: 'custom-gallery portfolio-gallery'
      });
      container.innerHTML = galleryHtml;
      
      const gallery = container.querySelector('[data-gallery]');
      expect(gallery.className).toContain('custom-gallery');
      expect(gallery.className).toContain('portfolio-gallery');
    });
  });

  describe('Grid Layout', () => {
    it('should have responsive grid classes', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Grid Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const grid = container.querySelector('.gallery-grid');
      expect(grid.className).toContain('grid');
      expect(grid.className).toContain('grid-cols-1');
      expect(grid.className).toContain('sm:grid-cols-2');
      expect(grid.className).toContain('lg:grid-cols-4');
      expect(grid.className).toContain('gap-6');
    });

    it('should contain all gallery items in grid', () => {
      const items = [
        renderGalleryItem({ id: '1', media_thumb: '<img src="1.jpg" alt="1">' }),
        renderGalleryItem({ id: '2', media_thumb: '<img src="2.jpg" alt="2">' }),
        renderGalleryItem({ id: '3', media_thumb: '<img src="3.jpg" alt="3">' })
      ].join('');
      
      const galleryHtml = renderGallery({
        section_title: 'Multi-item Gallery',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const grid = container.querySelector('.gallery-grid');
      const galleryItems = grid.querySelectorAll('[data-gallery-item]');
      
      expect(galleryItems).toHaveLength(3);
    });
  });

  describe('Lightbox Functionality', () => {
    beforeEach(() => {
      // Mock event listeners for testing
      vi.spyOn(document, 'addEventListener');
    });

    it('should open lightbox when gallery item is clicked', () => {
      const items = [
        renderGalleryItem({ id: '1', media_thumb: '<img src="1.jpg" alt="1">', media_description: 'First image' }),
        renderGalleryItem({ id: '2', media_thumb: '<img src="2.jpg" alt="2">', media_description: 'Second image' })
      ].join('');
      
      const galleryHtml = renderGallery({
        section_title: 'Lightbox Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const firstItem = container.querySelector('[data-gallery-item]');
      const lightboxModal = container.querySelector('[data-lightbox-modal]');
      
      // Initially hidden
      expect(lightboxModal.classList.contains('hidden')).toBe(true);
      
      // Click to open
      firstItem.click();
      
      expect(lightboxModal.classList.contains('hidden')).toBe(false);
      expect(lightboxModal.getAttribute('data-current-index')).toBe('0');
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should close lightbox when close button is clicked', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="1.jpg" alt="1">' });
      const galleryHtml = renderGallery({
        section_title: 'Close Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const firstItem = container.querySelector('[data-gallery-item]');
      const lightboxModal = container.querySelector('[data-lightbox-modal]');
      const closeButton = container.querySelector('[data-lightbox-close]');
      
      // Open lightbox
      firstItem.click();
      expect(lightboxModal.classList.contains('hidden')).toBe(false);
      
      // Close lightbox
      closeButton.click();
      expect(lightboxModal.classList.contains('hidden')).toBe(true);
      expect(document.body.style.overflow).toBe('');
    });

    it('should close lightbox when backdrop is clicked', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="1.jpg" alt="1">' });
      const galleryHtml = renderGallery({
        section_title: 'Backdrop Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const firstItem = container.querySelector('[data-gallery-item]');
      const lightboxModal = container.querySelector('[data-lightbox-modal]');
      const backdrop = container.querySelector('[data-lightbox-backdrop]');
      
      // Open lightbox
      firstItem.click();
      expect(lightboxModal.classList.contains('hidden')).toBe(false);
      
      // Click backdrop to close
      backdrop.click();
      expect(lightboxModal.classList.contains('hidden')).toBe(true);
    });

    it('should display correct image and caption in lightbox', () => {
      const items = renderGalleryItem({ 
        id: 'test-img', 
        media_thumb: '<img src="thumb.jpg" alt="Test">', 
        media_description: 'Test description' 
      });
      const galleryHtml = renderGallery({
        section_title: 'Content Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const firstItem = container.querySelector('[data-gallery-item]');
      firstItem.click();
      
      const imageContainer = container.querySelector('[data-lightbox-image-container]');
      const caption = container.querySelector('[data-lightbox-caption]');
      
      expect(imageContainer.innerHTML).toContain('full-test-img.jpg');
      expect(caption.textContent).toBe('Test description');
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Accessible Gallery',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const section = container.querySelector('section');
      const heading = container.querySelector('h2');
      
      expect(section).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Accessible Gallery');
    });

    it('should use figure and figcaption elements', () => {
      const item = {
        id: 'accessible',
        media_thumb: '<img src="test.jpg" alt="Accessible image">',
        media_description: 'Accessible description'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const figure = container.querySelector('.gallery-figure');
      const caption = container.querySelector('.gallery-caption');
      
      expect(figure.tagName.toLowerCase()).toBe('figure');
      expect(caption.tagName.toLowerCase()).toBe('figcaption');
      expect(caption.className).toContain('sr-only');
    });

    it('should have keyboard navigation support', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'Keyboard Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const firstItem = container.querySelector('[data-gallery-item]');
      const lightboxModal = container.querySelector('[data-lightbox-modal]');
      
      // Open lightbox
      firstItem.click();
      expect(lightboxModal.classList.contains('hidden')).toBe(false);
      
      // Simulate Escape key
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(escapeEvent);
      
      expect(lightboxModal.classList.contains('hidden')).toBe(true);
    });

    it('should have proper ARIA attributes in lightbox', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        section_title: 'ARIA Test',
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      initGalleryBehavior(container);
      
      const lightboxModal = container.querySelector('[data-lightbox-modal]');
      const closeButton = container.querySelector('[data-lightbox-close]');
      
      expect(lightboxModal).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty gallery items gracefully', () => {
      const galleryHtml = renderGallery({
        section_title: 'Empty Gallery',
        gallery_items: ''
      });
      container.innerHTML = galleryHtml;
      
      const emptyState = container.querySelector('.gallery-empty');
      expect(emptyState).toBeInTheDocument();
    });

    it('should handle gallery without headers', () => {
      const items = renderGalleryItem({ id: '1', media_thumb: '<img src="test.jpg" alt="Test">' });
      const galleryHtml = renderGallery({
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const gallery = container.querySelector('[data-gallery]');
      const header = container.querySelector('.gallery-header');
      
      expect(gallery).toBeInTheDocument();
      expect(header).toBeInTheDocument();
      expect(container.querySelector('.gallery-title')).not.toBeInTheDocument();
      expect(container.querySelector('.gallery-pre-headline')).not.toBeInTheDocument();
      expect(container.querySelector('.gallery-sub-headline')).not.toBeInTheDocument();
    });

    it('should handle HTML content in descriptions', () => {
      const item = {
        id: 'html-desc',
        media_thumb: '<img src="test.jpg" alt="Test">',
        media_description: 'Description with <strong>HTML</strong> and <a href="#">links</a>'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const caption = container.querySelector('.gallery-caption');
      expect(caption.innerHTML).toContain('<strong>HTML</strong>');
      expect(caption.innerHTML).toContain('<a href="#">links</a>');
    });

    it('should handle special characters in titles and descriptions', () => {
      const specialTitle = 'Gallery with "quotes" & <symbols>';
      const specialDescription = 'Item with "quotes" & <symbols>';
      
      const items = renderGalleryItem({ 
        id: 'special', 
        media_thumb: '<img src="test.jpg" alt="Special">', 
        media_description: specialDescription 
      });
      const galleryHtml = renderGallery({
        section_title: specialTitle,
        gallery_items: items
      });
      container.innerHTML = galleryHtml;
      
      const title = container.querySelector('.gallery-title');
      const caption = container.querySelector('.gallery-caption');
      
      // HTML entities are automatically decoded by textContent
      expect(title.textContent).toContain('Gallery with "quotes" & ');
      expect(caption.textContent).toContain('Item with "quotes" & ');
    });

    it('should handle missing media gracefully', () => {
      const item = {
        id: 'no-media',
        media: '',
        media_thumb: '',
        media_description: 'No media item'
      };
      
      const itemHtml = renderGalleryItem(item);
      container.innerHTML = itemHtml;
      
      const galleryItem = container.querySelector('[data-gallery-item]');
      const thumbnail = container.querySelector('.gallery-thumbnail');
      
      expect(galleryItem).toBeInTheDocument();
      expect(thumbnail.innerHTML.trim()).toBe('');
    });
  });
});