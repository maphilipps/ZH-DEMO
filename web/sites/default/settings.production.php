<?php
/**
 * @file
 * Production settings for zh.adessocms.de
 * GPZH Präqualifikation Demo System
 * Issue #17: Production Deployment
 */

// Trusted host patterns for production domains
$settings['trusted_host_patterns'] = [
  '^zh\.adessocms\.de$',
  '^www\.zh\.adessocms\.de$',
  '^bruchtal\.zh\.adessocms\.de$',
  '^thalwil\.zh\.adessocms\.de$',
  '^thalheim\.zh\.adessocms\.de$',
  '^erlenbach\.zh\.adessocms\.de$',
];

// Performance settings for production
$config['system.performance']['css']['preprocess'] = TRUE;
$config['system.performance']['js']['preprocess'] = TRUE;
$config['system.performance']['cache']['page']['max_age'] = 900; // 15 minutes
$settings['cache']['bins']['render'] = 'cache.backend.database';
$settings['cache']['bins']['discovery_migration'] = 'cache.backend.memory';
$settings['cache']['bins']['page'] = 'cache.backend.database';
$settings['cache']['bins']['dynamic_page_cache'] = 'cache.backend.database';

// Private files directory
$settings['file_private_path'] = '/var/www/private';

// Disable development modules in production
$config['system.modules']['devel'] = FALSE;
$config['system.modules']['devel_generate'] = FALSE;
$config['system.modules']['webprofiler'] = FALSE;

// Swiss compliance settings
$config['system.site']['default_langcode'] = 'de';
$config['system.date']['timezone']['default'] = 'Europe/Zurich';
$config['system.date']['first_day'] = 1; // Monday
$config['system.date']['country']['default'] = 'CH';

// Swiss date formats
$config['core.date_format.short']['pattern'] = 'd.m.Y - H:i';
$config['core.date_format.medium']['pattern'] = 'D, d.m.Y - H:i';
$config['core.date_format.long']['pattern'] = 'l, j. F Y - H:i';

// Security headers for production
$settings['x_frame_options'] = 'SAMEORIGIN';

// External SMTP configuration (SendGrid/Mailgun)
if (getenv('SMTP_USERNAME') && getenv('SMTP_PASSWORD')) {
  $config['smtp.settings']['smtp_on'] = TRUE;
  $config['smtp.settings']['smtp_host'] = getenv('SMTP_HOST') ?: 'smtp.sendgrid.net';
  $config['smtp.settings']['smtp_port'] = getenv('SMTP_PORT') ?: 587;
  $config['smtp.settings']['smtp_protocol'] = 'tls';
  $config['smtp.settings']['smtp_username'] = getenv('SMTP_USERNAME');
  $config['smtp.settings']['smtp_password'] = getenv('SMTP_PASSWORD');
  $config['smtp.settings']['smtp_from'] = getenv('SMTP_FROM') ?: 'noreply@zh.adessocms.de';
  $config['smtp.settings']['smtp_fromname'] = 'GPZH Demo System';
}

// Error handling in production
$config['system.logging']['error_level'] = 'hide'; // Hide errors from users
ini_set('display_errors', FALSE);
ini_set('display_startup_errors', FALSE);

// Session cookie settings for production
ini_set('session.cookie_secure', TRUE);
ini_set('session.cookie_httponly', TRUE);
ini_set('session.cookie_samesite', 'Strict');

// File upload limits
ini_set('upload_max_filesize', '50M');
ini_set('post_max_size', '50M');
ini_set('max_execution_time', 60);
ini_set('memory_limit', '512M');

// Reverse proxy configuration (if behind load balancer)
if (PHP_SAPI !== 'cli') {
  $settings['reverse_proxy'] = TRUE;
  $settings['reverse_proxy_addresses'] = ['127.0.0.1'];
  $settings['reverse_proxy_header'] = 'X-Forwarded-For';
  $settings['reverse_proxy_proto_header'] = 'X-Forwarded-Proto';
  $settings['reverse_proxy_host_header'] = 'X-Forwarded-Host';
  $settings['reverse_proxy_port_header'] = 'X-Forwarded-Port';
}

// Redis configuration (if available)
if (extension_loaded('redis')) {
  $settings['redis.connection']['interface'] = 'PhpRedis';
  $settings['redis.connection']['host'] = 'localhost';
  $settings['cache']['default'] = 'cache.backend.redis';
  
  // Use Redis for specific bins
  $settings['cache']['bins']['bootstrap'] = 'cache.backend.redis';
  $settings['cache']['bins']['config'] = 'cache.backend.redis';
  $settings['cache']['bins']['container'] = 'cache.backend.redis';
  $settings['cache']['bins']['discovery'] = 'cache.backend.redis';
  $settings['cache']['bins']['menu'] = 'cache.backend.redis';
  $settings['cache']['bins']['toolbar'] = 'cache.backend.redis';
}

// Production deployment flag
$settings['gpzh_production'] = TRUE;
$settings['gpzh_environment'] = 'production';

// Disable update notifications in production
$config['update.settings']['check']['disabled_extensions'] = TRUE;
$config['update.settings']['notification']['emails'] = [];

// Content Security Policy headers
$settings['security_headers'] = [
  'X-Content-Type-Options' => 'nosniff',
  'X-Frame-Options' => 'SAMEORIGIN',
  'X-XSS-Protection' => '1; mode=block',
  'Referrer-Policy' => 'strict-origin-when-cross-origin',
  'Permissions-Policy' => 'geolocation=(), camera=(), microphone=()',
];

// Include local settings if they exist (for secrets)
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}