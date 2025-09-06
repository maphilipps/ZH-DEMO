<?php

namespace Drupal\municipal_ai_agents\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\ai_agents\AiAgentManager;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Configuration form for Municipal AI Agents.
 */
class MunicipalAiAgentsSettingsForm extends ConfigFormBase {

  /**
   * The AI agent manager.
   *
   * @var \Drupal\ai_agents\AiAgentManager
   */
  protected $agentManager;

  /**
   * Constructs a MunicipalAiAgentsSettingsForm object.
   */
  public function __construct(ConfigFactoryInterface $config_factory, AiAgentManager $agent_manager) {
    parent::__construct($config_factory);
    $this->agentManager = $agent_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('ai_agents.agent_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['municipal_ai_agents.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'municipal_ai_agents_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('municipal_ai_agents.settings');

    $form['general'] = [
      '#type' => 'details',
      '#title' => $this->t('General Settings'),
      '#open' => TRUE,
    ];

    $form['general']['municipality_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Municipality Name'),
      '#description' => $this->t('The official name of your municipality'),
      '#default_value' => $config->get('municipality_name'),
      '#required' => TRUE,
    ];

    $form['general']['default_language'] = [
      '#type' => 'select',
      '#title' => $this->t('Default Language'),
      '#description' => $this->t('Primary language for AI agents'),
      '#options' => [
        'de' => 'Deutsch',
        'fr' => 'Français',
        'it' => 'Italiano',
        'en' => 'English',
      ],
      '#default_value' => $config->get('default_language'),
      '#required' => TRUE,
    ];

    $form['general']['supported_languages'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Supported Languages'),
      '#description' => $this->t('Languages supported by the AI agents'),
      '#options' => [
        'de' => 'Deutsch',
        'fr' => 'Français',
        'it' => 'Italiano',
        'en' => 'English',
      ],
      '#default_value' => $config->get('supported_languages') ?: ['de'],
    ];

    $form['compliance'] = [
      '#type' => 'details',
      '#title' => $this->t('Swiss Compliance Settings'),
      '#open' => TRUE,
    ];

    $form['compliance']['swiss_compliance_enabled'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Swiss Data Sovereignty Compliance'),
      '#description' => $this->t('Ensures all AI processing complies with Swiss data sovereignty requirements'),
      '#default_value' => $config->get('swiss_compliance_enabled'),
    ];

    $form['compliance']['compliance_level'] = [
      '#type' => 'select',
      '#title' => $this->t('Accessibility Compliance Level'),
      '#description' => $this->t('Target ECH-0059 compliance level'),
      '#options' => [
        'ech_0059_basic' => 'ECH-0059 Basic (WCAG 2.1 A)',
        'ech_0059_standard' => 'ECH-0059 Standard (WCAG 2.1 AA)',
        'ech_0059_enhanced' => 'ECH-0059 Enhanced (WCAG 2.1 AAA)',
      ],
      '#default_value' => $config->get('compliance_level'),
      '#required' => TRUE,
    ];

    $form['compliance']['data_retention_period'] = [
      '#type' => 'select',
      '#title' => $this->t('Data Retention Period'),
      '#description' => $this->t('How long to retain AI processing data'),
      '#options' => [
        '30_days' => '30 Days',
        '90_days' => '90 Days',
        '6_months' => '6 Months',
        '1_year' => '1 Year',
      ],
      '#default_value' => $config->get('data_retention_period'),
    ];

    $form['compliance']['privacy_level'] = [
      '#type' => 'select',
      '#title' => $this->t('Privacy Level'),
      '#description' => $this->t('Data privacy handling level for AI agents'),
      '#options' => [
        'strict' => 'Strict (No personal data processing)',
        'balanced' => 'Balanced (Limited personal data with consent)',
        'comprehensive' => 'Comprehensive (Full processing with explicit consent)',
      ],
      '#default_value' => $config->get('privacy_level'),
    ];

    $form['features'] = [
      '#type' => 'details',
      '#title' => $this->t('Feature Settings'),
      '#open' => TRUE,
    ];

    $form['features']['auto_accessibility_enhancement'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Automatic Accessibility Enhancement'),
      '#description' => $this->t('Automatically enhance content accessibility when saving'),
      '#default_value' => $config->get('auto_accessibility_enhancement'),
    ];

    $form['features']['enable_content_assistance'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Content Creation Assistance'),
      '#description' => $this->t('Provide AI assistance during content creation'),
      '#default_value' => $config->get('enable_content_assistance'),
    ];

    $form['features']['enable_performance_monitoring'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable Performance Monitoring'),
      '#description' => $this->t('Monitor website performance using AI analysis'),
      '#default_value' => $config->get('enable_performance_monitoring'),
    ];

    $form['features']['performance_monitoring_interval'] = [
      '#type' => 'select',
      '#title' => $this->t('Performance Monitoring Interval'),
      '#description' => $this->t('How often to run performance monitoring'),
      '#options' => [
        '900' => '15 minutes',
        '1800' => '30 minutes',
        '3600' => '1 hour',
        '7200' => '2 hours',
        '21600' => '6 hours',
        '86400' => '24 hours',
      ],
      '#default_value' => $config->get('performance_monitoring_interval'),
      '#states' => [
        'visible' => [
          ':input[name="enable_performance_monitoring"]' => ['checked' => TRUE],
        ],
      ],
    ];

    // Agent-specific configurations
    $form['agents'] = [
      '#type' => 'details',
      '#title' => $this->t('AI Agent Configuration'),
      '#open' => FALSE,
    ];

    $agents = [
      'municipal_content_curation' => 'Municipal Content Curation Agent',
      'citizen_service_automation' => 'Citizen Service Automation Agent',
      'multilingual_localization' => 'Multilingual Localization Agent',
      'accessibility_enhancement' => 'Accessibility Enhancement Agent',
      'performance_monitoring' => 'Performance Monitoring Agent',
    ];

    foreach ($agents as $agent_id => $agent_label) {
      $form['agents'][$agent_id] = [
        '#type' => 'details',
        '#title' => $agent_label,
        '#open' => FALSE,
      ];

      $form['agents'][$agent_id]['enabled'] = [
        '#type' => 'checkbox',
        '#title' => $this->t('Enable @agent', ['@agent' => $agent_label]),
        '#default_value' => $config->get("agents.{$agent_id}.enabled"),
      ];

      // Add agent-specific configuration fields based on agent type
      $this->addAgentSpecificFields($form['agents'][$agent_id], $agent_id, $config);
    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * Adds agent-specific configuration fields.
   */
  private function addAgentSpecificFields(&$form_section, $agent_id, $config) {
    switch ($agent_id) {
      case 'municipal_content_curation':
        $form_section['tone_of_voice'] = [
          '#type' => 'select',
          '#title' => $this->t('Tone of Voice'),
          '#options' => [
            'formal' => 'Formal/Official',
            'friendly' => 'Friendly/Approachable',
            'informative' => 'Informative/Educational',
          ],
          '#default_value' => $config->get("agents.{$agent_id}.tone_of_voice"),
        ];
        break;

      case 'citizen_service_automation':
        $form_section['operating_hours'] = [
          '#type' => 'textfield',
          '#title' => $this->t('Operating Hours'),
          '#default_value' => $config->get("agents.{$agent_id}.operating_hours"),
          '#placeholder' => 'Mo-Fr 08:00-17:00',
        ];
        break;

      case 'multilingual_localization':
        $form_section['cultural_adaptation'] = [
          '#type' => 'select',
          '#title' => $this->t('Cultural Adaptation Level'),
          '#options' => [
            'literal' => 'Literal Translation',
            'standard' => 'Standard Localization',
            'cultural' => 'Full Cultural Adaptation',
          ],
          '#default_value' => $config->get("agents.{$agent_id}.cultural_adaptation"),
        ];
        break;

      case 'accessibility_enhancement':
        $form_section['user_testing'] = [
          '#type' => 'checkbox',
          '#title' => $this->t('Enable User Testing Guidance'),
          '#default_value' => $config->get("agents.{$agent_id}.user_testing"),
        ];
        break;

      case 'performance_monitoring':
        $form_section['reporting_frequency'] = [
          '#type' => 'select',
          '#title' => $this->t('Reporting Frequency'),
          '#options' => [
            'daily' => 'Daily',
            'weekly' => 'Weekly',
            'monthly' => 'Monthly',
            'quarterly' => 'Quarterly',
          ],
          '#default_value' => $config->get("agents.{$agent_id}.reporting_frequency"),
        ];
        break;
    }
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);

    // Validate municipality name
    $municipality_name = $form_state->getValue('municipality_name');
    if (empty($municipality_name)) {
      $form_state->setErrorByName('municipality_name', $this->t('Municipality name is required.'));
    }

    // Validate supported languages includes default language
    $default_language = $form_state->getValue('default_language');
    $supported_languages = array_filter($form_state->getValue('supported_languages'));
    
    if (!in_array($default_language, $supported_languages)) {
      $form_state->setErrorByName('supported_languages', $this->t('Supported languages must include the default language.'));
    }

    // Validate operating hours format if provided
    $operating_hours = $form_state->getValue(['agents', 'citizen_service_automation', 'operating_hours']);
    if (!empty($operating_hours) && !preg_match('/^[A-Za-z-]+\s+\d{2}:\d{2}-\d{2}:\d{2}$/', $operating_hours)) {
      $form_state->setErrorByName(['agents', 'citizen_service_automation', 'operating_hours'], 
        $this->t('Operating hours must be in format "Mo-Fr 08:00-17:00".'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('municipal_ai_agents.settings');
    
    // Save general settings
    $config
      ->set('municipality_name', $form_state->getValue('municipality_name'))
      ->set('default_language', $form_state->getValue('default_language'))
      ->set('supported_languages', array_filter($form_state->getValue('supported_languages')));

    // Save compliance settings
    $config
      ->set('swiss_compliance_enabled', $form_state->getValue('swiss_compliance_enabled'))
      ->set('compliance_level', $form_state->getValue('compliance_level'))
      ->set('data_retention_period', $form_state->getValue('data_retention_period'))
      ->set('privacy_level', $form_state->getValue('privacy_level'));

    // Save feature settings
    $config
      ->set('auto_accessibility_enhancement', $form_state->getValue('auto_accessibility_enhancement'))
      ->set('enable_content_assistance', $form_state->getValue('enable_content_assistance'))
      ->set('enable_performance_monitoring', $form_state->getValue('enable_performance_monitoring'))
      ->set('performance_monitoring_interval', $form_state->getValue('performance_monitoring_interval'));

    // Save agent-specific settings
    $agents = ['municipal_content_curation', 'citizen_service_automation', 'multilingual_localization', 'accessibility_enhancement', 'performance_monitoring'];
    
    foreach ($agents as $agent_id) {
      $agent_config = $form_state->getValue(['agents', $agent_id]);
      foreach ($agent_config as $key => $value) {
        $config->set("agents.{$agent_id}.{$key}", $value);
      }
    }

    $config->save();

    parent::submitForm($form, $form_state);
    
    $this->messenger()->addMessage($this->t('Municipal AI Agents configuration has been saved.'));
  }

}