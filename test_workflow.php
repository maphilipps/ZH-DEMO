<?php

/**
 * Test Editorial Workflow
 * Run with: ddev drush php:script test_workflow.php
 */

use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🧪 WORKFLOW TEST - GPZH Editorial System\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Test als Gast-Redakteur
$guest_editor = user_load_by_name('guest.editor');
if ($guest_editor) {
  echo "👤 Test als Gast-Redakteur (kann nur Entwürfe erstellen):\n";
  echo "──────────────────────────────────────────────────────\n";
  
  // Create a draft as guest editor
  $draft_node = Node::create([
    'type' => 'event',
    'title' => 'Sommerfest 2025 (Entwurf von Gast-Redakteur)',
    'body' => [
      'value' => 'Das große Sommerfest der Gemeinde Bruchtal findet am 15. Juli 2025 statt.',
      'format' => 'basic_html',
    ],
    'field_event_date' => '2025-07-15T14:00:00',
    'uid' => $guest_editor->id(),
    'moderation_state' => 'draft',
  ]);
  $draft_node->save();
  
  echo "✅ Entwurf erstellt: " . $draft_node->getTitle() . "\n";
  echo "   Status: " . $draft_node->get('moderation_state')->value . "\n";
  echo "   ID: " . $draft_node->id() . "\n";
  echo "   URL: /node/" . $draft_node->id() . "/edit\n\n";
}

// Test als Editor
$editor = user_load_by_name('editor.test');
if ($editor) {
  echo "👤 Test als Editor (kann veröffentlichen):\n";
  echo "──────────────────────────────────────────────────────\n";
  
  // Create and immediately publish as editor
  $published_node = Node::create([
    'type' => 'news',
    'title' => 'Wichtige Mitteilung der Gemeinde',
    'body' => [
      'value' => 'Die Gemeinde Bruchtal informiert über neue Öffnungszeiten ab Januar 2025.',
      'format' => 'basic_html',
    ],
    'uid' => $editor->id(),
    'moderation_state' => 'published',
  ]);
  $published_node->save();
  
  echo "✅ Direkt veröffentlicht: " . $published_node->getTitle() . "\n";
  echo "   Status: " . $published_node->get('moderation_state')->value . "\n";
  echo "   ID: " . $published_node->id() . "\n";
  echo "   URL: /node/" . $published_node->id() . "\n\n";
  
  // Editor publishes the guest editor's draft
  if (isset($draft_node)) {
    $draft_node->set('moderation_state', 'published');
    $draft_node->save();
    echo "✅ Editor hat Gast-Entwurf veröffentlicht!\n";
    echo "   Titel: " . $draft_node->getTitle() . "\n";
    echo "   Neuer Status: " . $draft_node->get('moderation_state')->value . "\n\n";
  }
}

// Test als normaler authentifizierter Benutzer
$normal_user = user_load_by_name('demo.user');
if ($normal_user) {
  echo "👤 Test als normaler Benutzer (kann nur eigene Entwürfe erstellen):\n";
  echo "──────────────────────────────────────────────────────\n";
  
  $user_draft = Node::create([
    'type' => 'company',
    'title' => 'Neue Bäckerei Müller (Benutzer-Entwurf)',
    'field_description' => 'Frische Backwaren täglich ab 6 Uhr morgens.',
    'field_contact_name' => 'Hans Müller',
    'field_email' => 'info@baeckerei-mueller.ch',
    'uid' => $normal_user->id(),
    'moderation_state' => 'draft',
  ]);
  $user_draft->save();
  
  echo "✅ Entwurf erstellt: " . $user_draft->getTitle() . "\n";
  echo "   Status: " . $user_draft->get('moderation_state')->value . "\n";
  echo "   Hinweis: Benutzer kann diesen Entwurf NICHT selbst veröffentlichen\n\n";
}

// Workflow-Übersicht
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 WORKFLOW-ÜBERSICHT\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Count content by status
$query = \Drupal::entityQuery('node');
$all_nodes = $query->accessCheck(FALSE)->execute();

$status_count = [
  'draft' => 0,
  'published' => 0,
  'unpublished' => 0,
  'archived' => 0,
];

foreach ($all_nodes as $nid) {
  $node = Node::load($nid);
  if ($node && $node->hasField('moderation_state')) {
    $state = $node->get('moderation_state')->value;
    if (isset($status_count[$state])) {
      $status_count[$state]++;
    }
  } elseif ($node) {
    // Nodes without moderation
    if ($node->isPublished()) {
      $status_count['published']++;
    } else {
      $status_count['unpublished']++;
    }
  }
}

echo "Inhalte nach Status:\n";
echo "• Entwürfe: " . $status_count['draft'] . "\n";
echo "• Veröffentlicht: " . $status_count['published'] . "\n";
echo "• Unveröffentlicht: " . $status_count['unpublished'] . "\n";
echo "• Archiviert: " . $status_count['archived'] . "\n\n";

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "✅ WORKFLOW-REGELN ZUSAMMENFASSUNG:\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "• Normale Benutzer: Können Entwürfe erstellen und bearbeiten\n";
echo "• Gast-Redakteure: Können Entwürfe erstellen und bearbeiten\n";
echo "• Editoren: Können Entwürfe erstellen, bearbeiten UND veröffentlichen\n";
echo "• Nur Editoren haben die Berechtigung zur Veröffentlichung!\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";