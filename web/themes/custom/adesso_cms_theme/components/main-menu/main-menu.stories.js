/**
 * @file
 * Main Menu stories adapted from CivicTheme structure
 * Navigation component with robust data handling and accessibility
 */

import Component from './main-menu.twig';

const meta = {
  title: 'Navigation/Main Menu',
  component: Component,
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
    items: {
      control: { type: 'object' },
      description: 'Array of menu items with title, url, and below properties',
    },
    is_collapsible: {
      control: { type: 'boolean' },
    },
    modifier_class: {
      control: { type: 'text' },
    },
  },
};

export default meta;

export const MainMenu = {
  parameters: {
    layout: 'centered',
  },
  args: {
    theme: 'light',
    items: [
      {
        title: 'Home',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: true,
      },
      {
        title: 'Services',
        url: '#',
        below: [
          {
            title: 'Web Development',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
          {
            title: 'Mobile Apps',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
          {
            title: 'Cloud Solutions',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
        ],
        is_expanded: false,
        in_active_trail: false,
      },
      {
        title: 'Products',
        url: '#',
        below: [
          {
            title: 'CMS Platform',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
          {
            title: 'E-commerce',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
        ],
        is_expanded: false,
        in_active_trail: false,
      },
      {
        title: 'About',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: false,
      },
      {
        title: 'Contact',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: false,
      },
    ],
    is_collapsible: false,
    modifier_class: '',
  },
};

export const CollapsibleMenu = {
  parameters: {
    layout: 'centered',
  },
  args: {
    theme: 'light',
    items: [
      {
        title: 'Home',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: true,
      },
      {
        title: 'Services',
        url: '#',
        below: [
          {
            title: 'Web Development',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
          {
            title: 'Mobile Apps',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
        ],
        is_expanded: true,
        in_active_trail: true,
      },
      {
        title: 'About',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: false,
      },
    ],
    is_collapsible: true,
    modifier_class: '',
  },
};

export const DarkTheme = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  args: {
    theme: 'dark',
    items: [
      {
        title: 'Home',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: true,
      },
      {
        title: 'Services',
        url: '#',
        below: [
          {
            title: 'Web Development',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
          {
            title: 'Mobile Apps',
            url: '#',
            below: [],
            is_expanded: false,
            in_active_trail: false,
          },
        ],
        is_expanded: false,
        in_active_trail: false,
      },
      {
        title: 'About',
        url: '#',
        below: [],
        is_expanded: false,
        in_active_trail: false,
      },
    ],
    is_collapsible: false,
    modifier_class: '',
  },
};

