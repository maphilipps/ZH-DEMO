# adesso CMS Complete Recipe

This recipe provides a complete installation of adesso CMS with all features and configurations synchronized from the working development environment.

## Features

- **AI Integration**: Anthropic Claude and OpenAI providers for content suggestions, image alt text generation, and more
- **Advanced Content Management**: Paragraphs-based content with 20+ paragraph types
- **SEO & Marketing Tools**: Comprehensive SEO tools, meta tag management, sitemaps
- **Media Management**: Advanced image handling with responsive styles, focal point, WebP support
- **User Experience**: Frontend editing, accessibility tools, admin theme optimization
- **Security & Spam Prevention**: Multiple layers of spam protection and security tools
- **Search & Discovery**: Search API with autocomplete and advanced filtering
- **Workflow Management**: ECA-based automation and content moderation workflows

## Installation

1. Install Drupal 11 with this recipe:
   ```bash
   composer create-project drupal/recommended-project:^11.0 my-adesso-cms
   cd my-adesso-cms
   ```

2. Apply the adesso CMS complete recipe:
   ```bash
   php core/scripts/drupal recipe recipes/adesso_cms_complete
   ```

3. Install dependencies:
   ```bash
   composer install
   ```

4. Configure your environment:
   - Set up database connection in settings.php
   - Configure AI provider API keys
   - Set up file permissions

5. Validate installation:
   ```bash
   ./recipes/adesso_cms_complete/validate-installation.sh
   ```

## Post-Installation Configuration

### AI Providers

Configure AI providers by setting the following environment variables or in settings.php:

```php
// Anthropic API Key
$config['ai_provider_anthropic.settings']['api_key'] = 'your-api-key';

// OpenAI API Key  
$config['ai_provider_openai.settings']['api_key'] = 'your-api-key';
```

### Email Configuration

Configure email delivery:

```php
$config['symfony_mailer_lite.settings']['smtp_server'] = 'your-smtp-server';
$config['symfony_mailer_lite.settings']['smtp_username'] = 'your-username';
$config['symfony_mailer_lite.settings']['smtp_password'] = 'your-password';
```

### Performance Settings

For production, enable CSS/JS aggregation:

```php
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
```

## Content Types

This recipe includes these content types:

- **Page**: Main pages with paragraph-based content
- **News**: News articles with SEO optimization
- **Event**: Event pages with date/location fields
- **Person**: Staff/team member profiles
- **Project**: Project showcase pages

## Paragraph Types

Available content elements:

- **Text**: Rich text content with various layouts
- **Hero**: Hero sections with images and CTAs
- **Gallery**: Image galleries with lightbox
- **Accordion**: Collapsible content sections
- **Card Group**: Card-based content presentation
- **Carousel**: Image/content carousels
- **Pricing**: Pricing tables and plans
- **Download**: File download sections
- **Newsletter**: Newsletter signup forms
- **Side by Side**: Two-column content layouts
- **Media**: Individual media items
- **Logo Collection**: Partner/client logos
- **Embed**: Third-party content embedding

## Themes

- **Frontend**: adesso_cms_theme (custom responsive theme)
- **Admin**: Gin admin theme with custom branding

## Support

For technical support or questions about this recipe, please refer to the adesso CMS documentation or contact the development team.

## Last Updated

Generated: Wed Aug 13 15:43:09 CEST 2025
Repository: adesso-cms
Recipe Version: 1.0.0
