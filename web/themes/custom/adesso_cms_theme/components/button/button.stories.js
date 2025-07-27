// Create a proper button template function that renders actual HTML
const buttonTemplate = (args) => {
  const {
    url = '',
    text = '',
    icon = '',
    variant = '',
    size = '',
    modifier = ''
  } = args;

  // Determine variant classes
  let variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
  if (variant === 'secondary') {
    variantClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
  } else if (variant === 'outline') {
    variantClasses = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  } else if (variant === 'ghost') {
    variantClasses = 'hover:bg-accent hover:text-accent-foreground';
  } else if (variant === 'destructive') {
    variantClasses = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
  } else if (variant === 'link') {
    variantClasses = 'text-primary underline-offset-4 hover:underline';
  }

  // Determine size classes
  let sizeClasses = 'h-9 px-4 py-2';
  if (size === 'sm') {
    sizeClasses = 'h-8 px-3 py-1.5 text-xs';
  } else if (size === 'lg') {
    sizeClasses = 'h-12 px-6 py-3 text-lg';
  } else if (size === 'icon') {
    sizeClasses = 'h-9 w-9';
  }

  const baseClasses = 'inline-flex rounded-lg items-center justify-center whitespace-nowrap text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses}${modifier ? ' ' + modifier : ''}`;

  const iconHtml = icon ? `<i data-lucide="${icon}" width="18" height="18" class="ml-2 h-4 w-4"></i>` : '';

  if (url) {
    return `<a href="${url}" class="${allClasses}">${text}${iconHtml}</a>`;
  } else {
    return `<button class="${allClasses}">${text}${iconHtml}</button>`;
  }
};

export default {
  title: 'General/Button',
  argTypes: {
    url: {
      description: 'The URL the button links to',
      control: 'text',
    },
    text: {
      description: 'The text inside the button',
      control: 'text',
    },
    icon: {
      description: 'The icon to display inside the button',
      control: 'text',
    },
    variant: {
      description: 'The button variant',
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      description: 'The button size',
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

const renderButton = (args) => {
  return buttonTemplate({
    url: args.url,
    text: args.text,
    icon: args.icon,
    variant: args.variant,
    size: args.size,
  });
};

export const Default = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Default Button',
    icon: 'arrow-right',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Outline = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Outline Button',
    variant: 'outline',
  },
};

export const Secondary = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Ghost = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Link Button',
    variant: 'link',
  },
};

export const Small = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  render: renderButton,
  args: {
    url: '#',
    text: 'Large Button',
    size: 'lg',
  },
};

export const IconButton = {
  render: renderButton,
  args: {
    url: '#',
    text: '',
    icon: 'arrow-right',
    size: 'icon',
  },
};
