/**
 * @file
 * Helper functions for rendering common components in Storybook stories
 * These functions replicate the logic from TWIG templates
 */

/**
 * Renders a heading component
 * @param {Object} heading - Heading configuration object
 * @returns {string} HTML string
 */
export function renderHeading(heading = {}) {
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
}

/**
 * Renders a button component
 * @param {Object} button - Button configuration object
 * @returns {string} HTML string
 */
export function renderButton(button = {}) {
  const {
    url = '',
    text = '',
    icon = '',
    variant = '',
    size = '',
    modifier = ''
  } = button;

  // Determine variant classes
  let variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
  if (variant === 'secondary') {
    variantClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
  } else if (variant === 'outline') {
    variantClasses = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
  } else if (variant === 'ghost') {
    variantClasses = 'hover:bg-accent hover:text-accent-foreground';
  } else if (variant === 'destructive') {
    variantClasses = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
  } else if (variant === 'link') {
    variantClasses = 'text-primary underline-offset-4 hover:underline';
  }

  // Determine size classes
  let sizeClasses = 'h-9 px-4 py-2';
  if (size === 'sm') {
    sizeClasses = 'h-8 px-3 py-1.5 text-xs';
  } else if (size === 'lg') {
    sizeClasses = 'h-12 px-6 py-3 text-lg';
  } else if (size === 'icon') {
    sizeClasses = 'h-9 w-9';
  }

  const baseClasses = 'inline-flex rounded-lg items-center justify-center whitespace-nowrap text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50';
  const allClasses = `${baseClasses} ${variantClasses} ${sizeClasses}${modifier ? ' ' + modifier : ''}`;

  const iconHtml = icon ? `<i data-lucide="${icon}" width="18" height="18" class="ml-2 h-4 w-4"></i>` : '';

  if (url) {
    return `<a href="${url}" class="${allClasses}">${text}${iconHtml}</a>`;
  } else {
    return `<button class="${allClasses}">${text}${iconHtml}</button>`;
  }
}

/**
 * Renders a pricing card component
 * @param {Object} card - Pricing card configuration object
 * @returns {string} HTML string
 */
export function renderPricingCard(card = {}) {
  const {
    pre_headline = '',
    title = '',
    monthly_label = '',
    features = [],
    cta_link = null,
    includes_label = 'Includes'
  } = card;

  // Render pre-headline
  const preHeadlineHtml = pre_headline ? renderHeading({
    title: pre_headline,
    as: 'h2',
    custom_classes: 'mb-2 text-md font-bold leading-[1.4] md:text-xl'
  }) : '';

  // Render main title
  const titleHtml = title ? renderHeading({
    title: title,
    as: 'span',
    visual_level: '1',
    custom_classes: 'block my-2 text-2xl font-bold sm:text-3xl lg:text-4xl'
  }) : '';

  // Render features list
  const featuresHtml = features.map(feature => `
    <div class="flex self-start">
      <div class="mr-3 sm:mr-4 flex-none self-start">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check size-5 sm:size-6"><path d="M20 6 9 17l-5-5"></path></svg>
      </div>
      <p class="text-sm sm:text-base">${feature}</p>
    </div>
  `).join('');

  // Render CTA button
  const ctaHtml = cta_link ? `
    <div>
      <a href="${cta_link.url}" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary/90 h-9 px-4 py-2 w-full">
        ${cta_link.title}
      </a>
    </div>
  ` : '';

  return `
    <div class="bg-card text-card-foreground flex h-full flex-col justify-between p-4 sm:p-6 md:p-8">
      <div>
        ${preHeadlineHtml}
        ${titleHtml}
        <div class="my-4 sm:my-8 h-px w-full bg-border"></div>
        <p class="text-sm sm:text-base">${includes_label}:</p>
        <div class="mb-6 sm:mb-8 mt-3 sm:mt-4 grid grid-cols-1 gap-y-3 sm:gap-y-4 py-2">
          ${featuresHtml}
        </div>
      </div>
      ${ctaHtml}
    </div>
  `;
}