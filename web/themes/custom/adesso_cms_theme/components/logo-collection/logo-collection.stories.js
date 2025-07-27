import { renderHeading } from '../../.storybook/component-helpers.js';

// Create a proper logo collection template function that renders actual HTML
const logoCollectionTemplate = (args) => {
  const {
    pre_headline = '',
    title = '',
    logos = []
  } = args;

  // Render pre-headline using helper
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'span',
    visual_level: '3',
    custom_classes: 'block mb-4 font-bold text-2xl tracking-tight text-center leading-none'
  }) : '';

  // Render title using helper
  const titleHtml = title ? renderHeading({
    title: title,
    as: 'h2',
    custom_classes: 'mb-8 lg:mb-16 text-3xl font-bold text-center'
  }) : '';

  // Render logo items
  let logoItemsHtml = '';
  if (logos && Array.isArray(logos)) {
    logos.forEach(logo => {
      if (logo.media) {
        logoItemsHtml += logo.media;
      }
    });
  }

  return `
    <section>
      <div class="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        ${preHeadlineHtml}
        ${titleHtml}
        <div class="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-3 lg:grid-cols-6">
          ${logoItemsHtml}
        </div>
      </div>
    </section>
  `;
};

// Sample logo data with proper branding logos
const sampleLogos = [
  {
    name: "Microsoft",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-8 w-auto" viewBox="0 0 23 23"><path fill="#f25022" d="M0 0h11v11H0z"/><path fill="#00a4ef" d="M12 0h11v11H12z"/><path fill="#7fba00" d="M0 12h11v11H0z"/><path fill="#ffb900" d="M12 12h11v11H12z"/></svg></div>'
  },
  {
    name: "Google",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-6 w-auto" viewBox="0 0 24 24"><path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg></div>'
  },
  {
    name: "Apple",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-8 w-auto" viewBox="0 0 24 24"><path fill="#000" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg></div>'
  },
  {
    name: "Netflix",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-6 w-auto" viewBox="0 0 24 24"><path fill="#e50914" d="M5.4 2.2v19.6l4.8-1.2V3.4zm4.8 8.4l4.8 9.6V2.2zm4.8-8.4v17.2l4.8 1.2V2.2z"/></svg></div>'
  },
  {
    name: "Spotify",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-8 w-auto" viewBox="0 0 24 24"><path fill="#1ed760" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg></div>'
  },
  {
    name: "Amazon",
    media: '<div class="flex items-center justify-center h-16"><svg class="h-6 w-auto" viewBox="0 0 24 24"><path fill="#ff9900" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.544.41-3.116.615-4.713.615-1.665 0-3.295-.225-4.89-.674C4.45 21.805 2.54 21.05.958 19.984c-.19-.128-.292-.229-.292-.405 0-.1.046-.18.135-.26l.244-.3zm14.388-11.85c.21-.016.345.05.345.198 0 .067-.022.13-.067.19-.225.297-.337.705-.337 1.224v.69c0 .297.045.564.134.8.022.066.045.132.067.197.045.132.045.197 0 .263-.066.13-.156.174-.27.13l-.202-.065c-.337-.13-.583-.37-.739-.72-.226-.57-.248-1.19-.067-1.86.09-.33.225-.595.405-.795.135-.154.27-.24.405-.263.09-.022.157-.022.203-.022.09 0 .135.022.18.066zm-6.29 6.62c.18.045.315.178.315.396 0 .1-.045.2-.135.297l-.337.332c-.337.33-.674.66-1.01.99-.315.31-.674.577-1.077.8-.18.1-.337.066-.472-.1-.135-.166-.09-.332.135-.498.674-.498 1.348-1.093 2.022-1.785.674-.693 1.213-1.386 1.617-2.08.09-.154.156-.243.225-.309.067-.065.134-.087.202-.087.045 0 .09.011.135.033l.38.198c.18.1.315.266.315.464 0 .133-.045.243-.135.31l-.18.045zm1.32-6.62c.135 0 .27.066.405.198.135.133.202.31.202.532v.33c0 .265-.022.53-.067.794-.045.265-.112.53-.202.795-.045.133-.112.265-.202.397-.067.133-.157.243-.27.33-.09.066-.18.1-.27.1-.135 0-.27-.055-.405-.166-.135-.11-.202-.265-.202-.464v-.198c0-.232.022-.464.067-.696.045-.232.112-.464.202-.696.067-.232.157-.441.27-.628.112-.187.225-.32.337-.397.112-.077.202-.133.27-.166.067-.033.112-.055.135-.055z"/></svg></div>'
  }
];

export default {
  title: 'Editorial/Logo Collection',
  argTypes: {
    pre_headline: {
      description: 'Pre-headline text for the logo collection section',
      control: 'text',
    },
    title: {
      description: 'Title for the logo collection section',
      control: 'text',
      defaultValue: 'Trusted by top companies worldwide'
    },
    logos: {
      description: 'Array of logo objects',
      control: 'object'
    }
  }
};

const renderLogoCollection = (args) => {
  return logoCollectionTemplate(args);
};

export const Default = {
  render: renderLogoCollection,
  args: {
    title: "Trusted by top companies worldwide",
    logos: sampleLogos
  }
};

export const WithPreHeadline = {
  render: renderLogoCollection,
  args: {
    pre_headline: "Industry Leaders",
    title: "Companies That Trust Us",
    logos: sampleLogos
  }
};

export const FewLogos = {
  render: renderLogoCollection,
  args: {
    title: "Our Key Partners",
    logos: sampleLogos.slice(0, 3)
  }
};

export const ManyLogos = {
  render: renderLogoCollection,
  args: {
    title: "Clients We've Worked With",
    logos: [...sampleLogos, ...sampleLogos.slice(0, 6)]
  }
};

export const TechPartners = {
  render: renderLogoCollection,
  args: {
    pre_headline: "Technology Stack",
    title: "Built with Industry-Leading Tools",
    logos: sampleLogos.slice(0, 4)
  }
};
