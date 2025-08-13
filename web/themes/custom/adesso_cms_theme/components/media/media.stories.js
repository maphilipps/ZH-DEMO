// phpcs:ignoreFile

import Component from './media.twig';

const meta = {
  title: 'Media/Media',
  component: Component,
  argTypes: {
    media: {
      name: 'Media',
      description: 'Define the media content, either an image, video, or audio',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modifier: {
      name: 'Modifier',
      description: 'CSS modifier classes for styling the media container',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Flexible media container component for displaying images, videos, audio files, and embedded content with responsive design and custom styling options.

## TWIG Usage

\`\`\`twig
{# Standard image display #}
{% include 'sdc:media' with {
  media: '<img src="/path/to/image.jpg" alt="Description" class="w-full h-full object-cover" loading="lazy" />'
} %}

{# Responsive image with custom styling #}
{% include 'sdc:media' with {
  media: '<img src="/images/hero.jpg" alt="Company office" class="w-full h-full object-cover rounded-lg" loading="lazy" />',
  modifier: 'w-full max-w-2xl aspect-video'
} %}

{# Video content #}
{% include 'sdc:media' with {
  media: '<video class="w-full h-full object-cover" controls preload="metadata"><source src="/videos/demo.mp4" type="video/mp4"><p>Your browser doesn\'t support HTML5 video.</p></video>',
  modifier: 'w-full container aspect-video'
} %}

{# Audio content #}
{% include 'sdc:media' with {
  media: '<audio class="w-full" controls preload="metadata"><source src="/audio/track.mp3" type="audio/mpeg"><p>Your browser doesn\'t support HTML5 audio.</p></audio>',
  modifier: 'w-full max-w-lg'
} %}

{# YouTube embed #}
{% include 'sdc:media' with {
  media: '<div class="relative aspect-video"><iframe class="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/VIDEO_ID" title="Video Title" frameborder="0" allowfullscreen></iframe></div>',
  modifier: 'w-full max-w-3xl'
} %}

{# Circular profile image #}
{% include 'sdc:media' with {
  media: '<img src="/images/profile.jpg" alt="Team member" class="w-full h-full object-cover rounded-full" />',
  modifier: 'w-32 h-32'
} %}

{# Document preview #}
{% include 'sdc:media' with {
  media: '<div class="border rounded-lg p-6 text-center bg-gray-50"><div class="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-lg flex items-center justify-center"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path></svg></div><h4 class="font-medium mb-1">Document.pdf</h4><p class="text-sm text-gray-500">PDF • 2.5 MB</p></div>',
  modifier: 'w-64'
} %}

{# Gallery thumbnail #}
{% include 'sdc:media' with {
  media: '<img src="/images/gallery/thumb.jpg" alt="Gallery image" class="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" />',
  modifier: 'aspect-square w-48'
} %}

{# With Drupal field integration #}
{% include 'sdc:media' with {
  media: node.field_media_image|render,
  modifier: 'w-full max-w-lg'
} %}
\`\`\`

## Features
- **Multi-Format Support**: Images, videos, audio, embeds, documents
- **Responsive Design**: Flexible container with aspect ratio control
- **Performance Optimized**: Lazy loading and optimized delivery
- **Accessibility**: Proper alt text and semantic markup support
- **Custom Styling**: Modifier classes for visual customization

## Media Types
- **Images**: JPEG, PNG, WebP, SVG with responsive sizing
- **Videos**: MP4, WebM with custom controls and posters
- **Audio**: MP3, WAV with built-in player controls
- **Embeds**: YouTube, Vimeo, social media content
- **Documents**: PDF previews and downloadable files
        `
      }
    }
  },
  tags: ['autodocs'],
};
export default meta;

// Sample media content generators
const createImageHtml = (src, alt, className = '') => `
  <img src="${src}" 
       alt="${alt}" 
       class="w-full h-full object-cover ${className}" 
       loading="lazy" />
`;

const createVideoHtml = (src, poster = '') => `
  <video class="w-full h-full object-cover" 
         controls 
         preload="metadata"
         ${poster ? `poster="${poster}"` : ''}>
    <source src="${src}" type="video/mp4">
    <p>Your browser doesn't support HTML5 video. Here is a <a href="${src}">link to the video</a> instead.</p>
  </video>
`;

const createAudioHtml = (src, title = 'Audio Track') => `
  <audio class="w-full" controls preload="metadata">
    <source src="${src}" type="audio/mpeg">
    <p>Your browser doesn't support HTML5 audio. Here is a <a href="${src}">link to the audio</a> instead.</p>
  </audio>
  <div class="mt-2 text-sm text-gray-600 text-center">${title}</div>
`;

const createYouTubeEmbed = (videoId, title = 'YouTube Video') => `
  <div class="relative aspect-video">
    <iframe class="absolute inset-0 w-full h-full" 
            src="https://www.youtube.com/embed/${videoId}" 
            title="${title}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
    </iframe>
  </div>
`;

const createDocumentPreview = (title, type, size) => `
  <div class="border rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
    <div class="w-16 h-16 mx-auto mb-4 bg-red-500 rounded-lg flex items-center justify-center">
      <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
      </svg>
    </div>
    <h4 class="font-medium text-gray-900 mb-1">${title}</h4>
    <p class="text-sm text-gray-500">${type} • ${size}</p>
  </div>
`;

export const Media = {
  parameters: {
    layout: 'centered',
  },
  args: {
    media: createImageHtml('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop', 'Business office workspace'),
    modifier: 'w-full max-w-2xl',
  },
};

export const SquareImage = {
  args: {
    ...Media.args,
    media: createImageHtml('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop', 'Modern architecture'),
    modifier: 'w-80 aspect-square',
  },
};

export const CircularImage = {
  args: {
    ...Media.args,
    media: createImageHtml('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', 'Professional headshot', 'rounded-full'),
    modifier: 'w-32 h-32',
  },
};

export const VideoContent = {
  args: {
    ...Media.args,
    media: createVideoHtml('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'),
    modifier: 'w-full container aspect-video',
  },
};

export const AudioContent = {
  args: {
    ...Media.args,
    media: createAudioHtml('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', 'Sample Audio Track'),
    modifier: 'w-full max-w-lg',
  },
};

export const YouTubeEmbed = {
  args: {
    ...Media.args,
    media: createYouTubeEmbed('dQw4w9WgXcQ', 'Demo Video'),
    modifier: 'w-full max-w-3xl',
  },
};

export const DocumentPreview = {
  args: {
    ...Media.args,
    media: createDocumentPreview('Company Brochure.pdf', 'PDF', '2.5 MB'),
    modifier: 'w-64',
  },
};

export const EmptyState = {
  args: {
    ...Media.args,
    media: '<div class="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center"><div class="text-center"><svg class="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-gray-500">No media content</p></div></div>',
    modifier: 'w-full max-w-lg',
  },
};

// Playground for testing all properties
export const Playground = {
  args: {
    media: createImageHtml('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop', 'Team collaboration'),
    modifier: 'w-full max-w-xl rounded-lg shadow-lg',
  },
};