<?php

/**
 * Setup Editorial Workflow for GPZH Demo
 * Run with: ddev drush php:script setup_editorial_workflow.php
 */

use Drupal\user\Entity\Role;
use Drupal\workflows\Entity\Workflow;

// Create Editor role if not exists
$editor_role = Role::load('editor');
if (!$editor_role) {
  $editor_role = Role::create([
    'id' => 'editor',
    'label' => 'Redakteur',
    'weight' => 2,
  ]);
  
  // Assign permissions for Editor role
  $editor_permissions = [
    // Content creation and editing
    'access content overview',
    'access administration pages',
    'view the administration theme',
    'access contextual links',
    'access frontend editing',
    'view own unpublished content',
    'view any unpublished content',
    
    // Company content type
    'create company content',
    'edit any company content',
    'delete any company content',
    'view company revisions',
    'revert company revisions',
    'delete company revisions',
    
    // Event content type
    'create event content',
    'edit any event content',
    'delete any event content',
    'view event revisions',
    'revert event revisions',
    'delete event revisions',
    
    // Club content type
    'create club content',
    'edit any club content',
    'delete any club content',
    'view club revisions',
    'revert club revisions',
    'delete club revisions',
    
    // Hospitality content type
    'create hospitality content',
    'edit any hospitality content',
    'delete any hospitality content',
    'view hospitality revisions',
    'revert hospitality revisions',
    'delete hospitality revisions',
    
    // Page content type
    'create page content',
    'edit any page content',
    'delete any page content',
    'view page revisions',
    'revert page revisions',
    'delete page revisions',
    
    // News content type
    'create news content',
    'edit any news content',
    'delete any news content',
    'view news revisions',
    'revert news revisions',
    'delete news revisions',
    
    // Landing page content type
    'create landing_page content',
    'edit any landing_page content',
    'delete any landing_page content',
    'view landing_page revisions',
    'revert landing_page revisions',
    'delete landing_page revisions',
    
    // Media management
    'access media overview',
    'create image media',
    'edit any image media',
    'delete any image media',
    'create document media',
    'edit any document media',
    'delete any document media',
    
    // Workflow transitions - Editor can publish!
    'use basic_editorial transition create_new_draft',
    'use basic_editorial transition publish',
    'use basic_editorial transition unpublish',
    'use basic_editorial transition archive',
    'view latest version',
    'view any unpublished content',
    
    // URL aliases
    'create url aliases',
    'administer url aliases',
    
    // Menu management
    'administer menu',
    
    // Text formats
    'use text format basic_html',
    'use text format full_html',
    
    // AI features
    'use ai ckeditor',
    'access ai content suggestion tools',
    'generate ai alt tags',
    
    // Other
    'access navigation',
    'view all revisions',
    'schedule publishing of nodes',
  ];
  
  foreach ($editor_permissions as $permission) {
    $editor_role->grantPermission($permission);
  }
  
  $editor_role->save();
  echo "✅ Editor-Rolle erstellt mit Veröffentlichungsrechten\n";
} else {
  echo "Editor-Rolle existiert bereits\n";
}

// Update Guest Editor role - can only create drafts
$guest_editor = Role::load('guest_editor');
if ($guest_editor) {
  // Remove any publish permissions
  $guest_editor->revokePermission('use editorial transition publish');
  $guest_editor->revokePermission('use basic_editorial transition publish');
  
  // Only allow draft creation
  $guest_editor->grantPermission('use editorial transition create_new_draft');
  $guest_editor->grantPermission('view own unpublished content');
  $guest_editor->save();
  echo "✅ Gast-Redakteur Rolle aktualisiert - kann nur Entwürfe erstellen\n";
}

// Use existing basic_editorial workflow or create new one
$workflow = Workflow::load('basic_editorial');
if (!$workflow) {
  $workflow = Workflow::create([
    'id' => 'basic_editorial',
    'label' => 'Redaktioneller Workflow',
    'type' => 'content_moderation',
  ]);
  
  // Configure workflow states (only if new)
  $workflow->getTypePlugin()->addState('draft', 'Entwurf');
  $workflow->getTypePlugin()->addState('review', 'In Prüfung');
  $workflow->getTypePlugin()->addState('published', 'Veröffentlicht');
  $workflow->getTypePlugin()->addState('archived', 'Archiviert');
} else {
  echo "Verwende vorhandenen basic_editorial Workflow\n";
  // Add review state if not exists
  try {
    $workflow->getTypePlugin()->addState('review', 'In Prüfung');
  } catch (\Exception $e) {
    // State might already exist
  }
  try {
    $workflow->getTypePlugin()->addState('archived', 'Archiviert');
  } catch (\Exception $e) {
    // State might already exist
  }
}

// Transitions for basic_editorial workflow are already configured
// We'll only add the archive transitions if needed
$transitions_to_add = [
  'archive' => [
    'label' => 'Archivieren',
    'from' => ['published'],
    'to' => 'archived',
  ],
  'restore_from_archive' => [
    'label' => 'Aus Archiv wiederherstellen',
    'from' => ['archived'],
    'to' => 'draft',
  ],
];

foreach ($transitions_to_add as $id => $transition) {
  try {
    if (isset($transition['to']) && $workflow->getTypePlugin()->hasState($transition['to'])) {
      $workflow->getTypePlugin()->addTransition($id, $transition['label'], $transition['from'], $transition['to']);
      echo "Transition '$id' hinzugefügt\n";
    }
  } catch (\Exception $e) {
    // Transition might already exist or state not available
  }
}

// Apply workflow to content types
$content_types = [
  'company',
  'event',
  'club',
  'hospitality',
  'page',
  'news',
  'landing_page'
];

foreach ($content_types as $bundle) {
  $workflow->getTypePlugin()->addEntityTypeAndBundle('node', $bundle);
}

$workflow->save();
echo "✅ Redaktioneller Workflow konfiguriert für alle Content-Types\n";

// Grant workflow permissions to roles
// WICHTIG: Nur Editor kann veröffentlichen!
$role_permissions = [
  'authenticated' => [
    'use basic_editorial transition create_new_draft',
    'view latest version',
    'view own unpublished content',
  ],
  'guest_editor' => [
    'use basic_editorial transition create_new_draft',
    'view latest version',
    'view own unpublished content',
  ],
  'editor' => [
    'use basic_editorial transition create_new_draft',
    'use basic_editorial transition publish',
    'use basic_editorial transition unpublish',
    'use basic_editorial transition archive',
    'view latest version',
    'view any unpublished content',
  ],
  'content_editor' => [
    'use basic_editorial transition create_new_draft',
    'view latest version',
    'view any unpublished content',
  ],
];

foreach ($role_permissions as $role_id => $permissions) {
  $role = Role::load($role_id);
  if ($role) {
    foreach ($permissions as $permission) {
      $role->grantPermission($permission);
    }
    $role->save();
    echo "✅ Workflow-Rechte für $role_id konfiguriert\n";
  }
}

// Create test users
$test_users = [
  [
    'name' => 'editor.test',
    'mail' => 'editor@bruchtal.ch',
    'pass' => 'Editor2025!',
    'roles' => ['editor'],
  ],
  [
    'name' => 'guest.editor',
    'mail' => 'guest.editor@bruchtal.ch',
    'pass' => 'Guest2025!',
    'roles' => ['guest_editor'],
  ],
];

foreach ($test_users as $user_data) {
  $existing = user_load_by_name($user_data['name']);
  if (!$existing) {
    $user = \Drupal\user\Entity\User::create([
      'name' => $user_data['name'],
      'mail' => $user_data['mail'],
      'pass' => $user_data['pass'],
      'status' => 1,
      'roles' => $user_data['roles'],
    ]);
    $user->save();
    echo "✅ Test-User erstellt: {$user_data['name']} (Rolle: " . implode(', ', $user_data['roles']) . ")\n";
  }
}

echo "\n🎯 Workflow-Setup abgeschlossen!\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Test-Benutzer:\n";
echo "• Editor: editor.test / Editor2025! (kann veröffentlichen)\n";
echo "• Gast-Redakteur: guest.editor / Guest2025! (kann nur Entwürfe erstellen)\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";