<?php

// @codingStandardsIgnoreFile

/**
 * @file
 * Drupal site-specific configuration file for Erlenbach.
 * 
 * GPZH-28: Multi-Site Setup für Gemeinde Erlenbach
 * Seegemeinde an der Goldküste
 */

// Site-specific config sync directory.
$settings['config_sync_directory'] = '../config/sites/erlenbach';

// Hash salt.
$settings['hash_salt'] = getenv('DRUPAL_HASH_SALT');

// Disallow access to update.php by anonymous users.
$settings['update_free_access'] = FALSE;

// Other helpful settings.
$settings['container_yamls'][] = $app_root . '/' . $site_path . '/services.yml';
$settings['entity_update_batch_size'] = 50;
$settings['file_scan_ignore_directories'] = [
  'node_modules',
  'bower_components',
];

// Site-specific database connection for Erlenbach.
$databases['default']['default'] = [
  'database' => getenv('DRUPAL_DATABASE_NAME') ?: 'db_erlenbach',
  'username' => getenv('DRUPAL_DATABASE_USERNAME') ?: 'db',
  'password' => getenv('DRUPAL_DATABASE_PASSWORD') ?: 'db',
  'prefix' => '',
  'host' => getenv('DRUPAL_DATABASE_HOST') ?: 'db',
  'port' => getenv('DRUPAL_DATABASE_PORT') ?: '3306',
  'namespace' => 'Drupal\Core\Database\Driver\mysql',
  'driver' => 'mysql',
];

// Site-specific file paths.
$settings['file_public_path'] = 'sites/erlenbach/files';
$settings['file_private_path'] = 'sites/erlenbach/private';
$settings['file_temp_path'] = 'sites/erlenbach/temp';

// Include local settings if available.
if (file_exists($app_root . '/' . $site_path . '/settings.local.php')) {
  include $app_root . '/' . $site_path . '/settings.local.php';
}