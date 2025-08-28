// phpcs:ignoreFile

import Component from './logo-collection.twig';

const meta = {
  title: 'Editorial/LogoCollection',
  component: Component,
  argTypes: {
    pre_headline: {
      name: 'Pre-headline',
      description: 'Pre-headline text for the logo collection section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    title: {
      name: 'Title',
      description: 'Title for the logo collection section',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    logos: {
      name: 'Logos',
      description: 'Array of logo objects',
      control: { type: 'object' },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  tags: ['autodocs'],
};
export default meta;

const sampleLogos = [
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Microsoft',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/google.com" alt="Google" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Google',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/apple.com" alt="Apple" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Apple',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/amazon.com" alt="Amazon" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Amazon',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/meta.com" alt="Meta" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Meta',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/netflix.com" alt="Netflix" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Netflix',
    icon: '',
  },
];

const techStackLogos = [
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/drupal.org" alt="Drupal" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Drupal',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/reactjs.org" alt="React" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'React',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/tailwindcss.com" alt="Tailwind CSS" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Tailwind CSS',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/vitejs.dev" alt="Vite" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Vite',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/storybook.js.org" alt="Storybook" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Storybook',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/github.com" alt="GitHub" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'GitHub',
    icon: '',
  },
];

const consultingPartners = [
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/deloitte.com" alt="Deloitte" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Deloitte',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/kpmg.com" alt="KPMG" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'KPMG',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/pwc.com" alt="PwC" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'PwC',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/accenture.com" alt="Accenture" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Accenture',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/bcg.com" alt="Boston Consulting Group" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'Boston Consulting Group',
    icon: '',
  },
  {
    media:
      '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/mckinsey.com" alt="McKinsey & Company" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
    title: 'McKinsey & Company',
    icon: '',
  },
];

export const LogoCollection = {
  parameters: {
    layout: 'padded',
  },
  args: {
    pre_headline: 'Trusted by Industry Leaders',
    title: 'Partner Network',
    logos: sampleLogos,
  },
};

export const ClientShowcase = {
  args: {
    ...LogoCollection.args,
    pre_headline: 'Serving Global Enterprises',
    title: 'Our Clients',
    logos: consultingPartners,
  },
};

export const TechnologyStack = {
  args: {
    ...LogoCollection.args,
    pre_headline: 'Built with Modern Technology',
    title: 'Technology Stack',
    logos: techStackLogos,
  },
};

export const MinimalVersion = {
  args: {
    ...LogoCollection.args,
    pre_headline: '',
    title: 'Strategic Partners',
    logos: sampleLogos,
  },
};

export const FewLogos = {
  args: {
    ...LogoCollection.args,
    pre_headline: 'Key Partnerships',
    title: 'Strategic Alliances',
    logos: sampleLogos.slice(0, 4),
  },
};

export const ExtendedCollection = {
  args: {
    ...LogoCollection.args,
    pre_headline: 'Global Network',
    title: 'International Partners',
    logos: [
      ...sampleLogos,
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/spotify.com" alt="Spotify" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'Spotify',
        icon: '',
      },
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/adobe.com" alt="Adobe" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'Adobe',
        icon: '',
      },
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/salesforce.com" alt="Salesforce" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'Salesforce',
        icon: '',
      },
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/intel.com" alt="Intel" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'Intel',
        icon: '',
      },
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/ibm.com" alt="IBM" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'IBM',
        icon: '',
      },
      {
        media:
          '<div class="flex items-center justify-center h-16"><img src="https://logo.clearbit.com/oracle.com" alt="Oracle" class="h-10 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" /></div>',
        title: 'Oracle',
        icon: '',
      },
    ],
  },
};

export const EmptyState = {
  args: {
    ...LogoCollection.args,
    pre_headline: 'Coming Soon',
    title: 'Partner Network',
    logos: [],
  },
};
