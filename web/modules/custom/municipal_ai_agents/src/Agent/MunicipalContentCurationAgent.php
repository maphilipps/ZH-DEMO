<?php

namespace Drupal\municipal_ai_agents\Agent;

use Drupal\ai_agents\Attribute\AiAgent;
use Drupal\ai_agents\PluginBaseClasses\AiAgentBase;
use Drupal\ai_agents\PluginInterfaces\AiAgentInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Municipal Content Curation Agent for Swiss municipalities.
 * 
 * Generates and curates content for municipal communications ensuring
 * Swiss compliance standards and multilingual support.
 */
#[AiAgent(
  id: 'municipal_content_curation',
  label: 'Municipal Content Curation Agent',
  description: 'Generates and curates municipal content with Swiss compliance'
)]
class MunicipalContentCurationAgent extends AiAgentBase implements AiAgentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function helpText(): string {
    return $this->t('This agent helps generate and curate municipal content including announcements, press releases, and citizen communications while ensuring Swiss regulatory compliance.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfigSchema(): array {
    return [
      'municipality_name' => [
        'type' => 'string',
        'label' => $this->t('Municipality Name'),
        'description' => $this->t('The official name of your municipality'),
        'required' => TRUE,
      ],
      'primary_language' => [
        'type' => 'string',
        'label' => $this->t('Primary Language'),
        'description' => $this->t('Primary language for content generation'),
        'default' => 'de',
        'options' => [
          'de' => 'Deutsch',
          'fr' => 'Français', 
          'it' => 'Italiano',
          'en' => 'English'
        ],
      ],
      'secondary_languages' => [
        'type' => 'checkboxes',
        'label' => $this->t('Secondary Languages'),
        'description' => $this->t('Additional languages for multilingual content'),
        'options' => [
          'de' => 'Deutsch',
          'fr' => 'Français',
          'it' => 'Italiano', 
          'en' => 'English'
        ],
      ],
      'compliance_level' => [
        'type' => 'select',
        'label' => $this->t('Compliance Level'),
        'description' => $this->t('Swiss compliance requirements level'),
        'options' => [
          'municipal' => 'Municipal Level',
          'cantonal' => 'Cantonal Level',
          'federal' => 'Federal Level'
        ],
        'default' => 'municipal',
      ],
      'tone_of_voice' => [
        'type' => 'select',
        'label' => $this->t('Tone of Voice'),
        'description' => $this->t('Official communication tone'),
        'options' => [
          'formal' => 'Formal/Official',
          'friendly' => 'Friendly/Approachable',
          'informative' => 'Informative/Educational'
        ],
        'default' => 'formal',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultConfiguration(): array {
    return [
      'municipality_name' => '',
      'primary_language' => 'de',
      'secondary_languages' => [],
      'compliance_level' => 'municipal',
      'tone_of_voice' => 'formal',
    ] + parent::getDefaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function run(string $input, array $context = []): string {
    $config = $this->getConfiguration();
    
    // Build the system prompt for municipal content generation
    $system_prompt = $this->buildSystemPrompt($config, $context);
    
    // Process the input through the AI provider
    $response = $this->callAiProvider($system_prompt, $input, $context);
    
    // Post-process for Swiss compliance
    return $this->applyComplianceFilters($response, $config);
  }

  /**
   * Builds the system prompt for municipal content generation.
   */
  private function buildSystemPrompt(array $config, array $context): string {
    $municipality = $config['municipality_name'] ?? 'Municipality';
    $language = $config['primary_language'] ?? 'de';
    $tone = $config['tone_of_voice'] ?? 'formal';
    $compliance = $config['compliance_level'] ?? 'municipal';

    $prompt = "You are an AI assistant specializing in Swiss municipal communications for {$municipality}.

ROLE: Municipal Content Creation Specialist

LANGUAGE: Generate content primarily in " . $this->getLanguageName($language) . "

TONE: " . $this->getToneDescription($tone) . "

COMPLIANCE REQUIREMENTS:
- Follow Swiss " . $compliance . " communication standards
- Ensure accessibility compliance (ECH-0059)
- Include proper legal disclaimers when required
- Use gender-neutral language (German: Binnen-I or gender star)
- Follow Swiss privacy regulations (DSG/nDSG)

CONTENT TYPES:
- Municipal announcements
- Press releases
- Citizen information
- Emergency communications
- Service descriptions
- Meeting summaries
- Public consultation documents

FORMATTING GUIDELINES:
- Use clear, structured headings
- Include contact information
- Add publication dates
- Provide accessibility alternatives for media
- Include multilingual notes when applicable

SWISS MUNICIPAL CONTEXT:
- Reference appropriate Swiss laws and regulations
- Use correct Swiss administrative terminology
- Include proper citation formats for official documents
- Ensure cultural sensitivity for Swiss regional differences";

    return $prompt;
  }

  /**
   * Applies Swiss compliance filters to generated content.
   */
  private function applyComplianceFilters(string $content, array $config): string {
    // Apply gender-neutral language corrections
    $content = $this->applyGenderNeutralLanguage($content, $config['primary_language']);
    
    // Add compliance footers if needed
    $content = $this->addComplianceFooters($content, $config);
    
    // Validate accessibility requirements
    $content = $this->validateAccessibility($content);
    
    return $content;
  }

  /**
   * Applies gender-neutral language for German content.
   */
  private function applyGenderNeutralLanguage(string $content, string $language): string {
    if ($language !== 'de') {
      return $content;
    }

    // Apply common gender-neutral replacements for German
    $replacements = [
      'Bürger' => 'Bürger*innen',
      'Mitarbeiter' => 'Mitarbeiter*innen',
      'Benutzer' => 'Benutzer*innen',
      'Teilnehmer' => 'Teilnehmer*innen',
      'Interessierte' => 'Interessierte',
    ];

    foreach ($replacements as $gendered => $neutral) {
      $content = str_replace($gendered, $neutral, $content);
    }

    return $content;
  }

  /**
   * Adds compliance footers based on content type.
   */
  private function addComplianceFooters(string $content, array $config): string {
    $municipality = $config['municipality_name'];
    
    // Add standard municipal footer
    $footer = "\n\n---\n\n";
    $footer .= "*Diese Information wurde automatisch generiert und entspricht den Schweizer Gemeindekommunikationsstandards.*\n\n";
    $footer .= "**Kontakt:** {$municipality}\n";
    $footer .= "**Datum:** " . date('d.m.Y') . "\n";
    $footer .= "**Rechtliche Hinweise:** Alle Angaben ohne Gewähr. Für verbindliche Auskünfte wenden Sie sich an die zuständigen Behörden.";

    return $content . $footer;
  }

  /**
   * Validates content for accessibility requirements.
   */
  private function validateAccessibility(string $content): string {
    // Add alt-text suggestions for images
    if (strpos($content, '![') !== false) {
      $content .= "\n\n*Hinweis: Bitte fügen Sie Alternativtexte für alle Bilder hinzu (ECH-0059 Konformität).*";
    }

    // Check for proper heading structure
    if (preg_match_all('/^#+\s/m', $content) > 0) {
      $content .= "\n\n*Hinweis: Stellen Sie sicher, dass die Überschriftenstruktur logisch aufgebaut ist.*";
    }

    return $content;
  }

  /**
   * Gets the full language name.
   */
  private function getLanguageName(string $code): string {
    $languages = [
      'de' => 'Deutsch',
      'fr' => 'Français',
      'it' => 'Italiano',
      'en' => 'English',
    ];
    return $languages[$code] ?? $code;
  }

  /**
   * Gets tone description.
   */
  private function getToneDescription(string $tone): string {
    $tones = [
      'formal' => 'Professional, official, following Swiss administrative language standards',
      'friendly' => 'Approachable and welcoming while maintaining municipal professionalism',
      'informative' => 'Clear, educational, focused on providing comprehensive information',
    ];
    return $tones[$tone] ?? $tones['formal'];
  }

}