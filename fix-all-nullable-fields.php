<?php
/**
 * Fix all component schemas to allow null values for optional fields
 */

use Symfony\Component\Yaml\Yaml;
use Symfony\Component\Finder\Finder;

$finder = new Finder();
$finder->files()
  ->in('web/themes/custom/adesso_cms_theme/components')
  ->name('*.component.yml');

$optionalFields = [
  'pre_headline', 'icon', 'subtitle', 'summary', 
  'link_text', 'link_url', 'description', 'eyebrow',
  'media', 'video_url', 'embed_code'
];

foreach ($finder as $file) {
  $content = file_get_contents($file->getRealPath());
  $data = Yaml::parse($content);
  
  $modified = false;
  
  if (isset($data['props']['properties'])) {
    foreach ($data['props']['properties'] as $propName => &$propDef) {
      // Check if this is an optional field that should allow null
      if (in_array($propName, $optionalFields)) {
        if (isset($propDef['type']) && $propDef['type'] === 'string') {
          $propDef['type'] = ['string', 'null'];
          $modified = true;
          echo "✅ Fixed {$propName} in " . basename($file->getPath()) . "\n";
        }
      }
    }
  }
  
  if ($modified) {
    $yaml = Yaml::dump($data, 10, 2);
    file_put_contents($file->getRealPath(), $yaml);
  }
}

echo "\n✅ All component schemas updated!\n";