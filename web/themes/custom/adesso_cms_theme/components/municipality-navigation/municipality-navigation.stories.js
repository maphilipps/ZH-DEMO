/**
 * @file
 * Municipality Navigation Component Stories
 */

import template from './municipality-navigation.twig';
import './municipality-navigation.behavior.js';

export default {
  title: 'Components/Municipality Navigation',
  component: 'municipality-navigation',
  parameters: {
    docs: {
      description: {
        component: 'Responsive navigation component for Swiss municipality portals with multi-site support, AI-enhanced search, and language switching capabilities.',
      },
    },
  },
  argTypes: {
    municipality: {
      control: { type: 'select' },
      options: ['thalwil', 'thalheim', 'erlenbach'],
      description: 'Select the municipality theme',
    },
    searchEnabled: {
      control: { type: 'boolean' },
      description: 'Enable AI-enhanced search functionality',
    },
    mobileBreakpoint: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Responsive breakpoint for mobile menu',
    },
  },
};

// Default navigation items
const defaultItems = [
  {
    title: 'Politik & Verwaltung',
    url: '#politik',
    active: false,
    children: [
      { title: 'Gemeinderat', url: '#gemeinderat', active: false },
      { title: 'Kommissionen', url: '#kommissionen', active: false },
      { title: 'Abstimmungen', url: '#abstimmungen', active: false },
      { title: 'Gemeindeversammlung', url: '#versammlung', active: false },
    ],
  },
  {
    title: 'Online-Schalter',
    url: '#online-schalter',
    active: true,
    children: [
      { title: 'Baubewilligung', url: '#baubewilligung', active: false },
      { title: 'Umzugsmeldung', url: '#umzug', active: false },
      { title: 'Betreibungsregister', url: '#betreibung', active: false },
      { title: 'Hunderegistrierung', url: '#hunde', active: false },
    ],
  },
  {
    title: 'Leben & Wohnen',
    url: '#leben',
    active: false,
    children: [
      { title: 'Bildung', url: '#bildung', active: false },
      { title: 'Gesundheit', url: '#gesundheit', active: false },
      { title: 'Kultur & Freizeit', url: '#kultur', active: false },
      { title: 'Sport', url: '#sport', active: false },
    ],
  },
  {
    title: 'Wirtschaft',
    url: '#wirtschaft',
    active: false,
    children: [
      { title: 'Standortförderung', url: '#standort', active: false },
      { title: 'Gewerbeverzeichnis', url: '#gewerbe', active: false },
      { title: 'Arbeitsbewilligungen', url: '#arbeit', active: false },
    ],
  },
  {
    title: 'Aktuelles',
    url: '#aktuelles',
    active: false,
    children: null,
  },
  {
    title: 'Kontakt',
    url: '#kontakt',
    active: false,
    children: null,
  },
];

// Default language links
const defaultLanguageLinks = [
  { code: 'de', label: 'Deutsch', url: '#de', active: true },
  { code: 'fr', label: 'Français', url: '#fr', active: false },
  { code: 'it', label: 'Italiano', url: '#it', active: false },
  { code: 'en', label: 'English', url: '#en', active: false },
];

/**
 * Thalwil Municipality Theme
 */
export const Thalwil = {
  render: (args) => template(args),
  args: {
    municipality: 'thalwil',
    items: defaultItems,
    languageLinks: defaultLanguageLinks,
    searchEnabled: true,
    mobileBreakpoint: 'lg',
  },
};

/**
 * Thalheim Municipality Theme
 */
export const Thalheim = {
  render: (args) => template(args),
  args: {
    municipality: 'thalheim',
    items: defaultItems,
    languageLinks: defaultLanguageLinks,
    searchEnabled: true,
    mobileBreakpoint: 'lg',
  },
};

/**
 * Erlenbach Municipality Theme
 */
export const Erlenbach = {
  render: (args) => template(args),
  args: {
    municipality: 'erlenbach',
    items: defaultItems,
    languageLinks: defaultLanguageLinks,
    searchEnabled: true,
    mobileBreakpoint: 'lg',
  },
};

/**
 * Mobile View
 */
export const Mobile = {
  render: (args) => template(args),
  args: {
    municipality: 'thalwil',
    items: defaultItems,
    languageLinks: defaultLanguageLinks,
    searchEnabled: true,
    mobileBreakpoint: 'lg',
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone6',
    },
  },
};

/**
 * Without Search
 */
export const WithoutSearch = {
  render: (args) => template(args),
  args: {
    municipality: 'thalwil',
    items: defaultItems,
    languageLinks: defaultLanguageLinks,
    searchEnabled: false,
    mobileBreakpoint: 'lg',
  },
};

/**
 * Single Language
 */
export const SingleLanguage = {
  render: (args) => template(args),
  args: {
    municipality: 'thalwil',
    items: defaultItems,
    languageLinks: [
      { code: 'de', label: 'Deutsch', url: '#de', active: true },
    ],
    searchEnabled: true,
    mobileBreakpoint: 'lg',
  },
};

/**
 * Minimal Navigation
 */
export const Minimal = {
  render: (args) => template(args),
  args: {
    municipality: 'thalwil',
    items: [
      { title: 'Home', url: '/', active: true },
      { title: 'Services', url: '#services', active: false },
      { title: 'Contact', url: '#contact', active: false },
    ],
    languageLinks: [],
    searchEnabled: false,
    mobileBreakpoint: 'lg',
  },
};