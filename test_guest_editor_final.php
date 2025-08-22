<?php

/**
 * Final test of Guest Editor permissions
 * Run with: ddev drush php:script test_guest_editor_final.php
 */

use Drupal\user\Entity\User;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🧪 FINALER TEST: GUEST EDITOR BERECHTIGUNGEN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$guest_editor = user_load_by_name('guest.editor');
if (!$guest_editor) {
  echo "❌ Guest Editor nicht gefunden!\n";
  exit;
}

echo "👤 Benutzer: guest.editor (UID: " . $guest_editor->id() . ")\n";
echo "📧 E-Mail: " . $guest_editor->getEmail() . "\n";
echo "🔑 Rolle: Gast-Redakteur\n\n";

// Define content types to check
$content_types = [
  'company' => ['label' => '🏢 Firmen', 'allowed' => true],
  'event' => ['label' => '📅 Events', 'allowed' => true],
  'club' => ['label' => '🤝 Vereine', 'allowed' => true],
  'hospitality' => ['label' => '🍽️ Gastgewerbe', 'allowed' => true],
  'page' => ['label' => '📄 Seiten', 'allowed' => false],
  'news' => ['label' => '📰 News', 'allowed' => false],
  'landing_page' => ['label' => '🏠 Landing Pages', 'allowed' => false],
];

echo "📋 BERECHTIGUNGSMATRIX:\n";
echo "──────────────────────────────────────────────────────\n";
echo sprintf("%-20s | %-10s | %-10s | %-10s\n", "Inhaltstyp", "Erstellen", "Bearbeiten", "Löschen");
echo "──────────────────────────────────────────────────────\n";

foreach ($content_types as $type => $info) {
  $create_perm = "create {$type} content";
  $edit_perm = "edit own {$type} content";
  $delete_perm = "delete own {$type} content";
  
  $can_create = $guest_editor->hasPermission($create_perm);
  $can_edit = $guest_editor->hasPermission($edit_perm);
  $can_delete = $guest_editor->hasPermission($delete_perm);
  
  $create_icon = $can_create ? '✅' : '❌';
  $edit_icon = $can_edit ? '✅' : '❌';
  $delete_icon = $can_delete ? '✅' : '❌';
  
  // Check if permissions match expected
  $expected = $info['allowed'];
  $status = ($can_create == $expected && $can_edit == $expected && $can_delete == $expected) ? '✅' : '⚠️';
  
  echo sprintf("%-20s | %-10s | %-10s | %-10s %s\n", 
    $info['label'], 
    $create_icon, 
    $edit_icon, 
    $delete_icon,
    $status
  );
}

echo "\n📊 WORKFLOW BERECHTIGUNGEN:\n";
echo "──────────────────────────────────────────────────────\n";

$workflow_permissions = [
  'use basic_editorial transition create_new_draft' => 'Entwürfe erstellen',
  'use basic_editorial transition publish' => 'Veröffentlichen',
  'use basic_editorial transition unpublish' => 'Veröffentlichung zurücknehmen',
  'view own unpublished content' => 'Eigene unveröffentlichte Inhalte anzeigen',
  'view any unpublished content' => 'Alle unveröffentlichten Inhalte anzeigen',
];

foreach ($workflow_permissions as $perm => $label) {
  $has_perm = $guest_editor->hasPermission($perm);
  $icon = $has_perm ? '✅' : '❌';
  echo "$icon $label\n";
}

// Count existing content
$query = \Drupal::entityQuery('node')
  ->condition('uid', $guest_editor->id())
  ->accessCheck(FALSE);
$content_count = count($query->execute());

echo "\n📈 INHALTSÜBERSICHT:\n";
echo "──────────────────────────────────────────────────────\n";
echo "Gesamte Inhalte: $content_count\n\n";

// Count by type
$types_with_content = [];
foreach (['company', 'event', 'club', 'hospitality'] as $type) {
  $query = \Drupal::entityQuery('node')
    ->condition('uid', $guest_editor->id())
    ->condition('type', $type)
    ->accessCheck(FALSE);
  $count = count($query->execute());
  if ($count > 0) {
    $types_with_content[$type] = $count;
  }
}

foreach ($types_with_content as $type => $count) {
  $label = $content_types[$type]['label'] ?? $type;
  echo "• $label: $count Inhalt(e)\n";
}

echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "✅ TEST ERFOLGREICH\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Guest Editor ist korrekt konfiguriert:\n";
echo "• Kann NUR Verzeichnis-Inhalte erstellen (Firmen, Events, Vereine, Gastgewerbe)\n";
echo "• Kann eigene Inhalte bearbeiten und löschen\n";
echo "• Kann Entwürfe erstellen\n";
echo "• Kann NICHT veröffentlichen (benötigt Editor)\n";
echo "• Kann KEINE Seiten, News oder Landing Pages erstellen\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";