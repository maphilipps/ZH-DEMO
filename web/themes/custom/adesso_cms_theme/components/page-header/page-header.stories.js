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
  },
};

/**
 * Default page header with background image
 */
export const Default = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    title: 'Support center',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Collaborative workspace with people working together',
  },
};

/**
 * Page header with only title (no background image - uses bg-primary)
 */
export const TitleOnly = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    title: 'About Us',
    // No background_image provided - will use bg-primary fallback
  },
};

/**
 * Page header with background image and title
 */
export const WithBackgroundImage = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    title: 'Our Team',
    description: 'Meet the talented people behind our success.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Office environment',
  },
};

/**
 * Page header with custom background
 */
export const CustomBackground = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    title: 'Our Services',
    description: 'We provide comprehensive digital solutions to help your business grow and succeed in the modern marketplace.',
    background_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&h=1500&q=80',
    alt_text: 'Modern office building exterior',
  },
};

/**
 * Page header with long content
 */
export const LongContent = {
  render: (args) => pageHeaderTemplate(args),
  args: {
    title: 'Enterprise Solutions & Digital Transformation Services',
    description: 'We help organizations navigate the complexities of digital transformation with comprehensive solutions that include cloud migration, data analytics, artificial intelligence integration, and custom software development tailored to your specific business needs.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Technology and innovation workspace',
  },
};