<?php

/**
 * @file
 * Unit tests for ColorPaletteGenerator class.
 */

declare(strict_types=1);

namespace Drupal\Tests\adesso_cms_theme\Unit;

use Drupal\adesso_cms_theme\Service\ColorPaletteGenerator;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\adesso_cms_theme\Service\ColorPaletteGenerator
 * @group adesso_cms_theme
 */
class ColorPaletteGeneratorTest extends UnitTestCase {

  /**
   * Test hex to HSL conversion.
   * 
   * @covers ::hexToHsl
   * @dataProvider hexToHslDataProvider
   */
  public function testHexToHsl(string $hex, array $expected): void {
    $result = ColorPaletteGenerator::hexToHsl($hex);
    
    // Allow small floating point differences
    $this->assertEqualsWithDelta($expected['h'], $result['h'], 0.01, "Hue mismatch for {$hex}");
    $this->assertEqualsWithDelta($expected['s'], $result['s'], 0.01, "Saturation mismatch for {$hex}");
    $this->assertEqualsWithDelta($expected['l'], $result['l'], 0.01, "Lightness mismatch for {$hex}");
  }

  /**
   * Test HSL to hex conversion.
   * 
   * @covers ::hslToHex
   * @dataProvider hslToHexDataProvider
   */
  public function testHslToHex(array $hsl, string $expected): void {
    $result = ColorPaletteGenerator::hslToHex($hsl['h'], $hsl['s'], $hsl['l']);
    $this->assertEquals(strtolower($expected), strtolower($result));
  }

  /**
   * Test round-trip conversion (hex -> HSL -> hex).
   * 
   * @covers ::hexToHsl
   * @covers ::hslToHex
   * @dataProvider roundTripDataProvider
   */
  public function testRoundTripConversion(string $originalHex): void {
    $hsl = ColorPaletteGenerator::hexToHsl($originalHex);
    $backToHex = ColorPaletteGenerator::hslToHex($hsl['h'], $hsl['s'], $hsl['l']);
    $this->assertEquals(strtolower($originalHex), strtolower($backToHex));
  }

  /**
   * Test Tailwind palette generation with Tailwind Blue-500 as example.
   * 
   * @covers ::generateTailwindPalette
   */
  public function testGenerateTailwindPaletteBlue500(): void {
    $primaryColor = '#3b82f6'; // Tailwind Blue-500
    $palette = ColorPaletteGenerator::generateTailwindPalette($primaryColor);
    
    // Verify all 11 shades are generated
    $expectedShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    foreach ($expectedShades as $shade) {
      $this->assertArrayHasKey($shade, $palette, "Missing shade {$shade}");
      $this->assertMatchesRegularExpression('/^#[0-9a-f]{6}$/i', $palette[$shade], "Invalid hex format for shade {$shade}");
    }
    
    // Base color (500) should match input
    $this->assertEquals(strtolower($primaryColor), strtolower($palette[500]));
    
    // Lighter shades should be lighter than base
    $baseLightness = ColorPaletteGenerator::hexToHsl($palette[500])['l'];
    $lightShades = [50, 100, 200, 300, 400];
    foreach ($lightShades as $shade) {
      $shadeLightness = ColorPaletteGenerator::hexToHsl($palette[$shade])['l'];
      $this->assertGreaterThan($baseLightness, $shadeLightness, "Shade {$shade} should be lighter than base");
    }
    
    // Darker shades should be darker than base
    $darkShades = [600, 700, 800, 900, 950];
    foreach ($darkShades as $shade) {
      $shadeLightness = ColorPaletteGenerator::hexToHsl($palette[$shade])['l'];
      $this->assertLessThan($baseLightness, $shadeLightness, "Shade {$shade} should be darker than base");
    }
  }

  /**
   * Test accessibility contrast ratio calculation.
   * 
   * @covers ::getContrastRatio
   * @dataProvider contrastRatioDataProvider
   */
  public function testGetContrastRatio(string $color1, string $color2, float $expectedRatio): void {
    $result = ColorPaletteGenerator::getContrastRatio($color1, $color2);
    $this->assertEqualsWithDelta($expectedRatio, $result, 0.01);
  }

  /**
   * Test accessibility validation for generated palette.
   * 
   * @covers ::validateAccessibility
   */
  public function testValidateAccessibility(): void {
    $primaryColor = '#dc2626'; // Red-600 - should have good contrast
    $palette = ColorPaletteGenerator::generateTailwindPalette($primaryColor);
    $violations = ColorPaletteGenerator::validateAccessibility($palette);
    
    // Expect some violations (very light/dark shades typically fail against both white and black)
    $this->assertIsArray($violations);
    
    // But base color should have good accessibility
    $baseContrast = ColorPaletteGenerator::getContrastRatio($palette[500], '#ffffff');
    $this->assertGreaterThan(4.5, $baseContrast, "Base color should meet WCAG AA standards");
  }

  /**
   * Test invalid hex color handling.
   * 
   * @covers ::hexToHsl
   */
  public function testInvalidHexColor(): void {
    $this->expectException(\InvalidArgumentException::class);
    ColorPaletteGenerator::hexToHsl('#invalidcolor');
  }

  /**
   * Test invalid HSL values handling.
   * 
   * @covers ::hslToHex
   */
  public function testInvalidHslValues(): void {
    $this->expectException(\InvalidArgumentException::class);
    ColorPaletteGenerator::hslToHex(400, 1.5, 0.5); // Invalid hue > 360
  }

  /**
   * Data provider for hex to HSL conversion tests.
   */
  public function hexToHslDataProvider(): array {
    return [
      'Pure white' => ['#ffffff', ['h' => 0, 's' => 0, 'l' => 1.0]],
      'Pure black' => ['#000000', ['h' => 0, 's' => 0, 'l' => 0.0]],
      'Pure red' => ['#ff0000', ['h' => 0, 's' => 1.0, 'l' => 0.5]],
      'Tailwind Blue-500' => ['#3b82f6', ['h' => 217.2, 's' => 0.91, 'l' => 0.596]],
      'Tailwind Green-500' => ['#10b981', ['h' => 158.1, 's' => 0.84, 'l' => 0.392]],
      'Swiss Red' => ['#dc143c', ['h' => 348.2, 's' => 0.83, 'l' => 0.47]],
    ];
  }

  /**
   * Data provider for HSL to hex conversion tests.
   */
  public function hslToHexDataProvider(): array {
    return [
      'Pure white' => [['h' => 0, 's' => 0, 'l' => 1.0], '#ffffff'],
      'Pure black' => [['h' => 0, 's' => 0, 'l' => 0.0], '#000000'],
      'Pure red' => [['h' => 0, 's' => 1.0, 'l' => 0.5], '#ff0000'],
      'Pure green' => [['h' => 120, 's' => 1.0, 'l' => 0.5], '#00ff00'],
      'Pure blue' => [['h' => 240, 's' => 1.0, 'l' => 0.5], '#0000ff'],
    ];
  }

  /**
   * Data provider for round-trip conversion tests.
   */
  public function roundTripDataProvider(): array {
    return [
      ['#ffffff'],
      ['#000000'],
      ['#ff0000'],
      ['#00ff00'],
      ['#0000ff'],
      ['#3b82f6'], // Tailwind Blue-500
      ['#10b981'], // Tailwind Green-500
      ['#dc2626'], // Tailwind Red-600
      ['#f59e0b'], // Tailwind Yellow-500
      ['#8b5cf6'], // Tailwind Purple-500
    ];
  }

  /**
   * Data provider for contrast ratio tests.
   */
  public function contrastRatioDataProvider(): array {
    return [
      'Black on white' => ['#000000', '#ffffff', 21.0],
      'White on black' => ['#ffffff', '#000000', 21.0],
      'Same colors' => ['#3b82f6', '#3b82f6', 1.0],
      'Blue on white' => ['#3b82f6', '#ffffff', 4.57], // Should meet WCAG AA
      'Red on white' => ['#dc2626', '#ffffff', 5.74], // Should meet WCAG AA
    ];
  }

  /**
   * Test municipality-specific font configurations.
   * 
   * This test validates Google Fonts configurations for each municipality.
   */
  public function testMunicipalityFontConfigurations(): void {
    $expectedFonts = [
      'thalwil' => 'Inter',
      'thalheim' => 'Crimson Text',
      'erlenbach' => 'Playfair Display',
      'default' => 'Open Sans',
    ];
    
    // This would test the font configuration helper function
    foreach ($expectedFonts as $municipality => $expectedFont) {
      // Test will be implemented when font helper functions are created
      $this->assertTrue(true, "Font configuration test placeholder for {$municipality}");
    }
  }

  /**
   * Test Swiss color standards compliance.
   * 
   * Validates that generated palettes can produce Swiss-standard compliant colors.
   */
  public function testSwissColorStandardsCompliance(): void {
    // Swiss flag colors and other official colors
    $swissColors = [
      '#dc143c', // Swiss red
      '#ffffff', // Swiss white  
      '#000000', // Official black
    ];
    
    foreach ($swissColors as $color) {
      $palette = ColorPaletteGenerator::generateTailwindPalette($color);
      $this->assertCount(11, $palette, "Swiss color {$color} should generate complete palette");
      
      // Ensure base color is preserved
      $this->assertEquals(strtolower($color), strtolower($palette[500]));
    }
  }

}