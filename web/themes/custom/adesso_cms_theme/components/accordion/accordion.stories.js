import AccordionTemplateRaw from './accordion.twig';

// Create a simple template function for Storybook
const AccordionTemplate = (args) => {
  return `
    <div class="text-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        ${args.pre_headline ? `
          <span class="block mb-4 text-2xl font-bold tracking-tight leading-none text-center text-gray-900">
            ${args.pre_headline}
          </span>
        ` : ''}
        <h2 class="text-3xl font-bold text-center text-gray-900">
          ${args.title || 'Accordion Title'}
        </h2>
        <div class="mx-auto">
          <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white text-gray-900" data-inactive-classes="text-gray-900">
            ${(args.accordion_items || []).map((item, index) => `
              <div>
                <h3 id="accordion-flush-heading-${index + 1}">
                  <button type="button" class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 hover:bg-gray-50" data-accordion-target="#accordion-flush-body-${index + 1}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="accordion-flush-body-${index + 1}">
                    <span>${item.heading || 'Accordion Item'}</span>
                    <svg data-accordion-icon class="w-6 h-6 ${index === 0 ? 'rotate-180' : ''} shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </h3>
                <div id="accordion-flush-body-${index + 1}" class="${index === 0 ? '' : 'hidden'}" aria-labelledby="accordion-flush-heading-${index + 1}">
                  <div class="py-5 border-b border-gray-200">
                    ${item.body || '<p>Accordion content</p>'}
                    ${item.link ? `
                      <p class="mt-4">
                        <a href="${item.link.url || '#'}" class="text-blue-600 hover:underline">
                          ${item.link.title || 'Learn more'}
                        </a>
                      </p>
                    ` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};

export default {
  title: 'Editorial/Accordion',
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the accordion group',
    },
    pre_headline: {
      control: 'text',
      description: 'Pre headline for the accordion group'
    },
    accordion_items: {
      description:
        'Define the list of items containing the title and content of each accordion',
      control: 'object',
      type: {
        required: true
      }
    }
  }
};

export const Default = (args) => AccordionTemplate(args);

Default.args = {
  title: 'Accordion Group Title',
  modifier: '',
  accordion_items: [
    {
      heading: 'Curabitur aliquet quam id dui posuere blandit.',
      body:
        '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
      accordion_instance: '1',
      link: {
        url: 'https://www.google.com',
        title: 'Learn more',
      }
    },
    {
      heading: 'Curabitur aliquet quam',
      body:
        '<p>Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>',
      accordion_instance: '2',
      link: {
        url: 'https://www.google.com',
        title: 'Learn more',
      }
    },
    {
      heading:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      body:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est sit amet facilisis magna etiam tempor orci. Auctor eu augue ut lectus arcu bibendum at varius. Risus ultricies tristique nulla aliquet enim tortor at auctor.</p>',
      accordion_instance: '3',
      link: {
        url: 'https://www.google.com',
        title: 'Learn more',
      }
    }
  ]
};

Default.play = async () => {
  // Initialize Flowbite accordion if available
  if (typeof window !== 'undefined') {
    // Try to initialize Flowbite accordion functionality
    if (window.initFlowbite) {
      window.initFlowbite();
    }
    
    // Alternative: initialize accordion manually if Flowbite is available
    if (window.Flowbite && window.Flowbite.Accordion) {
      const accordionElement = document.getElementById('accordion-flush');
      if (accordionElement) {
        new window.Flowbite.Accordion(accordionElement);
      }
    }
  }
};
