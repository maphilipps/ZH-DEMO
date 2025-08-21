<?php

/**
 * @file
 * Creates test data for Event Review Dashboard testing.
 * 
 * Creates realistic municipal events for GPZH demo scenarios.
 * Based on Gemeinde Bruchtal "Leben am See" theme.
 */

use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

// Event test data with Swiss municipal themes
$test_events = [
  // Draft events for approval testing
  [
    'title' => 'Seefest Bruchtal 2025',
    'body' => 'Das traditionelle Seefest findet wieder am Ufer des Bruchtal-Sees statt. Mit lokalen Musikgruppen, Marktständen und Feuerwerk.',
    'field_event_date' => '2025-07-15 18:00:00',
    'field_event_location' => 'Seepromenade Bruchtal',
    'field_event_category' => 'Volksfest',
    'moderation_state' => 'draft',
    'submitter' => 'theodin.eowyn@bruchtal-vereine.ch'
  ],
  [
    'title' => 'Vereins-Wanderung Morgenstern',
    'body' => 'Der Wanderverein Morgenstern lädt zur geführten Wanderung durch die Bruchtal-Berge ein. Treffpunkt beim Gemeindehaus.',
    'field_event_date' => '2025-08-22 09:00:00',
    'field_event_location' => 'Gemeindehaus Bruchtal',
    'field_event_category' => 'Sport & Freizeit',
    'moderation_state' => 'draft',
    'submitter' => 'gandalf.grau@morgenstern-wandern.ch'
  ],
  [
    'title' => 'Konzert am See - Elbische Musik',
    'body' => 'Klassische Elbische Musik unter freiem Himmel. Der Chor Rivendell präsentiert traditionelle und moderne Stücke.',
    'field_event_date' => '2025-09-05 20:00:00',
    'field_event_location' => 'Seepark Bruchtal',
    'field_event_category' => 'Kultur',
    'moderation_state' => 'draft',
    'submitter' => 'elrond.halbelb@rivendell-chor.ch'
  ],
  [
    'title' => 'Flohmarkt der Hobbits',
    'body' => 'Großer Flohmarkt organisiert vom Hobbit-Verein. Antiquitäten, Bücher und Haushaltswaren aus der Region.',
    'field_event_date' => '2025-08-08 10:00:00',
    'field_event_location' => 'Dorfplatz Bruchtal',
    'field_event_category' => 'Markt',
    'moderation_state' => 'draft',
    'submitter' => 'frodo.beutlin@auenland-verein.ch'
  ],
  [
    'title' => 'Reitturnier der Rohirrim',
    'body' => 'Jährliches Reitturnier des Reitvereins Edoras. Dressur, Springen und traditionelle Reitkunst.',
    'field_event_date' => '2025-09-12 14:00:00',
    'field_event_location' => 'Reitanlage Bruchtal',
    'field_event_category' => 'Sport & Freizeit',
    'moderation_state' => 'draft',
    'submitter' => 'eomer.rohirrim@edoras-reiten.ch'
  ],
  [
    'title' => 'Kunstausstellung: Herr der Ringe Gemälde',
    'body' => 'Lokale Künstler stellen ihre vom Tolkien-Universum inspirierten Werke aus. Vernissage mit Apéro.',
    'field_event_date' => '2025-08-28 19:00:00',
    'field_event_location' => 'Kulturzentrum Bruchtal',
    'field_event_category' => 'Kultur',
    'moderation_state' => 'draft',
    'submitter' => 'arwen.undomiel@bruchtal-kunst.ch'
  ],
  [
    'title' => 'Fußballturnier FC Gondor',
    'body' => 'Freundschaftsturnier zwischen den Gemeindeteams der Region. Mit Festwirtschaft und Kinderprogramm.',
    'field_event_date' => '2025-07-26 15:00:00',
    'field_event_location' => 'Sportplatz Bruchtal',
    'field_event_category' => 'Sport & Freizeit',
    'moderation_state' => 'draft',
    'submitter' => 'aragorn.telcontar@fc-gondor.ch'
  ],
  [
    'title' => 'Seniorennachmittag im Auenland',
    'body' => 'Gemütlicher Nachmittag für Senioren mit Kaffee, Kuchen und Geschichten aus alter Zeit.',
    'field_event_date' => '2025-08-14 14:30:00',
    'field_event_location' => 'Seniorenzentrum Bruchtal',
    'field_event_category' => 'Soziales',
    'moderation_state' => 'draft',
    'submitter' => 'bilbo.beutlin@auenland-senioren.ch'
  ],

  // Published events (already approved)
  [
    'title' => 'Gemeindeversammlung Herbst 2025',
    'body' => 'Ordentliche Gemeindeversammlung mit Budget 2026 und wichtigen Abstimmungen.',
    'field_event_date' => '2025-11-20 20:00:00',
    'field_event_location' => 'Gemeindesaal Bruchtal',
    'field_event_category' => 'Amtlich',
    'moderation_state' => 'published',
    'submitter' => 'gemeinde@bruchtal.ch'
  ],
  [
    'title' => 'Weihnachtsmarkt Bruchtal',
    'body' => 'Traditioneller Weihnachtsmarkt mit lokalen Anbietern, Glühwein und Kinderprogramm.',
    'field_event_date' => '2025-12-07 16:00:00',
    'field_event_location' => 'Dorfplatz Bruchtal',
    'field_event_category' => 'Volksfest',
    'moderation_state' => 'published',
    'submitter' => 'gemeinde@bruchtal.ch'
  ],
  [
    'title' => 'Neujahrsapéro 2026',
    'body' => 'Gemeindlicher Neujahrsapéro für alle Einwohnerinnen und Einwohner.',
    'field_event_date' => '2026-01-05 11:00:00',
    'field_event_location' => 'Gemeindehaus Bruchtal',
    'field_event_category' => 'Amtlich',
    'moderation_state' => 'published',
    'submitter' => 'gemeinde@bruchtal.ch'
  ],

  // Rejected events (with reasons)
  [
    'title' => 'Sauron Convention 2025',
    'body' => 'Treffen aller Anhänger des Dunklen Herrschers. Mit Ringschmiede-Workshop und Ork-Kostümwettbewerb.',
    'field_event_date' => '2025-10-31 20:00:00',
    'field_event_location' => 'Mordor-Halle Bruchtal',
    'field_event_category' => 'Kultur',
    'moderation_state' => 'rejected',
    'field_rejection_reason' => 'Die Veranstaltung entspricht nicht den Werten unserer Gemeinde und könnte verstörend auf Familien wirken. Bitte überarbeiten Sie das Konzept in Richtung eines harmlosen Fantasy-Events.',
    'submitter' => 'sauron.mordor@dunkelturm.ch'
  ],
  [
    'title' => 'Wildparty am Seeufer',
    'body' => 'Große Party am See mit lauter Musik bis zum Morgengrauen. Open Bar und DJ Beats.',
    'field_event_date' => '2025-07-31 22:00:00',
    'field_event_location' => 'Seeufer Bruchtal',
    'field_event_category' => 'Unterhaltung',
    'moderation_state' => 'rejected',
    'field_rejection_reason' => 'Lärmschutzverordnung würde verletzt. Veranstaltungen am Seeufer müssen um 22:00 Uhr enden. Bitte Veranstaltungsort und -zeit überdenken.',
    'submitter' => 'party.animal@wildfeiern.ch'
  ],
  [
    'title' => 'Kommerzielle Verkaufsveranstaltung',
    'body' => 'Verkauf von Nahrungsergänzungsmitteln und Wellness-Produkten mit Präsentationen.',
    'field_event_date' => '2025-08-18 19:00:00',
    'field_event_location' => 'Gemeindesaal Bruchtal',
    'field_event_category' => 'Markt',
    'moderation_state' => 'rejected',
    'field_rejection_reason' => 'Reine Verkaufsveranstaltungen sind in Gemeinderäumen nicht gestattet. Nur gemeinnützige oder kulturelle Veranstaltungen werden bewilligt.',
    'submitter' => 'verkauf@profit-first.com'
  ],
];

// Create test users for event submitters
$test_users = [
  'theodin.eowyn@bruchtal-vereine.ch' => 'Theodin Eowyn',
  'gandalf.grau@morgenstern-wandern.ch' => 'Gandalf der Graue',
  'elrond.halbelb@rivendell-chor.ch' => 'Elrond Halbelb',
  'frodo.beutlin@auenland-verein.ch' => 'Frodo Beutlin',
  'eomer.rohirrim@edoras-reiten.ch' => 'Eomer von Rohan',
  'arwen.undomiel@bruchtal-kunst.ch' => 'Arwen Undomiel',
  'aragorn.telcontar@fc-gondor.ch' => 'Aragorn Telcontar',
  'bilbo.beutlin@auenland-senioren.ch' => 'Bilbo Beutlin',
  'gemeinde@bruchtal.ch' => 'Gemeinde Bruchtal',
  'sauron.mordor@dunkelturm.ch' => 'Sauron der Dunkle',
  'party.animal@wildfeiern.ch' => 'Party Animal',
  'verkauf@profit-first.com' => 'Verkauf Service',
];

echo "Creating test users for Event Review Dashboard...\n";

// Create users first
$created_users = [];
foreach ($test_users as $email => $name) {
  // Check if user already exists
  $existing_users = \Drupal::entityTypeManager()
    ->getStorage('user')
    ->loadByProperties(['mail' => $email]);
  
  if (empty($existing_users)) {
    $user = User::create([
      'name' => $email,
      'mail' => $email,
      'pass' => 'demo123',
      'status' => 1,
      'field_display_name' => $name,
    ]);
    $user->save();
    $created_users[$email] = $user;
    echo "✅ Created user: $name ($email)\n";
  } else {
    $created_users[$email] = reset($existing_users);
    echo "ℹ️  User exists: $name ($email)\n";
  }
}

echo "\nCreating test events...\n";

// Create events
foreach ($test_events as $event_data) {
  $submitter_email = $event_data['submitter'];
  $submitter = $created_users[$submitter_email] ?? null;
  
  if (!$submitter) {
    echo "❌ Could not find submitter for: {$event_data['title']}\n";
    continue;
  }

  // Check if event already exists
  $existing_events = \Drupal::entityTypeManager()
    ->getStorage('node')
    ->loadByProperties([
      'type' => 'event',
      'title' => $event_data['title']
    ]);

  if (!empty($existing_events)) {
    echo "ℹ️  Event exists: {$event_data['title']}\n";
    continue;
  }

  $event = Node::create([
    'type' => 'event',
    'title' => $event_data['title'],
    'body' => [
      'value' => $event_data['body'],
      'format' => 'basic_html',
    ],
    'uid' => $submitter->id(),
    'status' => ($event_data['moderation_state'] === 'published') ? 1 : 0,
    'moderation_state' => $event_data['moderation_state'],
    'created' => time() - rand(86400, 604800), // Created 1-7 days ago
  ]);

  // Add event-specific fields if they exist
  if ($event->hasField('field_event_date') && !empty($event_data['field_event_date'])) {
    $event->set('field_event_date', $event_data['field_event_date']);
  }
  
  if ($event->hasField('field_event_location') && !empty($event_data['field_event_location'])) {
    $event->set('field_event_location', $event_data['field_event_location']);
  }
  
  if ($event->hasField('field_event_category') && !empty($event_data['field_event_category'])) {
    $event->set('field_event_category', $event_data['field_event_category']);
  }
  
  if ($event->hasField('field_rejection_reason') && !empty($event_data['field_rejection_reason'])) {
    $event->set('field_rejection_reason', $event_data['field_rejection_reason']);
  }

  $event->save();
  
  $status_icon = match($event_data['moderation_state']) {
    'draft' => '📝',
    'published' => '✅',
    'rejected' => '❌',
    default => '❓'
  };
  
  echo "$status_icon Created event: {$event_data['title']} (State: {$event_data['moderation_state']})\n";
}

echo "\n🎯 Test data creation completed!\n\n";

echo "📊 Summary:\n";
echo "- Users created: " . count($created_users) . "\n";
echo "- Events created: " . count($test_events) . "\n";
echo "- Draft events: " . count(array_filter($test_events, fn($e) => $e['moderation_state'] === 'draft')) . "\n";
echo "- Published events: " . count(array_filter($test_events, fn($e) => $e['moderation_state'] === 'published')) . "\n";
echo "- Rejected events: " . count(array_filter($test_events, fn($e) => $e['moderation_state'] === 'rejected')) . "\n";

echo "\n🔗 Testing URLs:\n";
echo "- Dashboard: https://bruchtal.zh-demo.ddev.site/admin/content/events/review\n";
echo "- Admin login: ddev drush uli\n";
echo "- Create event: https://bruchtal.zh-demo.ddev.site/node/add/event\n";

echo "\n✅ Ready for Event Review Dashboard testing!\n";