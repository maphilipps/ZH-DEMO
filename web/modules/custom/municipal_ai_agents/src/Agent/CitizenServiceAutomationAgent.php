<?php

namespace Drupal\municipal_ai_agents\Agent;

use Drupal\ai_agents\Attribute\AiAgent;
use Drupal\ai_agents\PluginBaseClasses\AiAgentBase;
use Drupal\ai_agents\PluginInterfaces\AiAgentInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Citizen Service Automation Agent for Swiss municipalities.
 * 
 * Automates common citizen service processes including form assistance,
 * document guidance, and service information provision.
 */
#[AiAgent(
  id: 'citizen_service_automation',
  label: 'Citizen Service Automation Agent',
  description: 'Automates citizen service processes and provides guidance for municipal services'
)]
class CitizenServiceAutomationAgent extends AiAgentBase implements AiAgentInterface {

  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function helpText(): string {
    return $this->t('This agent automates citizen service processes including form assistance, document guidance, appointment scheduling, and service information provision for Swiss municipalities.');
  }

  /**
   * {@inheritdoc}
   */
  public function getConfigSchema(): array {
    return [
      'municipality_services' => [
        'type' => 'checkboxes',
        'label' => $this->t('Available Services'),
        'description' => $this->t('Select the municipal services this agent can assist with'),
        'options' => [
          'residence_registration' => 'Anmeldung/Abmeldung',
          'id_documents' => 'Ausweisdokumente',
          'building_permits' => 'Baubewilligungen',
          'business_licenses' => 'Gewerbebewilligungen',
          'civil_registry' => 'Zivilstandsamt',
          'tax_services' => 'Steuerdienste',
          'waste_management' => 'Abfallentsorgung',
          'parking_permits' => 'Parkbewilligungen',
          'social_services' => 'Soziale Dienste',
          'education_services' => 'Bildungswesen',
        ],
        'required' => TRUE,
      ],
      'operating_hours' => [
        'type' => 'textfield',
        'label' => $this->t('Operating Hours'),
        'description' => $this->t('Municipal office operating hours'),
        'default' => 'Mo-Fr 08:00-17:00',
      ],
      'emergency_contact' => [
        'type' => 'textfield',
        'label' => $this->t('Emergency Contact'),
        'description' => $this->t('Emergency contact information'),
        'default' => '117 (Polizei), 118 (Feuerwehr), 144 (Sanität)',
      ],
      'appointment_system' => [
        'type' => 'checkbox',
        'label' => $this->t('Enable Appointment Scheduling'),
        'description' => $this->t('Allow the agent to help with appointment scheduling'),
        'default' => TRUE,
      ],
      'document_upload_guidance' => [
        'type' => 'checkbox',
        'label' => $this->t('Document Upload Guidance'),
        'description' => $this->t('Provide guidance for document uploads and requirements'),
        'default' => TRUE,
      ],
      'privacy_level' => [
        'type' => 'select',
        'label' => $this->t('Privacy Level'),
        'description' => $this->t('Data privacy handling level'),
        'options' => [
          'strict' => 'Strict (No personal data processing)',
          'standard' => 'Standard (Limited personal data)',
          'enhanced' => 'Enhanced (Full service with consent)',
        ],
        'default' => 'standard',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getDefaultConfiguration(): array {
    return [
      'municipality_services' => [],
      'operating_hours' => 'Mo-Fr 08:00-17:00',
      'emergency_contact' => '117 (Polizei), 118 (Feuerwehr), 144 (Sanität)',
      'appointment_system' => TRUE,
      'document_upload_guidance' => TRUE,
      'privacy_level' => 'standard',
    ] + parent::getDefaultConfiguration();
  }

  /**
   * {@inheritdoc}
   */
  public function run(string $input, array $context = []): string {
    $config = $this->getConfiguration();
    
    // Analyze the citizen's request
    $request_type = $this->analyzeRequestType($input, $config);
    
    // Build appropriate system prompt
    $system_prompt = $this->buildServiceSystemPrompt($config, $request_type, $context);
    
    // Process through AI provider
    $response = $this->callAiProvider($system_prompt, $input, $context);
    
    // Apply Swiss service standards and privacy compliance
    return $this->applyServiceStandards($response, $config, $request_type);
  }

  /**
   * Analyzes the type of citizen service request.
   */
  private function analyzeRequestType(string $input, array $config): string {
    $services = $config['municipality_services'] ?? [];
    $input_lower = strtolower($input);
    
    // Simple keyword matching for service type detection
    $service_keywords = [
      'residence_registration' => ['anmeldung', 'abmeldung', 'umzug', 'wohnsitz', 'adresse'],
      'id_documents' => ['pass', 'ausweis', 'identität', 'dokument'],
      'building_permits' => ['baubewilligung', 'bauen', 'renovation', 'baugesuch'],
      'business_licenses' => ['gewerbe', 'business', 'lizenz', 'bewilligung'],
      'civil_registry' => ['zivilstand', 'heirat', 'geburt', 'tod', 'standesamt'],
      'tax_services' => ['steuer', 'tax', 'abrechnung'],
      'waste_management' => ['abfall', 'müll', 'entsorgung', 'recycling'],
      'parking_permits' => ['parken', 'parkplatz', 'bewilligung'],
      'social_services' => ['sozial', 'hilfe', 'unterstützung'],
      'education_services' => ['schule', 'bildung', 'kindergarten'],
    ];

    foreach ($service_keywords as $service => $keywords) {
      if (in_array($service, $services)) {
        foreach ($keywords as $keyword) {
          if (strpos($input_lower, $keyword) !== false) {
            return $service;
          }
        }
      }
    }

    return 'general_inquiry';
  }

  /**
   * Builds system prompt for citizen service assistance.
   */
  private function buildServiceSystemPrompt(array $config, string $request_type, array $context): string {
    $services = $config['municipality_services'] ?? [];
    $hours = $config['operating_hours'] ?? 'Mo-Fr 08:00-17:00';
    $emergency = $config['emergency_contact'] ?? '';
    $privacy_level = $config['privacy_level'] ?? 'standard';

    $prompt = "You are a Swiss Municipal Citizen Service Assistant specializing in helping residents with municipal services and procedures.

ROLE: Municipal Service Automation Specialist

AVAILABLE SERVICES: " . implode(', ', $this->getServiceNames($services)) . "

CURRENT REQUEST TYPE: " . $this->getServiceDescription($request_type) . "

OPERATING INFORMATION:
- Office Hours: {$hours}
- Emergency Contacts: {$emergency}
- Privacy Level: " . $this->getPrivacyDescription($privacy_level) . "

SERVICE GUIDELINES:
1. ACCURACY: Provide accurate, up-to-date information about Swiss municipal procedures
2. CLARITY: Use clear, simple language appropriate for all education levels
3. COMPLETENESS: Include all required documents, fees, and timeframes
4. ACCESSIBILITY: Ensure information is accessible to people with disabilities
5. MULTILINGUAL: Offer to provide information in other Swiss languages when needed

SWISS MUNICIPAL PROCEDURES:
- Reference current Swiss laws and regulations (OR, ZGB, etc.)
- Include cantonal and municipal-specific requirements
- Provide official form numbers and references
- Mention online services (eGovernment) when available
- Include appeal processes and rights

RESPONSE FORMAT:
1. Brief acknowledgment of the request
2. Step-by-step procedure explanation
3. Required documents list
4. Fees and timeframes
5. Contact information for further assistance
6. Next steps or follow-up actions

PRIVACY COMPLIANCE:
- " . $this->getPrivacyInstructions($privacy_level) . "
- Always inform about data processing purposes
- Explain citizen rights regarding data processing

HELPFUL ADDITIONS:
- Suggest relevant online services
- Mention appointment booking if applicable
- Provide alternative contact methods
- Include accessibility accommodations";

    if ($config['appointment_system']) {
      $prompt .= "\n\nAPPOINTMENT SCHEDULING: Offer to help schedule appointments when appropriate.";
    }

    if ($config['document_upload_guidance']) {
      $prompt .= "\n\nDOCUMENT GUIDANCE: Provide detailed guidance on document requirements, formats, and upload procedures.";
    }

    return $prompt;
  }

  /**
   * Applies Swiss service standards to the response.
   */
  private function applyServiceStandards(string $response, array $config, string $request_type): string {
    // Add service-specific compliance notes
    $response = $this->addServiceCompliance($response, $request_type);
    
    // Add contact information
    $response = $this->addContactInformation($response, $config);
    
    // Add privacy notice
    $response = $this->addPrivacyNotice($response, $config['privacy_level']);
    
    // Add accessibility note
    $response .= "\n\n📞 **Barrierefreiheit:** Bei Schwierigkeiten mit digitalen Services stehen wir Ihnen gerne telefonisch oder persönlich zur Verfügung.";
    
    return $response;
  }

  /**
   * Gets service names in German.
   */
  private function getServiceNames(array $services): array {
    $names = [
      'residence_registration' => 'Anmeldung/Abmeldung',
      'id_documents' => 'Ausweisdokumente',
      'building_permits' => 'Baubewilligungen',
      'business_licenses' => 'Gewerbebewilligungen',
      'civil_registry' => 'Zivilstandsamt',
      'tax_services' => 'Steuerdienste',
      'waste_management' => 'Abfallentsorgung',
      'parking_permits' => 'Parkbewilligungen',
      'social_services' => 'Soziale Dienste',
      'education_services' => 'Bildungswesen',
    ];

    return array_intersect_key($names, array_flip($services));
  }

  /**
   * Gets service description for the current request.
   */
  private function getServiceDescription(string $service): string {
    $descriptions = [
      'residence_registration' => 'Anmeldung und Abmeldung von Wohnsitz',
      'id_documents' => 'Ausstellung von Identitätsdokumenten',
      'building_permits' => 'Baubewilligungsverfahren',
      'business_licenses' => 'Gewerbebewilligungen',
      'civil_registry' => 'Zivilstandsangelegenheiten',
      'tax_services' => 'Steuerdienstleistungen',
      'waste_management' => 'Abfallentsorgung und Recycling',
      'parking_permits' => 'Parkplatzbewilligungen',
      'social_services' => 'Soziale Dienstleistungen',
      'education_services' => 'Bildungsdienstleistungen',
      'general_inquiry' => 'Allgemeine Anfrage',
    ];

    return $descriptions[$service] ?? 'Allgemeine Dienstleistung';
  }

  /**
   * Gets privacy level description.
   */
  private function getPrivacyDescription(string $level): string {
    $descriptions = [
      'strict' => 'No personal data processing without explicit consent',
      'standard' => 'Limited personal data processing for service provision',
      'enhanced' => 'Comprehensive service with full data processing capabilities',
    ];
    return $descriptions[$level] ?? $descriptions['standard'];
  }

  /**
   * Gets privacy instructions based on level.
   */
  private function getPrivacyInstructions(string $level): string {
    $instructions = [
      'strict' => 'Do not ask for or process any personal information',
      'standard' => 'Only request essential personal information for service provision',
      'enhanced' => 'May process personal information with proper consent and security measures',
    ];
    return $instructions[$level] ?? $instructions['standard'];
  }

  /**
   * Adds service-specific compliance notes.
   */
  private function addServiceCompliance(string $response, string $service): string {
    $compliance_notes = [
      'residence_registration' => 'Hinweis: Anmeldung muss innerhalb von 14 Tagen nach Zuzug erfolgen (ZGB Art. 23).',
      'building_permits' => 'Hinweis: Alle Bauarbeiten benötigen eine gültige Baubewilligung gemäss kantonalem Baugesetz.',
      'business_licenses' => 'Hinweis: Gewerbeanmeldung muss vor Geschäftseröffnung erfolgen.',
    ];

    if (isset($compliance_notes[$service])) {
      $response .= "\n\n⚖️ **Rechtlicher Hinweis:** " . $compliance_notes[$service];
    }

    return $response;
  }

  /**
   * Adds contact information to response.
   */
  private function addContactInformation(string $response, array $config): string {
    $hours = $config['operating_hours'] ?? 'Mo-Fr 08:00-17:00';
    
    $contact_info = "\n\n📞 **Kontakt & Öffnungszeiten:**\n";
    $contact_info .= "- Öffnungszeiten: {$hours}\n";
    $contact_info .= "- Für dringende Anliegen wenden Sie sich an unser Bürgerbüro\n";
    
    if ($config['appointment_system']) {
      $contact_info .= "- Online-Terminbuchung verfügbar\n";
    }

    return $response . $contact_info;
  }

  /**
   * Adds privacy notice to response.
   */
  private function addPrivacyNotice(string $response, string $privacy_level): string {
    $notice = "\n\n🔒 **Datenschutz:** ";
    
    switch ($privacy_level) {
      case 'strict':
        $notice .= "Ihre Daten werden nicht gespeichert oder verarbeitet. Für Dienstleistungen mit Datenverarbeitung besuchen Sie bitte unsere Geschäftsstelle.";
        break;
      case 'enhanced':
        $notice .= "Mit Ihrer Zustimmung verarbeiten wir Ihre Daten zur optimalen Dienstleistungserbringung gemäss Schweizer Datenschutzgesetz.";
        break;
      default:
        $notice .= "Ihre Daten werden nur für die Dienstleistungserbringung verwendet und gemäss Schweizer Datenschutzgesetz geschützt.";
    }

    return $response . $notice;
  }

}