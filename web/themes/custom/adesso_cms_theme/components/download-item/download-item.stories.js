import template from './download-item.twig';

export default {
  title: 'Content/Download Item',
  argTypes: {
    file_url: { control: 'text' },
    file_name: { control: 'text' },
    file_description: { control: 'text' },
    file_size: { control: 'number' },
    file_extension: { control: 'text' },
  },
};

export const Default = {
  render: (args) => template(args),
  args: {
    file_url: '#',
    file_name: 'Annual Report 2023',
    file_description: 'Company financial statements and performance overview',
    file_size: 2457600, // 2.4 MB
    file_extension: 'pdf',
  },
};

export const WordDocument = {
  render: (args) => template(args),
  args: {
    file_url: '#',
    file_name: 'Project Proposal Template',
    file_description: 'Template for creating project proposals',
    file_size: 524288, // 512 KB
    file_extension: 'docx',
  },
};

export const ExcelFile = {
  render: (args) => template(args),
  args: {
    file_url: '#',
    file_name: 'Budget Calculator',
    file_description: 'Excel spreadsheet for budget calculations',
    file_size: 1048576, // 1 MB
    file_extension: 'xlsx',
  },
};

export const ZipArchive = {
  render: (args) => template(args),
  args: {
    file_url: '#',
    file_name: 'Resource Pack',
    file_description: '',
    file_size: 5242880, // 5 MB
    file_extension: 'zip',
  },
};

export const SmallFile = {
  render: (args) => template(args),
  args: {
    file_url: '#',
    file_name: 'Quick Guide',
    file_description: 'A brief introduction to our services',
    file_size: 102400, // 100 KB
    file_extension: 'pdf',
  },
};