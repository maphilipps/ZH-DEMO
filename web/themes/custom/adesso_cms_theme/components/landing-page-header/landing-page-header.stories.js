import { landingPageHeaderTemplate } from './landing-page-header.twig';

export default {
  title: 'Layout/Landing Page Header',
  component: landingPageHeaderTemplate,
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title for the landing page'
    },
    description: {
      control: 'text',
      description: 'The description text below the title'
    },
    background_image: {
      control: 'text',
      description: 'URL of the background image'
    },
    alt_text: {
      control: 'text',
      description: 'Alt text for the background image'
    },
    site_name: {
      control: 'text',
      description: 'Name of the site for logo'
    },
    logo: {
      control: 'text',
      description: 'Site logo URL'
    },
    front_page: {
      control: 'text',
      description: 'URL to the front page'
    }
  }
};

export const Default = {
  args: {
    title: 'Welcome to Our Platform',
    description: 'Transform your business with our innovative solutions. We provide cutting-edge technology and exceptional service to help you succeed.',
    background_image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply',
    alt_text: 'Modern office building',
    site_name: 'adessoCMS',
    logo: '',
    front_page: '/',
    main_menu: [
      {
        title: 'About',
        url: '/about',
        children: []
      },
      {
        title: 'Services',
        url: '/services',
        children: [
          { title: 'Consulting', url: '/services/consulting' },
          { title: 'Development', url: '/services/development' }
        ]
      },
      {
        title: 'Contact',
        url: '/contact',
        children: []
      }
    ]
  }
};

export const WithoutImage = {
  args: {
    title: 'No Background Image',
    description: 'This version shows the landing page header with a gradient background instead of an image.',
    background_image: '',
    alt_text: '',
    site_name: 'adessoCMS',
    logo: '',
    front_page: '/',
    main_menu: [
      {
        title: 'Home',
        url: '/',
        children: []
      },
      {
        title: 'Products',
        url: '/products',
        children: []
      }
    ]
  }
};

export const ShortTitle = {
  args: {
    title: 'Success',
    description: 'Sometimes less is more. This demonstrates a short, impactful title.',
    background_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2848&h=1500&q=80',
    alt_text: 'Success concept',
    site_name: 'adessoCMS',
    logo: '',
    front_page: '/',
    main_menu: [
      {
        title: 'Solutions',
        url: '/solutions',
        children: []
      }
    ]
  }
};