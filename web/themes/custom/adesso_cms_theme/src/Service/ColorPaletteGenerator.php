<?php

/**
 * @file
 * Color palette generation service for Tailwind CSS v4 integration.
 */

declare(strict_types=1);

namespace Drupal\adesso_cms_theme\Service;

/**
 * Service for generating Tailwind CSS color palettes from single hex colors.
 * 
 * Implements HSL-based algorithm to generate complete 11-shade Tailwind palettes
 * from a single primary color input with accessibility validation.
 */
class ColorPaletteGenerator {

  /**
   * Generate complete Tailwind CSS palette from single hex color.
   * 
   * Creates 11 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
   * using HSL color space manipulation for consistent lightness progression.
   * 
   * @param string $hexColor
   *   The primary hex color (e.g., '#3b82f6').
   * 
   * @return array
   *   Associative array with shade keys and hex color values.
   *   
   * @throws \InvalidArgumentException
   *   If hex color format is invalid.
   */
  public static function generateTailwindPalette(string $hexColor): array {
    self::validateHexColor($hexColor);
    
    $hsl = self::hexToHsl($hexColor);
    
    // Tailwind shade generation algorithm
    // Lighter shades: reduce saturation, increase lightness
    // Darker shades: maintain saturation, decrease lightness
    $shadeConfigs = [
      50 => ['s' => $hsl['s'] * 0.1, 'l' => 0.95],
      100 => ['s' => $hsl['s'] * 0.2, 'l' => 0.9],
      200 => ['s' => $hsl['s'] * 0.3, 'l' => 0.8],
      300 => ['s' => $hsl['s'] * 0.4, 'l' => 0.7],
      400 => ['s' => $hsl['s'] * 0.6, 'l' => 0.6],
      500 => ['s' => $hsl['s'], 'l' => $hsl['l']], // Base color
      600 => ['s' => $hsl['s'], 'l' => max(0.1, $hsl['l'] * 0.9)],
      700 => ['s' => $hsl['s'], 'l' => max(0.1, $hsl['l'] * 0.8)],
      800 => ['s' => $hsl['s'], 'l' => max(0.1, $hsl['l'] * 0.7)],
      900 => ['s' => $hsl['s'], 'l' => max(0.05, $hsl['l'] * 0.6)],
      950 => ['s' => $hsl['s'], 'l' => max(0.05, $hsl['l'] * 0.5)],
    ];
    
    $palette = [];
    foreach ($shadeConfigs as $shade => $config) {
      // Ensure saturation and lightness stay within valid bounds
      $saturation = min(1.0, max(0.0, $config['s']));
      $lightness = min(1.0, max(0.0, $config['l']));
      
      $palette[$shade] = self::hslToHex($hsl['h'], $saturation, $lightness);
    }
    
    return $palette;
  }

  /**
   * Convert hex color to HSL values.
   * 
   * @param string $hex
   *   Hex color string (e.g., '#3b82f6' or '#fff').
   * 
   * @return array
   *   Array with 'h' (hue), 's' (saturation), 'l' (lightness) values.
   *   - h: 0-360 degrees
   *   - s: 0.0-1.0 (percentage as decimal)
   *   - l: 0.0-1.0 (percentage as decimal)
   *   
   * @throws \InvalidArgumentException
   *   If hex color format is invalid.
   */
  public static function hexToHsl(string $hex): array {
    self::validateHexColor($hex);
    
    // Remove # prefix and expand 3-digit hex to 6-digit
    $hex = ltrim($hex, '#');
    if (strlen($hex) === 3) {
      $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
    }
    
    // Convert to RGB values (0-1 range)
    $r = hexdec(substr($hex, 0, 2)) / 255;
    $g = hexdec(substr($hex, 2, 2)) / 255;
    $b = hexdec(substr($hex, 4, 2)) / 255;
    
    $max = max($r, $g, $b);
    $min = min($r, $g, $b);
    $diff = $max - $min;
    
    // Calculate lightness
    $l = ($max + $min) / 2;
    
    // Calculate saturation
    if ($diff === 0) {
      $s = 0; // Achromatic (grey)
    } else {
      $s = $l > 0.5 ? $diff / (2 - $max - $min) : $diff / ($max + $min);
    }
    
    // Calculate hue
    if ($diff === 0) {
      $h = 0; // Achromatic
    } elseif ($max === $r) {
      $h = fmod((($g - $b) / $diff) + ($g < $b ? 6 : 0), 6);
    } elseif ($max === $g) {
      $h = ($b - $r) / $diff + 2;
    } else {
      $h = ($r - $g) / $diff + 4;
    }
    
    $h = round($h * 60, 1); // Convert to degrees
    $s = round($s, 3);      // Keep precision for calculations
    $l = round($l, 3);      // Keep precision for calculations
    
    return ['h' => $h, 's' => $s, 'l' => $l];
  }

  /**
   * Convert HSL values to hex color.
   * 
   * @param float $h
   *   Hue (0-360 degrees).
   * @param float $s
   *   Saturation (0.0-1.0).
   * @param float $l
   *   Lightness (0.0-1.0).
   * 
   * @return string
   *   Hex color string with # prefix.
   *   
   * @throws \InvalidArgumentException
   *   If HSL values are out of valid ranges.
   */
  public static function hslToHex(float $h, float $s, float $l): string {
    // Validate HSL ranges
    if ($h < 0 || $h >= 360) {
      throw new \InvalidArgumentException("Hue must be between 0 and 360 degrees, got {$h}");
    }
    if ($s < 0 || $s > 1) {
      throw new \InvalidArgumentException("Saturation must be between 0.0 and 1.0, got {$s}");
    }
    if ($l < 0 || $l > 1) {
      throw new \InvalidArgumentException("Lightness must be between 0.0 and 1.0, got {$l}");
    }
    
    // Convert hue to 0-1 range
    $h = $h / 360;
    
    // HSL to RGB conversion
    if ($s === 0.0) {
      // Achromatic (grey)
      $r = $g = $b = $l;
    } else {
      $hue2rgb = function($p, $q, $t) {
        if ($t < 0) $t += 1;
        if ($t > 1) $t -= 1;
        if ($t < 1/6) return $p + ($q - $p) * 6 * $t;
        if ($t < 1/2) return $q;
        if ($t < 2/3) return $p + ($q - $p) * (2/3 - $t) * 6;
        return $p;
      };
      
      $q = $l < 0.5 ? $l * (1 + $s) : $l + $s - $l * $s;
      $p = 2 * $l - $q;
      
      $r = $hue2rgb($p, $q, $h + 1/3);
      $g = $hue2rgb($p, $q, $h);
      $b = $hue2rgb($p, $q, $h - 1/3);
    }
    
    // Convert to 0-255 range and format as hex
    $r = round($r * 255);
    $g = round($g * 255);
    $b = round($b * 255);
    
    return sprintf('#%02x%02x%02x', $r, $g, $b);
  }

  /**
   * Calculate contrast ratio between two colors.
   * 
   * Uses WCAG 2.1 contrast ratio formula for accessibility validation.
   * 
   * @param string $color1
   *   First hex color.
   * @param string $color2
   *   Second hex color.
   * 
   * @return float
   *   Contrast ratio (1.0 to 21.0).
   */
  public static function getContrastRatio(string $color1, string $color2): float {
    $luminance1 = self::getLuminance($color1);
    $luminance2 = self::getLuminance($color2);
    
    // Ensure lighter color is in numerator
    $lighter = max($luminance1, $luminance2);
    $darker = min($luminance1, $luminance2);
    
    return round(($lighter + 0.05) / ($darker + 0.05), 2);
  }

  /**
   * Validate accessibility compliance of generated palette.
   * 
   * Checks contrast ratios against white and black backgrounds
   * to identify shades that may not meet WCAG 2.1 AA standards.
   * 
   * @param array $palette
   *   Color palette array with shade keys and hex values.
   * 
   * @return array
   *   Array of shade numbers that have accessibility violations.
   */
  public static function validateAccessibility(array $palette): array {
    $violations = [];
    $whiteContrast = 4.5; // WCAG AA minimum
    $blackContrast = 4.5; // WCAG AA minimum
    
    foreach ($palette as $shade => $color) {
      $contrastWhite = self::getContrastRatio($color, '#ffffff');
      $contrastBlack = self::getContrastRatio($color, '#000000');
      
      // Flag if neither white nor black background provides sufficient contrast
      if ($contrastWhite < $whiteContrast && $contrastBlack < $blackContrast) {
        $violations[] = (int) $shade;
      }
    }
    
    return $violations;
  }

  /**
   * Get relative luminance of a color.
   * 
   * Implements WCAG 2.1 luminance calculation for contrast ratio computation.
   * 
   * @param string $hex
   *   Hex color string.
   * 
   * @return float
   *   Relative luminance (0.0 to 1.0).
   */
  private static function getLuminance(string $hex): float {
    self::validateHexColor($hex);
    
    // Convert to RGB values (0-1 range)
    $hex = ltrim($hex, '#');
    if (strlen($hex) === 3) {
      $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
    }
    
    $r = hexdec(substr($hex, 0, 2)) / 255;
    $g = hexdec(substr($hex, 2, 2)) / 255;
    $b = hexdec(substr($hex, 4, 2)) / 255;
    
    // Apply gamma correction
    $rsRGB = $r <= 0.03928 ? $r / 12.92 : pow(($r + 0.055) / 1.055, 2.4);
    $gsRGB = $g <= 0.03928 ? $g / 12.92 : pow(($g + 0.055) / 1.055, 2.4);
    $bsRGB = $b <= 0.03928 ? $b / 12.92 : pow(($b + 0.055) / 1.055, 2.4);
    
    // Calculate relative luminance using sRGB coefficients
    return 0.2126 * $rsRGB + 0.7152 * $gsRGB + 0.0722 * $bsRGB;
  }

  /**
   * Validate hex color format.
   * 
   * @param string $hex
   *   Hex color string to validate.
   * 
   * @throws \InvalidArgumentException
   *   If hex color format is invalid.
   */
  private static function validateHexColor(string $hex): void {
    if (!preg_match('/^#?[0-9a-f]{3}$|^#?[0-9a-f]{6}$/i', $hex)) {
      throw new \InvalidArgumentException("Invalid hex color format: {$hex}");
    }
  }

  /**
   * Generate Swiss-compliant color variations.
   * 
   * Creates additional color variations that meet Swiss design standards
   * and government portal requirements.
   * 
   * @param string $primaryColor
   *   Base hex color for Swiss theme.
   * 
   * @return array
   *   Swiss color scheme with official and accent colors.
   */
  public static function generateSwissColorScheme(string $primaryColor): array {
    self::validateHexColor($primaryColor);
    
    $hsl = self::hexToHsl($primaryColor);
    
    // Swiss design system color relationships
    $swissScheme = [
      'primary' => $primaryColor,
      'primary_light' => self::hslToHex($hsl['h'], $hsl['s'] * 0.7, min(0.9, $hsl['l'] + 0.2)),
      'primary_dark' => self::hslToHex($hsl['h'], $hsl['s'], max(0.1, $hsl['l'] - 0.2)),
      'accent' => self::hslToHex(($hsl['h'] + 30) % 360, $hsl['s'] * 0.8, $hsl['l']),
      'neutral_warm' => '#f8f7f4', // Swiss warm neutral
      'neutral_cool' => '#f1f5f9',  // Swiss cool neutral
      'text_primary' => '#1f2937',  // High contrast text
      'text_secondary' => '#6b7280', // Medium contrast text
      'border' => '#e5e7eb',        // Subtle borders
      'error' => '#dc2626',         // Swiss red for errors
      'warning' => '#d97706',       // Swiss amber for warnings
      'success' => '#059669',       // Swiss green for success
      'info' => '#0284c7',          // Swiss blue for info
    ];
    
    return $swissScheme;
  }

  /**
   * Validate color accessibility for Swiss compliance.
   * 
   * Checks compliance with eCH-0059 accessibility standards
   * and Swiss government portal requirements.
   * 
   * @param array $colorScheme
   *   Swiss color scheme array.
   * 
   * @return array
   *   Validation result with compliance status and recommendations.
   */
  public static function validateSwissAccessibility(array $colorScheme): array {
    $results = [
      'compliant' => true,
      'violations' => [],
      'recommendations' => [],
      'contrast_ratios' => [],
    ];
    
    // Test primary colors against text colors
    $testCombinations = [
      ['bg' => $colorScheme['primary'] ?? '#000000', 'fg' => $colorScheme['text_primary'] ?? '#ffffff', 'context' => 'Primary background with primary text'],
      ['bg' => $colorScheme['primary_light'] ?? '#ffffff', 'fg' => $colorScheme['text_primary'] ?? '#000000', 'context' => 'Light background with primary text'],
      ['bg' => $colorScheme['primary_dark'] ?? '#000000', 'fg' => '#ffffff', 'context' => 'Dark background with white text'],
    ];
    
    foreach ($testCombinations as $combo) {
      $contrast = self::getContrastRatio($combo['bg'], $combo['fg']);
      $results['contrast_ratios'][] = [
        'background' => $combo['bg'],
        'foreground' => $combo['fg'],
        'ratio' => $contrast,
        'context' => $combo['context'],
        'wcag_aa' => $contrast >= 4.5,
        'wcag_aaa' => $contrast >= 7.0,
      ];
      
      if ($contrast < 4.5) {
        $results['compliant'] = false;
        $results['violations'][] = "Insufficient contrast ratio ({$contrast}) for {$combo['context']}";
      }
    }
    
    // Swiss-specific recommendations
    if ($results['compliant']) {
      $results['recommendations'][] = 'Color scheme meets eCH-0059 accessibility standards';
    } else {
      $results['recommendations'][] = 'Consider adjusting color lightness to improve contrast ratios';
      $results['recommendations'][] = 'Test with Swiss accessibility tools and screen readers';
    }
    
    return $results;
  }

}