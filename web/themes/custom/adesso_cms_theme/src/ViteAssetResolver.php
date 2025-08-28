<?php

declare(strict_types=1);

namespace Drupal\adesso_cms_theme;

use Drupal\Core\Theme\ThemeManagerInterface;

/**
 * Vite Asset Resolver for PreviousNext standards.
 * 
 * Automatically resolves Vite build asset paths using the manifest file.
 * This ensures library definitions stay up-to-date with hash changes.
 */
class ViteAssetResolver {

  /**
   * The theme manager.
   */
  protected ThemeManagerInterface $themeManager;

  /**
   * Cached manifest data.
   */
  protected static ?array $manifest = NULL;

  /**
   * Constructor.
   */
  public function __construct(ThemeManagerInterface $theme_manager) {
    $this->themeManager = $theme_manager;
  }

  /**
   * Get the resolved asset path from Vite manifest.
   * 
   * @param string $entry_point
   *   The original entry point (e.g., 'src/js/adesso.js')
   * 
   * @return string|null
   *   The resolved asset path or NULL if not found
   */
  public function resolveAsset(string $entry_point): ?string {
    $manifest = $this->getManifest();
    
    if ($manifest && isset($manifest[$entry_point]['file'])) {
      return 'dist/' . $manifest[$entry_point]['file'];
    }
    
    return NULL;
  }

  /**
   * Get all entry points from the manifest.
   * 
   * @return array
   *   Array of entry points with their resolved paths
   */
  public function getAllAssets(): array {
    $manifest = $this->getManifest();
    $assets = [];
    
    if ($manifest) {
      foreach ($manifest as $entry => $data) {
        if (isset($data['isEntry']) && $data['isEntry']) {
          $assets[$entry] = 'dist/' . $data['file'];
        }
      }
    }
    
    return $assets;
  }

  /**
   * Load and cache the Vite manifest file.
   * 
   * @return array|null
   *   The parsed manifest data or NULL if not found
   */
  protected function getManifest(): ?array {
    if (self::$manifest !== NULL) {
      return self::$manifest;
    }
    
    $theme_path = $this->themeManager->getActiveTheme()->getPath();
    $manifest_path = DRUPAL_ROOT . '/' . $theme_path . '/dist/.vite/manifest.json';
    
    if (file_exists($manifest_path)) {
      $manifest_content = file_get_contents($manifest_path);
      if ($manifest_content !== FALSE) {
        self::$manifest = json_decode($manifest_content, TRUE);
        return self::$manifest;
      }
    }
    
    // Fallback to empty array if manifest not found
    self::$manifest = [];
    return self::$manifest;
  }

  /**
   * Reset cached manifest (useful for development).
   */
  public function resetCache(): void {
    self::$manifest = NULL;
  }

}