<?php

namespace Drupal\Tests\adesso_cms_theme\Unit;

use Drupal\adesso_cms_theme\Plugin\Block\PageHeaderBlock;
use Drupal\adesso_cms_theme\Service\PageHeaderContextService;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\ImmutableConfig;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Tests\UnitTestCase;

/**
 * Unit tests for PageHeaderBlock.
 *
 * @coversDefaultClass \Drupal\adesso_cms_theme\Plugin\Block\PageHeaderBlock
 * @group adesso_cms_theme
 */
class PageHeaderBlockTest extends UnitTestCase {

  /**
   * The page header context service mock.
   *
   * @var \Drupal\adesso_cms_theme\Service\PageHeaderContextService|\PHPUnit\Framework\MockObject\MockObject
   */
  protected $headerContext;

  /**
   * The route match mock.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface|\PHPUnit\Framework\MockObject\MockObject
   */
  protected $routeMatch;

  /**
   * The config factory mock.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface|\PHPUnit\Framework\MockObject\MockObject
   */
  protected $configFactory;

  /**
   * The block plugin under test.
   *
   * @var \Drupal\adesso_cms_theme\Plugin\Block\PageHeaderBlock
   */
  protected $block;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    $this->headerContext = $this->createMock(PageHeaderContextService::class);
    $this->routeMatch = $this->createMock(RouteMatchInterface::class);
    $this->configFactory = $this->createMock(ConfigFactoryInterface::class);

    $configuration = [];
    $plugin_id = 'adesso_cms_page_header';
    $plugin_definition = [
      'admin_label' => 'Page Header',
      'category' => 'Site Layout',
    ];

    $this->block = new PageHeaderBlock(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $this->headerContext,
      $this->routeMatch,
      $this->configFactory
    );
  }

  /**
   * @covers ::defaultConfiguration
   */
  public function testDefaultConfiguration() {
    $config = $this->block->defaultConfiguration();

    $expected_keys = [
      'header_variant',
      'title_source',
      'title_custom',
      'description_source',
      'description_custom',
      'background_image_source',
      'background_image_custom',
      'background_image_alt',
      'include_navigation',
      'navigation_variant',
      'custom_css_classes',
      'override_admin_toolbar_margins',
    ];

    foreach ($expected_keys as $key) {
      $this->assertArrayHasKey($key, $config);
    }

    $this->assertEquals('auto', $config['header_variant']);
    $this->assertEquals('auto', $config['title_source']);
    $this->assertEquals(FALSE, $config['include_navigation']);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithAutoConfiguration() {
    // Mock header context service
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(FALSE);

    $header_data = [
      'title' => 'Test Page',
      'description' => 'Test description',
      'background_image' => 'https://example.com/image.jpg',
      'background_alt' => 'Test alt',
      'content_type' => 'page',
      'is_landing_page' => FALSE,
    ];

    $this->headerContext->method('extractHeaderData')
      ->willReturn($header_data);

    // Mock config factory
    $site_config = $this->createMock(ImmutableConfig::class);
    $site_config->method('get')->with('name')->willReturn('Test Site');

    $this->configFactory->method('get')
      ->willReturnMap([
        ['system.site', $site_config],
        ['adesso_cms_theme.settings', $this->createMock(ImmutableConfig::class)],
      ]);

    $result = $this->block->build();

    $this->assertEquals('component', $result['#type']);
    $this->assertEquals('adesso_cms_theme:page-header', $result['#component']);
    $this->assertArrayHasKey('#props', $result);
    $this->assertArrayHasKey('#cache', $result);

    // Test props
    $props = $result['#props'];
    $this->assertEquals('default', $props['variant']);
    $this->assertEquals('Test Page', $props['title']);
    $this->assertEquals('Test description', $props['description']);
    $this->assertEquals('https://example.com/image.jpg', $props['background_image']);
    $this->assertEquals(FALSE, $props['includes_navigation']);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithLandingPageAutoDetection() {
    // Mock header context service
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(FALSE);

    $header_data = [
      'title' => 'Landing Page',
      'description' => 'Welcome to our site',
      'background_image' => 'https://example.com/hero.jpg',
      'background_alt' => 'Hero image',
      'content_type' => 'landing_page',
      'is_landing_page' => TRUE,
    ];

    $this->headerContext->method('extractHeaderData')
      ->willReturn($header_data);

    // Mock config factory
    $site_config = $this->createMock(ImmutableConfig::class);
    $this->configFactory->method('get')
      ->willReturnMap([
        ['system.site', $site_config],
        ['adesso_cms_theme.settings', $this->createMock(ImmutableConfig::class)],
      ]);

    $result = $this->block->build();

    $props = $result['#props'];
    $this->assertEquals('landing', $props['variant']);
    $this->assertEquals('Landing Page', $props['title']);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithCustomConfiguration() {
    // Set custom configuration
    $configuration = [
      'header_variant' => 'hero',
      'title_source' => 'custom',
      'title_custom' => 'Custom Title',
      'description_source' => 'custom',
      'description_custom' => 'Custom description',
      'background_image_source' => 'none',
      'include_navigation' => TRUE,
      'custom_css_classes' => 'my-custom-class',
    ];

    $this->block->setConfiguration($configuration);

    // Mock header context service
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(FALSE);

    $header_data = [
      'title' => 'Original Title',
      'description' => 'Original description',
      'background_image' => 'https://example.com/image.jpg',
      'background_alt' => 'Original alt',
      'content_type' => 'page',
      'is_landing_page' => FALSE,
    ];

    $this->headerContext->method('extractHeaderData')
      ->willReturn($header_data);

    // Mock config factory
    $site_config = $this->createMock(ImmutableConfig::class);
    $site_config->method('get')->with('name')->willReturn('Test Site');

    $this->configFactory->method('get')
      ->willReturnMap([
        ['system.site', $site_config],
        ['adesso_cms_theme.settings', $this->createMock(ImmutableConfig::class)],
      ]);

    $result = $this->block->build();

    $props = $result['#props'];
    $this->assertEquals('hero', $props['variant']);
    $this->assertEquals('Custom Title', $props['title']);
    $this->assertEquals('Custom description', $props['description']);
    $this->assertEquals('', $props['background_image']); // none selected
    $this->assertEquals(TRUE, $props['includes_navigation']);
    $this->assertEquals('my-custom-class', $props['modifier']);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithHeaderExclusion() {
    // Mock header context to exclude headers
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(TRUE);

    $result = $this->block->build();

    $this->assertArrayHasKey('#cache', $result);
    $this->assertEquals(['route'], $result['#cache']['contexts']);
    $this->assertEquals(0, $result['#cache']['max-age']);
    $this->assertArrayNotHasKey('#type', $result);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithLandingPageHeaderComponent() {
    // Set configuration for landing page with navigation
    $configuration = [
      'header_variant' => 'landing',
      'include_navigation' => TRUE,
    ];
    $this->block->setConfiguration($configuration);

    // Mock header context service
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(FALSE);

    $header_data = [
      'title' => 'Landing Page',
      'description' => 'Welcome to our site',
      'background_image' => 'https://example.com/hero.jpg',
      'background_alt' => 'Hero image',
      'content_type' => 'landing_page',
      'is_landing_page' => TRUE,
    ];

    $this->headerContext->method('extractHeaderData')
      ->willReturn($header_data);

    // Mock config factory
    $site_config = $this->createMock(ImmutableConfig::class);
    $site_config->method('get')->with('name')->willReturn('Test Site');

    $this->configFactory->method('get')
      ->willReturnMap([
        ['system.site', $site_config],
        ['adesso_cms_theme.settings', $this->createMock(ImmutableConfig::class)],
      ]);

    $result = $this->block->build();

    // Should use landing-page-header component when variant=landing AND includes_navigation=TRUE
    $this->assertEquals('adesso_cms_theme:landing-page-header', $result['#component']);
    
    $props = $result['#props'];
    $this->assertEquals('landing', $props['variant']);
    $this->assertEquals(TRUE, $props['includes_navigation']);
  }

  /**
   * @covers ::build
   */
  public function testBuildWithPageHeaderComponent() {
    // Set configuration for landing page WITHOUT navigation
    $configuration = [
      'header_variant' => 'landing',
      'include_navigation' => FALSE,
    ];
    $this->block->setConfiguration($configuration);

    // Mock header context service
    $this->headerContext->method('shouldExcludeHeader')
      ->willReturn(FALSE);

    $header_data = [
      'title' => 'Landing Page',
      'description' => 'Welcome',
      'background_image' => '',
      'background_alt' => '',
      'content_type' => 'landing_page',
      'is_landing_page' => TRUE,
    ];

    $this->headerContext->method('extractHeaderData')
      ->willReturn($header_data);

    // Mock config factory
    $site_config = $this->createMock(ImmutableConfig::class);
    $this->configFactory->method('get')
      ->willReturnMap([
        ['system.site', $site_config],
        ['adesso_cms_theme.settings', $this->createMock(ImmutableConfig::class)],
      ]);

    $result = $this->block->build();

    // Should use page-header component when variant=landing BUT includes_navigation=FALSE
    $this->assertEquals('adesso_cms_theme:page-header', $result['#component']);
  }

}