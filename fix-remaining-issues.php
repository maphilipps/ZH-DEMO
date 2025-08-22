<?php
/**
 * Fix remaining paragraph issues
 */

use Drupal\field\Entity\FieldStorageConfig;
use Drupal\field\Entity\FieldConfig;
use Drupal\paragraphs\Entity\Paragraph;

// Add missing paragraph types to theme field
$field_storage = FieldStorageConfig::loadByName('paragraph', 'field_content_element_theme');

$additional_types = [
  'embed', 'download', 'card', 'block_reference', 
  'download_item', 'stats_item', 'webform_embed',
  'accordion_item', 'carousel_item', 'card', 'pricing_card',
  'slider_item', 'layout_container'
];

foreach ($additional_types as $bundle) {
  $field = FieldConfig::loadByName('paragraph', $bundle, 'field_content_element_theme');
  if (!$field && $field_storage) {
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
  }
}

// Fix the accordion pre_headline issue by updating all accordion paragraphs
$accordions = \Drupal::entityTypeManager()
  ->getStorage('paragraph')
  ->loadByProperties(['type' => 'accordion']);

foreach ($accordions as $accordion) {
  // Just resave to trigger default values
  $accordion->save();
  echo "✅ Fixed accordion paragraph ID: " . $accordion->id() . "\n";
}

// Clear cache
drupal_flush_all_caches();
echo "\n🔄 Cache cleared\n";
echo "✅ All fixes complete!\n";