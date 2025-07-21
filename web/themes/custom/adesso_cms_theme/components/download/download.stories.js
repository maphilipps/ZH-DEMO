import template from './download.twig';
import downloadItemTemplate from '../download-item/download-item.twig';

export default {
  title: 'Content/Download',
  argTypes: {
    pre_headline: { control: 'text' },
    headline: { control: 'text' },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
};

const createDownloadItem = (args) => downloadItemTemplate(args);

const sampleItems = [
  createDownloadItem({
    file_url: '#',
    file_name: 'Annual Report 2023',
    file_description: 'Company financial statements and performance overview',
    file_size: 2457600,
    file_extension: 'pdf',
  }),
  createDownloadItem({
    file_url: '#',
    file_name: 'Product Catalog',
    file_description: 'Complete listing of our products and services',
    file_size: 5242880,
    file_extension: 'pdf',
  }),
  createDownloadItem({
    file_url: '#',
    file_name: 'Budget Template',
    file_description: 'Excel template for budget planning',
    file_size: 1048576,
    file_extension: 'xlsx',
  }),
  createDownloadItem({
    file_url: '#',
    file_name: 'Installation Guide',
    file_description: 'Step-by-step installation instructions',
    file_size: 524288,
    file_extension: 'docx',
  }),
];

export const Default = {
  render: (args) => template(args),
  args: {
    pre_headline: 'Resources',
    headline: 'Download Center',
    items: sampleItems,
    theme: 'light',
  },
};

export const DarkTheme = {
  render: (args) => template(args),
  args: {
    pre_headline: 'Resources',
    headline: 'Download Center',
    items: sampleItems,
    theme: 'dark',
  },
};

export const WithoutPreHeadline = {
  render: (args) => template(args),
  args: {
    headline: 'Available Downloads',
    items: sampleItems,
    theme: 'light',
  },
};

export const MinimalItems = {
  render: (args) => template(args),
  args: {
    pre_headline: 'Quick Downloads',
    headline: 'Essential Documents',
    items: [
      createDownloadItem({
        file_url: '#',
        file_name: 'Getting Started Guide',
        file_description: 'Everything you need to know to begin',
        file_size: 204800,
        file_extension: 'pdf',
      }),
      createDownloadItem({
        file_url: '#',
        file_name: 'FAQ Document',
        file_description: '',
        file_size: 102400,
        file_extension: 'pdf',
      }),
    ],
    theme: 'light',
  },
};