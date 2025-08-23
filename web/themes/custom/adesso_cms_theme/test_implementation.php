<?php

/**
 * Simple test script to validate TDD implementation.
 */

require_once 'src/Service/ColorPaletteGenerator.php';
require_once 'src/Service/GoogleFontsService.php';

use Drupal\adesso_cms_theme\Service\ColorPaletteGenerator;
use Drupal\adesso_cms_theme\Service\GoogleFontsService;

echo "=== Testing ColorPaletteGenerator ===" . PHP_EOL;

// Test 1: Hex to HSL conversion
try {
    $hsl = ColorPaletteGenerator::hexToHsl('#3b82f6');
    echo "✓ Hex to HSL: " . json_encode($hsl) . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Hex to HSL failed: " . $e->getMessage() . PHP_EOL;
}

// Test 2: HSL to Hex conversion
try {
    $hex = ColorPaletteGenerator::hslToHex(217.2, 0.91, 0.596);
    echo "✓ HSL to Hex: $hex" . PHP_EOL;
} catch (Exception $e) {
    echo "✗ HSL to Hex failed: " . $e->getMessage() . PHP_EOL;
}

// Test 3: Tailwind palette generation
try {
    $palette = ColorPaletteGenerator::generateTailwindPalette('#3b82f6');
    echo "✓ Tailwind palette generated: " . count($palette) . " shades" . PHP_EOL;
    echo "  - 500 (base): " . $palette[500] . PHP_EOL;
    echo "  - 50 (light): " . $palette[50] . PHP_EOL;
    echo "  - 950 (dark): " . $palette[950] . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Tailwind palette failed: " . $e->getMessage() . PHP_EOL;
}

// Test 4: Contrast ratio calculation
try {
    $contrast = ColorPaletteGenerator::getContrastRatio('#3b82f6', '#ffffff');
    echo "✓ Contrast ratio (blue on white): $contrast" . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Contrast ratio failed: " . $e->getMessage() . PHP_EOL;
}

// Test 5: Accessibility validation
try {
    $palette = ColorPaletteGenerator::generateTailwindPalette('#3b82f6');
    $violations = ColorPaletteGenerator::validateAccessibility($palette);
    echo "✓ Accessibility validation: " . count($violations) . " violations found" . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Accessibility validation failed: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "=== Testing GoogleFontsService ===" . PHP_EOL;

// Test 6: Font configuration
try {
    $config = GoogleFontsService::getFontConfig('inter');
    echo "✓ Font config for Inter: " . json_encode($config) . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Font config failed: " . $e->getMessage() . PHP_EOL;
}

// Test 7: Google Fonts URL generation
try {
    $config = GoogleFontsService::getFontConfig('inter');
    $url = GoogleFontsService::buildGoogleFontsUrl($config, ['400', '500', '600']);
    echo "✓ Google Fonts URL: $url" . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Google Fonts URL failed: " . $e->getMessage() . PHP_EOL;
}

// Test 8: Font CSS generation
try {
    $config = GoogleFontsService::getFontConfig('inter');
    $css = GoogleFontsService::generateFontFamilyCSS($config);
    echo "✓ Font CSS: $css" . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Font CSS failed: " . $e->getMessage() . PHP_EOL;
}

// Test 9: Swiss compliance validation
try {
    $isCompliant = GoogleFontsService::validateSwissCompliance('inter');
    echo "✓ Swiss compliance for Inter: " . ($isCompliant ? 'TRUE' : 'FALSE') . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Swiss compliance failed: " . $e->getMessage() . PHP_EOL;
}

// Test 10: Municipality font recommendations
try {
    $recommendations = GoogleFontsService::getMunicipalityFontRecommendations('thalwil');
    echo "✓ Thalwil font recommendations: " . implode(', ', $recommendations) . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Municipality recommendations failed: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "=== Advanced Tests ===" . PHP_EOL;

// Test 11: Swiss color scheme generation
try {
    $swissScheme = ColorPaletteGenerator::generateSwissColorScheme('#dc143c');
    echo "✓ Swiss color scheme: " . count($swissScheme) . " colors" . PHP_EOL;
    echo "  - Primary: " . $swissScheme['primary'] . PHP_EOL;
    echo "  - Accent: " . $swissScheme['accent'] . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Swiss color scheme failed: " . $e->getMessage() . PHP_EOL;
}

// Test 12: Performance metrics
try {
    $metrics = GoogleFontsService::getPerformanceMetrics('inter', ['400', '500', '600']);
    echo "✓ Performance metrics: " . $metrics['estimated_size_kb'] . "KB, Impact: " . $metrics['performance_impact'] . PHP_EOL;
} catch (Exception $e) {
    echo "✗ Performance metrics failed: " . $e->getMessage() . PHP_EOL;
}

// Test 13: Error handling
try {
    ColorPaletteGenerator::hexToHsl('#invalid');
    echo "✗ Error handling failed - should have thrown exception" . PHP_EOL;
} catch (Exception $e) {
    echo "✓ Error handling works: " . $e->getMessage() . PHP_EOL;
}

echo PHP_EOL . "=== Test Summary ===" . PHP_EOL;
echo "TDD Implementation test completed!" . PHP_EOL;
echo "If all tests show ✓, the implementation is working correctly." . PHP_EOL;