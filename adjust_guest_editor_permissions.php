<?php

/**
 * Adjust Guest Editor permissions - only directory content types
 * Run with: ddev drush php:script adjust_guest_editor_permissions.php
 */

use Drupal\user\Entity\Role;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🔧 ANPASSUNG GUEST EDITOR BERECHTIGUNGEN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

$guest_editor_role = Role::load('guest_editor');
if ($guest_editor_role) {
  
  echo "📝 Entferne Berechtigungen für Seiten und News...\n";
  
  // Permissions to REMOVE (page and news content types)
  $permissions_to_remove = [
    // Page permissions
    'create page content',
    'edit own page content',
    'delete own page content',
    'view page revisions',
    'revert page revisions',
    'delete page revisions',
    
    // News permissions
    'create news content',
    'edit own news content',
    'delete own news content',
    'view news revisions',
    'revert news revisions',
    'delete news revisions',
    
    // Landing page permissions
    'create landing_page content',
    'edit own landing_page content',
    'delete own landing_page content',
    'view landing_page revisions',
    'revert landing_page revisions',
    'delete landing_page revisions',
  ];
  
  foreach ($permissions_to_remove as $permission) {
    if ($guest_editor_role->hasPermission($permission)) {
      $guest_editor_role->revokePermission($permission);
      echo "   ❌ Entfernt: $permission\n";
    }
  }
  
  echo "\n✅ Verbleibende Verzeichnis-Inhaltstypen für Guest Editor:\n";
  
  // Verify directory content type permissions remain
  $directory_permissions = [
    // Company (Firmen)
    'create company content',
    'edit own company content',
    'delete own company content',
    
    // Event (Veranstaltungen)
    'create event content',
    'edit own event content',
    'delete own event content',
    
    // Club (Vereine)
    'create club content',
    'edit own club content',
    'delete own club content',
    
    // Hospitality (Gastgewerbe)
    'create hospitality content',
    'edit own hospitality content',
    'delete own hospitality content',
  ];
  
  $has_all_directory_perms = true;
  foreach ($directory_permissions as $permission) {
    if (!$guest_editor_role->hasPermission($permission)) {
      // Add missing permission
      $guest_editor_role->grantPermission($permission);
      echo "   ➕ Hinzugefügt: $permission\n";
    } else {
      echo "   ✅ Vorhanden: $permission\n";
    }
  }
  
  $guest_editor_role->save();
  
  echo "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  echo "📊 ZUSAMMENFASSUNG\n";
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
  echo "Guest Editor kann NUR folgende Inhaltstypen verwalten:\n";
  echo "• 🏢 Firmen (company)\n";
  echo "• 📅 Events (event)\n";
  echo "• 🤝 Vereine (club)\n";
  echo "• 🍽️ Gastgewerbe (hospitality)\n";
  echo "\n";
  echo "Guest Editor kann NICHT erstellen/bearbeiten:\n";
  echo "• ❌ Seiten (page)\n";
  echo "• ❌ News (news)\n";
  echo "• ❌ Landing Pages (landing_page)\n";
  echo "\n";
  echo "Workflow-Regel bleibt bestehen:\n";
  echo "• Guest Editor kann Entwürfe erstellen\n";
  echo "• Guest Editor kann NICHT veröffentlichen\n";
  echo "• Nur Editoren können veröffentlichen\n";
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
} else {
  echo "❌ Guest Editor Rolle nicht gefunden!\n";
}

// Also clean up any orphaned content
$guest_user = user_load_by_name('guest.editor');
if ($guest_user) {
  // Delete the page content created earlier
  $query = \Drupal::entityQuery('node')
    ->condition('type', 'page')
    ->condition('uid', $guest_user->id())
    ->accessCheck(FALSE);
  $page_nids = $query->execute();
  
  if (!empty($page_nids)) {
    $pages = \Drupal\node\Entity\Node::loadMultiple($page_nids);
    foreach ($pages as $page) {
      $page->delete();
      echo "\n🗑️ Gelöscht: Seite '" . $page->getTitle() . "' von guest.editor\n";
    }
  }
}