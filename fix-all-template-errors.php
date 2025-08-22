<?php
/**
 * Fix all template validation errors for paragraphs
 */

use Drupal\paragraphs\Entity\Paragraph;

// Fix stat_item paragraphs - add missing icon field
$stat_items = \Drupal::entityTypeManager()
  ->getStorage('paragraph')
  ->loadByProperties(['type' => 'stats_item']);

foreach ($stat_items as $stat_item) {
  if (!$stat_item->hasField('field_icon') || $stat_item->get('field_icon')->isEmpty()) {
    // Set a default icon
    if ($stat_item->hasField('field_icon')) {
      $stat_item->set('field_icon', 'chart-bar');
    }
  }
  $stat_item->save();
  echo "✅ Fixed stats_item paragraph ID: " . $stat_item->id() . "\n";
}

// Clear all caches
drupal_flush_all_caches();
echo "\n🔄 Cache cleared\n";
echo "✅ Template fixes complete!\n";