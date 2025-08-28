export default {
  title: 'Atoms/Menu Item',
  parameters: {
    docs: {
      description: {
        component: 'Atomic menu item component that provides consistent styling and behavior for navigation systems. Used by main-menu organism for unified navigation architecture.'
      }
    }
  }
};

export const Default = {
  args: {
    title: 'Home',
    url: '/',
    is_active: false,
    has_children: false,
    level: 0,
    variant: 'default',
    theme: 'default'
  }
};

export const Active = {
  args: {
    ...Default.args,
    title: 'Current Page',
    is_active: true
  }
};

export const WithChildren = {
  args: {
    ...Default.args,
    title: 'Services',
    url: '/services',
    has_children: true
  }
};

export const DesktopVariant = {
  args: {
    ...Default.args,
    title: 'About Us',
    url: '/about',
    variant: 'desktop'
  }
};

export const MobileVariant = {
  args: {
    ...Default.args,
    title: 'Contact',
    url: '/contact',
    variant: 'mobile'
  }
};

export const DropdownVariant = {
  args: {
    ...Default.args,
    title: 'Consulting',
    url: '/services/consulting',
    variant: 'dropdown',
    level: 1
  }
};

export const TransparentTheme = {
  args: {
    ...Default.args,
    title: 'Portfolio',
    url: '/portfolio',
    theme: 'transparent'
  }
};

export const InActiveTrail = {
  args: {
    ...Default.args,
    title: 'Services',
    url: '/services',
    in_active_trail: true,
    has_children: true
  }
};

export const ExternalLink = {
  args: {
    ...Default.args,
    title: 'External Site',
    url: 'https://example.com',
    target: '_blank',
    aria_label: 'External Site (opens in new window)'
  }
};

export const NoLink = {
  args: {
    ...Default.args,
    title: 'Section Header',
    url: '<nolink>',
    variant: 'dropdown'
  }
};