<?php

/**
 * @file
 * Unit tests for Google Fonts Integration.
 */

declare(strict_types=1);

namespace Drupal\Tests\adesso_cms_theme\Unit;

use Drupal\adesso_cms_theme\Service\GoogleFontsService;
use Drupal\Tests\UnitTestCase;

/**
 * @coversDefaultClass \Drupal\adesso_cms_theme\Service\GoogleFontsService
 * @group adesso_cms_theme
 */
class GoogleFontsIntegrationTest extends UnitTestCase {

  /**
   * Test font configuration data structure.
   * 
   * @covers ::getFontConfig
   * @dataProvider fontConfigDataProvider
   */
  public function testGetFontConfig(string $fontKey, array $expectedConfig): void {
    $config = GoogleFontsService::getFontConfig($fontKey);
    
    $this->assertEquals($expectedConfig['family'], $config['family']);
    $this->assertEquals($expectedConfig['fallback'], $config['fallback']);
    $this->assertEquals($expectedConfig['display'], $config['display']);
    $this->assertEquals($expectedConfig['municipality'], $config['municipality']);
    
    $this->assertIsString($config['family']);
    $this->assertIsString($config['fallback']);
    $this->assertIsString($config['display']);
    $this->assertIsString($config['municipality']);
  }

  /**
   * Test Google Fonts API URL generation.
   * 
   * @covers ::buildGoogleFontsUrl
   * @dataProvider googleFontsUrlDataProvider
   */
  public function testBuildGoogleFontsUrl(array $fontConfig, array $weights, string $expectedUrlPattern): void {
    $url = GoogleFontsService::buildGoogleFontsUrl($fontConfig, $weights);
    
    $this->assertStringContainsString('https://fonts.googleapis.com/css2', $url);
    $this->assertStringContainsString('family=' . $fontConfig['family'], $url);
    $this->assertStringContainsString('display=swap', $url);
    
    // Check that all weights are included
    foreach ($weights as $weight) {
      $this->assertStringContainsString($weight, $url);
    }
  }

  /**
   * Test CSS font family generation.
   * 
   * @covers ::generateFontFamilyCSS
   * @dataProvider fontFamilyCSSDataProvider
   */
  public function testGenerateFontFamilyCSS(array $fontConfig, string $expectedCSS): void {
    $css = GoogleFontsService::generateFontFamilyCSS($fontConfig);
    
    $this->assertStringContainsString($expectedCSS, $css);
    $this->assertStringContainsString($fontConfig['fallback'], $css);
  }

  /**
   * Test font validation for Swiss compliance.
   * 
   * @covers ::validateSwissCompliance
   * @dataProvider swissComplianceDataProvider
   */
  public function testValidateSwissCompliance(string $fontKey, bool $expectedCompliance): void {
    $isCompliant = GoogleFontsService::validateSwissCompliance($fontKey);
    
    $this->assertEquals($expectedCompliance, $isCompliant);
  }

  /**
   * Test municipality-specific font recommendations.
   * 
   * @covers ::getMunicipalityFontRecommendations
   * @dataProvider municipalityFontRecommendationsDataProvider
   */
  public function testGetMunicipalityFontRecommendations(string $municipality, array $expectedFonts): void {
    $recommendations = GoogleFontsService::getMunicipalityFontRecommendations($municipality);
    
    $this->assertIsArray($recommendations);
    $this->assertEquals($expectedFonts, $recommendations);
  }

  /**
   * Test font loading performance optimization.
   * 
   * @covers ::generatePreloadLinks
   */
  public function testGeneratePreloadLinks(): void {
    $fontConfig = GoogleFontsService::getFontConfig('inter');
    $weights = ['400', '500', '600', '700'];
    $preloadLinks = GoogleFontsService::generatePreloadLinks($fontConfig, $weights);
    
    $this->assertIsArray($preloadLinks);
    $this->assertNotEmpty($preloadLinks);
    
    // Check for DNS prefetch links
    $this->assertArrayHasKey('dns_prefetch', $preloadLinks);
    $this->assertArrayHasKey('preconnect', $preloadLinks);
    
    // Validate link structures
    foreach ($preloadLinks['dns_prefetch'] as $link) {
      $this->assertArrayHasKey('href', $link);
      $this->assertArrayHasKey('rel', $link);
      $this->assertEquals('dns-prefetch', $link['rel']);
    }
  }

  /**
   * Test font weight validation.
   * 
   * @covers ::validateFontWeights
   * @dataProvider fontWeightValidationDataProvider
   */
  public function testValidateFontWeights(array $weights, bool $expectedValid): void {
    $isValid = GoogleFontsService::validateFontWeights($weights);
    
    $this->assertEquals($expectedValid, $isValid);
  }

  /**
   * Test fallback font generation for offline scenarios.
   * 
   * @covers ::generateFallbackFonts
   * @dataProvider fallbackFontDataProvider
   */
  public function testGenerateFallbackFonts(string $fontKey, array $expectedFallbacks): void {
    $fallbacks = GoogleFontsService::generateFallbackFonts($fontKey);
    
    $this->assertIsArray($fallbacks);
    $this->assertEquals($expectedFallbacks, $fallbacks);
  }

  /**
   * Test invalid font key handling.
   * 
   * @covers ::getFontConfig
   */
  public function testInvalidFontKey(): void {
    // Should return default font when invalid key provided
    $config = GoogleFontsService::getFontConfig('invalid_font_key');
    $defaultConfig = GoogleFontsService::getFontConfig('inter');
    
    $this->assertEquals($defaultConfig, $config);
  }

  /**
   * Data provider for font configuration tests.
   */
  public function fontConfigDataProvider(): array {
    return [
      'Inter - Thalwil Modern' => [
        'inter',
        [
          'family' => 'Inter',
          'fallback' => 'sans-serif',
          'display' => 'swap',
          'municipality' => 'thalwil',
        ],
      ],
      'Crimson Text - Thalheim Traditional' => [
        'crimson-text',
        [
          'family' => 'Crimson+Text',
          'fallback' => 'serif',
          'display' => 'swap',
          'municipality' => 'thalheim',
        ],
      ],
      'Playfair Display - Erlenbach Sophisticated' => [
        'playfair-display',
        [
          'family' => 'Playfair+Display',
          'fallback' => 'serif',
          'display' => 'swap',
          'municipality' => 'erlenbach',
        ],
      ],
      'Open Sans - Default Universal' => [
        'open-sans',
        [
          'family' => 'Open+Sans',
          'fallback' => 'sans-serif',
          'display' => 'swap',
          'municipality' => 'default',
        ],
      ],
      'Montserrat - Swiss Contemporary' => [
        'montserrat',
        [
          'family' => 'Montserrat',
          'fallback' => 'sans-serif',
          'display' => 'swap',
          'municipality' => 'default',
        ],
      ],
    ];
  }

  /**
   * Data provider for Google Fonts URL generation tests.
   */
  public function googleFontsUrlDataProvider(): array {
    return [
      'Inter with multiple weights' => [
        ['family' => 'Inter', 'display' => 'swap'],
        ['400', '500', '600', '700'],
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      ],
      'Single weight font' => [
        ['family' => 'Open+Sans', 'display' => 'swap'],
        ['400'],
        'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap',
      ],
    ];
  }

  /**
   * Data provider for font family CSS generation tests.
   */
  public function fontFamilyCSSDataProvider(): array {
    return [
      'Inter sans-serif' => [
        ['family' => 'Inter', 'fallback' => 'sans-serif'],
        "'Inter', sans-serif",
      ],
      'Crimson Text serif' => [
        ['family' => 'Crimson Text', 'fallback' => 'serif'],
        "'Crimson Text', serif",
      ],
      'Playfair Display serif' => [
        ['family' => 'Playfair Display', 'fallback' => 'serif'],
        "'Playfair Display', serif",
      ],
    ];
  }

  /**
   * Data provider for Swiss compliance validation tests.
   */
  public function swissComplianceDataProvider(): array {
    return [
      'Inter - Compliant' => ['inter', true],
      'Crimson Text - Compliant' => ['crimson-text', true],
      'Playfair Display - Compliant' => ['playfair-display', true],
      'Open Sans - Compliant' => ['open-sans', true],
      'Montserrat - Compliant' => ['montserrat', true],
      'Invalid font - Non-compliant' => ['comic-sans', false],
    ];
  }

  /**
   * Data provider for municipality font recommendations.
   */
  public function municipalityFontRecommendationsDataProvider(): array {
    return [
      'Thalwil - Modern Tech' => [
        'thalwil',
        ['inter', 'montserrat', 'open-sans'],
      ],
      'Thalheim - Traditional Wine' => [
        'thalheim',
        ['crimson-text', 'playfair-display', 'open-sans'],
      ],
      'Erlenbach - Sophisticated Goldküste' => [
        'erlenbach',
        ['playfair-display', 'crimson-text', 'montserrat'],
      ],
      'Default - Universal' => [
        'default',
        ['open-sans', 'inter', 'montserrat'],
      ],
    ];
  }

  /**
   * Data provider for font weight validation tests.
   */
  public function fontWeightValidationDataProvider(): array {
    return [
      'Valid standard weights' => [['400', '500', '600', '700'], true],
      'Valid single weight' => [['400'], true],
      'Valid extended weights' => [['300', '400', '500', '600', '700', '800'], true],
      'Invalid weight values' => [['350', '450'], false],
      'Empty weights array' => [[], false],
      'Invalid weight format' => [['normal', 'bold'], false],
    ];
  }

  /**
   * Data provider for fallback font generation tests.
   */
  public function fallbackFontDataProvider(): array {
    return [
      'Inter fallbacks' => [
        'inter',
        ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      ],
      'Crimson Text fallbacks' => [
        'crimson-text',
        ['Georgia', 'Times New Roman', 'Times', 'serif'],
      ],
      'Playfair Display fallbacks' => [
        'playfair-display',
        ['Georgia', 'Times New Roman', 'Times', 'serif'],
      ],
      'Open Sans fallbacks' => [
        'open-sans',
        ['Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
      ],
      'Montserrat fallbacks' => [
        'montserrat',
        ['Helvetica Neue', 'Arial', 'Helvetica', 'sans-serif'],
      ],
    ];
  }

  /**
   * Test font loading performance metrics.
   * 
   * Validates that font loading doesn't exceed performance budgets.
   */
  public function testFontLoadingPerformance(): void {
    $fontConfig = GoogleFontsService::getFontConfig('inter');
    $weights = ['400', '500', '600', '700'];
    $url = GoogleFontsService::buildGoogleFontsUrl($fontConfig, $weights);
    
    // URL should not be excessively long (performance consideration)
    $this->assertLessThan(500, strlen($url), 'Google Fonts URL should be optimized for performance');
    
    // Should include display=swap for performance
    $this->assertStringContainsString('display=swap', $url);
  }

  /**
   * Test font licensing compliance for Swiss government use.
   * 
   * Validates that all selected fonts have appropriate licensing.
   */
  public function testFontLicensingCompliance(): void {
    $supportedFonts = ['inter', 'crimson-text', 'playfair-display', 'open-sans', 'montserrat'];
    
    foreach ($supportedFonts as $fontKey) {
      $isLicensed = GoogleFontsService::validateGovernmentLicensing($fontKey);
      $this->assertTrue($isLicensed, "Font {$fontKey} should be licensed for government use");
    }
  }

}