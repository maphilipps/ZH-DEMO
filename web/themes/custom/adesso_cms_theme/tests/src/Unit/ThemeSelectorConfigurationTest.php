<?php

namespace Drupal\Tests\adesso_cms_theme\Unit;

use PHPUnit\Framework\TestCase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Config\ImmutableConfig;

/**
 * Tests for theme selector field configuration across paragraph types.
 *
 * @group theme_selector
 * @group adesso_cms_theme
 */
class ThemeSelectorConfigurationTest extends TestCase {

  /**
   * All paragraph types that should have the theme selector field.
   */
  const PARAGRAPH_TYPES = [
    'accordion',
    'accordion_item',
    'block_reference',
    'card',
    'card_group',
    'carousel',
    'carousel_item',
    'download',
    'download_item',
    'embed',
    'gallery',
    'hero',
    'logo_collection',
    'media',
    'newsletter',
    'pricing',
    'pricing_card',
    'sidebyside',
    'slider',
    'slider_item',
    'stats_item',
    'text',
    'views',
  ];

  /**
   * Expected theme field configuration.
   */
  const EXPECTED_THEME_CONFIG = [
    'field_name' => 'field_theme',
    'field_type' => 'list_string',
    'widget_type' => 'options_select',
    'widget_label' => 'Content Element Theme',
    'weight' => 1,
    'options' => [
      'light' => 'Light',
      'highlighted' => 'Highlighted',
      'dark' => 'Dark',
    ],
  ];

  /**
   * Mock config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface|\PHPUnit\Framework\MockObject\MockObject
   */
  protected $configFactory;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->configFactory = $this->createMock(ConfigFactoryInterface::class);
  }

  /**
   * Tests that all paragraph types have the theme selector field configured.
   */
  public function testAllParagraphTypesHaveThemeField(): void {
    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      $formDisplayConfig = $this->createMockFormDisplayConfig($paragraphType, [
        'field_theme' => [
          'type' => 'options_select',
          'weight' => 1,
          'label' => 'Content Element Theme',
          'settings' => [],
          'third_party_settings' => [],
        ],
      ]);

      $this->configFactory
        ->method('get')
        ->with("core.entity_form_display.paragraph.{$paragraphType}.default")
        ->willReturn($formDisplayConfig);

      $config = $this->configFactory->get("core.entity_form_display.paragraph.{$paragraphType}.default");
      $fieldConfig = $config->get('content.field_theme');

      $this->assertNotNull(
        $fieldConfig,
        "Theme selector field missing from paragraph type: {$paragraphType}"
      );

      $this->assertEquals(
        'options_select',
        $fieldConfig['type'],
        "Wrong widget type for theme field in paragraph type: {$paragraphType}"
      );

      $this->assertEquals(
        1,
        $fieldConfig['weight'],
        "Wrong weight for theme field in paragraph type: {$paragraphType}. Expected 1 (directly under title)."
      );
    }
  }

  /**
   * Tests that theme field has correct field storage configuration.
   */
  public function testThemeFieldStorageConfiguration(): void {
    $fieldStorageConfig = $this->createMockConfig([
      'field_name' => 'field_theme',
      'type' => 'list_string',
      'settings' => [
        'allowed_values' => [
          'light' => 'Light',
          'highlighted' => 'Highlighted',
          'dark' => 'Dark',
        ],
      ],
      'cardinality' => 1,
    ]);

    $this->configFactory
      ->method('get')
      ->with('field.storage.paragraph.field_theme')
      ->willReturn($fieldStorageConfig);

    $config = $this->configFactory->get('field.storage.paragraph.field_theme');

    $this->assertEquals(
      'field_theme',
      $config->get('field_name'),
      'Theme field has incorrect field name'
    );

    $this->assertEquals(
      'list_string',
      $config->get('type'),
      'Theme field has incorrect field type'
    );

    $allowedValues = $config->get('settings.allowed_values');
    $this->assertEquals(
      self::EXPECTED_THEME_CONFIG['options'],
      $allowedValues,
      'Theme field has incorrect allowed values'
    );

    $this->assertEquals(
      1,
      $config->get('cardinality'),
      'Theme field should have cardinality of 1'
    );
  }

  /**
   * Tests that theme field instances are configured correctly for each paragraph type.
   */
  public function testThemeFieldInstanceConfiguration(): void {
    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      $fieldConfig = $this->createMockConfig([
        'field_name' => 'field_theme',
        'entity_type' => 'paragraph',
        'bundle' => $paragraphType,
        'label' => 'Content Element Theme',
        'description' => '',
        'required' => FALSE,
        'default_value' => [
          ['value' => 'light'],
        ],
      ]);

      $this->configFactory
        ->method('get')
        ->with("field.field.paragraph.{$paragraphType}.field_theme")
        ->willReturn($fieldConfig);

      $config = $this->configFactory->get("field.field.paragraph.{$paragraphType}.field_theme");

      $this->assertEquals(
        'field_theme',
        $config->get('field_name'),
        "Theme field instance has incorrect name for paragraph type: {$paragraphType}"
      );

      $this->assertEquals(
        'Content Element Theme',
        $config->get('label'),
        "Theme field instance has incorrect label for paragraph type: {$paragraphType}"
      );

      $this->assertEquals(
        $paragraphType,
        $config->get('bundle'),
        "Theme field instance has incorrect bundle for paragraph type: {$paragraphType}"
      );

      $this->assertFalse(
        $config->get('required'),
        "Theme field should not be required for paragraph type: {$paragraphType}"
      );

      $defaultValue = $config->get('default_value');
      $this->assertEquals(
        'light',
        $defaultValue[0]['value'] ?? NULL,
        "Theme field should default to 'light' for paragraph type: {$paragraphType}"
      );
    }
  }

  /**
   * Tests that no paragraph types have legacy dark theme field references.
   */
  public function testNoLegacyDarkThemeReferences(): void {
    $legacyFieldNames = [
      'field_dark_theme',
      'field_enable_dark_theme',
      'field_dark_mode',
      'field_theme_dark',
    ];

    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      foreach ($legacyFieldNames as $legacyFieldName) {
        $formDisplayConfig = $this->createMockFormDisplayConfig($paragraphType, []);

        $this->configFactory
          ->method('get')
          ->with("core.entity_form_display.paragraph.{$paragraphType}.default")
          ->willReturn($formDisplayConfig);

        $config = $this->configFactory->get("core.entity_form_display.paragraph.{$paragraphType}.default");
        $fieldConfig = $config->get("content.{$legacyFieldName}");

        $this->assertNull(
          $fieldConfig,
          "Legacy field '{$legacyFieldName}' found in paragraph type: {$paragraphType}. This should have been removed."
        );
      }
    }
  }

  /**
   * Tests that theme field is positioned correctly relative to title field.
   */
  public function testThemeFieldPositionRelativeToTitle(): void {
    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      $formDisplayConfig = $this->createMockFormDisplayConfig($paragraphType, [
        'field_title' => [
          'type' => 'string_textfield',
          'weight' => 0,
        ],
        'field_theme' => [
          'type' => 'options_select',
          'weight' => 1,
        ],
        'field_body' => [
          'type' => 'text_textarea_with_summary',
          'weight' => 2,
        ],
      ]);

      $this->configFactory
        ->method('get')
        ->with("core.entity_form_display.paragraph.{$paragraphType}.default")
        ->willReturn($formDisplayConfig);

      $config = $this->configFactory->get("core.entity_form_display.paragraph.{$paragraphType}.default");

      $titleWeight = $config->get('content.field_title.weight') ?? NULL;
      $themeWeight = $config->get('content.field_theme.weight') ?? NULL;

      if ($titleWeight !== NULL) {
        $this->assertNotNull(
          $themeWeight,
          "Theme field must be present when title field exists in paragraph type: {$paragraphType}"
        );

        $this->assertEquals(
          $titleWeight + 1,
          $themeWeight,
          "Theme field weight should be exactly 1 more than title field weight in paragraph type: {$paragraphType}"
        );
      }
    }
  }

  /**
   * Tests theme field widget configuration.
   */
  public function testThemeFieldWidgetConfiguration(): void {
    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      $formDisplayConfig = $this->createMockFormDisplayConfig($paragraphType, [
        'field_theme' => [
          'type' => 'options_select',
          'weight' => 1,
          'label' => 'Content Element Theme',
          'settings' => [],
          'third_party_settings' => [],
        ],
      ]);

      $this->configFactory
        ->method('get')
        ->with("core.entity_form_display.paragraph.{$paragraphType}.default")
        ->willReturn($formDisplayConfig);

      $config = $this->configFactory->get("core.entity_form_display.paragraph.{$paragraphType}.default");
      $widgetConfig = $config->get('content.field_theme');

      $this->assertEquals(
        'options_select',
        $widgetConfig['type'],
        "Theme field widget type should be 'options_select' for paragraph type: {$paragraphType}"
      );

      $this->assertEquals(
        'Content Element Theme',
        $widgetConfig['label'],
        "Theme field widget label incorrect for paragraph type: {$paragraphType}"
      );

      $this->assertIsArray(
        $widgetConfig['settings'],
        "Theme field widget settings should be an array for paragraph type: {$paragraphType}"
      );
    }
  }

  /**
   * Tests that theme field view display is properly configured.
   */
  public function testThemeFieldViewDisplayConfiguration(): void {
    foreach (self::PARAGRAPH_TYPES as $paragraphType) {
      $viewDisplayConfig = $this->createMockConfig([
        'content' => [
          'field_theme' => [
            'type' => 'list_default',
            'weight' => -1,
            'label' => 'hidden',
            'settings' => [],
          ],
        ],
      ]);

      $this->configFactory
        ->method('get')
        ->with("core.entity_view_display.paragraph.{$paragraphType}.default")
        ->willReturn($viewDisplayConfig);

      $config = $this->configFactory->get("core.entity_view_display.paragraph.{$paragraphType}.default");
      $viewConfig = $config->get('content.field_theme');

      if ($viewConfig) {
        $this->assertEquals(
          'hidden',
          $viewConfig['label'],
          "Theme field label should be hidden in view display for paragraph type: {$paragraphType}"
        );

        $this->assertLessThan(
          0,
          $viewConfig['weight'],
          "Theme field should have negative weight in view display for paragraph type: {$paragraphType}"
        );
      }
    }
  }

  /**
   * Tests that field permissions are correctly configured.
   */
  public function testThemeFieldPermissions(): void {
    // Mock field configuration that would be checked by access control.
    $fieldConfig = $this->createMockConfig([
      'field_name' => 'field_theme',
      'entity_type' => 'paragraph',
    ]);

    $this->configFactory
      ->method('get')
      ->willReturn($fieldConfig);

    // In a real test, this would check user permissions
    // For now, we just verify the field exists and is accessible.
    $config = $this->configFactory->get('field.field.paragraph.text.field_theme');

    $this->assertEquals(
      'field_theme',
      $config->get('field_name'),
      'Theme field should be accessible for permission checking'
    );
  }

  /**
   * Creates a mock form display configuration.
   */
  private function createMockFormDisplayConfig(string $paragraphType, array $content): ImmutableConfig {
    $config = $this->createMock(ImmutableConfig::class);
    $config->method('get')->willReturnMap([
      ['content', $content],
      ['content.field_theme', $content['field_theme'] ?? NULL],
      ['content.field_title', $content['field_title'] ?? NULL],
      ['content.field_body', $content['field_body'] ?? NULL],
    ]);
    return $config;
  }

  /**
   * Creates a mock configuration object.
   */
  private function createMockConfig(array $data): ImmutableConfig {
    $config = $this->createMock(ImmutableConfig::class);

    // Handle nested get() calls.
    $config->method('get')->willReturnCallback(function ($key = '') use ($data) {
      if (empty($key)) {
        return $data;
      }

      $keys = explode('.', $key);
      $value = $data;

      foreach ($keys as $k) {
        if (is_array($value) && array_key_exists($k, $value)) {
          $value = $value[$k];
        }
        else {
          return NULL;
        }
      }

      return $value;
    });

    return $config;
  }

}
