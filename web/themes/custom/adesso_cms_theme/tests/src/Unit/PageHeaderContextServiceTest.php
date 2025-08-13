<?php

namespace Drupal\Tests\adesso_cms_theme\Unit;

use Drupal\adesso_cms_theme\Service\PageHeaderContextService;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\file\Entity\FileInterface;
use PHPUnit\Framework\TestCase;
use Drupal\Tests\UnitTestCase;

/**
 * Unit tests for PageHeaderContextService.
 *
 * @coversDefaultClass \Drupal\adesso_cms_theme\Service\PageHeaderContextService
 * @group adesso_cms_theme
 */
class PageHeaderContextServiceTest extends UnitTestCase {

  /**
   * The service under test.
   *
   * @var \Drupal\adesso_cms_theme\Service\PageHeaderContextService
   */
  protected $service;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();
    $this->service = new PageHeaderContextService();
  }

  /**
   * @covers ::getDescription
   */
  public function testGetDescriptionWithFieldLead() {
    $node = $this->createMock(NodeInterface::class);
    
    // Mock field_lead
    $field_lead = $this->createMock(FieldItemListInterface::class);
    $field_lead->method('isEmpty')->willReturn(false);
    $field_lead->value = 'Lead description';
    
    $node->method('hasField')->willReturnMap([
      ['field_lead', true],
      ['field_summary', false],
      ['field_description', false],
    ]);
    
    $node->method('get')->with('field_lead')->willReturn($field_lead);
    
    $result = $this->service->getDescription($node);
    $this->assertEquals('Lead description', $result);
  }

  /**
   * @covers ::getDescription
   */
  public function testGetDescriptionFallbackToSummary() {
    $node = $this->createMock(NodeInterface::class);
    
    // Mock empty field_lead
    $field_lead = $this->createMock(FieldItemListInterface::class);
    $field_lead->method('isEmpty')->willReturn(true);
    
    // Mock field_summary
    $field_summary = $this->createMock(FieldItemListInterface::class);
    $field_summary->method('isEmpty')->willReturn(false);
    $field_summary->value = 'Summary description';
    
    $node->method('hasField')->willReturnMap([
      ['field_lead', true],
      ['field_summary', true],
      ['field_description', false],
    ]);
    
    $node->method('get')->willReturnMap([
      ['field_lead', $field_lead],
      ['field_summary', $field_summary],
    ]);
    
    $result = $this->service->getDescription($node);
    $this->assertEquals('Summary description', $result);
  }

  /**
   * @covers ::getDescription
   */
  public function testGetDescriptionFallbackToDescription() {
    $node = $this->createMock(NodeInterface::class);
    
    // Mock empty field_lead and field_summary
    $field_lead = $this->createMock(FieldItemListInterface::class);
    $field_lead->method('isEmpty')->willReturn(true);
    
    $field_summary = $this->createMock(FieldItemListInterface::class);
    $field_summary->method('isEmpty')->willReturn(true);
    
    // Mock field_description
    $field_description = $this->createMock(FieldItemListInterface::class);
    $field_description->method('isEmpty')->willReturn(false);
    $field_description->value = 'Full description';
    
    $node->method('hasField')->willReturnMap([
      ['field_lead', true],
      ['field_summary', true],
      ['field_description', true],
    ]);
    
    $node->method('get')->willReturnMap([
      ['field_lead', $field_lead],
      ['field_summary', $field_summary],
      ['field_description', $field_description],
    ]);
    
    $result = $this->service->getDescription($node);
    $this->assertEquals('Full description', $result);
  }

  /**
   * @covers ::getDescription
   */
  public function testGetDescriptionNoFields() {
    $node = $this->createMock(NodeInterface::class);
    
    $node->method('hasField')->willReturnMap([
      ['field_lead', false],
      ['field_summary', false],
      ['field_description', false],
    ]);
    
    $result = $this->service->getDescription($node);
    $this->assertEquals('', $result);
  }

  /**
   * @covers ::extractHeaderData
   */
  public function testExtractHeaderDataWithNode() {
    $route_match = $this->createMock(RouteMatchInterface::class);
    $node = $this->createMock(NodeInterface::class);
    
    $node->method('label')->willReturn('Test Title');
    $node->method('bundle')->willReturn('page');
    
    // Mock field_lead for description
    $field_lead = $this->createMock(FieldItemListInterface::class);
    $field_lead->method('isEmpty')->willReturn(false);
    $field_lead->value = 'Test description';
    
    $node->method('hasField')->willReturnMap([
      ['field_lead', true],
      ['field_header_image', false],
      ['field_featured_image', false],
      ['field_media', false],
    ]);
    
    $node->method('get')->with('field_lead')->willReturn($field_lead);
    
    $route_match->method('getParameter')->with('node')->willReturn($node);
    
    $result = $this->service->extractHeaderData($route_match);
    
    $this->assertEquals('Test Title', $result['title']);
    $this->assertEquals('Test description', $result['description']);
    $this->assertEquals('page', $result['content_type']);
    $this->assertFalse($result['is_landing_page']);
    $this->assertNull($result['background_image']);
  }

  /**
   * @covers ::extractHeaderData
   */
  public function testExtractHeaderDataLandingPage() {
    $route_match = $this->createMock(RouteMatchInterface::class);
    $node = $this->createMock(NodeInterface::class);
    
    $node->method('label')->willReturn('Landing Page Title');
    $node->method('bundle')->willReturn('landing_page');
    
    // Mock empty fields for simplicity
    $node->method('hasField')->willReturn(false);
    
    $route_match->method('getParameter')->with('node')->willReturn($node);
    
    $result = $this->service->extractHeaderData($route_match);
    
    $this->assertEquals('Landing Page Title', $result['title']);
    $this->assertEquals('landing_page', $result['content_type']);
    $this->assertTrue($result['is_landing_page']);
  }

  /**
   * @covers ::extractHeaderData
   */
  public function testExtractHeaderDataNoNode() {
    $route_match = $this->createMock(RouteMatchInterface::class);
    $route_match->method('getParameter')->with('node')->willReturn(null);
    
    $result = $this->service->extractHeaderData($route_match);
    
    $this->assertEquals('', $result['title']);
    $this->assertEquals('', $result['description']);
    $this->assertEquals('', $result['content_type']);
    $this->assertFalse($result['is_landing_page']);
    $this->assertNull($result['background_image']);
  }
}