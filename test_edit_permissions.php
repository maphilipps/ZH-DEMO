<?php

/**
 * Test Edit Permissions for different roles
 * Run with: ddev drush php:script test_edit_permissions.php
 */

use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🧪 TEST BEARBEITUNGSRECHTE\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Get users
$guest_editor = user_load_by_name('guest.editor');
$editor = user_load_by_name('editor.test');
$demo_user = user_load_by_name('demo.user');

// Count content by user
function countUserContent($uid) {
  $query = \Drupal::entityQuery('node')
    ->condition('uid', $uid)
    ->accessCheck(FALSE);
  return count($query->execute());
}

// Check permissions for a user
function checkUserPermissions($user, $permission_checks) {
  $account = \Drupal::currentUser();
  $original_account = $account->getAccount();
  
  // Switch to user context
  $account->setAccount($user);
  
  $results = [];
  foreach ($permission_checks as $perm) {
    $results[$perm] = $user->hasPermission($perm);
  }
  
  // Switch back
  $account->setAccount($original_account);
  
  return $results;
}

// Test guest.editor
if ($guest_editor) {
  echo "👤 GUEST.EDITOR (UID: " . $guest_editor->id() . ")\n";
  echo "──────────────────────────────────────────────────────\n";
  
  $content_count = countUserContent($guest_editor->id());
  echo "📊 Eigene Inhalte: $content_count\n";
  
  $permissions_to_check = [
    'edit own company content',
    'edit own event content',
    'delete own company content',
    'use basic_editorial transition create_new_draft',
    'use basic_editorial transition publish',
  ];
  
  echo "🔑 Berechtigungen:\n";
  foreach ($permissions_to_check as $perm) {
    $has_perm = $guest_editor->hasPermission($perm);
    $icon = $has_perm ? '✅' : '❌';
    echo "   $icon $perm\n";
  }
  
  // Get one of their nodes to test
  $query = \Drupal::entityQuery('node')
    ->condition('uid', $guest_editor->id())
    ->range(0, 1)
    ->accessCheck(FALSE);
  $nids = $query->execute();
  
  if (!empty($nids)) {
    $test_node = Node::load(reset($nids));
    echo "\n📝 Test-Inhalt: " . $test_node->getTitle() . "\n";
    echo "   - Status: " . ($test_node->get('moderation_state')->value ?? 'N/A') . "\n";
    echo "   - Bearbeiten-URL: /node/" . $test_node->id() . "/edit\n";
  }
  echo "\n";
}

// Test editor.test
if ($editor) {
  echo "👤 EDITOR.TEST (UID: " . $editor->id() . ")\n";
  echo "──────────────────────────────────────────────────────\n";
  
  $content_count = countUserContent($editor->id());
  echo "📊 Eigene Inhalte: $content_count\n";
  
  $permissions_to_check = [
    'edit any company content',
    'edit any event content',
    'use basic_editorial transition publish',
    'use basic_editorial transition unpublish',
  ];
  
  echo "🔑 Berechtigungen:\n";
  foreach ($permissions_to_check as $perm) {
    $has_perm = $editor->hasPermission($perm);
    $icon = $has_perm ? '✅' : '❌';
    echo "   $icon $perm\n";
  }
  echo "\n";
}

// Test demo.user
if ($demo_user) {
  echo "👤 DEMO.USER (UID: " . $demo_user->id() . ")\n";
  echo "──────────────────────────────────────────────────────\n";
  
  $content_count = countUserContent($demo_user->id());
  echo "📊 Eigene Inhalte: $content_count\n";
  
  $permissions_to_check = [
    'edit own company content',
    'edit own event content',
    'use basic_editorial transition create_new_draft',
    'use basic_editorial transition publish',
  ];
  
  echo "🔑 Berechtigungen:\n";
  foreach ($permissions_to_check as $perm) {
    $has_perm = $demo_user->hasPermission($perm);
    $icon = $has_perm ? '✅' : '❌';
    echo "   $icon $perm\n";
  }
  echo "\n";
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "📊 DASHBOARD ÜBERSICHT\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Dashboard-URLs:\n";
echo "• guest.editor: /user/8/dashboard (5 Inhalte)\n";
echo "• editor.test: /user/7/dashboard (1 Inhalt)\n";
echo "• demo.user: /user/6/dashboard (6 Inhalte)\n";
echo "\n";
echo "Login-Links generieren:\n";
echo "• ddev drush uli --name=guest.editor\n";
echo "• ddev drush uli --name=editor.test\n";
echo "• ddev drush uli --name=demo.user\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";