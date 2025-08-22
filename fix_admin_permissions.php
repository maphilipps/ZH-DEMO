<?php

use Drupal\user\Entity\Role;

// Bootstrap Drupal
$autoloader = require_once 'web/autoload.php';
\Drupal\Core\DrupalKernel::createFromRequest(\Symfony\Component\HttpFoundation\Request::createFromGlobals(), $autoloader, 'prod')->boot();

// Load the administrator role
$admin_role = Role::load('administrator');

if ($admin_role) {
  // Grant comprehensive administrative permissions
  $permissions = [
    // Core administration
    'access administration pages',
    'access content overview',
    'administer account settings',
    'administer actions',
    'administer blocks',
    'administer content types',
    'administer display modes',
    'administer fields',
    'administer filters',
    'administer image styles',
    'administer menu',
    'administer modules',
    'administer nodes',
    'administer permissions',
    'administer site configuration',
    'administer software updates',
    'administer taxonomy',
    'administer themes',
    'administer users',
    'administer views',
    'administer workflows',
    
    // Content management
    'bypass node access',
    'create url aliases',
    'edit any page content',
    'edit any news content',
    'edit any event content',
    'edit any landing_page content',
    'delete any page content',
    'delete any news content',
    'delete any event content',
    'delete any landing_page content',
    'view any unpublished content',
    'view latest version',
    'revert all revisions',
    'view all revisions',
    
    // Media management
    'access media overview',
    'create image media',
    'create document media',
    'create video media',
    'edit any image media',
    'edit any document media',
    'edit any video media',
    'delete any image media',
    'delete any document media',
    'delete any video media',
    
    // User management
    'administer user fields',
    'administer user form display',
    'administer user display',
    'cancel account',
    'select account cancellation method',
    
    // Development tools
    'access devel information',
    'execute php code',
    'switch users',
    'access kint',
    
    // Workflow permissions
    'use basic_editorial transition create_new_draft',
    'use basic_editorial transition publish',
    'use basic_editorial transition unpublish',
    'use basic_editorial transition back_to_draft',
    'use basic_editorial transition submit_for_review',
    'use basic_editorial transition approve_and_publish',
    
    // System administration
    'access site reports',
    'administer search',
    'flush caches',
    'use text format full_html',
    'use text format basic_html',
    'use text format content_format',
    
    // Additional comprehensive permissions
    'access toolbar',
    'access contextual links',
    'access shortcuts',
    'customize shortcut links',
    'administer shortcuts',
  ];
  
  foreach ($permissions as $permission) {
    $admin_role->grantPermission($permission);
  }
  
  $admin_role->save();
  echo "Administrator role permissions updated successfully!\n";
} else {
  echo "Administrator role not found!\n";
}