<?php

/**
 * Script to set up user dashboard with test content
 * Run with: ddev drush php:script setup_user_dashboard.php
 */

use Drupal\user\Entity\User;
use Drupal\node\Entity\Node;

// Create a test user if not exists
$test_user = user_load_by_name('demo.user');
if (!$test_user) {
  $test_user = User::create([
    'name' => 'demo.user',
    'mail' => 'demo.user@bruchtal.ch',
    'pass' => 'Demo2025!',
    'status' => 1,
    'roles' => ['authenticated', 'content_editor'],
  ]);
  $test_user->save();
  echo "Test-User erstellt: demo.user (ID: " . $test_user->id() . ")\n";
  echo "Passwort: Demo2025!\n\n";
} else {
  echo "Test-User existiert bereits: demo.user (ID: " . $test_user->id() . ")\n\n";
}

$uid = $test_user->id();

// Create sample content for the user

// Create a company
$company = Node::create([
  'type' => 'company',
  'title' => 'Mithril Technologies GmbH',
  'field_description' => 'Innovative Technologielösungen inspiriert von den legendären Mithril-Schmieden.',
  'field_contact_name' => 'Demo User',
  'field_contact_position' => 'Geschäftsführer',
  'field_email' => 'info@mithril-tech.ch',
  'field_phone' => '044 555 12 34',
  'field_website' => 'https://mithril-tech.ch',
  'status' => 1,
  'uid' => $uid,
]);
$company->save();
echo "Firma erstellt: " . $company->getTitle() . "\n";

// Create an event
$event = Node::create([
  'type' => 'event',
  'title' => 'Mittelerde Tech Conference 2025',
  'body' => [
    'value' => 'Die größte Technologie-Konferenz in Bruchtal. Lernen Sie von den besten Experten aus ganz Mittelerde.',
    'format' => 'basic_html',
  ],
  'field_event_date' => '2025-09-15T09:00:00',
  'status' => 1,
  'uid' => $uid,
]);
$event->save();
echo "Event erstellt: " . $event->getTitle() . "\n";

// Create a club
$club = Node::create([
  'type' => 'club',
  'title' => 'Hobbit Wanderverein Bruchtal',
  'field_description' => 'Gemeinsame Wanderungen und Abenteuer für alle Altersgruppen. Zweites Frühstück inklusive!',
  'field_contact_name' => 'Demo User',
  'field_contact_position' => 'Vereinspräsident',
  'field_email' => 'wandern@hobbit-club.ch',
  'field_phone' => '044 555 56 78',
  'status' => 1,
  'uid' => $uid,
]);
$club->save();
echo "Verein erstellt: " . $club->getTitle() . "\n";

// Create a hospitality business
$hospitality = Node::create([
  'type' => 'hospitality',
  'title' => 'Zum Grünen Drachen - Gasthaus',
  'field_description' => 'Gemütliches Gasthaus mit traditioneller Küche und dem besten Bier in ganz Bruchtal.',
  'field_contact_name' => 'Demo User',
  'field_contact_position' => 'Gastwirt',
  'field_email' => 'info@gruener-drache.ch',
  'field_phone' => '044 555 90 12',
  'field_website' => 'https://gruener-drache.ch',
  'status' => 1,
  'uid' => $uid,
]);
$hospitality->save();
echo "Gastgewerbe erstellt: " . $hospitality->getTitle() . "\n";

// Create some draft content
$draft_event = Node::create([
  'type' => 'event',
  'title' => 'Herbstfest Bruchtal 2025 (Entwurf)',
  'body' => [
    'value' => 'Großes Herbstfest mit Musik, Tanz und lokalen Spezialitäten.',
    'format' => 'basic_html',
  ],
  'field_event_date' => '2025-10-20T14:00:00',
  'status' => 0, // Unpublished
  'uid' => $uid,
]);
$draft_event->save();
echo "Event-Entwurf erstellt: " . $draft_event->getTitle() . "\n";

$draft_company = Node::create([
  'type' => 'company',
  'title' => 'Elbenschmiede AG (In Bearbeitung)',
  'field_description' => 'Feinste Handwerkskunst nach Elbentradition.',
  'field_contact_name' => 'Demo User',
  'field_email' => 'info@elbenschmiede.ch',
  'status' => 0, // Unpublished
  'uid' => $uid,
]);
$draft_company->save();
echo "Firmen-Entwurf erstellt: " . $draft_company->getTitle() . "\n";

echo "\n✅ User-Dashboard Setup abgeschlossen!\n";
echo "Login: demo.user / Demo2025!\n";
echo "Dashboard URL: /user/" . $uid . "/dashboard\n";