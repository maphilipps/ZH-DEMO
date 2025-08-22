<?php

/**
 * Fix Guest Editor permissions and create demo content
 * Run with: ddev drush php:script fix_guest_editor_permissions.php
 */

use Drupal\user\Entity\Role;
use Drupal\user\Entity\User;
use Drupal\node\Entity\Node;

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "🔧 FIXING GUEST EDITOR PERMISSIONS\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

// Fix Guest Editor permissions
$guest_editor_role = Role::load('guest_editor');
if ($guest_editor_role) {
  
  // Permissions for guest editor to edit OWN content
  $permissions = [
    // View permissions
    'access content',
    'view own unpublished content',
    'view latest version',
    'access user dashboard',
    'view welcome dashboard',
    
    // Create permissions
    'create company content',
    'create event content',
    'create club content',
    'create hospitality content',
    'create page content',
    'create news content',
    
    // Edit OWN content permissions
    'edit own company content',
    'edit own event content',
    'edit own club content',
    'edit own hospitality content',
    'edit own page content',
    'edit own news content',
    
    // Delete OWN content permissions  
    'delete own company content',
    'delete own event content',
    'delete own club content',
    'delete own hospitality content',
    'delete own page content',
    'delete own news content',
    
    // Revision permissions for own content
    'view own unpublished content',
    'view event revisions',
    'view page revisions',
    'view news revisions',
    
    // Media permissions
    'create image media',
    'create document media',
    'edit own image media',
    'edit own document media',
    'view media',
    'view own unpublished media',
    
    // Workflow permissions (only draft creation, no publishing!)
    'use basic_editorial transition create_new_draft',
    
    // Basic permissions
    'access administration pages',
    'view the administration theme',
    'access contextual links',
    'access frontend editing',
    'access navigation',
    'access shortcuts',
    
    // Text formats
    'use text format basic_html',
    
    // File uploads
    'dropzone upload files',
    'delete own files',
  ];
  
  // Clear existing permissions first
  $current_permissions = $guest_editor_role->getPermissions();
  foreach ($current_permissions as $perm) {
    $guest_editor_role->revokePermission($perm);
  }
  
  // Grant all new permissions
  foreach ($permissions as $permission) {
    $guest_editor_role->grantPermission($permission);
  }
  
  $guest_editor_role->save();
  echo "✅ Guest Editor Berechtigungen aktualisiert\n";
  echo "   - Kann eigene Inhalte erstellen und bearbeiten\n";
  echo "   - Kann NICHT veröffentlichen (nur Entwürfe)\n";
  echo "   - Hat Zugriff auf Dashboard\n\n";
}

// Create demo content for guest.editor
$guest_user = user_load_by_name('guest.editor');
if ($guest_user) {
  echo "📝 Erstelle Demo-Inhalte für guest.editor...\n";
  echo "──────────────────────────────────────────────────────\n";
  
  // Create a company
  $company = Node::create([
    'type' => 'company',
    'title' => 'Auenland Gärtnerei GmbH',
    'field_description' => 'Professionelle Gartenpflege und Landschaftsgestaltung. Wir bringen das Auenland in Ihren Garten!',
    'field_contact_name' => 'Sam Gamdschie',
    'field_contact_position' => 'Geschäftsführer',
    'field_email' => 'info@auenland-gaertnerei.ch',
    'field_phone' => '044 555 77 88',
    'field_website' => 'https://auenland-gaertnerei.ch',
    'status' => 0, // Unpublished (draft)
    'moderation_state' => 'draft',
    'uid' => $guest_user->id(),
  ]);
  $company->save();
  echo "✅ Firma erstellt: " . $company->getTitle() . " (Entwurf)\n";
  
  // Create an event
  $event = Node::create([
    'type' => 'event',
    'title' => 'Gartenschau Bruchtal 2025',
    'body' => [
      'value' => 'Die jährliche Gartenschau präsentiert die schönsten Gärten und Pflanzen der Region. Mit Workshops und Verkaufsständen.',
      'format' => 'basic_html',
    ],
    'field_event_date' => '2025-05-20T10:00:00',
    'status' => 0, // Unpublished (draft)
    'moderation_state' => 'draft',
    'uid' => $guest_user->id(),
  ]);
  $event->save();
  echo "✅ Event erstellt: " . $event->getTitle() . " (Entwurf)\n";
  
  // Create a club
  $club = Node::create([
    'type' => 'club',
    'title' => 'Gartenfreunde Bruchtal',
    'field_description' => 'Verein für alle Hobbygärtner und Naturfreunde. Monatliche Treffen und gemeinsame Projekte.',
    'field_contact_name' => 'Guest Editor',
    'field_contact_position' => 'Vereinssekretär',
    'field_email' => 'info@gartenfreunde-bruchtal.ch',
    'field_phone' => '044 555 99 00',
    'status' => 1, // Published (to show mixed status)
    'moderation_state' => 'published',
    'uid' => $guest_user->id(),
  ]);
  $club->save();
  echo "✅ Verein erstellt: " . $club->getTitle() . " (Veröffentlicht)\n";
  
  // Create hospitality
  $hospitality = Node::create([
    'type' => 'hospitality',
    'title' => 'Café am See',
    'field_description' => 'Gemütliches Café mit Seeblick. Hausgemachte Kuchen und fair gehandelter Kaffee.',
    'field_contact_name' => 'Guest Editor',
    'field_contact_position' => 'Betreiber',
    'field_email' => 'info@cafe-am-see.ch',
    'field_phone' => '044 555 11 22',
    'status' => 0, // Unpublished (draft)
    'moderation_state' => 'draft',
    'uid' => $guest_user->id(),
  ]);
  $hospitality->save();
  echo "✅ Gastgewerbe erstellt: " . $hospitality->getTitle() . " (Entwurf)\n";
  
  // Create a page
  $page = Node::create([
    'type' => 'page',
    'title' => 'Über die Gartenfreunde',
    'body' => [
      'value' => '<p>Die Gartenfreunde Bruchtal wurden 2020 gegründet und setzen sich für naturnahe Gärten ein.</p>',
      'format' => 'basic_html',
    ],
    'status' => 0, // Unpublished (draft)
    'moderation_state' => 'draft',
    'uid' => $guest_user->id(),
  ]);
  $page->save();
  echo "✅ Seite erstellt: " . $page->getTitle() . " (Entwurf)\n\n";
  
  echo "📊 Zusammenfassung für guest.editor:\n";
  echo "   - 3 Entwürfe (Firma, Event, Gastgewerbe, Seite)\n";
  echo "   - 1 Veröffentlichter Inhalt (Verein)\n";
  echo "   - Alle Inhalte können bearbeitet werden\n";
  echo "   - Neue Veröffentlichungen benötigen Editor-Freigabe\n\n";
}

// Also ensure authenticated users have correct permissions
$authenticated_role = Role::load('authenticated');
if ($authenticated_role) {
  echo "🔧 Aktualisiere Authenticated User Berechtigungen...\n";
  
  $auth_permissions = [
    // Basic permissions
    'access content',
    'view own unpublished content',
    'access user dashboard',
    'view welcome dashboard',
    
    // Edit OWN content (wichtig!)
    'edit own company content',
    'edit own event content', 
    'edit own club content',
    'edit own hospitality content',
    'edit own page content',
    'edit own news content',
    
    // Delete OWN content
    'delete own company content',
    'delete own event content',
    'delete own club content',
    'delete own hospitality content',
    
    // Workflow
    'use basic_editorial transition create_new_draft',
    'view latest version',
    
    // Other existing permissions
    'access coffee',
    'access shortcuts',
    'access sitemap',
    'bypass honeypot protection',
    'delete own files',
    'dropzone upload files',
    'skip CAPTCHA',
    'use klaro',
    'use text format basic_html',
    'use text format webform_default',
    'view media',
  ];
  
  foreach ($auth_permissions as $permission) {
    $authenticated_role->grantPermission($permission);
  }
  $authenticated_role->save();
  echo "✅ Authenticated User Berechtigungen aktualisiert\n\n";
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "✅ SETUP ABGESCHLOSSEN\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
echo "Test-Logins:\n";
echo "• guest.editor / Guest2025! → Kann eigene Inhalte bearbeiten\n";
echo "• editor.test / Editor2025! → Kann alles + veröffentlichen\n";
echo "• demo.user / Demo2025! → Normaler Benutzer mit eigenem Content\n";
echo "\nDashboard-URLs:\n";
echo "• /user/[uid]/dashboard → User Dashboard mit eigenen Inhalten\n";
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";