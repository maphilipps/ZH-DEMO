<?php

/**
 * @file
 * Programmatic content population script for Bruchtal "Leben am See" theme.
 * 
 * This script populates empty nodes with lake-themed content appropriate
 * for the Gemeinde Bruchtal demonstration system.
 * 
 * Usage: drush php:script scripts/populate_bruchtal_content.php
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\Core\Entity\EntityStorageException;

/**
 * Lake-themed content templates based on manual analysis of nodes 8, 10, 12
 */
class BruchtalContentGenerator {

  /**
   * Lake-themed content templates by content type and category
   */
  private $contentTemplates = [
    'news' => [
      'health' => [
        'titles' => [
          'Neue Gesundheitsstation am Bruchtal-See eröffnet',
          'Erweiterte Erste-Hilfe-Services am Seeufer verfügbar',
          'Rettungsschwimmer-Team verstärkt Sicherheit am Bruchtal-See',
          'Präventive Gesundheitschecks für Wassersportler gestartet',
        ],
        'descriptions' => [
          'Die Gemeinde Bruchtal hat eine moderne Gesundheitsstation am Seeufer eröffnet. Das neue Angebot umfasst Erste-Hilfe-Services, Gesundheitschecks für Wassersportler und eine 24-Stunden-Notfallversorgung für alle Besucher des Bruchtal-Sees.',
          'Mit erweiterten medizinischen Services direkt am Bruchtal-See sorgt die Gemeinde für maximale Sicherheit aller Besucher. Qualifizierte Rettungssanitäter bieten professionelle Erste-Hilfe und präventive Beratung zu Wassersicherheit.',
        ],
        'content' => 'Die neue Gesundheitsstation am Bruchtal-See ist ein wichtiger Meilenstein für die Sicherheit und das Wohlbefinden aller Besucher. Die moderne Einrichtung wurde strategisch am Hauptstrand positioniert und bietet umfassende medizinische Versorgung für Wassersportler, Familien und Touristen.

**Unsere Services umfassen:**

- **Erste-Hilfe-Versorgung** rund um die Uhr durch qualifizierte Rettungssanitäter  
- **Gesundheitschecks** für Schwimmer und Wassersportler vor sportlichen Aktivitäten
- **Notfallversorgung** mit direkter Verbindung zum Rettungsdienst
- **Präventive Beratung** zu Wassersicherheit und Sonnenschutz
- **Spezialausrüstung** für Wasserrettung und Wiederbelebung

Die Station ist täglich von 6:00 bis 22:00 Uhr besetzt und bietet in den Sommermonaten erweiterte Öffnungszeiten bis 24:00 Uhr.

#### Moderne Ausstattung für maximale Sicherheit

Das erfahrene Team besteht aus Rettungsschwimmern, Sanitätern und einer Krankenschwester, die alle speziell für die Herausforderungen am Wasser ausgebildet sind. Die Gemeinde Bruchtal investiert kontinuierlich in die Sicherheit am See.',
      ],
      'recreation' => [
        'titles' => [
          'Neue Wassersportmöglichkeiten am Bruchtal-See eröffnet',
          'SUP-Verleih und Segelschule erweitern Angebot am See',
          'Familien-Schwimmbereich mit neuen Attraktionen ausgestattet',
          'Bootsverleih am Bruchtal-See startet in die Saison',
        ],
        'descriptions' => [
          'Das Wassersport-Angebot am Bruchtal-See wurde deutlich erweitert. Neue SUP-Boards, Kajaks und Segelboote stehen Besuchern zur Verfügung. Eine professionelle Segelschule bietet Kurse für alle Altersgruppen.',
          'Von Stand-Up-Paddling bis Segeln - der Bruchtal-See bietet jetzt noch mehr Wassersport-Möglichkeiten. Neue Verleihstationen und qualifizierte Instruktoren sorgen für sicheren Wassersport-Spaß.',
        ],
        'content' => 'Der Bruchtal-See präsentiert sich als attraktives Wassersport-Paradies mit erweiterten Angeboten für alle Altersgruppen. Die neuen Einrichtungen kombinieren Spaß am Wasser mit höchsten Sicherheitsstandards.

**Neue Wassersport-Angebote:**

- **SUP-Verleih** mit verschiedenen Board-Größen für Anfänger und Fortgeschrittene
- **Kajak-Station** mit Ein- und Zweipersonen-Kajaks für entspannte Seeerkundung
- **Segelschule** mit zertifizierten Instruktoren und modernen Segelbooten
- **Familien-Schwimmbereich** mit Spielgeräten und flachem Wasser für Kinder
- **Bootsverleih** für gemütliche Rundfahrten auf dem kristallklaren Wasser

Die Wassersport-Station ist täglich von 9:00 bis 19:00 Uhr geöffnet. Alle Aktivitäten werden von geschultem Personal begleitet.

#### Sicherheit steht an erster Stelle

Jeder Wassersport-Teilnehmer erhält eine ausführliche Sicherheitseinweisung und professionelle Schwimmwesten. Die Gemeinde Bruchtal setzt auf nachhaltigen Wassersport im Einklang mit der Natur.',
      ],
      'infrastructure' => [
        'titles' => [
          'Barrierefreie Zugänge zum Bruchtal-See fertiggestellt',
          'Neue Parkplätze und Fahrradwege am Seeufer eröffnet',
          'Nachhaltige Infrastruktur-Verbesserungen am Bruchtal-See',
          'Öffentliche Toiletten und Umkleiden am See renoviert',
        ],
        'descriptions' => [
          'Die Gemeinde Bruchtal hat die Infrastruktur am See deutlich verbessert. Barrierefreie Zugänge, erweiterte Parkplätze und moderne Sanitäreinrichtungen sorgen für mehr Komfort und Zugänglichkeit für alle Besucher.',
          'Nachhaltige Infrastruktur-Investitionen machen den Bruchtal-See noch attraktiver. Neue Fahrradwege, erweiterte Parkplätze und barrierefreie Zugänge verbessern das Besuchserlebnis erheblich.',
        ],
        'content' => 'Die umfangreichen Infrastruktur-Verbesserungen am Bruchtal-See schaffen eine moderne, nachhaltige und barrierefreie Erholungsanlage für alle Bürger und Besucher.

**Neue Infrastruktur-Highlights:**

- **Barrierefreie Zugänge** mit Rampen und befestigten Wegen zum Seeufer
- **Erweiterte Parkplätze** mit 150 zusätzlichen Stellplätzen und E-Ladesäulen  
- **Fahrradwege** mit sicherer Anbindung an das regionale Radwegenetz
- **Moderne Sanitäreinrichtungen** mit familienfreundlichen Umkleidebereichen
- **Nachhaltige Beleuchtung** mit solarbetriebenen LED-Systemen

Die Bauarbeiten wurden umweltschonend durchgeführt und berücksichtigen den Schutz der Seeökologie.

#### Nachhaltigkeit im Fokus

Alle neuen Einrichtungen wurden nach ökologischen Kriterien geplant. Regenwasser-Sammelsysteme, heimische Bepflanzung und energieeffiziente Technik unterstreichen das Umweltbewusstsein der Gemeinde Bruchtal.',
      ],
    ],
    'page' => [
      'services' => [
        'titles' => [
          'Serviceleistungen am Bruchtal-See',
          'Besucherservices und Informationen',
          'Gastronomie und Verpflegung am See',
          'Veranstaltungen und Events am Seeufer',
        ],
        'paragraphs' => [
          [
            'type' => 'text',
            'content' => 'Der Bruchtal-See bietet umfassende Serviceleistungen für einen entspannten und sicheren Aufenthalt. Von der Gastronomie bis zur medizinischen Versorgung - alle wichtigen Services finden Sie direkt am Seeufer.',
          ],
          [
            'type' => 'sidebyside', 
            'left_content' => '**Gastronomie am See**\n\nDas Seerestaurant "Zur Blauen Welle" bietet regionale Spezialitäten und erfrischende Getränke mit Blick auf den See. Geöffnet täglich von 10:00 bis 22:00 Uhr.',
            'right_content' => '**Informationszentrum**\n\nUnser Besucherzentrum informiert über Wassersport-Möglichkeiten, Wanderwege und aktuelle Veranstaltungen. Kostenlose Broschüren und Kartenmaterial verfügbar.',
          ],
        ],
      ],
    ],
    'event' => [
      'seasonal' => [
        'titles' => [
          'Sommerfest am Bruchtal-See',
          'Seenachtsfest mit Feuerwerk',
          'Wassersport-Festival am Seeufer',
          'Herbstmarkt am Bruchtal-See',
        ],
        'descriptions' => [
          'Das traditionelle Sommerfest am Bruchtal-See bietet Musik, lokale Spezialitäten und Wassersport-Vorführungen. Ein Highlight für die ganze Familie mit Aktivitäten von früh bis spät.',
          'Ein unvergesslicher Abend mit Live-Musik, regionalen Köstlichkeiten und einem spektakulären Feuerwerk über dem Bruchtal-See. Der perfekte Abschluss für warme Sommertage.',
        ],
        'content' => 'Das Sommerfest am Bruchtal-See ist das Highlight des Jahres und zieht Besucher aus der ganzen Region an. Ein Tag voller Musik, Sport und kulinarischen Genüssen direkt am Wasser.

**Programm-Highlights:**

- **Live-Musik** auf der Seebühne mit regionalen und überregionalen Künstlern
- **Wassersport-Vorführungen** mit professionellen Sportlern  
- **Kulinarische Stände** mit lokalen Spezialitäten und erfrischenden Getränken
- **Familienprogramm** mit Spielen, Hüpfburg und Kinderschminken
- **Bootskorso** mit festlich geschmückten Booten am Abend

Das Festival findet jährlich am zweiten Wochenende im Juli statt. Der Eintritt ist frei.',
      ],
    ],
  ];

  /**
   * Main execution function
   */
  public function populateContent() {
    \Drupal::logger('bruchtal_content')->info('Starting Bruchtal content population script');

    $nodes = $this->getEmptyNodes();
    $populated = 0;
    $errors = 0;

    foreach ($nodes as $node) {
      try {
        if ($this->populateNode($node)) {
          $populated++;
          \Drupal::logger('bruchtal_content')->info('Populated node @nid (@type)', [
            '@nid' => $node->id(),
            '@type' => $node->getType(),
          ]);
        }
      } catch (\Exception $e) {
        $errors++;
        \Drupal::logger('bruchtal_content')->error('Failed to populate node @nid: @error', [
          '@nid' => $node->id(),
          '@error' => $e->getMessage(),
        ]);
      }
    }

    \Drupal::logger('bruchtal_content')->info('Completed: @populated nodes populated, @errors errors', [
      '@populated' => $populated,
      '@errors' => $errors,
    ]);

    echo "Bruchtal content population completed:\n";
    echo "- Nodes populated: $populated\n";
    echo "- Errors: $errors\n";
  }

  /**
   * Get nodes that need content population
   */
  private function getEmptyNodes() {
    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    
    // Query for nodes that likely need content (adjust criteria based on actual needs)
    $query = $node_storage->getQuery()
      ->accessCheck(FALSE)
      ->condition('status', 1)
      ->condition('type', ['news', 'page', 'event', 'landing_page'], 'IN');
      
    $nids = $query->execute();
    return $node_storage->loadMultiple($nids);
  }

  /**
   * Populate individual node with lake-themed content
   */
  private function populateNode(Node $node) {
    $content_type = $node->getType();
    $template_category = $this->selectTemplateCategory($node);
    
    if (!$template_category) {
      return FALSE;
    }

    switch ($content_type) {
      case 'news':
        return $this->populateNewsNode($node, $template_category);
      case 'page':
      case 'landing_page':
        return $this->populatePageNode($node, $template_category);  
      case 'event':
        return $this->populateEventNode($node, $template_category);
      default:
        return FALSE;
    }
  }

  /**
   * Select appropriate template category based on node content
   */
  private function selectTemplateCategory(Node $node) {
    $title = strtolower($node->getTitle());
    
    // Determine category based on existing title keywords
    if (preg_match('/gesundheit|medizin|erste.hilfe|rettung|sicherheit/', $title)) {
      return 'health';
    }
    if (preg_match('/sport|schwimm|boot|segeln|kajak|wasser/', $title)) {
      return 'recreation';
    }
    if (preg_match('/infrastruktur|park|weg|toilette|barriere/', $title)) {
      return 'infrastructure';
    }
    if (preg_match('/service|restaurant|gastronomie|information/', $title)) {
      return 'services';
    }
    if (preg_match('/fest|event|feier|konzert|markt/', $title)) {
      return 'seasonal';
    }
    
    // Default fallback
    $categories = ['health', 'recreation', 'infrastructure'];
    return $categories[array_rand($categories)];
  }

  /**
   * Populate news node with lake-themed content
   */
  private function populateNewsNode(Node $node, $category) {
    $templates = $this->contentTemplates['news'][$category] ?? $this->contentTemplates['news']['health'];
    
    // Update title if it's still corporate/technical
    $current_title = $node->getTitle();
    if ($this->needsTitleUpdate($current_title)) {
      $new_title = $templates['titles'][array_rand($templates['titles'])];
      $node->setTitle($new_title);
    }
    
    // Update description field
    if ($node->hasField('field_description')) {
      $description = $templates['descriptions'][array_rand($templates['descriptions'])];
      $node->set('field_description', $description);
    }
    
    // Update main content field
    if ($node->hasField('field_content')) {
      $node->set('field_content', [
        'value' => $templates['content'],
        'format' => 'full_html',
      ]);
    }
    
    $node->save();
    return TRUE;
  }

  /**
   * Populate page node with lake-themed paragraph content
   */
  private function populatePageNode(Node $node, $category) {
    $templates = $this->contentTemplates['page'][$category] ?? $this->contentTemplates['page']['services'];
    
    // Update title if needed
    $current_title = $node->getTitle();
    if ($this->needsTitleUpdate($current_title)) {
      $new_title = $templates['titles'][array_rand($templates['titles'])];
      $node->setTitle($new_title);
    }
    
    // Create paragraphs if field exists and is empty
    if ($node->hasField('field_paragraphs') && $node->get('field_paragraphs')->isEmpty()) {
      $paragraphs = [];
      
      foreach ($templates['paragraphs'] as $paragraph_data) {
        $paragraph = $this->createParagraph($paragraph_data);
        if ($paragraph) {
          $paragraphs[] = $paragraph;
        }
      }
      
      if (!empty($paragraphs)) {
        $node->set('field_paragraphs', $paragraphs);
      }
    }
    
    $node->save();
    return TRUE;
  }

  /**
   * Populate event node with lake-themed content
   */
  private function populateEventNode(Node $node, $category) {
    $templates = $this->contentTemplates['event'][$category] ?? $this->contentTemplates['event']['seasonal'];
    
    // Update title if needed
    $current_title = $node->getTitle();
    if ($this->needsTitleUpdate($current_title)) {
      $new_title = $templates['titles'][array_rand($templates['titles'])];
      $node->setTitle($new_title);
    }
    
    // Update description
    if ($node->hasField('field_description')) {
      $description = $templates['descriptions'][array_rand($templates['descriptions'])];
      $node->set('field_description', $description);
    }
    
    // Update content field
    if ($node->hasField('field_content')) {
      $node->set('field_content', [
        'value' => $templates['content'],
        'format' => 'full_html',
      ]);
    }
    
    $node->save();
    return TRUE;
  }

  /**
   * Create paragraph entity based on template data
   */
  private function createParagraph($paragraph_data) {
    $paragraph = Paragraph::create(['type' => $paragraph_data['type']]);
    
    switch ($paragraph_data['type']) {
      case 'text':
        $paragraph->set('field_text', [
          'value' => $paragraph_data['content'],
          'format' => 'full_html',
        ]);
        break;
        
      case 'sidebyside':
        if (isset($paragraph_data['left_content'], $paragraph_data['right_content'])) {
          $paragraph->set('field_left_content', [
            'value' => $paragraph_data['left_content'],
            'format' => 'full_html',
          ]);
          $paragraph->set('field_right_content', [
            'value' => $paragraph_data['right_content'],
            'format' => 'full_html',
          ]);
        }
        break;
    }
    
    $paragraph->save();
    return $paragraph;
  }

  /**
   * Check if title needs updating (contains non-lake-themed content)
   */
  private function needsTitleUpdate($title) {
    $corporate_keywords = [
      'dlr', 'samsung', 'adesso', 'smartwatch', 'isolation', 'raumfahrt',
      'weltraum', 'technologie', 'innovation', 'digital', 'ki', 'ai'
    ];
    
    $title_lower = strtolower($title);
    foreach ($corporate_keywords as $keyword) {
      if (strpos($title_lower, $keyword) !== FALSE) {
        return TRUE;
      }
    }
    
    return FALSE;
  }
}

// Execute the script
$generator = new BruchtalContentGenerator();
$generator->populateContent();