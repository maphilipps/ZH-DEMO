import { Story, Meta } from '@storybook/html';
import { include } from '@storybook/addon-docs';

export default {
  title: 'Components/Paragraph Wrapper',
  component: 'paragraph-wrapper',
  parameters: {
    docs: {
      description: {
        component: 'A reusable wrapper component for paragraph content with theme support and semantic HTML structure. Provides consistent spacing, theming, and layout controls for wrapped content.',
      },
    },
  },
  argTypes: {
    content: {
      name: 'Content',
      description: 'The main content to be wrapped',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    theme: {
      name: 'Theme',
      description: 'Theme variant for the wrapper',
      control: { type: 'select' },
      options: ['', 'light', 'dark', 'primary', 'secondary', 'accent'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    className: {
      name: 'CSS Classes',
      description: 'Additional CSS classes for the wrapper container',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    id: {
      name: 'ID',
      description: 'Optional unique identifier for the wrapper element',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    tag: {
      name: 'HTML Tag',
      description: 'HTML tag to use for the wrapper element',
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'div' },
      },
    },
    spacing: {
      name: 'Spacing',
      description: 'Predefined spacing configuration for the wrapper',
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'xlarge'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    width: {
      name: 'Width',
      description: 'Width constraint for the wrapper content',
      control: { type: 'select' },
      options: ['full', 'contained', 'narrow', 'wide'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'contained' },
      },
    },
  },
};

// Template function
const Template = (args) => {
  return include('./paragraph-wrapper.twig', args);
};

// Default story
export const Default = Template.bind({});
Default.args = {
  content: '<p>This is sample paragraph content wrapped by the paragraph wrapper component. It demonstrates the default styling and behavior.</p>',
};

// With theme
export const WithTheme = Template.bind({});
WithTheme.args = {
  content: '<p>This paragraph wrapper has a dark theme applied, showcasing the theming capabilities of the component.</p>',
  theme: 'dark',
};

// Different spacing options
export const SmallSpacing = Template.bind({});
SmallSpacing.args = {
  content: '<p>This wrapper uses small spacing for a more compact layout.</p>',
  spacing: 'small',
};

export const LargeSpacing = Template.bind({});
LargeSpacing.args = {
  content: '<p>This wrapper uses large spacing for more breathing room around the content.</p>',
  spacing: 'large',
};

// Different width constraints
export const NarrowWidth = Template.bind({});
NarrowWidth.args = {
  content: '<p>This content is constrained to a narrow width, ideal for focused reading experiences or sidebar content.</p>',
  width: 'narrow',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  content: '<p>This content spans the full available width, perfect for hero sections or full-bleed layouts.</p>',
  width: 'full',
};

// Semantic HTML tags
export const AsSection = Template.bind({});
AsSection.args = {
  content: '<h2>Section Content</h2><p>This wrapper uses a semantic section tag instead of a div, improving accessibility and HTML structure.</p>',
  tag: 'section',
  theme: 'primary',
};

export const AsArticle = Template.bind({});
AsArticle.args = {
  content: '<h1>Article Title</h1><p>This wrapper uses the article tag, perfect for standalone content that could be distributed independently.</p>',
  tag: 'article',
  spacing: 'large',
};

// Complex content example
export const ComplexContent = Template.bind({});
ComplexContent.args = {
  content: `
    <h2>Complex Content Example</h2>
    <p>This demonstrates how the paragraph wrapper handles more complex content structures.</p>
    <ul>
      <li>Unordered list item one</li>
      <li>Unordered list item two</li>
      <li>Unordered list item three</li>
    </ul>
    <blockquote>
      <p>"This is a blockquote within the wrapped content, showing how the component handles various content types."</p>
    </blockquote>
  `,
  theme: 'secondary',
  spacing: 'large',
  width: 'wide',
  tag: 'section',
  id: 'complex-content-example',
  className: 'custom-wrapper-class',
};

// Accessibility example
export const WithAccessibility = Template.bind({});
WithAccessibility.args = {
  content: '<p>This wrapper includes accessibility attributes for better screen reader support.</p>',
  tag: 'section',
  attributes: {
    'role': 'region',
    'aria-label': 'Sample content region',
    'aria-describedby': 'wrapper-description',
  },
  id: 'accessible-wrapper',
};