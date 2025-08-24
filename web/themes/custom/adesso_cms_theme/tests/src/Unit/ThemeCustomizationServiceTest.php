<?php

/**
 * @file
 * Unit tests for Theme Customization Service.
 */

declare(strict_types=1);

namespace Drupal\Tests\adesso_cms_theme\Unit;

use Drupal\adesso_cms_theme\Service\ThemeCustomizationService;
use Drupal\Tests\UnitTestCase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Cache\CacheBackendInterface;

/**
 * @coversDefaultClass \Drupal\adesso_cms_theme\Service\ThemeCustomizationService
 * @group adesso_cms_theme
 */
class ThemeCustomizationServiceTest extends UnitTestCase {

  /**
   * Mock cache backend.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface|\PHPUnit\Framework\MockObject\MockObject
   */
  protected $mockCache;

  /**
   * Theme customization service under test.
   *
   * @var \Drupal\adesso_cms_theme\Service\ThemeCustomizationService
   */
  protected $service;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    
    $this->mockCache = $this->createMock(CacheBackendInterface::class);
    $this->service = new ThemeCustomizationService($this->mockCache);
  }

  /**
   * Test theme settings validation.
   * 
   * @covers ::validateThemeSettings
   * @dataProvider themeSettingsValidationDataProvider
   */
  public function testValidateThemeSettings(array $settings, bool $expectedValid, array $expectedErrors = []): void {
    $result = $this->service->validateThemeSettings($settings);
    
    $this->assertEquals($expectedValid, $result['valid']);
    
    if (!$expectedValid) {
      $this->assertNotEmpty($result['errors']);
      foreach ($expectedErrors as $expectedError) {
        $this->assertContains($expectedError, $result['errors']);
      }
    }
  }

  /**
   * Test color palette caching.
   * 
   * @covers ::getColorPalette
   */
  public function testGetColorPaletteCaching(): void {
    $primaryColor = '#3b82f6';
    $expectedPalette = [
      50 => '#eff6ff',
      100 => '#dbeafe',
      500 => '#3b82f6',
      900 => '#1e3a8a',
    ];
    
    // Test cache miss - should generate palette
    $this->mockCache->expects($this->once())
      ->method('get')
      ->with($this->stringContains('adesso_cms_theme_palette_'))
      ->willReturn(FALSE);
    
    $this->mockCache->expects($this->once())
      ->method('set')
      ->with($this->stringContains('adesso_cms_theme_palette_'), $this->isType('array'));
    
    $palette = $this->service->getColorPalette($primaryColor);
    $this->assertIsArray($palette);
    $this->assertArrayHasKey(500, $palette);
    $this->assertEquals(strtolower($primaryColor), strtolower($palette[500]));
  }

  /**
   * Test CSS custom properties generation.
   * 
   * @covers ::generateCSSCustomProperties
   * @dataProvider cssCustomPropertiesDataProvider
   */
  public function testGenerateCSSCustomProperties(array $palette, string $fontFamily, array $expectedProperties): void {
    $properties = $this->service->generateCSSCustomProperties($palette, $fontFamily);
    
    $this->assertIsArray($properties);
    
    foreach ($expectedProperties as $property => $expectedValue) {
      $this->assertArrayHasKey($property, $properties);
      $this->assertEquals($expectedValue, $properties[$property]);
    }
  }

  /**
   * Test theme settings export functionality.
   * 
   * @covers ::exportThemeSettings
   */
  public function testExportThemeSettings(): void {
    $settings = [
      'typography' => ['google_font' => 'inter'],
      'branding' => ['primary_color' => '#3b82f6'],
    ];
    
    $exported = $this->service->exportThemeSettings($settings);
    
    $this->assertIsString($exported);
    $this->assertNotEmpty($exported);
    
    // Should be base64 encoded JSON
    $decoded = base64_decode($exported);
    $this->assertJson($decoded);
    
    $decodedData = json_decode($decoded, TRUE);
    $this->assertEquals($settings['typography'], $decodedData['typography']);
    $this->assertEquals($settings['branding'], $decodedData['branding']);
    $this->assertArrayHasKey('timestamp', $decodedData);
  }

  /**
   * Test theme settings import functionality.
   * 
   * @covers ::importThemeSettings
   */
  public function testImportThemeSettings(): void {
    $originalSettings = [
      'typography' => ['google_font' => 'crimson-text'],
      'branding' => ['primary_color' => '#dc2626'],
    ];
    
    $exported = $this->service->exportThemeSettings($originalSettings);
    $imported = $this->service->importThemeSettings($exported);
    
    $this->assertTrue($imported['success']);
    $this->assertEquals($originalSettings['typography'], $imported['settings']['typography']);
    $this->assertEquals($originalSettings['branding'], $imported['settings']['branding']);
  }

  /**
   * Test invalid import data handling.
   * 
   * @covers ::importThemeSettings
   */
  public function testInvalidImportData(): void {
    $result = $this->service->importThemeSettings('invalid_data');
    
    $this->assertFalse($result['success']);
    $this->assertNotEmpty($result['error']);
  }

  /**
   * Test municipality-specific preset loading.
   * 
   * @covers ::getMunicipalityPreset
   * @dataProvider municipalityPresetDataProvider
   */
  public function testGetMunicipalityPreset(string $municipality, array $expectedPreset): void {
    $preset = $this->service->getMunicipalityPreset($municipality);
    
    $this->assertIsArray($preset);
    $this->assertEquals($expectedPreset['typography']['google_font'], $preset['typography']['google_font']);
    $this->assertEquals($expectedPreset['branding']['primary_color'], $preset['branding']['primary_color']);
  }

  /**
   * Test accessibility validation integration.
   * 
   * @covers ::validateAccessibilityCompliance
   */
  public function testValidateAccessibilityCompliance(): void {
    $settings = [
      'branding' => ['primary_color' => '#3b82f6'],
      'typography' => ['google_font' => 'inter'],
    ];
    
    $result = $this->service->validateAccessibilityCompliance($settings);
    
    $this->assertIsArray($result);
    $this->assertArrayHasKey('wcag_aa_compliant', $result);
    $this->assertArrayHasKey('ech_0059_compliant', $result);
    $this->assertArrayHasKey('color_contrast_ratios', $result);
    $this->assertArrayHasKey('font_size_compliance', $result);
  }

  /**
   * Test performance impact assessment.
   * 
   * @covers ::assessPerformanceImpact
   */
  public function testAssessPerformanceImpact(): void {
    $settings = [
      'typography' => [
        'google_font' => 'inter',
        'custom_font_weights' => ['400', '500', '600', '700'],
      ],
      'branding' => ['primary_color' => '#3b82f6'],
    ];
    
    $assessment = $this->service->assessPerformanceImpact($settings);
    
    $this->assertIsArray($assessment);
    $this->assertArrayHasKey('estimated_load_time', $assessment);
    $this->assertArrayHasKey('font_loading_impact', $assessment);
    $this->assertArrayHasKey('css_generation_impact', $assessment);
    $this->assertArrayHasKey('cache_efficiency', $assessment);
    
    // Font loading should be optimized
    $this->assertLessThan(200, $assessment['font_loading_impact']); // ms
  }

  /**
   * Test theme settings reset functionality.
   * 
   * @covers ::resetToDefaults
   */
  public function testResetToDefaults(): void {
    $defaults = $this->service->resetToDefaults();
    
    $this->assertIsArray($defaults);
    $this->assertArrayHasKey('typography', $defaults);
    $this->assertArrayHasKey('branding', $defaults);
    
    // Should contain default values
    $this->assertEquals('inter', $defaults['typography']['google_font']);
    $this->assertMatchesRegularExpression('/^#[0-9a-f]{6}$/i', $defaults['branding']['primary_color']);
  }

  /**
   * Test multi-site compatibility.
   * 
   * @covers ::validateMultiSiteCompatibility
   */
  public function testValidateMultiSiteCompatibility(): void {
    $settings = [
      'typography' => ['google_font' => 'inter'],
      'branding' => ['primary_color' => '#3b82f6'],
    ];
    
    $sites = ['thalwil', 'thalheim', 'erlenbach', 'default'];
    
    foreach ($sites as $site) {
      $compatibility = $this->service->validateMultiSiteCompatibility($settings, $site);
      
      $this->assertIsArray($compatibility);
      $this->assertArrayHasKey('compatible', $compatibility);
      $this->assertArrayHasKey('conflicts', $compatibility);
      $this->assertArrayHasKey('recommendations', $compatibility);
    }
  }

  /**
   * Test live preview generation.
   * 
   * @covers ::generateLivePreview
   */
  public function testGenerateLivePreview(): void {
    $settings = [
      'typography' => ['google_font' => 'inter'],
      'branding' => ['primary_color' => '#3b82f6'],
    ];
    
    $preview = $this->service->generateLivePreview($settings);
    
    $this->assertIsArray($preview);
    $this->assertArrayHasKey('css_variables', $preview);
    $this->assertArrayHasKey('font_links', $preview);
    $this->assertArrayHasKey('preview_html', $preview);
    
    // CSS variables should be properly formatted
    $this->assertStringContainsString('--color-primary:', $preview['css_variables']);
    $this->assertStringContainsString('--font-primary:', $preview['css_variables']);
  }

  /**
   * Data provider for theme settings validation tests.
   */
  public function themeSettingsValidationDataProvider(): array {
    return [
      'Valid settings' => [
        [
          'typography' => ['google_font' => 'inter'],
          'branding' => ['primary_color' => '#3b82f6'],
        ],
        TRUE,
      ],
      'Invalid color format' => [
        [
          'typography' => ['google_font' => 'inter'],
          'branding' => ['primary_color' => 'invalid-color'],
        ],
        FALSE,
        ['Invalid color format'],
      ],
      'Invalid font' => [
        [
          'typography' => ['google_font' => 'invalid-font'],
          'branding' => ['primary_color' => '#3b82f6'],
        ],
        FALSE,
        ['Invalid font selection'],
      ],
      'Missing required fields' => [
        [
          'typography' => [],
          'branding' => [],
        ],
        FALSE,
        ['Missing required typography settings', 'Missing required branding settings'],
      ],
    ];
  }

  /**
   * Data provider for CSS custom properties generation tests.
   */
  public function cssCustomPropertiesDataProvider(): array {
    return [
      'Blue palette with Inter' => [
        [
          50 => '#eff6ff',
          500 => '#3b82f6',
          900 => '#1e3a8a',
        ],
        "'Inter', sans-serif",
        [
          '--color-primary' => '#3b82f6',
          '--color-primary-50' => '#eff6ff',
          '--color-primary-500' => '#3b82f6',
          '--color-primary-900' => '#1e3a8a',
          '--font-primary' => "'Inter', sans-serif",
        ],
      ],
    ];
  }

  /**
   * Data provider for municipality preset tests.
   */
  public function municipalityPresetDataProvider(): array {
    return [
      'Thalwil - Modern Tech' => [
        'thalwil',
        [
          'typography' => ['google_font' => 'inter'],
          'branding' => ['primary_color' => '#1e3a8a'], // Blue theme
        ],
      ],
      'Thalheim - Traditional Wine' => [
        'thalheim',
        [
          'typography' => ['google_font' => 'crimson-text'],
          'branding' => ['primary_color' => '#15803d'], // Green theme
        ],
      ],
      'Erlenbach - Sophisticated Goldküste' => [
        'erlenbach',
        [
          'typography' => ['google_font' => 'playfair-display'],
          'branding' => ['primary_color' => '#0891b2'], // Turquoise theme
        ],
      ],
      'Default - Universal' => [
        'default',
        [
          'typography' => ['google_font' => 'open-sans'],
          'branding' => ['primary_color' => '#3b82f6'], // Default blue
        ],
      ],
    ];
  }

  /**
   * Test edge cases and error handling.
   */
  public function testEdgeCasesAndErrorHandling(): void {
    // Test with null input
    $result = $this->service->validateThemeSettings(NULL);
    $this->assertFalse($result['valid']);
    
    // Test with empty array
    $result = $this->service->validateThemeSettings([]);
    $this->assertFalse($result['valid']);
    
    // Test color palette with invalid color
    $this->expectException(\InvalidArgumentException::class);
    $this->service->getColorPalette('invalid-color');
  }

  /**
   * Test cache invalidation.
   * 
   * @covers ::clearPaletteCache
   */
  public function testCacheClearance(): void {
    $this->mockCache->expects($this->once())
      ->method('deleteMultiple')
      ->with($this->callback(function($cids) {
        return is_array($cids) && !empty($cids);
      }));
    
    $this->service->clearPaletteCache();
  }

  /**
   * Test Swiss localization support.
   * 
   * @covers ::validateSwissLocalization
   */
  public function testValidateSwissLocalization(): void {
    $settings = [
      'typography' => ['google_font' => 'inter'],
      'branding' => ['primary_color' => '#dc143c'], // Swiss red
    ];
    
    $validation = $this->service->validateSwissLocalization($settings);
    
    $this->assertIsArray($validation);
    $this->assertArrayHasKey('character_support', $validation);
    $this->assertArrayHasKey('language_compatibility', $validation);
    
    // Should support Swiss German characters (ä, ö, ü, ß)
    $this->assertTrue($validation['character_support']['swiss_german']);
    $this->assertTrue($validation['character_support']['french_accents']);
    $this->assertTrue($validation['character_support']['italian_accents']);
  }

}