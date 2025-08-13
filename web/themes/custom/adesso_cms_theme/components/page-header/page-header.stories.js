import pageHeaderTemplate from './page-header.twig';

/**
 * Page Header stories for Storybook
 */
export default {
  title: 'Components/Page Header',
  component: 'page-header',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'landing', 'hero'],
      description: 'Header variant to display',
      defaultValue: 'default',
    },
    modifier: {
      control: 'text',
      description: 'Additional CSS classes for the page header wrapper',
    },
    background_image: {
      control: 'text',
      description: 'Background image URL for the header',
    },
    title: {
      control: 'text',
      description: 'Page title',
    },
    description: {
      control: 'text',
      description: 'Optional page description text',
    },
    alt_text: {
      control: 'text',
      description: 'Alt text for the background image',
    },
    navbar_transparent: {
      control: 'boolean',
      description: 'Whether to make the navbar transparent (used with landing variant)',
    },
  },
};

/**
 * Default page header variant with standard spacing
 */
export const Default = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'default',
    title: 'Support Center',
    description: 'Find answers to common questions and get the help you need from our comprehensive support resources.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Collaborative workspace with people working together',
    navbar_transparent: false,
  },
};

/**
 * Landing page header variant with tall spacing and negative margin
 */
export const Landing = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'landing',
    title: 'Transform Your Business',
    description: 'Discover innovative solutions that drive growth and success in the digital age.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Modern office environment showcasing innovation',
    navbar_transparent: true,
  },
};

/**
 * Hero header variant for future video backgrounds and enhanced interactivity
 */
export const Hero = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'hero',
    title: 'The Future is Here',
    description: 'Experience next-generation technology solutions that revolutionize how you work and connect.',
    background_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&h=1500&q=80',
    alt_text: 'Futuristic technology and innovation concepts',
    navbar_transparent: false,
  },
};

/**
 * Default variant with only title (no background image - uses bg-primary)
 */
export const TitleOnly = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'default',
    title: 'About Us',
    navbar_transparent: false,
    // No background_image provided - will use bg-primary fallback
  },
};

/**
 * Landing variant demonstrating transparent navbar integration
 */
export const LandingWithTransparentNav = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'landing',
    title: 'Welcome to Innovation',
    description: 'Where cutting-edge technology meets exceptional user experience.',
    background_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&h=1500&q=80',
    alt_text: 'Innovation and technology showcase',
    navbar_transparent: true,
  },
};

/**
 * Hero variant with custom background for future video integration
 */
export const HeroVideoReady = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'hero',
    title: 'Next Generation Platform',
    description: 'Built for tomorrow\'s challenges with today\'s most advanced technologies.',
    background_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&h=1500&q=80',
    alt_text: 'Digital technology and connectivity visualization',
    navbar_transparent: false,
  },
};

/**
 * Default variant with long content to test text wrapping
 */
export const LongContent = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'default',
    title: 'Enterprise Solutions & Digital Transformation Services',
    description: 'We help organizations navigate the complexities of digital transformation with comprehensive solutions that include cloud migration, data analytics, artificial intelligence integration, and custom software development tailored to your specific business needs.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Technology and innovation workspace',
    navbar_transparent: false,
  },
};

/**
 * Landing variant with long content to test large text handling
 */
export const LandingLongContent = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    variant: 'landing',
    title: 'Revolutionizing Digital Experiences',
    description: 'We create immersive digital experiences that transform how businesses connect with their customers, leveraging cutting-edge technology and innovative design principles to drive engagement and growth.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Digital transformation and innovation',
    navbar_transparent: true,
  },
};