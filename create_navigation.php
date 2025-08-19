<?php
/**
 * Script zum Erstellen der GPZH Navigationsstruktur
 * Basierend auf dem Pflichtenheft Phase Präqualifikation
 */

use Drupal\node\Entity\Node;
use Drupal\menu_link_content\Entity\MenuLinkContent;

// Hauptseiten-Struktur
$pages = [
  // Hauptebene
  [
    'title' => 'Startseite',
    'description' => 'Willkommen bei der Gemeinde Zürich Demo',
    'path' => '/startseite',
    'weight' => 0,
    'children' => []
  ],
  [
    'title' => 'Aktuelles',
    'description' => 'Aktuelle Informationen und Neuigkeiten aus der Gemeinde',
    'path' => '/aktuelles',
    'weight' => 1,
    'children' => [
      [
        'title' => 'Veranstaltungen',
        'description' => 'Kommende Veranstaltungen in unserer Gemeinde',
        'path' => '/aktuelles/veranstaltungen',
      ],
      [
        'title' => 'Neuigkeiten',
        'description' => 'Aktuelle Nachrichten und Mitteilungen',
        'path' => '/aktuelles/neuigkeiten',
      ],
    ]
  ],
  [
    'title' => 'Themen',
    'description' => 'Wichtige Themen und Dienstleistungen der Gemeinde',
    'path' => '/themen',
    'weight' => 2,
    'children' => [
      [
        'title' => 'Schule',
        'description' => 'Informationen rund um die Schule',
        'path' => '/themen/schule',
        'children' => [
          [
            'title' => 'Schulanfang',
            'description' => 'Informationen zum Schulstart',
            'path' => '/themen/schule/schulanfang',
          ],
        ]
      ],
      [
        'title' => 'Umwelt & Tiere',
        'description' => 'Umweltschutz und Tierhaltung in der Gemeinde',
        'path' => '/themen/umwelt-tiere',
        'children' => [
          [
            'title' => 'Abfallkalender',
            'description' => 'Termine für die Abfallentsorgung',
            'path' => '/themen/umwelt-tiere/abfallkalender',
          ],
          [
            'title' => 'Sammelstellen',
            'description' => 'Standorte der Sammelstellen',
            'path' => '/themen/umwelt-tiere/sammelstellen',
          ],
        ]
      ],
      [
        'title' => 'Sport & Kultur',
        'description' => 'Sport- und Kulturangebote der Gemeinde',
        'path' => '/themen/sport-kultur',
        'children' => [
          [
            'title' => 'Vereine',
            'description' => 'Übersicht aller Vereine in der Gemeinde',
            'path' => '/themen/sport-kultur/vereine',
          ],
        ]
      ],
      [
        'title' => 'Identität & Nachweise',
        'description' => 'Dokumente und Nachweise',
        'path' => '/themen/identitaet-nachweise',
        'children' => [
          [
            'title' => 'Einbürgerung',
            'description' => 'Informationen zum Einbürgerungsverfahren',
            'path' => '/themen/identitaet-nachweise/einbuergerung',
          ],
          [
            'title' => 'Betreibungsregisterauszug',
            'description' => 'Beantragung eines Betreibungsregisterauszugs',
            'path' => '/themen/identitaet-nachweise/betreibungsregisterauszug',
          ],
        ]
      ],
    ]
  ],
  [
    'title' => 'Unsere Gemeinde',
    'description' => 'Informationen über unsere Gemeinde',
    'path' => '/unsere-gemeinde',
    'weight' => 3,
    'children' => [
      [
        'title' => 'Über die Gemeinde',
        'description' => 'Geschichte und Fakten über unsere Gemeinde',
        'path' => '/unsere-gemeinde/ueber-die-gemeinde',
        'children' => [
          [
            'title' => 'Gemeinderat',
            'description' => 'Mitglieder des Gemeinderats',
            'path' => '/unsere-gemeinde/ueber-die-gemeinde/gemeinderat',
          ],
        ]
      ],
      [
        'title' => 'Politik',
        'description' => 'Politische Informationen und Entscheidungen',
        'path' => '/unsere-gemeinde/politik',
        'children' => [
          [
            'title' => 'Wahlen & Abstimmungen',
            'description' => 'Informationen zu Wahlen und Abstimmungen',
            'path' => '/unsere-gemeinde/politik/wahlen-abstimmungen',
          ],
        ]
      ],
      [
        'title' => 'Verwaltung',
        'description' => 'Die Gemeindeverwaltung',
        'path' => '/unsere-gemeinde/verwaltung',
        'children' => [
          [
            'title' => 'Rechtssammlung',
            'description' => 'Gesetze und Verordnungen der Gemeinde',
            'path' => '/unsere-gemeinde/verwaltung/rechtssammlung',
          ],
        ]
      ],
    ]
  ],
  [
    'title' => 'Suchen',
    'description' => 'Durchsuchen Sie unsere Website',
    'path' => '/suchen',
    'weight' => 4,
    'children' => []
  ],
];

/**
 * Rekursive Funktion zum Erstellen von Seiten und Menüeinträgen
 */
function createPageAndMenu($page, $parent_menu_id = null, $level = 0) {
  // Erstelle die Node (Basic Page)
  $node = Node::create([
    'type' => 'page',
    'title' => $page['title'],
    'field_description' => $page['description'],
    'body' => [
      'value' => '<p>' . $page['description'] . '</p><p>Diese Seite ist Teil der GPZH Demo-Navigation.</p>',
      'format' => 'full_html',
    ],
    'status' => 1,
    'uid' => 1,
  ]);
  
  // Setze den Pfad-Alias
  $node->path = ['alias' => $page['path']];
  
  $node->save();
  
  print str_repeat("  ", $level) . "✓ Seite erstellt: " . $page['title'] . " (Node ID: " . $node->id() . ")\n";
  
  // Erstelle Menüeintrag
  $menu_link = MenuLinkContent::create([
    'title' => $page['title'],
    'link' => ['uri' => 'entity:node/' . $node->id()],
    'menu_name' => 'main',
    'weight' => $page['weight'] ?? 0,
    'expanded' => TRUE,
  ]);
  
  if ($parent_menu_id) {
    $menu_link->set('parent', 'menu_link_content:' . $parent_menu_id);
  }
  
  $menu_link->save();
  
  print str_repeat("  ", $level) . "✓ Menüeintrag erstellt: " . $page['title'] . "\n";
  
  // Rekursiv Kinder erstellen
  if (!empty($page['children'])) {
    foreach ($page['children'] as $i => $child) {
      $child['weight'] = $i;
      createPageAndMenu($child, $menu_link->uuid(), $level + 1);
    }
  }
  
  return $node->id();
}

// Hauptausführung
print "\n========================================\n";
print "GPZH Navigationsstruktur wird erstellt...\n";
print "========================================\n\n";

foreach ($pages as $page) {
  createPageAndMenu($page);
  print "\n";
}

print "========================================\n";
print "✅ Alle Seiten und Menüeinträge wurden erfolgreich erstellt!\n";
print "========================================\n\n";