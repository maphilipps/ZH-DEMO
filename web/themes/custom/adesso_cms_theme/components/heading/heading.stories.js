// Create a proper heading template function that renders actual HTML
const HeadingTemplate = (args) => {
  const { heading = {} } = args;
  const {
    title = '',
    as = 'h2',
    visual_level,
    modifier = '',
    custom_classes = '',
    id = '',
    aria_label = '',
    icon = '',
    url = ''
  } = heading;

  // Handle title processing (Drupal might pass objects or strings)
  let title_text = '';
  if (typeof title === 'object' && title['#markup']) {
    title_text = title['#markup'];
  } else {
    title_text = title.toString();
  }

  if (!title_text) return '';

  // Validate tag
  const valid_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span'];
  const tag = valid_tags.includes(as) ? as : 'h2';

  // Determine visual level
  const level = visual_level || (tag === 'span' ? '3' : tag.replace('h', ''));

  // Build classes
  let heading_classes = '';
  if (custom_classes) {
    heading_classes = custom_classes;
  } else {
    const base_classes = [
      tag === 'span' ? 'block' : 'scroll-m-20',
      'tracking-tight',
      modifier || ''
    ].filter(Boolean);

    const visual_classes = [];
    switch (level) {
      case '1':
        visual_classes.push('text-4xl font-extrabold lg:text-5xl xl:text-6xl');
        break;
      case '2':
        visual_classes.push('text-3xl font-bold');
        break;
      case '3':
        visual_classes.push('text-2xl font-bold');
        break;
      case '4':
        visual_classes.push('text-xl font-semibold');
        break;
      case '5':
        visual_classes.push('text-lg font-semibold');
        break;
      case '6':
        visual_classes.push('text-base font-semibold');
        break;
    }

    heading_classes = [...base_classes, ...visual_classes].join(' ');
  }

  // Build attributes
  const attributes = [];
  if (id) attributes.push(`id="${id}"`);
  if (aria_label) attributes.push(`aria-label="${aria_label}"`);
  if (heading_classes) attributes.push(`class="${heading_classes}"`);

  // Build content
  const iconHtml = icon ? icon : '';
  const textContent = url ? `<a href="${url}" class="hover:underline">${title_text}</a>` : title_text;
  const content = iconHtml + textContent;

  return `<${tag} ${attributes.join(' ')}>${content}</${tag}>`;
};

export default {
  title: 'General/Heading'
};

export const Heading = HeadingTemplate.bind({});
Heading.args = {
  heading: {
    title: 'Title Lorem Ipsum Dolor',
    as: 'h2',
    visual_level: '2',
    modifier: 'display-3'
  }
};

export const HeadingWithStringTitle = HeadingTemplate.bind({});
HeadingWithStringTitle.args = {
  heading: {
    title: 'Simple String Title',
    as: 'h1',
    visual_level: '1'
  }
};

export const HeadingWithObjectTitle = HeadingTemplate.bind({});
HeadingWithObjectTitle.args = {
  heading: {
    title: { '#markup': '<em>Object</em> Title with HTML' },
    as: 'h3',
    visual_level: '3'
  }
};
