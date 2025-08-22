<?php
/**
 * Quick fix script to add missing field_content_element_theme to paragraph types
 */

use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;

// Create field storage if it doesn't exist
$field_storage = FieldStorageConfig::loadByName('paragraph', 'field_content_element_theme');
if (!$field_storage) {
  $field_storage = FieldStorageConfig::create([
    'field_name' => 'field_content_element_theme',
    'entity_type' => 'paragraph',
    'type' => 'list_string',
    'settings' => [
      'allowed_values' => [
        'default' => 'Standard',
        'light' => 'Hell',
        'dark' => 'Dunkel',
        'highlighted' => 'Hervorgehoben',
      ],
    ],
    'cardinality' => 1,
  ]);
  $field_storage->save();
  echo "✅ Field storage created: field_content_element_theme\n";
}

// List of paragraph types that need this field
$paragraph_types = [
  'hero', 'text', 'slider', 'sidebyside', 'pricing',
  'newsletter', 'media', 'logo_collection', 'views',
  'accordion', 'gallery', 'carousel', 'card_group'
];

foreach ($paragraph_types as $bundle) {
  $field = FieldConfig::loadByName('paragraph', $bundle, 'field_content_element_theme');
  if (!$field) {
    try {
      $field = FieldConfig::create([
        'field_storage' => $field_storage,
        'bundle' => $bundle,
        'label' => 'Theme',
        'description' => 'Select the theme variant for this component',
        'required' => FALSE,
        'default_value' => [
          ['value' => 'default'],
        ],
        'settings' => [],
      ]);
      $field->save();
      echo "✅ Added field to: $bundle\n";
    } catch (\Exception $e) {
      echo "⚠️  Skipped $bundle: " . $e->getMessage() . "\n";
    }
  } else {
    echo "✓ Field already exists on: $bundle\n";
  }
}

// Clear cache
drupal_flush_all_caches();
echo "\n🔄 Cache cleared\n";
echo "✅ Field fix complete!\n";