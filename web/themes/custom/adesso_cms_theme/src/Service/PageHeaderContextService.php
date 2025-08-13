<?php

namespace Drupal\adesso_cms_theme\Service;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\node\NodeInterface;
use Drupal\file\Entity\File;

/**
 * Service to extract page header context data from various content types.
 *
 * This service replaces the template-based field extraction logic with a
 * reusable service that implements the same field hierarchy priorities:
 *
 * - Description fields: field_lead → field_summary → field_description
 * - Background images: field_header_image → field_featured_image → field_media
 */
class PageHeaderContextService {

  /**
   * Extracts header data from the current route.
   *
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route match service.
   *
   * @return array
   *   Array containing header data with keys:
   *   - title: Page title string
   *   - description: Page description string
   *   - background_image: Background image URL or null
   *   - background_alt: Background image alt text
   *   - content_type: Content type machine name
   *   - is_landing_page: Boolean indicating if this is a landing page
   */
  public function extractHeaderData(RouteMatchInterface $route_match): array {
    $node = $route_match->getParameter('node');
    
    // Initialize default values
    $header_data = [
      'title' => '',
      'description' => '',
      'background_image' => '',
      'background_alt' => '',
      'content_type' => '',
      'is_landing_page' => false,
    ];

    if ($node instanceof NodeInterface) {
      // Extract title
      $header_data['title'] = $node->label();
      $header_data['content_type'] = $node->bundle();
      $header_data['is_landing_page'] = $node->bundle() === 'landing_page';
      
      // Extract description using field hierarchy
      $header_data['description'] = $this->getDescription($node);
      
      // Extract background image using field hierarchy
      $background_data = $this->getBackgroundImage($node);
      $header_data['background_image'] = $background_data['url'];
      $header_data['background_alt'] = $background_data['alt'];
    }
    else {
      // For non-node pages, use page title from route/request
      $request = \Drupal::request();
      $route = $route_match->getRouteObject();
      if ($route && $route->getOption('_admin_route')) {
        $header_data['title'] = '';
      }
      else {
        // Try to get title from various sources
        $title_resolver = \Drupal::service('title_resolver');
        $header_data['title'] = $title_resolver->getTitle($request, $route);
      }
    }

    return $header_data;
  }

  /**
   * Gets description from node using field hierarchy.
   *
   * Implements the template logic:
   * field_lead → field_summary → field_description
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity.
   *
   * @return string
   *   The description text or empty string.
   */
  public function getDescription(NodeInterface $node): string {
    // Try field_lead first
    if ($node->hasField('field_lead') && !$node->get('field_lead')->isEmpty()) {
      return $node->get('field_lead')->value;
    }
    
    // Try field_summary second
    if ($node->hasField('field_summary') && !$node->get('field_summary')->isEmpty()) {
      return $node->get('field_summary')->value;
    }
    
    // Try field_description last
    if ($node->hasField('field_description') && !$node->get('field_description')->isEmpty()) {
      return $node->get('field_description')->value;
    }
    
    return '';
  }

  /**
   * Gets background image from node using field hierarchy.
   *
   * Implements the template logic:
   * field_header_image → field_featured_image → field_media
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node entity.
   *
   * @return array
   *   Array with 'url' and 'alt' keys, both can be null/empty.
   */
  public function getBackgroundImage(NodeInterface $node): array {
    $result = ['url' => '', 'alt' => ''];
    
    // Try field_header_image first (direct file reference)
    if ($node->hasField('field_header_image') && !$node->get('field_header_image')->isEmpty()) {
      $file_entity = $node->get('field_header_image')->entity;
      if ($file_entity && $file_entity->getFileUri()) {
        $result['url'] = \Drupal::service('file_url_generator')->generateAbsoluteString($file_entity->getFileUri());
        $result['alt'] = $node->get('field_header_image')->alt ?: '';
        return $result;
      }
    }
    
    // Try field_featured_image second (media reference)
    if ($node->hasField('field_featured_image') && !$node->get('field_featured_image')->isEmpty()) {
      $media_entity = $node->get('field_featured_image')->entity;
      if ($media_entity && $media_entity->hasField('field_media_image')) {
        $image_field = $media_entity->get('field_media_image');
        if (!$image_field->isEmpty()) {
          $file_entity = $image_field->entity;
          if ($file_entity && $file_entity->getFileUri()) {
            $result['url'] = \Drupal::service('file_url_generator')->generateAbsoluteString($file_entity->getFileUri());
            $result['alt'] = $image_field->alt ?: '';
            return $result;
          }
        }
      }
    }
    
    // Try field_media last (media reference, image bundle only)
    if ($node->hasField('field_media') && !$node->get('field_media')->isEmpty()) {
      $media_entity = $node->get('field_media')->entity;
      if ($media_entity && $media_entity->bundle() === 'image' && $media_entity->hasField('field_media_image')) {
        $image_field = $media_entity->get('field_media_image');
        if (!$image_field->isEmpty()) {
          $file_entity = $image_field->entity;
          if ($file_entity && $file_entity->getFileUri()) {
            $result['url'] = \Drupal::service('file_url_generator')->generateAbsoluteString($file_entity->getFileUri());
            $result['alt'] = $image_field->alt ?: '';
            return $result;
          }
        }
      }
    }
    
    return $result;
  }

  /**
   * Checks if the current context should exclude headers.
   *
   * This preserves the template logic that excludes headers when:
   * - There are video hero paragraphs
   * - Admin routes
   *
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The route match service.
   *
   * @return bool
   *   TRUE if headers should be excluded.
   */
  public function shouldExcludeHeader(RouteMatchInterface $route_match): bool {
    $route = $route_match->getRouteObject();
    
    // Exclude on admin routes
    if ($route && $route->getOption('_admin_route')) {
      return true;
    }
    
    // Check for video hero paragraphs (this would need additional logic
    // to inspect paragraph fields, which is more complex)
    $node = $route_match->getParameter('node');
    if ($node instanceof NodeInterface) {
      return $this->hasVideoHero($node);
    }
    
    return false;
  }

  /**
   * Checks if node has video hero paragraphs.
   *
   * @param \Drupal\node\NodeInterface $node
   *   The node to check.
   *
   * @return bool
   *   Always FALSE as video hero feature doesn't exist.
   */
  protected function hasVideoHero(NodeInterface $node): bool {
    // Video hero feature doesn't exist in this project
    return FALSE;
  }
}