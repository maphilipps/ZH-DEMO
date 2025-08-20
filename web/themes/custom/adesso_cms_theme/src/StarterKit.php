<?php

namespace Drupal\starterkit_theme;

use Drupal\Component\Serialization\Yaml;
use Drupal\Core\Theme\StarterKitInterface;

/**
 * Default implementation.
 */
final class StarterKit implements StarterKitInterface {

  /**
   * {@inheritdoc}
   */
  public static function postProcess(string $working_dir, string $machine_name, string $theme_name): void {
    $info_file = sprintf('%s/%s.info.yml', $working_dir, $machine_name);
    if ($content = file_get_contents($info_file)) {
      $info = Yaml::decode($content);
    }
    else {
      throw new \RuntimeException(sprintf('Could not read file %s', $info_file));
    }

    unset($info['hidden']);
    file_put_contents($info_file, Yaml::encode($info));
  }

}
