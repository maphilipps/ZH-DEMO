// Create a proper media template function that renders actual HTML
const mediaTemplate = (args) => {
  const {
    media = '',
    modifier = 'w-full'
  } = args;

  return `
    <div class="${modifier}">
      ${media}
    </div>
  `;
};

const mockImage = `
  <img
    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80"
    alt="Example image"
    width="1280"
    height="720"
    class="w-full h-auto object-cover rounded-lg"
  />
`;

const mockVideo = `
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    class="w-full aspect-video rounded-lg"
  ></iframe>
`;

const mockAudio = `
  <audio controls class="w-full">
    <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
`;

export default {
  title: 'Editorial/Media',
  argTypes: {
    media: {
      description: 'Define the media content, either an image, video, or audio',
      control: 'text',
    },
    modifier: {
      description: 'CSS modifier classes for styling the media container',
      control: 'text',
    },
  },
};

const renderMedia = (args) => {
  return mediaTemplate(args);
};

export const Default = {
  render: renderMedia,
  args: {
    media: mockImage,
    modifier: 'w-1/2',
  },
};

export const FullWidth = {
  render: renderMedia,
  args: {
    media: mockImage,
    modifier: 'w-full',
  },
};

export const Video = {
  render: renderMedia,
  args: {
    media: mockVideo,
    modifier: 'w-full max-w-4xl mx-auto',
  },
};

export const Audio = {
  render: renderMedia,
  args: {
    media: mockAudio,
    modifier: 'w-full max-w-md mx-auto',
  },
};

export const ResponsiveImage = {
  render: renderMedia,
  args: {
    media: `
      <picture class="w-full">
        <source media="(min-width: 1024px)" srcset="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80">
        <source media="(min-width: 768px)" srcset="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=768&q=80">
        <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=480&q=80" alt="Responsive image example" class="w-full h-auto object-cover rounded-lg">
      </picture>
    `,
    modifier: 'w-full',
  },
};

export const CustomStyling = {
  render: renderMedia,
  args: {
    media: mockImage,
    modifier: 'w-3/4 mx-auto border-4 border-gray-300 rounded-xl shadow-lg',
  },
};
