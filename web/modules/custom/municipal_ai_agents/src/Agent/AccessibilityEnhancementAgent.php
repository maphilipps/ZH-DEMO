<?php

namespace Drupal\municipal_ai_agents\Agent;

use Drupal\ai_agents\Attribute\AiAgent;
use Drupal\ai_agents\PluginBaseClasses\AiAgentBase;
use Drupal\ai_agents\PluginInterfaces\AiAgentInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Accessibility Enhancement Agent for Swiss municipalities.
 * 
 * Ensures content and services comply with ECH-0059 accessibility standards
 * and provides intelligent accessibility improvements.
 */
#[AiAgent(
  id: 'accessibility_enhancement',
  label: 'Accessibility Enhancement Agent',
  description: 'Ensures ECH-0059 compliance and enhances content accessibility'
)]
class AccessibilityEnhancementAgent extends AiAgentBase implements AiAgentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function helpText(): string {
    return $this->t('This agent ensures content and services comply with ECH-0059 Swiss accessibility standards (based on WCAG 2.1 AA) and provides intelligent accessibility improvements for municipal websites.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfigSchema(): array {
    return [
      'compliance_level' => [
        'type' => 'select',
        'label' => $this->t('Compliance Level'),
        'description' => $this->t('Target accessibility compliance level'),
        'options' => [
          'ech_0059_basic' => 'ECH-0059 Basic (WCAG 2.1 A)',
          'ech_0059_standard' => 'ECH-0059 Standard (WCAG 2.1 AA)',
          'ech_0059_enhanced' => 'ECH-0059 Enhanced (WCAG 2.1 AAA)',
        ],
        'default' => 'ech_0059_standard',
        'required' => TRUE,
      ],
      'content_types' => [
        'type' => 'checkboxes',
        'label' => $this->t('Content Types to Monitor'),
        'description' => $this->t('Select content types for accessibility enhancement'),
        'options' => [
          'documents' => 'Documents (PDF, Word, etc.)',
          'images' => 'Images and Graphics',
          'videos' => 'Videos and Multimedia',
          'forms' => 'Interactive Forms',
          'navigation' => 'Navigation Elements',
          'tables' => 'Data Tables',
          'announcements' => 'Announcements and Alerts',
          'events' => 'Events and Calendar',
        ],
        'required' => TRUE,
      ],
      'automatic_fixes' => [
        'type' => 'checkboxes',
        'label' => $this->t('Automatic Accessibility Fixes'),
        'description' => $this->t('Enable automatic accessibility improvements'),
        'options' => [
          'alt_text_generation' => 'Generate Alt Text for Images',
          'heading_structure' => 'Fix Heading Structure',
          'link_descriptions' => 'Enhance Link Descriptions',
          'form_labels' => 'Improve Form Labels',
          'color_contrast' => 'Color Contrast Suggestions',
          'focus_indicators' => 'Focus Indicator Improvements',
        ],
      ],
      'language_support' => [
        'type' => 'checkboxes',
        'label' => $this->t('Language Support'),
        'description' => $this->t('Generate accessibility content in multiple languages'),
        'options' => [
          'de' => 'Deutsch',
          'fr' => 'Français',
          'it' => 'Italiano',
          'en' => 'English',
        ],
        'default' => ['de'],
      ],
      'user_testing' => [
        'type' => 'checkbox',
        'label' => $this->t('Enable User Testing Guidance'),
        'description' => $this->t('Provide guidance for accessibility user testing'),
        'default' => TRUE,
      ],
      'compliance_reporting' => [
        'type' => 'checkbox',
        'label' => $this->t('Generate Compliance Reports'),
        'description' => $this->t('Generate ECH-0059 compliance reports'),
        'default' => TRUE,
      ],
      'assistive_technology' => [
        'type' => 'checkboxes',
        'label' => $this->t('Assistive Technology Focus'),
        'description' => $this->t('Optimize for specific assistive technologies'),
        'options' => [
          'screen_readers' => 'Screen Readers (NVDA, JAWS, etc.)',
          'voice_control' => 'Voice Control Software',
          'keyboard_navigation' => 'Keyboard-Only Navigation',
          'magnification' => 'Screen Magnification Tools',
          'switch_control' => 'Switch Control Devices',
        ],
        'default' => ['screen_readers', 'keyboard_navigation'],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultConfiguration(): array {
    return [
      'compliance_level' => 'ech_0059_standard',
      'content_types' => ['documents', 'images', 'forms'],
      'automatic_fixes' => ['alt_text_generation', 'heading_structure'],
      'language_support' => ['de'],
      'user_testing' => TRUE,
      'compliance_reporting' => TRUE,
      'assistive_technology' => ['screen_readers', 'keyboard_navigation'],
    ] + parent::getDefaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function run(string $input, array $context = []): string {
    $config = $this->getConfiguration();
    
    // Analyze content for accessibility issues
    $accessibility_analysis = $this->analyzeAccessibility($input, $config, $context);
    
    // Build specialized accessibility prompt
    $system_prompt = $this->buildAccessibilitySystemPrompt($config, $accessibility_analysis, $context);
    
    // Process through AI provider
    $response = $this->callAiProvider($system_prompt, $input, $context);
    
    // Apply ECH-0059 compliance validation
    return $this->applyComplianceValidation($response, $config, $accessibility_analysis);
  }

  /**
   * Analyzes content for accessibility issues.
   */
  private function analyzeAccessibility(string $input, array $config, array $context): array {
    $analysis = [
      'content_type' => $this->detectContentType($input, $context),
      'issues_detected' => [],
      'compliance_gaps' => [],
      'improvement_opportunities' => [],
    ];

    // Detect common accessibility issues
    $analysis['issues_detected'] = $this->detectAccessibilityIssues($input);
    
    // Identify compliance gaps based on ECH-0059
    $analysis['compliance_gaps'] = $this->identifyComplianceGaps($input, $config);
    
    // Find improvement opportunities
    $analysis['improvement_opportunities'] = $this->findImprovementOpportunities($input, $config);

    return $analysis;
  }

  /**
   * Builds the accessibility system prompt.
   */
  private function buildAccessibilitySystemPrompt(array $config, array $analysis, array $context): string {
    $compliance_level = $config['compliance_level'] ?? 'ech_0059_standard';
    $content_type = $analysis['content_type'];
    $languages = implode(', ', $config['language_support'] ?? ['de']);

    $prompt = "You are a Swiss Accessibility Compliance Expert specializing in ECH-0059 standards for municipal websites.

ROLE: Accessibility Enhancement Specialist

COMPLIANCE STANDARD: " . $this->getComplianceDescription($compliance_level) . "

CONTENT TYPE: {$content_type}

LANGUAGES: {$languages}

ECH-0059 EXPERTISE:
- Deep knowledge of Swiss accessibility standards (ECH-0059)
- Understanding of WCAG 2.1 guidelines at A, AA, and AAA levels
- Experience with Swiss municipal digital accessibility requirements
- Knowledge of assistive technology compatibility
- Understanding of Swiss disability rights legislation

ACCESSIBILITY ANALYSIS RESULTS:
- Detected Issues: " . implode(', ', $analysis['issues_detected']) . "
- Compliance Gaps: " . implode(', ', $analysis['compliance_gaps']) . "
- Improvement Opportunities: " . implode(', ', $analysis['improvement_opportunities']) . "

ENHANCEMENT OBJECTIVES:
1. COMPLIANCE: Ensure full ECH-0059 compliance
2. USABILITY: Improve usability for people with disabilities
3. INCLUSIVITY: Create truly inclusive digital experiences
4. TESTING: Provide guidance for accessibility testing
5. MAINTENANCE: Ensure long-term accessibility sustainability

ECH-0059 REQUIREMENTS:
- Perceivable: Information must be presentable in ways users can perceive
- Operable: Interface components must be operable by all users
- Understandable: Information and UI operation must be understandable
- Robust: Content must be robust enough for various assistive technologies

SWISS-SPECIFIC CONSIDERATIONS:
- Multilingual accessibility (German, French, Italian)
- Cultural sensitivity in accessibility features
- Compliance with Swiss disability legislation
- Integration with Swiss eGovernment standards
- Municipal service accessibility requirements";

    if (in_array('alt_text_generation', $config['automatic_fixes'] ?? [])) {
      $prompt .= "\n\nALT TEXT GENERATION: Generate descriptive, contextual alt text for images that serves the content's purpose.";
    }

    if (in_array('heading_structure', $config['automatic_fixes'] ?? [])) {
      $prompt .= "\n\nHEADING STRUCTURE: Analyze and correct heading hierarchy for proper document structure.";
    }

    if ($config['user_testing']) {
      $prompt .= "\n\nUSER TESTING GUIDANCE: Provide specific guidance for accessibility user testing with people with disabilities.";
    }

    $assistive_tech = $config['assistive_technology'] ?? [];
    if (!empty($assistive_tech)) {
      $prompt .= "\n\nASSISTIVE TECHNOLOGY FOCUS: Optimize for: " . implode(', ', $this->getAssistiveTechNames($assistive_tech));
    }

    $prompt .= "\n\nRESPONSE FORMAT:
1. Accessibility Assessment Summary
2. Specific Compliance Issues and Solutions
3. Recommended Improvements
4. Implementation Guidance
5. Testing Recommendations
6. Maintenance Checklist

Provide practical, actionable recommendations that can be implemented by municipal staff.";

    return $prompt;
  }

  /**
   * Detects the type of content being analyzed.
   */
  private function detectContentType(string $input, array $context): string {
    $input_lower = strtolower($input);
    
    // Content type detection patterns
    if (strpos($input_lower, '<form') !== false || strpos($input_lower, 'input') !== false) {
      return 'form';
    } elseif (strpos($input_lower, '<img') !== false || strpos($input_lower, 'image') !== false) {
      return 'image_content';
    } elseif (strpos($input_lower, '<table') !== false || strpos($input_lower, 'tabelle') !== false) {
      return 'table';
    } elseif (strpos($input_lower, '<nav') !== false || strpos($input_lower, 'navigation') !== false) {
      return 'navigation';
    } elseif (strpos($input_lower, 'pdf') !== false || strpos($input_lower, 'document') !== false) {
      return 'document';
    } elseif (strpos($input_lower, 'video') !== false || strpos($input_lower, 'audio') !== false) {
      return 'multimedia';
    } else {
      return 'general_content';
    }
  }

  /**
   * Detects common accessibility issues.
   */
  private function detectAccessibilityIssues(string $input): array {
    $issues = [];
    
    // Check for missing alt text
    if (preg_match('/<img(?![^>]*alt=)/i', $input)) {
      $issues[] = 'missing_alt_text';
    }
    
    // Check for poor heading structure
    if (preg_match('/<h[1-6]/i', $input) && !preg_match('/<h1/i', $input)) {
      $issues[] = 'heading_structure';
    }
    
    // Check for non-descriptive links
    if (preg_match('/<a[^>]*>(?:hier|here|click|mehr|more)<\/a>/i', $input)) {
      $issues[] = 'non_descriptive_links';
    }
    
    // Check for form labels
    if (preg_match('/<input(?![^>]*aria-label)(?![^>]*<label)/i', $input)) {
      $issues[] = 'missing_form_labels';
    }
    
    // Check for color-only information
    if (preg_match('/style="[^"]*color\s*:/i', $input) && !preg_match('/(bold|italic|underline)/i', $input)) {
      $issues[] = 'color_only_information';
    }

    return $issues;
  }

  /**
   * Identifies compliance gaps based on ECH-0059.
   */
  private function identifyComplianceGaps(string $input, array $config): array {
    $gaps = [];
    $compliance_level = $config['compliance_level'] ?? 'ech_0059_standard';
    
    // Basic compliance gaps (Level A)
    if (!preg_match('/lang=/i', $input)) {
      $gaps[] = 'missing_language_declaration';
    }
    
    // Standard compliance gaps (Level AA)
    if ($compliance_level !== 'ech_0059_basic') {
      if (!preg_match('/aria-/i', $input) && preg_match('/<(form|table|nav)/i', $input)) {
        $gaps[] = 'missing_aria_attributes';
      }
    }
    
    // Enhanced compliance gaps (Level AAA)
    if ($compliance_level === 'ech_0059_enhanced') {
      if (!preg_match('/role=/i', $input)) {
        $gaps[] = 'missing_semantic_roles';
      }
    }

    return $gaps;
  }

  /**
   * Finds improvement opportunities.
   */
  private function findImprovementOpportunities(string $input, array $config): array {
    $opportunities = [];
    
    // Check for improvement opportunities based on content
    if (preg_match('/<h[1-6]/i', $input)) {
      $opportunities[] = 'heading_optimization';
    }
    
    if (preg_match('/<form/i', $input)) {
      $opportunities[] = 'form_accessibility_enhancement';
    }
    
    if (preg_match('/<table/i', $input)) {
      $opportunities[] = 'table_accessibility_improvement';
    }
    
    if (preg_match('/(pdf|doc|docx)/i', $input)) {
      $opportunities[] = 'document_accessibility_conversion';
    }

    return $opportunities;
  }

  /**
   * Applies ECH-0059 compliance validation.
   */
  private function applyComplianceValidation(string $response, array $config, array $analysis): string {
    // Add compliance validation header
    $compliance_level = $config['compliance_level'] ?? 'ech_0059_standard';
    $validation_header = "# ECH-0059 Accessibility Enhancement Report\n\n";
    $validation_header .= "**Compliance Level:** " . $this->getComplianceDescription($compliance_level) . "\n";
    $validation_header .= "**Analysis Date:** " . date('d.m.Y H:i') . "\n";
    $validation_header .= "**Content Type:** " . $analysis['content_type'] . "\n\n";
    
    // Add compliance checklist
    $compliance_checklist = $this->generateComplianceChecklist($config, $analysis);
    
    // Add testing recommendations
    $testing_recommendations = $this->generateTestingRecommendations($config);
    
    // Add maintenance guidance
    $maintenance_guidance = $this->generateMaintenanceGuidance($config);
    
    return $validation_header . $response . $compliance_checklist . $testing_recommendations . $maintenance_guidance;
  }

  /**
   * Gets compliance description.
   */
  private function getComplianceDescription(string $level): string {
    $descriptions = [
      'ech_0059_basic' => 'ECH-0059 Basic (WCAG 2.1 Level A)',
      'ech_0059_standard' => 'ECH-0059 Standard (WCAG 2.1 Level AA) - Required for Swiss municipalities',
      'ech_0059_enhanced' => 'ECH-0059 Enhanced (WCAG 2.1 Level AAA) - Best Practice',
    ];
    return $descriptions[$level] ?? $descriptions['ech_0059_standard'];
  }

  /**
   * Gets assistive technology names.
   */
  private function getAssistiveTechNames(array $technologies): array {
    $names = [
      'screen_readers' => 'Screen Readers',
      'voice_control' => 'Voice Control',
      'keyboard_navigation' => 'Keyboard Navigation',
      'magnification' => 'Screen Magnification',
      'switch_control' => 'Switch Control',
    ];
    
    return array_intersect_key($names, array_flip($technologies));
  }

  /**
   * Generates compliance checklist.
   */
  private function generateComplianceChecklist(array $config, array $analysis): string {
    $checklist = "\n\n## ECH-0059 Compliance Checklist\n\n";
    
    $items = [
      '- [ ] All images have appropriate alt text',
      '- [ ] Heading structure is logical and sequential',
      '- [ ] Form elements have proper labels',
      '- [ ] Links are descriptive and contextual',
      '- [ ] Color is not the only means of conveying information',
      '- [ ] Content is keyboard accessible',
      '- [ ] Focus indicators are visible',
      '- [ ] Page has proper language declaration',
      '- [ ] Content is structured with semantic HTML',
      '- [ ] Error messages are clear and helpful',
    ];

    if ($config['compliance_level'] !== 'ech_0059_basic') {
      $items[] = '- [ ] Color contrast meets AA standards (4.5:1 for normal text)';
      $items[] = '- [ ] Content is resizable up to 200% without horizontal scrolling';
      $items[] = '- [ ] No content flashes more than 3 times per second';
    }

    if ($config['compliance_level'] === 'ech_0059_enhanced') {
      $items[] = '- [ ] Color contrast meets AAA standards (7:1 for normal text)';
      $items[] = '- [ ] Content is resizable up to 400%';
      $items[] = '- [ ] Context-sensitive help is available';
    }

    return $checklist . implode("\n", $items) . "\n";
  }

  /**
   * Generates testing recommendations.
   */
  private function generateTestingRecommendations(array $config): string {
    if (!$config['user_testing']) {
      return '';
    }

    $testing = "\n\n## Accessibility Testing Recommendations\n\n";
    $testing .= "### Automated Testing\n";
    $testing .= "- Use axe-core or WAVE for automated accessibility scanning\n";
    $testing .= "- Validate HTML and ARIA markup\n";
    $testing .= "- Check color contrast ratios\n\n";
    
    $testing .= "### Manual Testing\n";
    $testing .= "- Navigate using only keyboard\n";
    $testing .= "- Test with screen reader (NVDA recommended)\n";
    $testing .= "- Verify content at 200% zoom\n";
    $testing .= "- Check focus order and indicators\n\n";
    
    $testing .= "### User Testing\n";
    $testing .= "- Conduct tests with users with disabilities\n";
    $testing .= "- Include diverse disability types and assistive technologies\n";
    $testing .= "- Document user feedback and implement improvements\n";

    return $testing;
  }

  /**
   * Generates maintenance guidance.
   */
  private function generateMaintenanceGuidance(array $config): string {
    $maintenance = "\n\n## Accessibility Maintenance Guide\n\n";
    $maintenance .= "### Regular Checks\n";
    $maintenance .= "- Monthly automated accessibility scans\n";
    $maintenance .= "- Quarterly manual testing sessions\n";
    $maintenance .= "- Annual comprehensive accessibility audit\n\n";
    
    $maintenance .= "### Content Guidelines\n";
    $maintenance .= "- Always include alt text for images\n";
    $maintenance .= "- Use proper heading structure\n";
    $maintenance .= "- Write descriptive link text\n";
    $maintenance .= "- Ensure sufficient color contrast\n\n";
    
    $maintenance .= "### Training and Support\n";
    $maintenance .= "- Regular staff training on accessibility best practices\n";
    $maintenance .= "- Accessibility review process for new content\n";
    $maintenance .= "- Contact information for accessibility support\n\n";
    
    $maintenance .= "**ECH-0059 Compliance Contact:** [Municipality Accessibility Officer]\n";
    $maintenance .= "**Next Review Date:** " . date('d.m.Y', strtotime('+3 months'));

    return $maintenance;
  }

}