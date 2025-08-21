<?php

/**
 * @file
 * Create demo events for GPZH presentation.
 * 
 * Usage: ddev exec php web/modules/custom/event_review/scripts/create_demo_events.php
 */

use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;
use Drupal\taxonomy\Entity\Term;

// Bootstrap Drupal
require_once 'web/core/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

echo "Creating demo events for GPZH Municipal Workflow Demo...\n";

// Create demo users if they don't exist
$demo_users = [
  'thorin.eichenschild@reitverein-bruchtal.ch' => 'Thorin Eichenschild',
  'gandalf.grau@kulturverein-bruchtal.ch' => 'Gandalf der Graue', 
  'saruman.weiss@events-unlimited.com' => 'Saruman Weiss'
];

foreach ($demo_users as $email => $name) {
  $existing_user = user_load_by_mail($email);
  if (!$existing_user) {
    $user = User::create([
      'name' => str_replace('@', '_', str_replace('.', '_', $email)),
      'mail' => $email,
      'status' => 1,
      'field_first_name' => explode(' ', $name)[0],
      'field_last_name' => explode(' ', $name)[1] ?? '',
    ]);
    $user->save();
    echo "Created user: {$name} ({$email})\n";
  }
}

// Get event type terms (create if needed)
$event_types = [
  'Private Veranstaltung' => 'private_social',
  'Öffentliche Veranstaltung' => 'public_event', 
  'Kommerzielle Veranstaltung' => 'commercial'
];

$type_terms = [];
foreach ($event_types as $type_name => $machine_name) {
  $terms = \Drupal::entityTypeManager()
    ->getStorage('taxonomy_term')
    ->loadByProperties(['name' => $type_name, 'vid' => 'event_type']);
  
  if (empty($terms)) {
    $term = Term::create([
      'vid' => 'event_type',
      'name' => $type_name,
    ]);
    $term->save();
    $type_terms[$machine_name] = $term->id();
    echo "Created event type: {$type_name}\n";
  } else {
    $type_terms[$machine_name] = reset($terms)->id();
  }
}

// Demo Events Data
$demo_events = [
  [
    'title' => 'Kindergeburtstag im Vereinsheim',
    'body' => 'Feier für Bilbo Beutlin zum 111. Geburtstag. Familiäre Atmosphäre mit Kuchen, Spielen und gemütlichem Beisammensein. Nur geladene Gäste aus der Familie und dem Reitverein.',
    'field_event_date' => date('Y-m-d\TH:i:s', strtotime('+1 week saturday 14:00')),
    'field_event_type' => $type_terms['private_social'],
    'field_venue' => 'Vereinsheim FC Bruchtal, Seestrasse 12, 8803 Bruchtal',
    'field_expected_attendance' => 25,
    'field_contact_phone' => '+41 44 123 45 67',
    'field_organization' => 'Reitverein Bruchtal',
    'field_cost' => 'Kostenlos für Mitglieder',
    'moderation_state' => 'draft',
    'uid' => user_load_by_mail('thorin.eichenschild@reitverein-bruchtal.ch')->id(),
  ],
  [
    'title' => 'Sommerfest am Seeufer',
    'body' => 'Grosses Sommerfest des Kulturvereins mit Live-Musik, lokalen Spezialitäten und Aktivitäten für die ganze Familie. Öffentliche Veranstaltung zur Stärkung der Dorfgemeinschaft.',
    'field_event_date' => date('Y-m-d\TH:i:s', strtotime('+2 week saturday 18:00')),
    'field_event_type' => $type_terms['public_event'],
    'field_venue' => 'Seepromenade Bruchtal, 8803 Bruchtal',
    'field_expected_attendance' => 200,
    'field_contact_phone' => '+41 44 123 45 68',
    'field_organization' => 'Kulturverein Bruchtal',
    'field_cost' => 'Eintritt frei, Konsumation kostenpflichtig',
    'moderation_state' => 'draft',
    'uid' => user_load_by_mail('gandalf.grau@kulturverein-bruchtal.ch')->id(),
  ],
  [
    'title' => 'Midnight Music Festival',
    'body' => 'Kommerzielles Musikfestival mit internationalen DJs und elektronischer Musik. Geplant bis in die frühen Morgenstunden mit professioneller Beschallung.',
    'field_event_date' => date('Y-m-d\TH:i:s', strtotime('+3 week saturday 22:00')),
    'field_event_type' => $type_terms['commercial'],
    'field_venue' => 'Sportplatz Bruchtal, Sportplatzweg 5, 8803 Bruchtal',
    'field_expected_attendance' => 500,
    'field_contact_phone' => '+41 44 987 65 43',
    'field_organization' => 'Events Unlimited GmbH',
    'field_cost' => 'Tickets: CHF 45.- (Vorverkauf), CHF 55.- (Abendkasse)',
    'moderation_state' => 'rejected',
    'field_rejection_reason' => 'Verstoss gegen gemeindliche Ruhezeiten (nach 22:00). Zusätzlich fehlen Bewilligungen für Lärm, Verkehr und kommerzielle Nutzung des Sportplatzes.',
    'uid' => user_load_by_mail('saruman.weiss@events-unlimited.com')->id(),
  ],
  [
    'title' => 'Turnverein Jahresversammlung',
    'body' => 'Jährliche Mitgliederversammlung des Turnvereins Bruchtal mit Jahresbericht, Wahlen und anschliessendem gemütlichen Beisammensein.',
    'field_event_date' => date('Y-m-d\TH:i:s', strtotime('+1 week friday 19:30')),
    'field_event_type' => $type_terms['private_social'],
    'field_venue' => 'Mehrzweckhalle Bruchtal, Schulhausstrasse 8, 8803 Bruchtal',
    'field_expected_attendance' => 45,
    'field_contact_phone' => '+41 44 123 45 69',
    'field_organization' => 'Turnverein Bruchtal',
    'field_cost' => 'Kostenlos für Mitglieder',
    'moderation_state' => 'published',
    'uid' => user_load_by_mail('thorin.eichenschild@reitverein-bruchtal.ch')->id(),
  ],
  [
    'title' => 'Musikverein Frühlingskonzert',
    'body' => 'Traditionelles Frühlingskonzert des Musikvereins Bruchtal mit bekannten Melodien und einem Auftritt der Jugendkapelle.',
    'field_event_date' => date('Y-m-d\TH:i:s', strtotime('+4 week sunday 14:00')),
    'field_event_type' => $type_terms['public_event'],
    'field_venue' => 'Gemeindehalle Bruchtal, Dorfplatz 1, 8803 Bruchtal',
    'field_expected_attendance' => 120,
    'field_contact_phone' => '+41 44 123 45 70',
    'field_organization' => 'Musikverein Bruchtal',
    'field_cost' => 'Kollekte',
    'moderation_state' => 'published',
    'uid' => user_load_by_mail('gandalf.grau@kulturverein-bruchtal.ch')->id(),
  ]
];

// Create the demo events
foreach ($demo_events as $event_data) {
  // Check if event already exists
  $existing = \Drupal::entityTypeManager()
    ->getStorage('node')
    ->loadByProperties(['title' => $event_data['title'], 'type' => 'event']);
  
  if (empty($existing)) {
    $event = Node::create([
      'type' => 'event',
      'title' => $event_data['title'],
      'body' => [
        'value' => $event_data['body'],
        'format' => 'basic_html',
      ],
      'field_event_date' => $event_data['field_event_date'],
      'field_event_type' => $event_data['field_event_type'],
      'field_venue' => $event_data['field_venue'],
      'field_expected_attendance' => $event_data['field_expected_attendance'] ?? NULL,
      'field_contact_phone' => $event_data['field_contact_phone'] ?? NULL,
      'field_organization' => $event_data['field_organization'] ?? NULL,
      'field_cost' => $event_data['field_cost'] ?? NULL,
      'moderation_state' => $event_data['moderation_state'],
      'field_rejection_reason' => $event_data['field_rejection_reason'] ?? NULL,
      'uid' => $event_data['uid'],
      'status' => $event_data['moderation_state'] === 'published' ? 1 : 0,
    ]);
    
    $event->save();
    echo "Created event: {$event_data['title']} (Status: {$event_data['moderation_state']})\n";
  } else {
    echo "Event already exists: {$event_data['title']}\n";
  }
}

echo "\n✅ Demo events creation completed!\n";
echo "Navigate to /admin/content/events/review to see the demo data.\n";
echo "\nDemo Events Summary:\n";
echo "- 2 Events in 'draft' status (ready for live demo approval/rejection)\n";
echo "- 1 Event in 'rejected' status (shows rejection workflow)\n"; 
echo "- 2 Events in 'published' status (shows successful approvals)\n";
echo "\nPerfect for demonstrating Municipal Event Workflows! 🎯\n";