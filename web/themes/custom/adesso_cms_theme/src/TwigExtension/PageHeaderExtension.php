<?php

namespace Drupal\adesso_cms_theme\TwigExtension;

use Drupal\adesso_cms_theme\Service\PageHeaderContextService;
use Drupal\Core\Routing\RouteMatchInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

/**
 * Twig extension for page header context functions.
 *
 * Provides Twig functions to access the PageHeaderContextService
 * functionality directly from templates.
 */
class PageHeaderExtension extends AbstractExtension {

  /**
   * The page header context service.
   *
   * @var \Drupal\adesso_cms_theme\Service\PageHeaderContextService
   */
  protected $pageHeaderContext;

  /**
   * The current route match.
   *
   * @var \Drupal\Core\Routing\RouteMatchInterface
   */
  protected $routeMatch;

  /**
   * Constructs a new PageHeaderExtension.
   *
   * @param \Drupal\adesso_cms_theme\Service\PageHeaderContextService $page_header_context
   *   The page header context service.
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   *   The current route match.
   */
  public function __construct(PageHeaderContextService $page_header_context, RouteMatchInterface $route_match) {
    $this->pageHeaderContext = $page_header_context;
    $this->routeMatch = $route_match;
  }

  /**
   * {@inheritdoc}
   */
  public function getFunctions(): array {
    return [
      new TwigFunction('page_header_context', [$this, 'getPageHeaderContext']),
      new TwigFunction('page_header_should_exclude', [$this, 'shouldExcludeHeader']),
    ];
  }

  /**
   * Gets the page header context data.
   *
   * @return array
   *   The header context data array.
   */
  public function getPageHeaderContext(): array {
    return $this->pageHeaderContext->extractHeaderData($this->routeMatch);
  }

  /**
   * Checks if headers should be excluded.
   *
   * @return bool
   *   TRUE if headers should be excluded.
   */
  public function shouldExcludeHeader(): bool {
    return $this->pageHeaderContext->shouldExcludeHeader($this->routeMatch);
  }

  /**
   * {@inheritdoc}
   */
  public function getName(): string {
    return 'adesso_cms_theme_page_header';
  }
}