import { renderHeading } from '../../.storybook/component-helpers.js';

// Create a proper hero template function that renders actual HTML
const heroTemplate = (args) => {
  const {
    modifier = '',
    media = '',
    heading = '',
    text = '',
    pre_headline = '',
    hero_layout = '',
    link = null,
    link2 = null
  } = args;

  // Video background layout
  if (hero_layout === 'video_background') {
    return `
      <div class="hero-wrapper ${modifier} video-header relative min-h-screen overflow-hidden">
        <!-- Video Background -->
        <div class="absolute inset-0 z-0">
          <div class="relative w-full h-full">
            ${media ? `
              <div class="absolute inset-0">
                ${media}
              </div>
            ` : `
              <!-- Fallback gradient background -->
              <div class="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-blue-600"></div>
            `}
            <!-- Video overlay for better text readability -->
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
        
        <!-- Navigation Bar for video background -->
        <nav class="relative z-20 w-full">
          <div class="absolute top-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
            <div class="container mx-auto px-4 py-4">
              <div class="flex items-center justify-between">
                <!-- Logo -->
                <div class="flex items-center">
                  <a href="/" class="block h-auto" aria-label="Go to homepage">
                    <span class="text-2xl font-bold text-white">adesso CMS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Content for video background -->
        <div class="relative z-10 flex items-center justify-center min-h-screen">
          <div class="container mx-auto px-4 text-center text-white">
            <div class="max-w-4xl mx-auto">
              ${pre_headline ? `
                <p class="text-xl mb-4 text-gray-200 uppercase tracking-wider">
                  ${pre_headline}
                </p>
              ` : ''}
              
              ${heading ? renderHeading({
                title: heading,
                as: 'h1',
                custom_classes: 'text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white'
              }) : ''}
              
              ${text ? `
                <div class="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto">
                  ${text}
                </div>
              ` : ''}
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                ${link && link.url ? `
                  <a href="${link.url}" class="btn bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                    ${link.title || 'Learn More'}
                  </a>
                ` : ''}
                
                ${link2 && link2.url ? `
                  <a href="${link2.url}" class="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                    ${link2.title || 'Get Started'}
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <a href="#content" class="text-white hover:text-gray-300 transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </a>
        </div>
      </div>
    `;
  }

  // Regular hero layout
  return `
    <div class="hero-wrapper ${modifier}">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">

        ${hero_layout === 'image_top' && media ? `
          <div class="mb-4 lg:mb-8 max-w-[1536px] mx-auto">
            <div class="relative aspect-[16/9] overflow-hidden rounded-lg [&>img]:absolute [&>img]:inset-0 [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
              ${media}
            </div>
          </div>
        ` : ''}

        ${pre_headline ? renderHeading({
          title: pre_headline,
          as: 'h3',
          custom_classes: 'mb-4 text-2xl font-bold tracking-tight leading-none md:text-3xl lg:text-4xl'
        }) : ''}

        ${heading ? renderHeading({
          title: heading,
          as: 'h1',
          custom_classes: 'mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl'
        }) : ''}

        ${text ? `
          <div class="prose-p:mb-8 prose-p:text-lg prose-p:font-normal
                    prose-p:lg:text-xl prose-p:sm:px-168 prose-p:lg:px-48">
            ${text}
          </div>
        ` : ''}

        ${link && link.url ? `
          <a href="${link.url}"
             class="inline-flex justify-center items-center py-3 px-5 text-base font-medium
                  text-center text-primary-foreground rounded-lg bg-primary hover:bg-primary/90
                  focus:ring-4 focus:ring-primary-300">
            ${link.title || 'Learn More'}
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        ` : ''}

        ${link2 && link2.url ? `
          <a href="${link2.url}"
             class="inline-flex py-3 px-5 sm:ms-4 text-base font-medium  focus:outline-none
                  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700
                  focus:z-10 focus:ring-4 focus:ring-gray-100">
            ${link2.title || 'Get Started'}
          </a>
        ` : ''}

        ${(hero_layout === 'image_bottom' || hero_layout === 'image_bottom_split') && media ? `
          <div class="mt-6 lg:mt-12 max-w-[1536px] mx-auto">
            <div class="relative aspect-[16/9] overflow-hidden rounded-lg [&>img]:absolute [&>img]:inset-0 [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
              ${media}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

const mockMedia = `
  <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80" alt="Example image" class="d-block w-full" width="1280" height="720" />
`;

const mockVideoMedia = `
  <video autoplay muted loop class="w-full h-full object-cover">
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
`;

export default {
  title: 'Editorial/Hero',
  argTypes: {
    modifier: { 
      control: 'text',
      description: 'Additional CSS classes for the hero wrapper'
    },
    media: { 
      control: 'text',
      description: 'Media content (image or video HTML)'
    },
    heading: { 
      control: 'text',
      description: 'Main hero heading'
    },
    text: { 
      control: 'text',
      description: 'Hero description text'
    },
    pre_headline: { 
      control: 'text',
      description: 'Pre-headline text above the main heading'
    },
    hero_layout: {
      control: 'select',
      options: ['', 'image_top', 'image_bottom', 'image_bottom_split', 'video_background'],
      name: 'layout',
      description: 'Select the layout variant for the Hero component.',
    },
    link: {
      control: 'object',
      description: 'Primary action link',
      defaultValue: { url: '#', title: 'Learn More' },
    },
    link2: {
      control: 'object',
      description: 'Secondary action link',
      defaultValue: { url: '#', title: 'Get Started' },
    },
  },
};

const renderHero = (args) => {
  return heroTemplate(args);
};

export const Default = {
  render: renderHero,
  args: {
    modifier: 'max-w-4xl',
    media: mockMedia,
    heading: 'Welcome to <strong>Our Website</strong>',
    text: 'This is a brief summary of our amazing content. It can include <em>formatted text</em> as well.',
    hero_layout: 'image_top',
    link: {
      url: 'https://example.com',
      title: 'Learn More',
    },
    link2: {
      url: 'https://example.com',
      title: 'Get Started',
    },
  },
};

export const ImageBottom = {
  render: renderHero,
  args: {
    ...Default.args,
    hero_layout: 'image_bottom',
  },
};

export const ImageBottomSplit = {
  render: renderHero,
  args: {
    ...Default.args,
    hero_layout: 'image_bottom_split',
    heading: 'Empower Your Content with DrupalX Today',
    text: 'Discover the power of a decoupled CMS that adapts to your needs. With DrupalX, you can create, manage, and scale your content effortlessly.',
  },
};

export const VideoBackground = {
  render: renderHero,
  args: {
    modifier: '',
    media: mockVideoMedia,
    heading: 'Revolutionary Content Management',
    text: 'Experience the future of content creation with our advanced CMS platform.',
    pre_headline: 'Innovation Starts Here',
    hero_layout: 'video_background',
    link: {
      url: '#',
      title: 'Get Started',
    },
    link2: {
      url: '#',
      title: 'Learn More',
    },
  },
};

export const MinimalHero = {
  render: renderHero,
  args: {
    heading: 'Simple and Clean',
    text: 'Sometimes less is more. This hero focuses on your message without distractions.',
    link: {
      url: '#',
      title: 'Take Action',
    },
  },
};
