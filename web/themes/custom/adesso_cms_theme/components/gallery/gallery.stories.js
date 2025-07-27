import './gallery.behavior.js';

// Helper function to create heading HTML
const createHeading = (title, tag = 'h2', classes = '') => {
  if (!title) return '';
  
  const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
  const finalTag = validTags.includes(tag) ? tag : 'h2';
  
  return `<${finalTag} class="${classes}">${title}</${finalTag}>`;
};

// Helper function to create gallery item HTML
const createGalleryItem = (item) => {
  const {
    id = '',
    media = '',
    media_thumb = '',
    media_description = 'Gallery Image'
  } = item;

  return `
    <div class="aspect-w-16 aspect-h-9">
      <button type="button" 
              class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground p-0 w-full h-full" 
              data-id="${id}" 
              onclick="openModal('${id}')"
              aria-label="Open gallery image: ${media_description.replace(/<[^>]*>/g, '')}">
        ${media_thumb}
      </button>

      <div id="modal-${id}" 
           class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 hidden z-50" 
           data-id="${id}" 
           role="dialog" 
           aria-modal="true"
           aria-labelledby="modal-title-${id}"
           aria-describedby="description-${id}"
           aria-hidden="true">
        <div class="bg-white p-6 max-w-screen-sm w-full mx-4">
          <div class="mb-4">
            <h2 id="modal-title-${id}" class="text-xl font-bold">${media_description}</h2>
          </div>
          <div id="description-${id}" class="max-h-[70vh] overflow-auto">
            ${media}
          </div>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <button type="button" 
                    class="modal-close inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2 gallery-close" 
                    data-id="${id}"
                    aria-label="Close gallery modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Main gallery template function
const galleryLightboxTemplate = (args) => {
  const {
    pre_headline = '',
    section_title = '',
    sub_headline = '',
    gallery_items = [],
    modifier = ''
  } = args;

  const preHeadlineHtml = pre_headline ? 
    createHeading(pre_headline, 'span', 'block mb-4 text-2xl font-bold tracking-tight leading-none text-center text-gray-900') : '';
  
  const sectionTitleHtml = section_title ? 
    createHeading(section_title, 'h2', 'text-3xl font-bold mb-8 text-center') : '';

  const galleryItemsHtml = gallery_items.map(item => createGalleryItem(item)).join('');

  return `
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
      ${preHeadlineHtml}
      ${sectionTitleHtml}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${galleryItemsHtml}
      </div>
    </div>
  `;
};

/**
 * Meta configuration for the Gallery component.
 * Aligns with React Storybook by specifying title, component, and argTypes.
 */
export default {
  title: 'Editorial/Gallery',
  argTypes: {
    pre_headline: {
      description: 'The pre-headline of the gallery lightbox component',
      control: 'text',
      defaultValue: 'Optional Pre-headline',
    },
    section_title: {
      description: 'The title of the gallery lightbox component',
      control: 'text',
      defaultValue: 'Optional Title',
    },
    sub_headline: {
      description: 'The sub-headline of the gallery lightbox component',
      control: 'text',
      defaultValue: 'Optional Sub-headline',
    },
    gallery_items: {
      description: 'Define the array of gallery lightbox items',
      control: 'object',
      defaultValue: [
        {
          id: 'exampleLightbox1',
          media:
            "<img src='./images/card.webp' width='100%' class='card-img-top' alt='Gallery 1' />",
          media_thumb:
            "<img src='./images/card.webp' alt='Gallery 1' />",
          media_description: 'Gallery 1 here!',
        },
      ],
    },
    modifier: {
      description: 'The modifier class to apply to the gallery lightbox component',
      control: 'text',
      defaultValue: 'p-2',
    },
  },
};

const template = (args) => galleryLightboxTemplate(args);

/**
 * Default Gallery Story
 * Mirrors the React Storybook's 'Default' story structure.
 */
export const Default = template.bind({});
Default.args = {
  section_title: 'Gallery Title',
  intro_text:
    '<p>This is a sample summary for the gallery.</p>',
  modifier: 'p-2',
  gallery_items: [
    {
      id: 'exampleLightbox1',
      media:
        "<img src='./images/card.webp' width='100%' alt='Gallery 1' />",
      media_thumb:
        "<img src='./images/card.webp' alt='Gallery 1' />",
      media_description: 'Gallery 1 here!',
    },
    {
      id: 'exampleLightbox2',
      media:
        "<img src='./images/card.webp' width='100%' alt='Gallery 2' />",
      media_thumb:
        "<img src='./images/card.webp' alt='Gallery 2' />",
      media_description: 'Gallery 2 here!',
    },
    {
      id: 'exampleLightbox3',
      media:
        "<img src='./images/card.webp' width='100%' alt='Gallery 3' />",
      media_thumb:
        "<img src='./images/card.webp' alt='Gallery 2' />",
      media_description: 'Gallery 2 here!',
    },
    {
      id: 'exampleLightbox4',
      media:
        "<img src='./images/card.webp' width='100%' alt='Gallery 4' />",
      media_thumb:
        "<img src='./images/card.webp' alt='Gallery 2' />",
      media_description: 'Gallery 2 here!',
    },
  ],
};
