// phpcs:ignoreFile

import Component from './file-upload-preview.twig';

const meta = {
  title: 'Municipal/File Upload Preview',
  component: Component,
  argTypes: {
    files: {
      name: 'Files',
      description: 'Array of uploaded files with metadata',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
      },
    },
    max_files: {
      name: 'Maximum Files',
      description: 'Maximum number of files allowed',
      control: { type: 'number', min: 1, max: 10 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    max_file_size: {
      name: 'Maximum File Size',
      description: 'Maximum file size in human readable format',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '5 MB' },
      },
    },
    allowed_types: {
      name: 'Allowed File Types',
      description: 'List of allowed file types/extensions',
      control: { type: 'object' },
      table: {
        type: { summary: 'array' },
        defaultValue: { summary: '["jpg", "jpeg", "png", "pdf", "doc", "docx"]' },
      },
    },
    upload_url: {
      name: 'Upload URL',
      description: 'Endpoint for file uploads',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    compact: {
      name: 'Compact Mode',
      description: 'Smaller layout for mobile devices',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    modifier: {
      name: 'Modifier Classes',
      description: 'Additional CSS classes',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
File Upload Preview component with drag & drop functionality and image previews for Infrastructure Damage Report forms.

## TWIG Usage

\`\`\`twig
{# Basic file upload with defaults #}
{% include 'sdc:file-upload-preview' with {
  max_files: 3,
  max_file_size: '5 MB'
} %}

{# With existing files #}
{% include 'sdc:file-upload-preview' with {
  files: [
    {
      id: 'file1',
      name: 'damage_photo.jpg',
      size: '2.1 MB',
      type: 'image/jpeg',
      preview_url: '/path/to/preview.jpg',
      status: 'completed'
    }
  ],
  max_files: 3,
  allowed_types: ['jpg', 'jpeg', 'png', 'pdf']
} %}

{# Compact mode for mobile #}
{% include 'sdc:file-upload-preview' with {
  compact: true,
  max_files: 2
} %}
\`\`\`

## Features

- **Drag & Drop Interface**: Intuitive file upload area with visual feedback
- **Image Previews**: Automatic thumbnail generation for uploaded images
- **Progress Tracking**: Real-time upload progress with animated progress bars
- **File Validation**: Client-side validation for file types and sizes
- **Swiss Municipal Compliance**: German language, proper error messages
- **Mobile Responsive**: Compact mode for mobile municipal staff
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Integration with Alpine.js

The component uses Alpine.js for:
- File selection and validation
- Upload progress simulation
- Remove/cancel functionality
- Dynamic UI updates

Perfect for Infrastructure Damage Report forms where citizens upload photos and documents.
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Empty Upload Area
export const Default = {
  parameters: {
    layout: 'centered',
  },
  args: {
    files: [],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    upload_url: '/upload',
    compact: false,
  },
};

// With Uploaded Files
export const WithFiles = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'schlagloch_hauptstrasse.jpg',
        size: '2.1 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCQkJCQkIiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpQRzwvdGV4dD4KPC9zdmc+',
        upload_progress: 100,
        status: 'completed'
      },
      {
        id: 'file2',
        name: 'schadens_beschreibung.pdf',
        size: '890 KB',
        type: 'application/pdf',
        upload_progress: 100,
        status: 'completed'
      }
    ],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
};

// Upload in Progress
export const UploadInProgress = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'damage_photo_1.jpg',
        size: '3.2 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCQkJCQkIiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpQRzwvdGV4dD4KPC9zdmc+',
        upload_progress: 67,
        status: 'uploading'
      },
      {
        id: 'file2',
        name: 'zusaetzliche_info.docx',
        size: '1.1 MB',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upload_progress: 0,
        status: 'validating'
      }
    ],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Files with various upload statuses: uploading with progress bar and validating.',
      },
    },
  },
};

// Upload Error
export const WithError = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'too_large_photo.jpg',
        size: '8.5 MB',
        type: 'image/jpeg',
        upload_progress: 0,
        status: 'error',
        error_message: 'Datei zu groß (max. 5 MB)'
      },
      {
        id: 'file2',
        name: 'valid_document.pdf',
        size: '1.2 MB',
        type: 'application/pdf',
        upload_progress: 100,
        status: 'completed'
      }
    ],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload error state with error message and successful file for comparison.',
      },
    },
  },
};

// Maximum Files Reached
export const MaxFilesReached = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'beschaedigung_vorne.jpg',
        size: '2.3 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCQkJCQkIiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpQRzwvdGV4dD4KPC9zdmc+',
        status: 'completed'
      },
      {
        id: 'file2',
        name: 'beschaedigung_seite.jpg',
        size: '1.8 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCQkJCQkIiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpQRzwvdGV4dD4KPC9zdmc+',
        status: 'completed'
      },
      {
        id: 'file3',
        name: 'offizielles_dokument.pdf',
        size: '945 KB',
        type: 'application/pdf',
        status: 'completed'
      }
    ],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
  parameters: {
    docs: {
      description: {
        story: 'All upload slots filled - upload area should be hidden.',
      },
    },
  },
};

// Compact Mode
export const CompactMode = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'schaden_foto.jpg',
        size: '1.5 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCQkJCQkIiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkpQRzwvdGV4dD4KPC9zdmc+',
        status: 'completed'
      }
    ],
    max_files: 2,
    max_file_size: '3 MB',
    compact: true,
    allowed_types: ['jpg', 'jpeg', 'png'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact layout optimized for mobile municipal staff usage.',
      },
    },
  },
};

// Different File Types
export const MixedFileTypes = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'schadens_foto.png',
        size: '4.2 MB',
        type: 'image/png',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRUVFRUVFIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiM4ODg4ODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBORzwvdGV4dD4KPC9zdmc+',
        status: 'completed'
      },
      {
        id: 'file2',
        name: 'gutachten.pdf',
        size: '2.7 MB',
        type: 'application/pdf',
        status: 'completed'
      },
      {
        id: 'file3',
        name: 'zusatz_info.docx',
        size: '650 KB',
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        status: 'completed'
      }
    ],
    max_files: 5,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Various file types with appropriate icons: image with preview, PDF, and Word document.',
      },
    },
  },
};

// Single File Only
export const SingleFile = {
  args: {
    files: [],
    max_files: 1,
    max_file_size: '10 MB',
    allowed_types: ['pdf'],
    upload_url: '/upload-single',
  },
  parameters: {
    docs: {
      description: {
        story: 'Configured for single file upload with PDF only.',
      },
    },
  },
};

// LOTR Themed Demo Data
export const DemoData = {
  args: {
    files: [
      {
        id: 'file1',
        name: 'schaden_am_weg_nach_rohan.jpg',
        size: '3.1 MB',
        type: 'image/jpeg',
        preview_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjBGOEZGIi8+CjxwYXRoIGQ9Ik0xMCAxMEwyNSAyNUwxMCAyNVYxMFoiIGZpbGw9IiNCRERFRkYiLz4KPHR0ZXh0IHg9IjIwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjgiIGZpbGw9IiMzQjgyRjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlJPSEFOPC90ZXh0Pgo8L3N2Zz4K',
        status: 'completed'
      },
      {
        id: 'file2',
        name: 'bericht_des_waldhueter.pdf',
        size: '1.8 MB',
        type: 'application/pdf',
        status: 'completed'
      }
    ],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo data with LOTR theme for presentation appeal.',
      },
    },
  },
};

// Playground
export const Playground = {
  args: {
    files: [],
    max_files: 3,
    max_file_size: '5 MB',
    allowed_types: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
    upload_url: '/upload',
    compact: false,
    modifier: '',
  },
};