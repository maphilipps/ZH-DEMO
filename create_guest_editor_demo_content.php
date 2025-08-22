<?php

/**
 * Create demo content for guest.editor user
 * Run with: ddev drush php:script create_guest_editor_demo_content.php
 */

use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📝 ERSTELLE DEMO-INHALTE FÜR GUEST.EDITOR\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$guest_user = user_load_by_name('guest.editor');
if (!$guest_user) {
  echo "❌ Guest Editor nicht gefunden!\n";
  exit;
}

$uid = $guest_user->id();
echo "👤 Erstelle Inhalte für: guest.editor (UID: $uid)\n\n";

// Get existing images for reuse
$image_query = \Drupal::entityQuery('media')
  ->condition('bundle', 'image')
  ->range(0, 20)
  ->accessCheck(FALSE);
$image_ids = $image_query->execute();
$images = array_values($image_ids);

// Helper function to get random image
function getRandomImage($images) {
  if (empty($images)) {
    return null;
  }
  return $images[array_rand($images)];
}

// Create Companies (Firmen)
echo "🏢 ERSTELLE FIRMEN...\n";
echo "──────────────────────────────────────────────────────\n";

$companies = [
  [
    'title' => 'Isengard Consulting AG',
    'description' => 'Strategische Unternehmensberatung mit Weitblick. Wir sehen alles von unserem Turm aus.',
    'contact_name' => 'Saruman der Weise',
    'contact_position' => 'Senior Partner',
    'email' => 'info@isengard-consulting.ch',
    'phone' => '044 777 88 99',
    'website' => 'https://isengard-consulting.ch',
    'status' => 'draft',
  ],
  [
    'title' => 'Bruchtal Buchhandlung',
    'description' => 'Alte Bücher, neue Geschichten. Spezialisiert auf seltene Karten und historische Werke.',
    'contact_name' => 'Bilbo Beutlin',
    'contact_position' => 'Inhaber',
    'email' => 'buecher@bruchtal-buchhandlung.ch',
    'phone' => '044 555 33 44',
    'website' => 'https://bruchtal-buecher.ch',
    'status' => 'published',
  ],
  [
    'title' => 'Düsterwald Security GmbH',
    'description' => 'Professionelle Sicherheitsdienste für Events und Gebäudeschutz. Niemand kommt ungesehen vorbei.',
    'contact_name' => 'Legolas Grünblatt',
    'contact_position' => 'Sicherheitschef',
    'email' => 'security@duesterwald.ch',
    'phone' => '044 888 99 00',
    'status' => 'draft',
  ],
  [
    'title' => 'Gondor Finanzberatung',
    'description' => 'Vermögensverwaltung und Finanzplanung für eine sichere Zukunft. Die Wacht über Ihr Vermögen.',
    'contact_name' => 'Denethor Finanz',
    'contact_position' => 'Geschäftsführer',
    'email' => 'beratung@gondor-finanz.ch',
    'phone' => '044 222 33 44',
    'website' => 'https://gondor-finanz.ch',
    'status' => 'published',
  ],
];

foreach ($companies as $company_data) {
  $company = Node::create([
    'type' => 'company',
    'title' => $company_data['title'],
    'field_description' => $company_data['description'],
    'field_contact_name' => $company_data['contact_name'],
    'field_contact_position' => $company_data['contact_position'],
    'field_email' => $company_data['email'],
    'field_phone' => $company_data['phone'],
    'field_website' => $company_data['website'] ?? null,
    'status' => $company_data['status'] === 'published' ? 1 : 0,
    'moderation_state' => $company_data['status'],
    'uid' => $uid,
  ]);
  
  // Company content type doesn't have image field by default
  // Skip image assignment for companies
  
  $company->save();
  $status_text = $company_data['status'] === 'published' ? '✅ Veröffentlicht' : '📝 Entwurf';
  echo "  $status_text: {$company_data['title']}\n";
}

// Create Events
echo "\n📅 ERSTELLE EVENTS...\n";
echo "──────────────────────────────────────────────────────\n";

$events = [
  [
    'title' => 'Mittelerde Film Festival 2025',
    'body' => 'Drei Tage voller epischer Filme und Dokumentationen. Extended Editions und Behind-the-Scenes Material.',
    'date' => '2025-08-15T18:00:00',
    'status' => 'published',
  ],
  [
    'title' => 'Hobbit-Markt Bruchtal',
    'body' => 'Wöchentlicher Bauernmarkt mit frischen Produkten aus der Region. Zweites Frühstück inklusive!',
    'date' => '2025-06-01T08:00:00',
    'status' => 'draft',
  ],
  [
    'title' => 'Elben-Konzert im Park',
    'body' => 'Klassische Musik unter freiem Himmel. Die Philharmonie Bruchtal spielt Werke der Romantik.',
    'date' => '2025-07-20T19:30:00',
    'status' => 'published',
  ],
  [
    'title' => 'Zwergen-Handwerksmarkt',
    'body' => 'Traditionelles Handwerk und Kunsthandwerk. Live-Demonstrationen von Schmiedekunst und Steinmetzarbeiten.',
    'date' => '2025-09-10T10:00:00',
    'status' => 'draft',
  ],
  [
    'title' => 'Ringträger-Lauf 2025',
    'body' => '10km Benefizlauf zugunsten lokaler Wohltätigkeitsorganisationen. Jeder Teilnehmer erhält einen Ring.',
    'date' => '2025-05-25T09:00:00',
    'status' => 'draft',
  ],
];

foreach ($events as $event_data) {
  $event = Node::create([
    'type' => 'event',
    'title' => $event_data['title'],
    'body' => [
      'value' => $event_data['body'],
      'format' => 'basic_html',
    ],
    'field_event_date' => $event_data['date'],
    'status' => $event_data['status'] === 'published' ? 1 : 0,
    'moderation_state' => $event_data['status'],
    'uid' => $uid,
  ]);
  
  // Skip image for events as field might not exist
  
  $event->save();
  $status_text = $event_data['status'] === 'published' ? '✅ Veröffentlicht' : '📝 Entwurf';
  echo "  $status_text: {$event_data['title']}\n";
}

// Create Clubs (Vereine)
echo "\n🤝 ERSTELLE VEREINE...\n";
echo "──────────────────────────────────────────────────────\n";

$clubs = [
  [
    'title' => 'Rohirrim Reitverein',
    'description' => 'Reitunterricht für alle Altersgruppen. Ausritte in die schöne Umgebung von Bruchtal.',
    'contact_name' => 'Éomer Reiter',
    'contact_position' => 'Vereinspräsident',
    'email' => 'reiten@rohirrim-bruchtal.ch',
    'phone' => '044 666 77 88',
    'status' => 'published',
  ],
  [
    'title' => 'Ent-Naturschutzverein',
    'description' => 'Wir setzen uns für den Erhalt unserer Wälder und Parks ein. Langsam aber stetig.',
    'contact_name' => 'Baumbart der Alte',
    'contact_position' => 'Vorsitzender',
    'email' => 'natur@ent-verein.ch',
    'phone' => '044 333 44 55',
    'status' => 'draft',
  ],
  [
    'title' => 'Gefährten Sportclub',
    'description' => 'Gemeinsam stark! Fussball, Volleyball und weitere Mannschaftssportarten.',
    'contact_name' => 'Aragorn Streiter',
    'contact_position' => 'Sportlicher Leiter',
    'email' => 'sport@gefaehrten-sc.ch',
    'phone' => '044 999 88 77',
    'status' => 'published',
  ],
];

foreach ($clubs as $club_data) {
  $club = Node::create([
    'type' => 'club',
    'title' => $club_data['title'],
    'field_description' => $club_data['description'],
    'field_contact_name' => $club_data['contact_name'],
    'field_contact_position' => $club_data['contact_position'],
    'field_email' => $club_data['email'],
    'field_phone' => $club_data['phone'],
    'status' => $club_data['status'] === 'published' ? 1 : 0,
    'moderation_state' => $club_data['status'],
    'uid' => $uid,
  ]);
  
  // Skip image for clubs as field might not exist
  
  $club->save();
  $status_text = $club_data['status'] === 'published' ? '✅ Veröffentlicht' : '📝 Entwurf';
  echo "  $status_text: {$club_data['title']}\n";
}

// Create Hospitality (Gastgewerbe)
echo "\n🍽️ ERSTELLE GASTGEWERBE...\n";
echo "──────────────────────────────────────────────────────\n";

$hospitality = [
  [
    'title' => 'Gasthaus zum Tänzelnden Pony',
    'description' => 'Gemütliche Atmosphäre mit hervorragendem Bier und deftiger Küche. Live-Musik jeden Freitag.',
    'contact_name' => 'Butterblume Gastwirt',
    'contact_position' => 'Wirt',
    'email' => 'info@taenzelndes-pony.ch',
    'phone' => '044 111 22 33',
    'website' => 'https://taenzelndes-pony.ch',
    'status' => 'published',
  ],
  [
    'title' => 'Restaurant Minas Tirith',
    'description' => 'Gehobene Küche mit Panoramablick über Bruchtal. Perfekt für besondere Anlässe.',
    'contact_name' => 'Koch König',
    'contact_position' => 'Küchenchef',
    'email' => 'reservation@minas-tirith.ch',
    'phone' => '044 444 55 66',
    'website' => 'https://restaurant-minas-tirith.ch',
    'status' => 'draft',
  ],
  [
    'title' => 'Hobbit-Bäckerei & Café',
    'description' => 'Sieben Mahlzeiten am Tag! Frische Backwaren, Kuchen und der beste Kaffee in Bruchtal.',
    'contact_name' => 'Peregrin Tuk',
    'contact_position' => 'Bäckermeister',
    'email' => 'lecker@hobbit-baeckerei.ch',
    'phone' => '044 777 88 99',
    'status' => 'published',
  ],
  [
    'title' => 'Hotel Elronds Rast',
    'description' => 'Luxuriöse Unterkunft mit Wellness-Bereich. Erholen Sie sich in elfischer Atmosphäre.',
    'contact_name' => 'Elrond Halbelb',
    'contact_position' => 'Hoteldirektor',
    'email' => 'hotel@elronds-rast.ch',
    'phone' => '044 888 99 11',
    'website' => 'https://hotel-elronds-rast.ch',
    'status' => 'draft',
  ],
];

foreach ($hospitality as $gastro_data) {
  $gastro = Node::create([
    'type' => 'hospitality',
    'title' => $gastro_data['title'],
    'field_description' => $gastro_data['description'],
    'field_contact_name' => $gastro_data['contact_name'],
    'field_contact_position' => $gastro_data['contact_position'],
    'field_email' => $gastro_data['email'],
    'field_phone' => $gastro_data['phone'],
    'field_website' => $gastro_data['website'] ?? null,
    'status' => $gastro_data['status'] === 'published' ? 1 : 0,
    'moderation_state' => $gastro_data['status'],
    'uid' => $uid,
  ]);
  
  // Skip image for hospitality as field might not exist
  
  $gastro->save();
  $status_text = $gastro_data['status'] === 'published' ? '✅ Veröffentlicht' : '📝 Entwurf';
  echo "  $status_text: {$gastro_data['title']}\n";
}

// Count final statistics
$total_query = \Drupal::entityQuery('node')
  ->condition('uid', $uid)
  ->accessCheck(FALSE);
$total_count = count($total_query->execute());

$published_query = \Drupal::entityQuery('node')
  ->condition('uid', $uid)
  ->condition('status', 1)
  ->accessCheck(FALSE);
$published_count = count($published_query->execute());

$draft_count = $total_count - $published_count;

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 ZUSAMMENFASSUNG FÜR GUEST.EDITOR\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Gesamt erstellt: $total_count Inhalte\n";
echo "• ✅ Veröffentlicht: $published_count\n";
echo "• 📝 Entwürfe: $draft_count\n\n";

echo "Nach Typ:\n";
$types = ['company', 'event', 'club', 'hospitality'];
foreach ($types as $type) {
  $type_query = \Drupal::entityQuery('node')
    ->condition('uid', $uid)
    ->condition('type', $type)
    ->accessCheck(FALSE);
  $type_count = count($type_query->execute());
  
  $labels = [
    'company' => '🏢 Firmen',
    'event' => '📅 Events',
    'club' => '🤝 Vereine',
    'hospitality' => '🍽️ Gastgewerbe',
  ];
  
  echo "• {$labels[$type]}: $type_count\n";
}

echo "\n✅ Demo-Inhalte erfolgreich erstellt!\n";
echo "Dashboard: /user/$uid/dashboard\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";