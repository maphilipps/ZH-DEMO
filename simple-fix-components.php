<?php
/**
 * Simple fix for component NULL issues
 */

// Fix remaining component YAML files manually
$files = glob('web/themes/custom/adesso_cms_theme/components/*/*.component.yml');

foreach ($files as $file) {
  $content = file_get_contents($file);
  $basename = basename(dirname($file));
  
  // Check if contains problematic fields
  if (strpos($content, 'pre_headline:') !== false || 
      strpos($content, 'icon:') !== false ||
      strpos($content, 'subtitle:') !== false ||
      strpos($content, 'summary:') !== false) {
    
    // Simple text replacement for common optional fields
    $replacements = [
      // pre_headline
      "    pre_headline:\n      type: string" => 
      "    pre_headline:\n      type:\n        - string\n        - 'null'",
      
      // icon (if not already fixed)
      "    icon:\n      type: string" => 
      "    icon:\n      type:\n        - string\n        - 'null'",
      
      // subtitle
      "    subtitle:\n      type: string" => 
      "    subtitle:\n      type:\n        - string\n        - 'null'",
      
      // summary (careful not to break if already an object)
      "    summary:\n      type: string" => 
      "    summary:\n      type:\n        - string\n        - 'null'",
    ];
    
    $modified = false;
    foreach ($replacements as $search => $replace) {
      if (strpos($content, $search) !== false) {
        $content = str_replace($search, $replace, $content);
        $modified = true;
        echo "✅ Fixed field in $basename\n";
      }
    }
    
    if ($modified) {
      file_put_contents($file, $content);
    }
  }
}

echo "\n✅ Component schema fixes complete!\n";