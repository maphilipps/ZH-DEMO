<?php
/**
 * Script zum Bereinigen alter Menüeinträge
 */

use Drupal\menu_link_content\Entity\MenuLinkContent;

// Liste der zu behaltenden Menüeinträge (GPZH-Struktur)
$keep_titles = [
  'Startseite',
  'Aktuelles',
  'Veranstaltungen',
  'Neuigkeiten',
  'Themen',
  'Schule',
  'Schulanfang',
  'Umwelt & Tiere',
  'Abfallkalender',
  'Sammelstellen',
  'Sport & Kultur',
  'Vereine',
  'Identität & Nachweise',
  'Einbürgerung',
  'Betreibungsregisterauszug',
  'Unsere Gemeinde',
  'Über die Gemeinde',
  'Gemeinderat',
  'Politik',
  'Wahlen & Abstimmungen',
  'Verwaltung',
  'Rechtssammlung',
  'Suchen'
];

// Liste der zu löschenden alten Menüeinträge
$delete_titles = [
  'News',
  'Vision',
  'adessoCMS Features',
  'Events',
  'Paragraphs',
  'Contact',
  'Hallo'
];

print "\n========================================\n";
print "Bereinige Hauptmenü...\n";
print "========================================\n\n";

// Lade alle Menüeinträge
$menu_links = \Drupal::entityTypeManager()
  ->getStorage('menu_link_content')
  ->loadByProperties(['menu_name' => 'main']);

$deleted_count = 0;
$kept_count = 0;

foreach ($menu_links as $menu_link) {
  $title = $menu_link->getTitle();
  
  if (in_array($title, $delete_titles)) {
    $menu_link->delete();
    print "✗ Gelöscht: " . $title . "\n";
    $deleted_count++;
  } elseif (in_array($title, $keep_titles)) {
    print "✓ Behalten: " . $title . "\n";
    $kept_count++;
  } else {
    // Unbekannter Eintrag - zur Sicherheit behalten
    print "? Unbekannt (behalten): " . $title . "\n";
  }
}

print "\n========================================\n";
print "Zusammenfassung:\n";
print "- Gelöscht: " . $deleted_count . " alte Menüeinträge\n";
print "- Behalten: " . $kept_count . " GPZH-Menüeinträge\n";
print "========================================\n\n";