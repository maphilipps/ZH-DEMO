<?php

namespace Drupal\municipal_ai_agents\Agent;

use Drupal\ai_agents\Attribute\AiAgent;
use Drupal\ai_agents\PluginBaseClasses\AiAgentBase;
use Drupal\ai_agents\PluginInterfaces\AiAgentInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Performance Monitoring and Optimization Agent for Swiss municipalities.
 * 
 * Monitors website performance, analyzes user behavior, and provides
 * intelligent optimization recommendations while maintaining privacy compliance.
 */
#[AiAgent(
  id: 'performance_monitoring',
  label: 'Performance Monitoring & Optimization Agent',
  description: 'Monitors performance and provides optimization recommendations with privacy controls'
)]
class PerformanceMonitoringAgent extends AiAgentBase implements AiAgentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function helpText(): string {
    return $this->t('This agent monitors website performance, analyzes user behavior patterns, and provides intelligent optimization recommendations while maintaining strict Swiss privacy compliance and data sovereignty requirements.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfigSchema(): array {
    return [
      'monitoring_scope' => [
        'type' => 'checkboxes',
        'label' => $this->t('Monitoring Scope'),
        'description' => $this->t('Select aspects to monitor and optimize'),
        'options' => [
          'page_speed' => 'Page Load Speed',
          'core_web_vitals' => 'Core Web Vitals',
          'user_experience' => 'User Experience Metrics',
          'accessibility_performance' => 'Accessibility Performance',
          'mobile_performance' => 'Mobile Performance',
          'server_response' => 'Server Response Times',
          'resource_optimization' => 'Resource Optimization',
          'seo_performance' => 'SEO Performance',
        ],
        'required' => TRUE,
      ],
      'privacy_level' => [
        'type' => 'select',
        'label' => $this->t('Privacy Level'),
        'description' => $this->t('Data privacy compliance level'),
        'options' => [
          'strict' => 'Strict (No personal data, anonymous only)',
          'balanced' => 'Balanced (Aggregated data with consent)',
          'comprehensive' => 'Comprehensive (Full analytics with explicit consent)',
        ],
        'default' => 'balanced',
      ],
      'data_retention' => [
        'type' => 'select',
        'label' => $this->t('Data Retention Period'),
        'description' => $this->t('How long to retain performance data'),
        'options' => [
          '30_days' => '30 Days',
          '90_days' => '90 Days', 
          '6_months' => '6 Months',
          '1_year' => '1 Year',
        ],
        'default' => '90_days',
      ],
      'optimization_focus' => [
        'type' => 'checkboxes',
        'label' => $this->t('Optimization Focus Areas'),
        'description' => $this->t('Primary areas for optimization recommendations'),
        'options' => [
          'speed_optimization' => 'Speed Optimization',
          'accessibility_improvements' => 'Accessibility Improvements',
          'user_engagement' => 'User Engagement Enhancement',
          'mobile_optimization' => 'Mobile Experience Optimization',
          'content_optimization' => 'Content Performance Optimization',
          'technical_seo' => 'Technical SEO Optimization',
        ],
        'default' => ['speed_optimization', 'accessibility_improvements'],
      ],
      'reporting_frequency' => [
        'type' => 'select',
        'label' => $this->t('Reporting Frequency'),
        'description' => $this->t('How often to generate optimization reports'),
        'options' => [
          'daily' => 'Daily',
          'weekly' => 'Weekly',
          'monthly' => 'Monthly',
          'quarterly' => 'Quarterly',
        ],
        'default' => 'weekly',
      ],
      'alert_thresholds' => [
        'type' => 'fieldset',
        'label' => $this->t('Performance Alert Thresholds'),
        'description' => $this->t('Set thresholds for performance alerts'),
        'fields' => [
          'page_load_time' => [
            'type' => 'number',
            'label' => $this->t('Page Load Time (seconds)'),
            'default' => 3,
            'min' => 1,
            'max' => 10,
          ],
          'core_web_vitals_score' => [
            'type' => 'number',
            'label' => $this->t('Core Web Vitals Score'),
            'default' => 75,
            'min' => 0,
            'max' => 100,
          ],
          'accessibility_score' => [
            'type' => 'number',
            'label' => $this->t('Accessibility Score'),
            'default' => 90,
            'min' => 0,
            'max' => 100,
          ],
        ],
      ],
      'swiss_compliance' => [
        'type' => 'checkbox',
        'label' => $this->t('Swiss Data Sovereignty Compliance'),
        'description' => $this->t('Ensure all data processing complies with Swiss data sovereignty requirements'),
        'default' => TRUE,
      ],
      'municipal_priorities' => [
        'type' => 'checkboxes',
        'label' => $this->t('Municipal Service Priorities'),
        'description' => $this->t('Prioritize optimization for key municipal services'),
        'options' => [
          'citizen_services' => 'Citizen Service Forms',
          'information_pages' => 'Information and News Pages',
          'emergency_content' => 'Emergency and Alert Content',
          'multilingual_content' => 'Multilingual Content Performance',
          'mobile_services' => 'Mobile Service Access',
        ],
        'default' => ['citizen_services', 'emergency_content'],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultConfiguration(): array {
    return [
      'monitoring_scope' => ['page_speed', 'core_web_vitals', 'accessibility_performance'],
      'privacy_level' => 'balanced',
      'data_retention' => '90_days',
      'optimization_focus' => ['speed_optimization', 'accessibility_improvements'],
      'reporting_frequency' => 'weekly',
      'alert_thresholds' => [
        'page_load_time' => 3,
        'core_web_vitals_score' => 75,
        'accessibility_score' => 90,
      ],
      'swiss_compliance' => TRUE,
      'municipal_priorities' => ['citizen_services', 'emergency_content'],
    ] + parent::getDefaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function run(string $input, array $context = []): string {
    $config = $this->getConfiguration();
    
    // Analyze performance data and context
    $performance_analysis = $this->analyzePerformanceData($input, $config, $context);
    
    // Build performance optimization prompt
    $system_prompt = $this->buildPerformanceSystemPrompt($config, $performance_analysis, $context);
    
    // Process through AI provider
    $response = $this->callAiProvider($system_prompt, $input, $context);
    
    // Apply privacy compliance and Swiss-specific optimizations
    return $this->applyPerformanceOptimizations($response, $config, $performance_analysis);
  }

  /**
   * Analyzes performance data.
   */
  private function analyzePerformanceData(string $input, array $config, array $context): array {
    $analysis = [
      'performance_issues' => $this->detectPerformanceIssues($input),
      'optimization_opportunities' => $this->identifyOptimizationOpportunities($input, $config),
      'priority_areas' => $this->determinePriorityAreas($config),
      'compliance_requirements' => $this->getComplianceRequirements($config),
      'current_metrics' => $this->extractCurrentMetrics($input, $context),
    ];

    return $analysis;
  }

  /**
   * Builds the performance system prompt.
   */
  private function buildPerformanceSystemPrompt(array $config, array $analysis, array $context): string {
    $monitoring_scope = implode(', ', $config['monitoring_scope'] ?? []);
    $privacy_level = $config['privacy_level'] ?? 'balanced';
    $optimization_focus = implode(', ', $config['optimization_focus'] ?? []);

    $prompt = "You are a Swiss Municipal Website Performance Optimization Expert specializing in privacy-compliant performance monitoring and optimization.

ROLE: Municipal Performance Optimization Specialist

MONITORING SCOPE: {$monitoring_scope}

OPTIMIZATION FOCUS: {$optimization_focus}

PRIVACY COMPLIANCE: " . $this->getPrivacyDescription($privacy_level) . "

PERFORMANCE ANALYSIS RESULTS:
- Detected Issues: " . implode(', ', $analysis['performance_issues']) . "
- Optimization Opportunities: " . implode(', ', $analysis['optimization_opportunities']) . "
- Priority Areas: " . implode(', ', $analysis['priority_areas']) . "

SWISS MUNICIPAL REQUIREMENTS:
- Data sovereignty compliance (Swiss data centers only)
- Privacy-by-design approach
- Accessibility compliance (ECH-0059)
- Multilingual performance optimization
- Mobile-first citizen services
- Emergency content prioritization

PERFORMANCE EXPERTISE:
- Core Web Vitals optimization (LCP, FID, CLS)
- Accessibility performance integration
- Swiss hosting and CDN optimization
- Privacy-compliant analytics
- Municipal service performance priorities
- Mobile and low-bandwidth optimization

OPTIMIZATION PRINCIPLES:
1. CITIZENS FIRST: Prioritize citizen experience and accessibility
2. PRIVACY PROTECTION: Maintain strict Swiss privacy standards
3. PERFORMANCE EQUITY: Ensure equal performance across all languages
4. EMERGENCY READINESS: Optimize for emergency content delivery
5. RESOURCE EFFICIENCY: Minimize server load and bandwidth usage
6. SUSTAINABLE OPTIMIZATION: Long-term performance sustainability

TECHNICAL FOCUS AREAS:
- Page load speed optimization
- Core Web Vitals improvement
- Accessibility performance integration  
- Mobile performance enhancement
- Resource optimization and caching
- Database and server optimization
- CDN and hosting optimization
- Third-party service optimization";

    if ($config['swiss_compliance']) {
      $prompt .= "\n\nSWISS COMPLIANCE REQUIREMENTS:
- All data processing within Swiss borders
- Compliance with nDSG (new Swiss Data Protection Act)
- Municipal transparency requirements
- Cantonal performance standards
- Federal accessibility mandates";
    }

    $municipal_priorities = $config['municipal_priorities'] ?? [];
    if (!empty($municipal_priorities)) {
      $prompt .= "\n\nMUNICIPAL PRIORITY SERVICES: " . implode(', ', $this->getMunicipalPriorityNames($municipal_priorities));
    }

    $prompt .= "\n\nREPORT FORMAT:
1. Executive Summary with Key Metrics
2. Critical Issues and Immediate Actions
3. Optimization Recommendations (Priority Ranked)
4. Implementation Roadmap
5. Privacy and Compliance Notes
6. Monitoring and Measurement Plan
7. Resource Requirements and Timeline

Provide actionable, privacy-compliant recommendations that municipal IT teams can implement effectively.";

    return $prompt;
  }

  /**
   * Detects performance issues from input data.
   */
  private function detectPerformanceIssues(string $input): array {
    $issues = [];
    $input_lower = strtolower($input);
    
    // Page speed issues
    if (strpos($input_lower, 'slow') !== false || strpos($input_lower, 'langsam') !== false) {
      $issues[] = 'slow_page_loading';
    }
    
    // Mobile performance
    if (strpos($input_lower, 'mobile') !== false && strpos($input_lower, 'problem') !== false) {
      $issues[] = 'mobile_performance_issues';
    }
    
    // Accessibility performance
    if (strpos($input_lower, 'accessibility') !== false || strpos($input_lower, 'barrierefreiheit') !== false) {
      $issues[] = 'accessibility_performance_gaps';
    }
    
    // Core Web Vitals
    if (preg_match('/(lcp|fid|cls|core web vitals)/i', $input)) {
      $issues[] = 'core_web_vitals_issues';
    }
    
    // Server response issues
    if (strpos($input_lower, 'server') !== false || strpos($input_lower, 'timeout') !== false) {
      $issues[] = 'server_response_issues';
    }

    return $issues;
  }

  /**
   * Identifies optimization opportunities.
   */
  private function identifyOptimizationOpportunities(string $input, array $config): array {
    $opportunities = [];
    
    $focus_areas = $config['optimization_focus'] ?? [];
    
    if (in_array('speed_optimization', $focus_areas)) {
      $opportunities[] = 'image_optimization';
      $opportunities[] = 'caching_improvements';
      $opportunities[] = 'code_minification';
    }
    
    if (in_array('accessibility_improvements', $focus_areas)) {
      $opportunities[] = 'accessibility_performance_integration';
      $opportunities[] = 'assistive_technology_optimization';
    }
    
    if (in_array('mobile_optimization', $focus_areas)) {
      $opportunities[] = 'mobile_first_optimization';
      $opportunities[] = 'touch_interface_improvements';
    }
    
    if (in_array('content_optimization', $focus_areas)) {
      $opportunities[] = 'content_delivery_optimization';
      $opportunities[] = 'multilingual_performance_tuning';
    }

    return $opportunities;
  }

  /**
   * Determines priority areas based on configuration.
   */
  private function determinePriorityAreas(array $config): array {
    $priorities = [];
    
    $municipal_priorities = $config['municipal_priorities'] ?? [];
    
    foreach ($municipal_priorities as $priority) {
      switch ($priority) {
        case 'citizen_services':
          $priorities[] = 'form_performance_optimization';
          $priorities[] = 'service_delivery_speed';
          break;
        case 'emergency_content':
          $priorities[] = 'emergency_content_prioritization';
          $priorities[] = 'critical_information_delivery';
          break;
        case 'multilingual_content':
          $priorities[] = 'language_switching_performance';
          $priorities[] = 'content_localization_optimization';
          break;
      }
    }

    return array_unique($priorities);
  }

  /**
   * Gets compliance requirements based on configuration.
   */
  private function getComplianceRequirements(array $config): array {
    $requirements = [];
    
    if ($config['swiss_compliance']) {
      $requirements[] = 'swiss_data_sovereignty';
      $requirements[] = 'ndsg_compliance';
    }
    
    $privacy_level = $config['privacy_level'] ?? 'balanced';
    switch ($privacy_level) {
      case 'strict':
        $requirements[] = 'anonymous_analytics_only';
        break;
      case 'comprehensive':
        $requirements[] = 'explicit_consent_required';
        break;
      default:
        $requirements[] = 'aggregated_data_processing';
    }

    return $requirements;
  }

  /**
   * Extracts current metrics from input.
   */
  private function extractCurrentMetrics(string $input, array $context): array {
    $metrics = [];
    
    // Extract numeric values that might be performance metrics
    if (preg_match_all('/(\d+(?:\.\d+)?)\s*(ms|seconds?|s|%)/i', $input, $matches)) {
      foreach ($matches[0] as $match) {
        $metrics[] = $match;
      }
    }
    
    return $metrics;
  }

  /**
   * Applies performance optimizations to the response.
   */
  private function applyPerformanceOptimizations(string $response, array $config, array $analysis): string {
    // Add performance report header
    $header = "# Municipal Website Performance Optimization Report\n\n";
    $header .= "**Generated:** " . date('d.m.Y H:i:s') . "\n";
    $header .= "**Privacy Level:** " . $this->getPrivacyDescription($config['privacy_level']) . "\n";
    $header .= "**Monitoring Scope:** " . implode(', ', $config['monitoring_scope'] ?? []) . "\n\n";
    
    // Add Swiss compliance footer
    $compliance_footer = $this->generateComplianceFooter($config);
    
    // Add monitoring recommendations
    $monitoring_recommendations = $this->generateMonitoringRecommendations($config);
    
    return $header . $response . $monitoring_recommendations . $compliance_footer;
  }

  /**
   * Gets privacy level description.
   */
  private function getPrivacyDescription(string $level): string {
    $descriptions = [
      'strict' => 'Strict Privacy (Anonymous data only, no personal tracking)',
      'balanced' => 'Balanced Privacy (Aggregated data with user consent)',
      'comprehensive' => 'Comprehensive Analytics (Full tracking with explicit consent)',
    ];
    return $descriptions[$level] ?? $descriptions['balanced'];
  }

  /**
   * Gets municipal priority names.
   */
  private function getMunicipalPriorityNames(array $priorities): array {
    $names = [
      'citizen_services' => 'Citizen Service Forms and Applications',
      'information_pages' => 'Municipal Information and News',
      'emergency_content' => 'Emergency Alerts and Critical Information',
      'multilingual_content' => 'Multilingual Content Performance',
      'mobile_services' => 'Mobile Service Access and Usability',
    ];
    
    return array_intersect_key($names, array_flip($priorities));
  }

  /**
   * Generates compliance footer.
   */
  private function generateComplianceFooter(array $config): string {
    $footer = "\n\n## Privacy and Compliance Notes\n\n";
    
    if ($config['swiss_compliance']) {
      $footer .= "### Swiss Data Sovereignty Compliance\n";
      $footer .= "- All performance data processed within Swiss borders\n";
      $footer .= "- Compliance with nDSG (new Swiss Data Protection Act)\n";
      $footer .= "- Municipal transparency requirements respected\n";
      $footer .= "- Data retention limited to " . $this->getRetentionPeriod($config['data_retention']) . "\n\n";
    }
    
    $privacy_level = $config['privacy_level'] ?? 'balanced';
    $footer .= "### Privacy Protection Measures\n";
    $footer .= "- Privacy level: " . $this->getPrivacyDescription($privacy_level) . "\n";
    $footer .= "- Data minimization principles applied\n";
    $footer .= "- User consent mechanisms in place\n";
    $footer .= "- Right to data deletion respected\n\n";
    
    $footer .= "### Performance Monitoring Ethics\n";
    $footer .= "- No personal identification in performance data\n";
    $footer .= "- Aggregated metrics only for optimization\n";
    $footer .= "- Transparent monitoring practices\n";
    $footer .= "- Regular privacy impact assessments\n";

    return $footer;
  }

  /**
   * Generates monitoring recommendations.
   */
  private function generateMonitoringRecommendations(array $config): string {
    $recommendations = "\n\n## Ongoing Monitoring Recommendations\n\n";
    
    $frequency = $config['reporting_frequency'] ?? 'weekly';
    $recommendations .= "### Reporting Schedule\n";
    $recommendations .= "- Performance reports generated {$frequency}\n";
    $recommendations .= "- Critical alerts in real-time\n";
    $recommendations .= "- Comprehensive reviews quarterly\n\n";
    
    $recommendations .= "### Key Performance Indicators\n";
    $monitoring_scope = $config['monitoring_scope'] ?? [];
    
    if (in_array('page_speed', $monitoring_scope)) {
      $recommendations .= "- Page load times (target: <3 seconds)\n";
    }
    if (in_array('core_web_vitals', $monitoring_scope)) {
      $recommendations .= "- Core Web Vitals scores (target: >75)\n";
    }
    if (in_array('accessibility_performance', $monitoring_scope)) {
      $recommendations .= "- Accessibility performance metrics\n";
    }
    
    $recommendations .= "\n### Alert Thresholds\n";
    $thresholds = $config['alert_thresholds'] ?? [];
    foreach ($thresholds as $metric => $value) {
      $recommendations .= "- " . ucfirst(str_replace('_', ' ', $metric)) . ": {$value}\n";
    }
    
    $recommendations .= "\n### Next Review: " . date('d.m.Y', strtotime('+1 month'));

    return $recommendations;
  }

  /**
   * Gets retention period description.
   */
  private function getRetentionPeriod(string $period): string {
    $periods = [
      '30_days' => '30 days',
      '90_days' => '90 days',
      '6_months' => '6 months',
      '1_year' => '1 year',
    ];
    return $periods[$period] ?? $periods['90_days'];
  }

}