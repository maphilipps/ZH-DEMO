// Create a proper download item template function that renders actual HTML
const downloadItemTemplate = (args) => {
  const {
    file_url = '#',
    file_name = '',
    file_description = '',
    file_size = 0,
    file_extension = '',
    is_dark = false,
    is_last = false
  } = args;

  // Calculate file size in KB
  const file_size_kb = Math.ceil(file_size / 1024);
  
  // Determine border color
  const border_color = is_dark ? 'border-gray-300' : 'border-gray-200';
  
  // Check if description exists
  const has_description = file_description && file_description.trim() !== '';

  // Build description HTML
  const descriptionHtml = has_description ? `
    <div class="text-base text-gray-500">
      ${file_description}
    </div>
  ` : '';

  // Build layout classes based on description presence
  const contentClasses = !has_description ? 'flex items-center' : 'space-y-1';

  return `
    <li class="py-4 border-b ${border_color}">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <svg class="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
          </div>
        </div>
        <div class="flex-1 min-w-0 ${contentClasses}">
          <div>
            <p class="text-base font-medium text-gray-900">
              <a href="${file_url}" download class="hover:underline">${file_name}</a>
            </p>
            ${descriptionHtml}
          </div>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900">
          ${file_size_kb} KB
        </div>
      </div>
    </li>
  `;
};

export default {
  title: 'Content/Download Item',
  argTypes: {
    file_url: { 
      control: 'text',
      description: 'URL to the downloadable file'
    },
    file_name: { 
      control: 'text',
      description: 'Display name of the file'
    },
    file_description: { 
      control: 'text',
      description: 'Optional description of the file'
    },
    file_size: { 
      control: 'number',
      description: 'File size in bytes'
    },
    file_extension: { 
      control: 'text',
      description: 'File extension (pdf, doc, etc.)'
    },
    is_dark: {
      control: 'boolean',
      description: 'Whether parent has dark theme'
    },
    is_last: {
      control: 'boolean',
      description: 'Whether this is the last item'
    },
  },
};

const renderDownloadItem = (args) => {
  return downloadItemTemplate(args);
};

export const Default = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Annual Report 2023',
    file_description: 'Company financial statements and performance overview',
    file_size: 2457600, // 2.4 MB
    file_extension: 'pdf',
  },
};

export const WordDocument = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Project Proposal Template',
    file_description: 'Template for creating project proposals',
    file_size: 524288, // 512 KB
    file_extension: 'docx',
  },
};

export const ExcelFile = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Budget Calculator',
    file_description: 'Excel spreadsheet for budget calculations',
    file_size: 1048576, // 1 MB
    file_extension: 'xlsx',
  },
};

export const ZipArchive = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Resource Pack',
    file_description: '',
    file_size: 5242880, // 5 MB
    file_extension: 'zip',
  },
};

export const SmallFile = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Quick Guide',
    file_description: 'A brief introduction to our services',
    file_size: 102400, // 100 KB
    file_extension: 'pdf',
  },
};

export const WithoutDescription = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Simple Document',
    file_size: 256000, // 250 KB
    file_extension: 'pdf',
  },
};

export const DarkTheme = {
  render: renderDownloadItem,
  args: {
    file_url: '#',
    file_name: 'Dark Theme File',
    file_description: 'File displayed on dark background',
    file_size: 512000, // 500 KB
    file_extension: 'pdf',
    is_dark: true,
  },
};