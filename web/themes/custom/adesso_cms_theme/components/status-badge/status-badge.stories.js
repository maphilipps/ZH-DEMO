// phpcs:ignoreFile

import statusBadgeTemplate from './status-badge.twig';

export default {
  title: 'Components/Status Badge',
  component: statusBadgeTemplate,
  argTypes: {
    status: {
      control: 'select',
      options: [
        'draft',
        'published',
        'rejected',
        'neu',
        'in_bearbeitung',
        'erledigt',
        'abgelehnt',
      ],
      description: 'The status value',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'draft' },
      },
    },
    label: {
      control: 'text',
      description: 'Custom label override',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        type: { summary: 'enum' },
        defaultValue: { summary: 'md' },
      },
    },
    show_icon: {
      control: 'boolean',
      description: 'Show status icon',
      table: {
        defaultValue: { summary: true },
      },
    },
    modifier: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

// Event Review statuses
export const Draft = {
  args: {
    status: 'draft',
    size: 'md',
    show_icon: true,
  },
};

export const Published = {
  args: {
    status: 'published',
    size: 'md',
    show_icon: true,
  },
};

export const Rejected = {
  args: {
    status: 'rejected',
    size: 'md',
    show_icon: true,
  },
};

// Infrastructure Report statuses
export const Neu = {
  args: {
    status: 'neu',
    size: 'md',
    show_icon: true,
  },
};

export const InBearbeitung = {
  args: {
    status: 'in_bearbeitung',
    size: 'md',
    show_icon: true,
  },
};

export const Erledigt = {
  args: {
    status: 'erledigt',
    size: 'md',
    show_icon: true,
  },
};

export const Abgelehnt = {
  args: {
    status: 'abgelehnt',
    size: 'md',
    show_icon: true,
  },
};

// Size variations
export const SmallBadge = {
  args: {
    status: 'published',
    size: 'sm',
    show_icon: false,
  },
};

export const LargeBadge = {
  args: {
    status: 'in_bearbeitung',
    size: 'lg',
    show_icon: true,
  },
};

// Custom label
export const CustomLabel = {
  args: {
    status: 'published',
    label: 'Aktiv',
    size: 'md',
    show_icon: true,
  },
};
