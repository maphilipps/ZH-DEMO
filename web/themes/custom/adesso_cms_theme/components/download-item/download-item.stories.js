/**
 * @file
 * Storybook stories for Download Item component.
 *
 * The Download Item component provides an accessible file download interface
 * with file metadata display, intelligent size formatting, and consistent styling.
 * Designed for use in file lists, document libraries, and resource centers.
 */

import '../../dist/assets/adesso.css';

export default {
  title: 'Editorial/DownloadItem',
  component: 'download-item',
  parameters: {
    docs: {
      description: {
        component: `
The Download Item component creates a consistent, accessible interface for downloadable files. 
It displays file metadata including name, description, size, and type with a clear download action.

## Features
- **Intelligent Size Formatting**: Automatic conversion from bytes to KB, MB, or GB
- **File Type Support**: Comprehensive support for business and media file types
- **Accessibility First**: WCAG 2.1 AA compliant with screen reader support
- **Theme Adaptability**: Light and dark theme variants
- **List Integration**: Designed for seamless integration in file lists
- **Download Semantics**: Proper HTML download attributes and hover states

## Accessibility Features
- Semantic list structure for multiple items
- Clear download links with proper href attributes and download attribute
- Visual download indicators with aria-hidden decorative icons
- Consistent focus states and keyboard navigation support
- Screen reader compatible file information and size formatting
- High contrast ratios for text and interactive elements
- RTL (Right-to-Left) language support

## Usage Scenarios
- **Document Libraries**: Corporate reports, whitepapers, and policy documents
- **Resource Centers**: Training materials, guides, and reference documents
- **File Attachments**: Email attachments, form uploads, and shared files
- **Download Galleries**: Media assets, templates, and toolkits
- **Legal Sections**: Contracts, agreements, and compliance documents
- **Press Kits**: Media resources, logos, and brand assets

## File Types & Extensions
- **Documents**: PDF, DOC, DOCX, TXT, RTF
- **Spreadsheets**: XLS, XLSX, CSV, ODS
- **Presentations**: PPT, PPTX, ODP
- **Archives**: ZIP, RAR, 7Z, TAR
- **Media**: MP4, MP3, WAV, AVI, MOV
- **Images**: JPG, PNG, GIF, SVG, WebP
- **Data**: JSON, XML, SQL, CSV

## Implementation Example

### Basic Usage
\`\`\`twig
{% include 'download-item' with {
  file_url: '/files/annual-report-2024.pdf',
  file_name: 'Annual Report 2024',
  file_description: 'Comprehensive overview of company performance',
  file_size: 2567890,
  file_extension: 'pdf'
} %}
\`\`\`

### In a File List
\`\`\`twig
<ul class="divide-y divide-gray-200">
  {% for file in files %}
    {% include 'download-item' with {
      file_url: file.url,
      file_name: file.name,
      file_description: file.description,
      file_size: file.size,
      file_extension: file.extension,
      is_last: loop.last
    } %}
  {% endfor %}
</ul>
\`\`\`

### With Drupal File Entity
\`\`\`php
// In a custom module or theme
use Drupal\\file\\Entity\\File;

$file = File::load($fid);
$file_size = $file->getSize();
$file_name = $file->getFilename();
$file_url = \\Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());

// Pass to template
$variables['download_items'][] = [
  'file_url' => $file_url,
  'file_name' => pathinfo($file_name, PATHINFO_FILENAME),
  'file_size' => $file_size,
  'file_extension' => pathinfo($file_name, PATHINFO_EXTENSION),
  'file_description' => $file->get('field_description')->value ?? '',
];
\`\`\`

## Size Formatting Logic
The component automatically formats file sizes:
- **0-1023 bytes**: Displays as bytes
- **1KB-1023KB**: Displays in KB (rounded up)
- **1MB-1023MB**: Displays in MB (1 decimal place)
- **1GB+**: Displays in GB (2 decimal places)

## Props
- \`file_url\`: Direct URL to the downloadable file (required)
- \`file_name\`: Display name shown to users (required)
- \`file_description\`: Optional descriptive text for context
- \`file_size\`: File size in bytes for automatic formatting (required)
- \`file_extension\`: File type extension for user reference
- \`is_dark\`: Dark theme compatibility flag
- \`is_last\`: Remove bottom border for last item in lists

## Technical Implementation
- Uses semantic HTML with proper download attributes
- Implements flexbox layout for responsive design
- Includes RTL (Right-to-Left) language support
- Provides hover states and focus indicators
- Maintains consistent spacing and typography
        `,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    file_url: {
      name: 'File URL',
      description: 'Direct URL path to the downloadable file (required)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    file_name: {
      name: 'File Name',
      description:
        'Display name shown to users in the download list (required)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    file_description: {
      name: 'File Description',
      description:
        'Optional descriptive text providing file context and purpose',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Content',
      },
    },
    file_size: {
      name: 'File Size (bytes)',
      description:
        'File size in bytes - automatically formatted to KB, MB, or GB',
      control: {
        type: 'range',
        min: 1024,
        max: 5368709120, // 5GB
        step: 1024,
      },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
        category: 'Metadata',
      },
    },
    file_extension: {
      name: 'File Extension',
      description: 'File type extension for user reference and context',
      control: { type: 'select' },
      options: [
        // Documents
        'pdf',
        'doc',
        'docx',
        'txt',
        'rtf',
        // Spreadsheets
        'xls',
        'xlsx',
        'csv',
        'ods',
        // Presentations
        'ppt',
        'pptx',
        'odp',
        // Archives
        'zip',
        'rar',
        '7z',
        'tar',
        'gz',
        // Media - Video
        'mp4',
        'avi',
        'mov',
        'wmv',
        'flv',
        'webm',
        // Media - Audio
        'mp3',
        'wav',
        'flac',
        'aac',
        'ogg',
        // Images
        'jpg',
        'jpeg',
        'png',
        'gif',
        'svg',
        'webp',
        'bmp',
        'tiff',
        // Data
        'json',
        'xml',
        'sql',
        'yaml',
      ],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'pdf' },
        category: 'Metadata',
      },
    },
    is_dark: {
      name: 'Dark Theme',
      description: 'Enable dark theme styling for dark backgrounds',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Appearance',
      },
    },
    is_last: {
      name: 'Is Last Item',
      description: 'Remove bottom border when used as the last item in a list',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Layout',
      },
    },
  },
  tags: ['autodocs'],
};

/**
 * Default download item for PDF documents
 */
export const Default = {
  args: {
    file_url: '/files/annual-report-2024.pdf',
    file_name: 'Annual Report 2024',
    file_description:
      'Comprehensive overview of company performance and financial results for the fiscal year',
    file_size: 2567890, // ~2.5MB
    file_extension: 'pdf',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `Standard download item showing a PDF document with description and file size. 
        This represents the most common use case with a business document including descriptive text.`,
      },
    },
  },
};

/**
 * Simple download without description
 */
export const WithoutDescription = {
  args: {
    file_url: '/files/quick-reference.pdf',
    file_name: 'Quick Reference Guide',
    file_description: '',
    file_size: 856432, // ~836KB
    file_extension: 'pdf',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `Minimal download item without description text for cleaner layouts. 
        Useful when file names are self-explanatory or when space is limited.`,
      },
    },
  },
};

// === DOCUMENT FILE TYPES ===

/**
 * Microsoft Word document download
 */
export const WordDocument = {
  args: {
    file_url: '/files/contract-template.docx',
    file_name: 'Service Contract Template',
    file_description:
      'Standard service agreement template with customizable terms and conditions for client projects',
    file_size: 445632, // ~435KB
    file_extension: 'docx',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `Microsoft Word document download showing business template. 
        Commonly used for contracts, proposals, and editable documents.`,
      },
    },
  },
};

/**
 * Legacy Word document
 */
export const LegacyWordDocument = {
  args: {
    file_url: '/files/legacy-policy.doc',
    file_name: 'Company Policy Manual',
    file_description:
      'Legacy document containing established company policies and procedures',
    file_size: 1456782, // ~1.4MB
    file_extension: 'doc',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Legacy .doc format for older Microsoft Word documents that require backward compatibility.',
      },
    },
  },
};

/**
 * Plain text document
 */
export const TextDocument = {
  args: {
    file_url: '/files/readme.txt',
    file_name: 'Installation Instructions',
    file_description:
      'Step-by-step installation guide with system requirements and troubleshooting tips',
    file_size: 12847, // ~12KB
    file_extension: 'txt',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Plain text document showing small file size, commonly used for technical documentation.',
      },
    },
  },
};

// === SPREADSHEET FILE TYPES ===

/**
 * Excel spreadsheet download
 */
export const ExcelSpreadsheet = {
  args: {
    file_url: '/files/budget-calculator.xlsx',
    file_name: 'Project Budget Calculator',
    file_description:
      'Interactive budget planning tool with automated calculations, charts, and forecasting models',
    file_size: 1234567, // ~1.2MB
    file_extension: 'xlsx',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `Excel spreadsheet download with financial planning tool. 
        Shows modern .xlsx format with complex formulas and charts.`,
      },
    },
  },
};

/**
 * CSV data file
 */
export const CSVDataFile = {
  args: {
    file_url: '/files/customer-data.csv',
    file_name: 'Customer Database Export',
    file_description:
      'Complete customer database export with contact information, purchase history, and preferences',
    file_size: 3456789, // ~3.3MB
    file_extension: 'csv',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'CSV data file showing database export, commonly used for data analysis and import/export operations.',
      },
    },
  },
};

// === PRESENTATION FILE TYPES ===

/**
 * PowerPoint presentation download
 */
export const PowerPointPresentation = {
  args: {
    file_url: '/files/company-overview.pptx',
    file_name: 'Company Overview Presentation',
    file_description:
      'Executive presentation covering mission, vision, services, achievements, and strategic roadmap',
    file_size: 8945623, // ~8.5MB
    file_extension: 'pptx',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `PowerPoint presentation download with corporate overview content. 
        Shows larger file size typical of presentations with images and media.`,
      },
    },
  },
};

// === ARCHIVE FILE TYPES ===

/**
 * ZIP archive file download
 */
export const ZipArchive = {
  args: {
    file_url: '/files/project-assets.zip',
    file_name: 'Project Assets Archive',
    file_description:
      'Complete collection of project files, images, documentation, and source code',
    file_size: 15678432, // ~15MB
    file_extension: 'zip',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'ZIP archive file download for multiple file collections, commonly used for project deliverables.',
      },
    },
  },
};

/**
 * RAR archive file
 */
export const RarArchive = {
  args: {
    file_url: '/files/backup-data.rar',
    file_name: 'System Backup Archive',
    file_description:
      'Compressed system backup containing configuration files, databases, and application data',
    file_size: 89456231, // ~85MB
    file_extension: 'rar',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'RAR archive showing high compression for large backup files, displays file size in MB format.',
      },
    },
  },
};

// === MEDIA FILE TYPES ===

/**
 * Video file download
 */
export const VideoFile = {
  args: {
    file_url: '/files/training-video.mp4',
    file_name: 'Complete Training Course Video',
    file_description:
      'Full-length training course covering all essential topics with practical examples and demonstrations',
    file_size: 187654321, // ~179MB
    file_extension: 'mp4',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Large video file download showing proper size formatting for media files in MB range.',
      },
    },
  },
};

/**
 * Audio file download
 */
export const AudioFile = {
  args: {
    file_url: '/files/podcast-episode.mp3',
    file_name: 'Technology Trends Podcast - Episode 42',
    file_description:
      'Weekly tech podcast discussing AI developments, industry news, and expert interviews',
    file_size: 45678912, // ~43.5MB
    file_extension: 'mp3',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Audio file download showing typical podcast file size and metadata formatting.',
      },
    },
  },
};

/**
 * High-quality image download
 */
export const ImageFile = {
  args: {
    file_url: '/files/high-res-photo.jpg',
    file_name: 'Corporate Headshots Collection',
    file_description:
      'Professional high-resolution photographs for marketing materials and press releases',
    file_size: 12456789, // ~11.9MB
    file_extension: 'jpg',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'High-resolution image file showing typical photography file sizes for professional use.',
      },
    },
  },
};

// === LARGE FILE EXAMPLES ===

/**
 * Enterprise-level large file
 */
export const EnterpriseFile = {
  args: {
    file_url: '/files/enterprise-backup.tar.gz',
    file_name: 'Enterprise System Backup',
    file_description:
      'Complete enterprise system backup including databases, applications, configurations, and user data',
    file_size: 2147483648, // 2GB
    file_extension: 'gz',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Enterprise-level file showing GB-range formatting for very large files like system backups.',
      },
    },
  },
};

/**
 * Ultra-large file example
 */
export const UltraLargeFile = {
  args: {
    file_url: '/files/data-archive.tar',
    file_name: 'Historical Data Archive',
    file_description:
      'Complete historical data archive spanning 10 years of business operations, analytics, and records',
    file_size: 5368709120, // 5GB
    file_extension: 'tar',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ultra-large file example showing maximum file size handling and GB formatting with decimal precision.',
      },
    },
  },
};

// === DATA FILE TYPES ===

/**
 * JSON data file
 */
export const JSONDataFile = {
  args: {
    file_url: '/files/api-schema.json',
    file_name: 'API Schema Definition',
    file_description:
      'Complete API schema with endpoints, request/response formats, and authentication details',
    file_size: 156789, // ~153KB
    file_extension: 'json',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'JSON data file commonly used for API documentation, configuration files, and data exchange.',
      },
    },
  },
};

/**
 * XML data file
 */
export const XMLDataFile = {
  args: {
    file_url: '/files/config-settings.xml',
    file_name: 'System Configuration File',
    file_description:
      'Application configuration settings including database connections, security policies, and feature flags',
    file_size: 78432, // ~76KB
    file_extension: 'xml',
    is_dark: false,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'XML configuration file showing structured data format commonly used in enterprise applications.',
      },
    },
  },
};

// === THEME VARIANTS ===

/**
 * Dark theme variant
 */
export const DarkTheme = {
  args: {
    file_url: '/files/whitepaper.pdf',
    file_name: 'Industry Whitepaper 2024',
    file_description:
      'In-depth analysis of market trends, competitive landscape, and future predictions for the industry',
    file_size: 3456789, // ~3.3MB
    file_extension: 'pdf',
    is_dark: true,
    is_last: false,
  },
  parameters: {
    docs: {
      description: {
        story: `Download item with dark theme styling optimized for dark backgrounds. 
        Shows proper contrast and readability in dark mode interfaces.`,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1f2937' }],
    },
  },
};

// === LAYOUT VARIANTS ===

/**
 * Last item in list (no bottom border)
 */
export const LastItem = {
  args: {
    file_url: '/files/privacy-policy.pdf',
    file_name: 'Privacy Policy',
    file_description:
      'Updated privacy policy effective January 2024 with GDPR compliance and data protection guidelines',
    file_size: 234567, // ~229KB
    file_extension: 'pdf',
    is_dark: false,
    is_last: true,
  },
  parameters: {
    docs: {
      description: {
        story: `Last item in a download list with bottom border removed. 
        Use when this component is the final item in a list to maintain clean visual separation.`,
      },
    },
  },
};

// === COMPREHENSIVE FILE LIST EXAMPLE ===

/**
 * Complete file list showcase
 */
export const FileListShowcase = {
  render: args => `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold mb-4">Document Downloads</h2>
      <ul class="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
        ${[
          {
            file_url: '/files/annual-report-2024.pdf',
            file_name: 'Annual Report 2024',
            file_description:
              'Comprehensive financial and operational overview',
            file_size: 2567890,
            file_extension: 'pdf',
          },
          {
            file_url: '/files/budget-template.xlsx',
            file_name: 'Project Budget Template',
            file_description: 'Excel template with automated calculations',
            file_size: 445632,
            file_extension: 'xlsx',
          },
          {
            file_url: '/files/presentation-deck.pptx',
            file_name: 'Q4 Results Presentation',
            file_description: 'Executive presentation with charts and analysis',
            file_size: 8945623,
            file_extension: 'pptx',
          },
          {
            file_url: '/files/training-video.mp4',
            file_name: 'Employee Onboarding Video',
            file_description: 'Complete training course for new hires',
            file_size: 187654321,
            file_extension: 'mp4',
          },
          {
            file_url: '/files/policy-handbook.pdf',
            file_name: 'Employee Handbook 2024',
            file_description: 'Updated policies and procedures guide',
            file_size: 1456782,
            file_extension: 'pdf',
            is_last: true,
          },
        ]
          .map(
            (item, index, array) => `
          <li class="py-4 ${index === array.length - 1 ? '' : 'border-b border-gray-200'}">
            <div class="flex items-center space-x-4 rtl:space-x-reverse">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0 space-y-1">
                <div>
                  <p class="text-base font-medium text-gray-900">
                    <a href="${item.file_url}" download class="hover:underline">${item.file_name}</a>
                  </p>
                  <div class="text-base text-gray-500">
                    ${item.file_description}
                  </div>
                </div>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900">
                ${Math.ceil(item.file_size / 1024)} KB
              </div>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `Complete file list example showing multiple download items in a bordered container. 
        Demonstrates real-world usage with various file types, sizes, and descriptions in a cohesive list layout.`,
      },
    },
    controls: { disable: true },
  },
};
