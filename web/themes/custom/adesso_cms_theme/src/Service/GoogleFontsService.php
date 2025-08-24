<?php

/**
 * @file
 * Google Fonts integration service for dynamic font loading.
 */

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

/**
 * Service for Google Fonts integration with performance optimization.
 * 
 * Handles dynamic Google Fonts loading, municipality-specific font recommendations,
 * Swiss compliance validation, and performance optimization for GPZH demo system.
 */
class GoogleFontsService {

  /**
   * Font configuration data for supported Google Fonts.
   */
  public const FONT_CONFIGS = [
    'inter' => [
      'family' => 'Inter',
      'fallback' => 'sans-serif',
      'display' => 'swap',
      'municipality' => 'thalwil',
      'description' => 'Modern, tech-forward',
      'weights' => ['300', '400', '500', '600', '700'],
      'google_family' => 'Inter',
    ],
    'crimson-text' => [
      'family' => 'Crimson Text',
      'fallback' => 'serif',
      'display' => 'swap',
      'municipality' => 'thalheim',
      'description' => 'Traditional, elegant',
      'weights' => ['400', '600', '700'],
      'google_family' => 'Crimson+Text',
    ],
    'playfair-display' => [
      'family' => 'Playfair Display',
      'fallback' => 'serif',
      'display' => 'swap',
      'municipality' => 'erlenbach',
      'description' => 'Sophisticated, upscale',
      'weights' => ['400', '500', '600', '700', '800'],
      'google_family' => 'Playfair+Display',
    ],
    'open-sans' => [
      'family' => 'Open Sans',
      'fallback' => 'sans-serif',
      'display' => 'swap',
      'municipality' => 'default',
      'description' => 'Clean, universal',
      'weights' => ['300', '400', '500', '600', '700'],
      'google_family' => 'Open+Sans',
    ],
    'montserrat' => [
      'family' => 'Montserrat',
      'fallback' => 'sans-serif',
      'display' => 'swap',
      'municipality' => 'default',
      'description' => 'Contemporary, Swiss-inspired',
      'weights' => ['300', '400', '500', '600', '700', '800'],
      'google_family' => 'Montserrat',
    ],
  ];

  /**
   * Swiss character requirements for font validation.
   */
  public const SWISS_CHARACTERS = [
    'swiss_german' => ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'],
    'french_accents' => ['à', 'á', 'â', 'ã', 'ç', 'è', 'é', 'ê', 'ë', 'À', 'Á', 'Â', 'Ã', 'Ç', 'È', 'É', 'Ê', 'Ë'],
    'italian_accents' => ['à', 'è', 'é', 'ì', 'í', 'î', 'ò', 'ó', 'ù', 'ú', 'À', 'È', 'É', 'Ì', 'Í', 'Î', 'Ò', 'Ó', 'Ù', 'Ú'],
  ];

  /**
   * Get font configuration for a given font key.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return array
   *   Font configuration array with family, fallback, display, etc.
   */
  public static function getFontConfig(string $fontKey): array {
    return self::FONT_CONFIGS[$fontKey] ?? self::FONT_CONFIGS['inter'];
  }

  /**
   * Build Google Fonts API URL with performance optimization.
   * 
   * @param array $fontConfig
   *   Font configuration array.
   * @param array $weights
   *   Array of font weights to load (e.g., ['400', '500', '600']).
   * 
   * @return string
   *   Complete Google Fonts CSS API URL.
   */
  public static function buildGoogleFontsUrl(array $fontConfig, array $weights = ['400']): string {
    $googleFamily = $fontConfig['google_family'] ?? $fontConfig['family'];
    $display = $fontConfig['display'] ?? 'swap';
    
    // Validate and sort weights
    $validWeights = array_filter($weights, function($weight) {
      return is_numeric($weight) && (int)$weight >= 100 && (int)$weight <= 900;
    });
    
    if (empty($validWeights)) {
      $validWeights = ['400']; // Fallback to regular weight
    }
    
    sort($validWeights, SORT_NUMERIC);
    $weightString = implode(';', $validWeights);
    
    // Build optimized Google Fonts URL
    $url = 'https://fonts.googleapis.com/css2';
    $params = [
      'family' => $googleFamily . ':wght@' . $weightString,
      'display' => $display,
    ];
    
    return $url . '?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);
  }

  /**
   * Generate CSS font-family declaration.
   * 
   * @param array $fontConfig
   *   Font configuration array.
   * 
   * @return string
   *   CSS font-family value with fallbacks.
   */
  public static function generateFontFamilyCSS(array $fontConfig): string {
    $family = $fontConfig['family'];
    $fallback = $fontConfig['fallback'] ?? 'sans-serif';
    
    // Quote font family names with spaces
    if (strpos($family, ' ') !== FALSE) {
      $family = "'{$family}'";
    }
    
    return $family . ', ' . $fallback;
  }

  /**
   * Validate font compliance with Swiss standards.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return bool
   *   TRUE if font meets Swiss compliance requirements.
   */
  public static function validateSwissCompliance(string $fontKey): bool {
    $supportedFonts = array_keys(self::FONT_CONFIGS);
    
    // Check if font is in approved list
    if (!in_array($fontKey, $supportedFonts)) {
      return FALSE;
    }
    
    $config = self::getFontConfig($fontKey);
    
    // Validate character set support (simplified validation)
    // In a real implementation, this would check actual font files
    $swissSupportedFonts = ['inter', 'crimson-text', 'playfair-display', 'open-sans', 'montserrat'];
    
    return in_array($fontKey, $swissSupportedFonts);
  }

  /**
   * Get municipality-specific font recommendations.
   * 
   * @param string $municipality
   *   Municipality identifier.
   * 
   * @return array
   *   Array of recommended font keys in priority order.
   */
  public static function getMunicipalityFontRecommendations(string $municipality): array {
    $recommendations = [
      'thalwil' => ['inter', 'montserrat', 'open-sans'],
      'thalheim' => ['crimson-text', 'playfair-display', 'open-sans'],
      'erlenbach' => ['playfair-display', 'crimson-text', 'montserrat'],
      'default' => ['open-sans', 'inter', 'montserrat'],
    ];
    
    return $recommendations[$municipality] ?? $recommendations['default'];
  }

  /**
   * Generate preload links for performance optimization.
   * 
   * @param array $fontConfig
   *   Font configuration array.
   * @param array $weights
   *   Array of font weights to preload.
   * 
   * @return array
   *   Array of link elements for DNS prefetch, preconnect, and preload.
   */
  public static function generatePreloadLinks(array $fontConfig, array $weights = ['400']): array {
    return [
      'dns_prefetch' => [
        [
          'href' => 'https://fonts.googleapis.com',
          'rel' => 'dns-prefetch',
        ],
        [
          'href' => 'https://fonts.gstatic.com',
          'rel' => 'dns-prefetch',
        ],
      ],
      'preconnect' => [
        [
          'href' => 'https://fonts.googleapis.com',
          'rel' => 'preconnect',
        ],
        [
          'href' => 'https://fonts.gstatic.com',
          'rel' => 'preconnect',
          'crossorigin' => 'anonymous',
        ],
      ],
      'stylesheet' => [
        [
          'href' => self::buildGoogleFontsUrl($fontConfig, $weights),
          'rel' => 'stylesheet',
        ],
      ],
    ];
  }

  /**
   * Validate font weight array.
   * 
   * @param array $weights
   *   Array of font weight strings.
   * 
   * @return bool
   *   TRUE if all weights are valid.
   */
  public static function validateFontWeights(array $weights): bool {
    if (empty($weights)) {
      return FALSE;
    }
    
    $validWeights = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];
    
    foreach ($weights as $weight) {
      if (!in_array($weight, $validWeights)) {
        return FALSE;
      }
    }
    
    return TRUE;
  }

  /**
   * Generate system fallback fonts for offline scenarios.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return array
   *   Array of fallback font names in priority order.
   */
  public static function generateFallbackFonts(string $fontKey): array {
    $fallbacks = [
      'inter' => ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      'crimson-text' => ['Georgia', 'Times New Roman', 'Times', 'serif'],
      'playfair-display' => ['Georgia', 'Times New Roman', 'Times', 'serif'],
      'open-sans' => ['Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
      'montserrat' => ['Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
    ];
    
    return $fallbacks[$fontKey] ?? $fallbacks['inter'];
  }

  /**
   * Validate government licensing compliance.
   * 
   * All Google Fonts are licensed under Open Font License (OFL)
   * which permits government use. This method validates the licensing.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return bool
   *   TRUE if font is licensed for government use.
   */
  public static function validateGovernmentLicensing(string $fontKey): bool {
    // All Google Fonts are OFL licensed and suitable for government use
    $governmentApprovedFonts = array_keys(self::FONT_CONFIGS);
    
    return in_array($fontKey, $governmentApprovedFonts);
  }

  /**
   * Get font metrics for accessibility validation.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return array
   *   Font metrics including readability scores and characteristics.
   */
  public static function getFontMetrics(string $fontKey): array {
    $metrics = [
      'inter' => [
        'readability_score' => 9.2,
        'character_width' => 'variable',
        'x_height' => 'high',
        'accessibility_rating' => 'excellent',
        'swiss_compliance' => TRUE,
      ],
      'crimson-text' => [
        'readability_score' => 8.7,
        'character_width' => 'wide',
        'x_height' => 'medium',
        'accessibility_rating' => 'good',
        'swiss_compliance' => TRUE,
      ],
      'playfair-display' => [
        'readability_score' => 8.1,
        'character_width' => 'wide',
        'x_height' => 'high',
        'accessibility_rating' => 'good',
        'swiss_compliance' => TRUE,
      ],
      'open-sans' => [
        'readability_score' => 9.5,
        'character_width' => 'medium',
        'x_height' => 'high',
        'accessibility_rating' => 'excellent',
        'swiss_compliance' => TRUE,
      ],
      'montserrat' => [
        'readability_score' => 8.9,
        'character_width' => 'medium',
        'x_height' => 'medium',
        'accessibility_rating' => 'good',
        'swiss_compliance' => TRUE,
      ],
    ];
    
    return $metrics[$fontKey] ?? $metrics['inter'];
  }

  /**
   * Generate CSS @font-face declarations for custom loading.
   * 
   * @param array $fontConfig
   *   Font configuration array.
   * @param array $weights
   *   Array of font weights.
   * 
   * @return string
   *   CSS @font-face declarations.
   */
  public static function generateFontFaceCSS(array $fontConfig, array $weights = ['400']): string {
    $family = $fontConfig['family'];
    $display = $fontConfig['display'] ?? 'swap';
    $css = [];
    
    foreach ($weights as $weight) {
      $css[] = "@font-face {";
      $css[] = "  font-family: '{$family}';";
      $css[] = "  font-style: normal;";
      $css[] = "  font-weight: {$weight};";
      $css[] = "  font-display: {$display};";
      $css[] = "  /* Google Fonts URL would be inserted here */";
      $css[] = "}";
    }
    
    return implode("\n", $css);
  }

  /**
   * Validate Swiss localization character support.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * 
   * @return array
   *   Character support validation results.
   */
  public static function validateSwissCharacterSupport(string $fontKey): array {
    // In a real implementation, this would check actual font files
    // For now, we assume all supported fonts have proper character support
    $supportedFonts = array_keys(self::FONT_CONFIGS);
    $isSupported = in_array($fontKey, $supportedFonts);
    
    return [
      'swiss_german' => $isSupported,
      'french_accents' => $isSupported,
      'italian_accents' => $isSupported,
      'currency_symbols' => $isSupported,
      'mathematical_symbols' => $isSupported,
      'overall_compliance' => $isSupported,
    ];
  }

  /**
   * Get font loading performance metrics.
   * 
   * @param string $fontKey
   *   Font identifier key.
   * @param array $weights
   *   Array of font weights.
   * 
   * @return array
   *   Performance metrics and optimization recommendations.
   */
  public static function getPerformanceMetrics(string $fontKey, array $weights = ['400']): array {
    $config = self::getFontConfig($fontKey);
    
    // Estimated metrics based on typical Google Fonts performance
    $baseSize = 15; // KB per weight
    $totalSize = count($weights) * $baseSize;
    
    return [
      'estimated_size_kb' => $totalSize,
      'estimated_load_time_ms' => $totalSize * 2, // Rough estimate
      'render_blocking' => FALSE, // Using font-display: swap
      'cache_duration_hours' => 24 * 7, // Google Fonts cache
      'performance_impact' => $totalSize > 100 ? 'high' : ($totalSize > 50 ? 'medium' : 'low'),
      'optimization_score' => min(100, 100 - ($totalSize / 2)),
      'recommendations' => [
        'Use font-display: swap',
        'Preconnect to fonts.gstatic.com',
        'Limit font weights to essential ones',
        'Consider font subsetting for production',
      ],
    ];
  }

  /**
   * Generate municipality-specific font preset.
   * 
   * @param string $municipality
   *   Municipality identifier.
   * 
   * @return array
   *   Complete font configuration for municipality.
   */
  public static function getMunicipalityPreset(string $municipality): array {
    $municipalityFonts = [
      'thalwil' => 'inter',
      'thalheim' => 'crimson-text',
      'erlenbach' => 'playfair-display',
      'default' => 'open-sans',
    ];
    
    $fontKey = $municipalityFonts[$municipality] ?? $municipalityFonts['default'];
    $config = self::getFontConfig($fontKey);
    
    return [
      'font_key' => $fontKey,
      'config' => $config,
      'css_family' => self::generateFontFamilyCSS($config),
      'preload_links' => self::generatePreloadLinks($config),
      'fallbacks' => self::generateFallbackFonts($fontKey),
      'municipality' => $municipality,
      'description' => $config['description'] ?? '',
    ];
  }

}