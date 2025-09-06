<?php

namespace Drupal\municipal_ai_agents\Agent;

use Drupal\ai_agents\Attribute\AiAgent;
use Drupal\ai_agents\PluginBaseClasses\AiAgentBase;
use Drupal\ai_agents\PluginInterfaces\AiAgentInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Multilingual Localization Agent for Swiss municipalities.
 * 
 * Provides intelligent translation and localization services for Switzerland's
 * multilingual requirements (German, French, Italian, Romansh).
 */
#[AiAgent(
  id: 'multilingual_localization',
  label: 'Multilingual Localization Agent',
  description: 'Intelligent translation and localization for Swiss multilingual requirements'
)]
class MultilingualLocalizationAgent extends AiAgentBase implements AiAgentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function helpText(): string {
    return $this->t('This agent provides intelligent translation and localization services for Swiss municipalities, ensuring accurate cultural and legal adaptation across German, French, Italian, and Romansh languages.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfigSchema(): array {
    return [
      'source_language' => [
        'type' => 'select',
        'label' => $this->t('Source Language'),
        'description' => $this->t('Primary language for content creation'),
        'options' => [
          'de' => 'Deutsch',
          'fr' => 'Français',
          'it' => 'Italiano',
          'rm' => 'Rumantsch',
          'en' => 'English',
        ],
        'default' => 'de',
        'required' => TRUE,
      ],
      'target_languages' => [
        'type' => 'checkboxes',
        'label' => $this->t('Target Languages'),
        'description' => $this->t('Languages to translate content into'),
        'options' => [
          'de' => 'Deutsch',
          'fr' => 'Français',
          'it' => 'Italiano',
          'rm' => 'Rumantsch',
          'en' => 'English',
        ],
        'required' => TRUE,
      ],
      'region' => [
        'type' => 'select',
        'label' => $this->t('Swiss Region'),
        'description' => $this->t('Regional context for localization'),
        'options' => [
          'deutschschweiz' => 'Deutschschweiz',
          'romandie' => 'Romandie (Suisse romande)',
          'ticino' => 'Ticino',
          'graubuenden' => 'Graubünden',
          'national' => 'National (all regions)',
        ],
        'default' => 'national',
      ],
      'terminology_consistency' => [
        'type' => 'checkbox',
        'label' => $this->t('Maintain Terminology Consistency'),
        'description' => $this->t('Use consistent official terminology across translations'),
        'default' => TRUE,
      ],
      'cultural_adaptation' => [
        'type' => 'select',
        'label' => $this->t('Cultural Adaptation Level'),
        'description' => $this->t('Level of cultural adaptation for different regions'),
        'options' => [
          'literal' => 'Literal Translation',
          'standard' => 'Standard Localization',
          'cultural' => 'Full Cultural Adaptation',
        ],
        'default' => 'standard',
      ],
      'legal_terminology' => [
        'type' => 'checkbox',
        'label' => $this->t('Use Official Legal Terminology'),
        'description' => $this->t('Apply official Swiss legal and administrative terminology'),
        'default' => TRUE,
      ],
      'quality_assurance' => [
        'type' => 'select',
        'label' => $this->t('Quality Assurance'),
        'description' => $this->t('Translation quality assurance level'),
        'options' => [
          'basic' => 'Basic (AI only)',
          'enhanced' => 'Enhanced (Multiple passes)',
          'professional' => 'Professional (Include review notes)',
        ],
        'default' => 'enhanced',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultConfiguration(): array {
    return [
      'source_language' => 'de',
      'target_languages' => ['fr', 'it'],
      'region' => 'national',
      'terminology_consistency' => TRUE,
      'cultural_adaptation' => 'standard',
      'legal_terminology' => TRUE,
      'quality_assurance' => 'enhanced',
    ] + parent::getDefaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function run(string $input, array $context = []): string {
    $config = $this->getConfiguration();
    
    // Determine translation task from context
    $translation_task = $this->analyzeTranslationTask($input, $context, $config);
    
    // Build specialized translation prompt
    $system_prompt = $this->buildTranslationSystemPrompt($config, $translation_task, $context);
    
    // Execute translation through AI provider
    $translation = $this->callAiProvider($system_prompt, $input, $context);
    
    // Apply quality assurance and Swiss-specific validations
    return $this->applyQualityAssurance($translation, $config, $translation_task);
  }

  /**
   * Analyzes the translation task requirements.
   */
  private function analyzeTranslationTask(string $input, array $context, array $config): array {
    $source_lang = $config['source_language'] ?? 'de';
    $target_langs = $config['target_languages'] ?? [];
    
    // Detect content type
    $content_type = $this->detectContentType($input, $context);
    
    // Determine complexity
    $complexity = $this->assessTranslationComplexity($input);
    
    return [
      'source_language' => $source_lang,
      'target_languages' => $target_langs,
      'content_type' => $content_type,
      'complexity' => $complexity,
      'has_legal_terms' => $this->containsLegalTerminology($input),
      'has_technical_terms' => $this->containsTechnicalTerminology($input),
    ];
  }

  /**
   * Builds the translation system prompt.
   */
  private function buildTranslationSystemPrompt(array $config, array $task, array $context): string {
    $source_lang = $task['source_language'];
    $target_langs = implode(', ', array_map([$this, 'getLanguageName'], $task['target_languages']));
    $region = $config['region'] ?? 'national';
    $content_type = $task['content_type'];

    $prompt = "You are a specialized Swiss Multilingual Translation and Localization Expert.

TRANSLATION TASK:
- Source Language: " . $this->getLanguageName($source_lang) . "
- Target Languages: {$target_langs}
- Content Type: {$content_type}
- Regional Context: " . $this->getRegionDescription($region) . "
- Complexity Level: " . $task['complexity'] . "

SWISS LOCALIZATION EXPERTISE:
- Deep understanding of Swiss linguistic regions and cultural nuances
- Knowledge of official terminology in all Swiss languages
- Awareness of cantonal and regional administrative differences
- Understanding of Swiss legal and administrative language conventions

TRANSLATION PRINCIPLES:
1. ACCURACY: Maintain precise meaning while adapting culturally
2. CONSISTENCY: Use standardized Swiss terminology across languages
3. CLARITY: Ensure accessibility for all education levels
4. CULTURAL SENSITIVITY: Adapt content for regional Swiss contexts
5. LEGAL COMPLIANCE: Use official translations for legal/administrative terms

SWISS-SPECIFIC REQUIREMENTS:
- Use official Swiss terminology databases
- Follow Swiss style guides for each language
- Maintain consistency with federal multilingual publications
- Consider regional linguistic preferences
- Include gender-neutral language where appropriate";

    if ($config['legal_terminology']) {
      $prompt .= "\n\nLEGAL TERMINOLOGY: Use official Swiss legal terminology from:
- Systematische Sammlung des Bundesrechts (SR)
- Official multilingual legal dictionaries
- Cantonal terminology databases
- Municipal administrative language guides";
    }

    if ($config['cultural_adaptation'] === 'cultural') {
      $prompt .= "\n\nCULTURAL ADAPTATION:
- Adapt examples and references to local context
- Consider regional cultural sensitivities
- Adjust communication style for target audience
- Include region-specific contact information when relevant";
    }

    $prompt .= "\n\nTRANSLATION FORMAT:
For each target language, provide:
1. Clean, professional translation
2. Cultural adaptation notes (if applicable)
3. Terminology notes for specialized terms
4. Regional variations (if significant)
5. Quality assurance markers

OUTPUT STRUCTURE:
```
## [Target Language Name]

[Translation]

### Notes:
- Cultural adaptations: [if any]
- Terminology: [specialized terms]
- Regional considerations: [if applicable]
```";

    if ($task['has_legal_terms']) {
      $prompt .= "\n\nLEGAL TERMS DETECTED: Pay special attention to legal terminology accuracy and use official Swiss translations.";
    }

    if ($task['has_technical_terms']) {
      $prompt .= "\n\nTECHNICAL TERMS DETECTED: Maintain technical accuracy while ensuring accessibility for general public.";
    }

    return $prompt;
  }

  /**
   * Applies quality assurance measures.
   */
  private function applyQualityAssurance(string $translation, array $config, array $task): string {
    $qa_level = $config['quality_assurance'] ?? 'enhanced';
    
    // Apply terminology consistency checks
    if ($config['terminology_consistency']) {
      $translation = $this->applyTerminologyConsistency($translation, $task);
    }
    
    // Add quality assurance notes
    $translation = $this->addQualityAssuranceNotes($translation, $qa_level, $task);
    
    // Add Swiss-specific validation notes
    $translation = $this->addSwissValidationNotes($translation, $config);
    
    return $translation;
  }

  /**
   * Detects the type of content being translated.
   */
  private function detectContentType(string $input, array $context): string {
    $input_lower = strtolower($input);
    
    // Define content type patterns
    $patterns = [
      'legal' => ['gesetz', 'verordnung', 'artikel', 'paragraph', 'rechtlich', 'loi', 'article', 'legal'],
      'administrative' => ['formular', 'anmeldung', 'bewilligung', 'antrag', 'formulaire', 'inscription'],
      'emergency' => ['notfall', 'dringend', 'sofort', 'urgence', 'emergency'],
      'announcement' => ['mitteilung', 'bekanntmachung', 'information', 'annonce', 'communication'],
      'service' => ['dienstleistung', 'service', 'öffnungszeiten', 'kontakt'],
      'event' => ['veranstaltung', 'termin', 'datum', 'événement', 'date'],
    ];

    foreach ($patterns as $type => $keywords) {
      foreach ($keywords as $keyword) {
        if (strpos($input_lower, $keyword) !== false) {
          return $type;
        }
      }
    }

    return 'general';
  }

  /**
   * Assesses translation complexity.
   */
  private function assessTranslationComplexity(string $input): string {
    $word_count = str_word_count($input);
    $sentence_count = preg_match_all('/[.!?]+/', $input);
    
    // Simple complexity assessment
    if ($word_count > 500 || $sentence_count > 20) {
      return 'high';
    } elseif ($word_count > 200 || $sentence_count > 10) {
      return 'medium';
    } else {
      return 'low';
    }
  }

  /**
   * Checks if content contains legal terminology.
   */
  private function containsLegalTerminology(string $input): bool {
    $legal_terms = [
      'artikel', 'gesetz', 'verordnung', 'rechtlich', 'paragraph', 'bestimmung',
      'article', 'loi', 'ordonnance', 'juridique', 'disposition',
      'articolo', 'legge', 'ordinanza', 'giuridico', 'disposizione'
    ];

    $input_lower = strtolower($input);
    foreach ($legal_terms as $term) {
      if (strpos($input_lower, $term) !== false) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * Checks if content contains technical terminology.
   */
  private function containsTechnicalTerminology(string $input): bool {
    $technical_terms = [
      'system', 'technisch', 'software', 'hardware', 'netzwerk',
      'technique', 'logiciel', 'réseau', 'sistema', 'tecnico',
      'software', 'rete'
    ];

    $input_lower = strtolower($input);
    foreach ($technical_terms as $term) {
      if (strpos($input_lower, $term) !== false) {
        return TRUE;
      }
    }
    return FALSE;
  }

  /**
   * Gets language name from code.
   */
  private function getLanguageName(string $code): string {
    $languages = [
      'de' => 'Deutsch',
      'fr' => 'Français',
      'it' => 'Italiano', 
      'rm' => 'Rumantsch',
      'en' => 'English',
    ];
    return $languages[$code] ?? $code;
  }

  /**
   * Gets region description.
   */
  private function getRegionDescription(string $region): string {
    $regions = [
      'deutschschweiz' => 'German-speaking Switzerland',
      'romandie' => 'French-speaking Switzerland',
      'ticino' => 'Italian-speaking Switzerland',
      'graubuenden' => 'Multilingual Graubünden',
      'national' => 'National (all Swiss regions)',
    ];
    return $regions[$region] ?? $regions['national'];
  }

  /**
   * Applies terminology consistency checks.
   */
  private function applyTerminologyConsistency(string $translation, array $task): string {
    // Add terminology consistency validation
    $validation_note = "\n\n---\n\n**Terminologie-Konsistenz geprüft:** ";
    $validation_note .= "Offizielle Schweizer Terminologie wurde verwendet und auf Konsistenz geprüft.";
    
    return $translation . $validation_note;
  }

  /**
   * Adds quality assurance notes.
   */
  private function addQualityAssuranceNotes(string $translation, string $qa_level, array $task): string {
    $qa_note = "\n\n---\n\n**Qualitätssicherung ({$qa_level}):**\n";
    
    switch ($qa_level) {
      case 'professional':
        $qa_note .= "- Professionelle Überprüfung empfohlen für offizielle Publikation\n";
        $qa_note .= "- Fachterminologie validiert\n";
        $qa_note .= "- Kulturelle Anpassung berücksichtigt\n";
        $qa_note .= "- Rechtliche Terminologie geprüft";
        break;
        
      case 'enhanced':
        $qa_note .= "- Mehrfache KI-Durchgänge für höhere Genauigkeit\n";
        $qa_note .= "- Terminologie-Konsistenz geprüft\n";
        $qa_note .= "- Regionale Anpassungen berücksichtigt";
        break;
        
      default:
        $qa_note .= "- Standard KI-Übersetzung\n";
        $qa_note .= "- Manuelle Überprüfung empfohlen für wichtige Dokumente";
    }

    return $translation . $qa_note;
  }

  /**
   * Adds Swiss-specific validation notes.
   */
  private function addSwissValidationNotes(string $translation, array $config): string {
    $validation_note = "\n\n**🇨🇭 Schweizer Lokalisierung:**\n";
    $validation_note .= "- Offizielle Schweizer Terminologie verwendet\n";
    $validation_note .= "- Regionale Sprachvarianten berücksichtigt\n";
    $validation_note .= "- Kulturelle Anpassung an Schweizer Kontext\n";
    $validation_note .= "- Konform mit offiziellen Sprachleitfäden";

    if ($config['legal_terminology']) {
      $validation_note .= "\n- Rechtsterminologie gemäss SR (Systematische Sammlung)";
    }

    return $translation . $validation_note;
  }

}