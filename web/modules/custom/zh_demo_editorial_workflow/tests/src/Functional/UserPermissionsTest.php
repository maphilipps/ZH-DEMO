<?php

namespace Drupal\Tests\zh_demo_editorial_workflow\Functional;

use Drupal\Tests\BrowserTestBase;
use Drupal\user\Entity\User;
use Drupal\node\Entity\Node;

/**
 * Tests user permissions in editorial workflow.
 *
 * @group zh_demo_editorial_workflow
 */
class UserPermissionsTest extends BrowserTestBase {

  /**
   * {@inheritdoc}
   */
  protected $defaultTheme = 'stark';

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'node',
    'user', 
    'workflows',
    'content_moderation',
    'zh_demo_editorial_workflow',
  ];

  /**
   * Test guest editor permissions are correctly configured.
   */
  public function testGuestEditorPermissions() {
    // Create guest editor user
    $guest_editor = $this->drupalCreateUser([
      'create club content',
      'create company content',
      'create event content', 
      'create hospitality content',
      'edit own club content',
      'edit own company content',
      'edit own event content',
      'edit own hospitality content',
      'use basic_editorial transition create_new_draft',
      'use basic_editorial transition submit_for_review',
      'view own unpublished content',
    ], 'guest_editor');

    $this->drupalLogin($guest_editor);

    // Test can create all GPZH content types
    $content_types = ['club', 'company', 'event', 'hospitality'];
    foreach ($content_types as $type) {
      $this->drupalCreateContentType(['type' => $type, 'name' => ucfirst($type)]);
      $this->drupalGet("node/add/$type");
      $this->assertSession()->statusCodeEquals(200, "Guest editor can access $type creation form");
    }

    // Test can edit own content
    $node = Node::create([
      'type' => 'club',
      'title' => 'Guest Editor Test Club',
      'uid' => $guest_editor->id(),
      'moderation_state' => 'draft',
    ]);
    $node->save();

    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->statusCodeEquals(200, 'Guest editor can edit own content');

    // Test CANNOT edit others' content
    $other_user = $this->drupalCreateUser();
    $other_node = Node::create([
      'type' => 'club',
      'title' => 'Other User Club',
      'uid' => $other_user->id(),
      'moderation_state' => 'draft',
    ]);
    $other_node->save();

    $this->drupalGet("node/{$other_node->id()}/edit");
    $this->assertSession()->statusCodeEquals(403, 'Guest editor cannot edit others content');

    // Test can submit for review but NOT publish directly
    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->pageTextContains('Zur Prüfung einreichen');
    $this->assertSession()->pageTextNotContains('Publish');
  }

  /**
   * Test editor permissions are correctly configured.
   */
  public function testEditorPermissions() {
    // Create editor user
    $editor = $this->drupalCreateUser([
      'view any unpublished content',
      'edit any club content',
      'edit any company content',
      'edit any event content',
      'edit any hospitality content',
      'use basic_editorial transition create_new_draft',
      'use basic_editorial transition submit_for_review',
      'use basic_editorial transition publish',
      'use basic_editorial transition unpublish',
      'use basic_editorial transition archive',
      'access administration pages',
      'access content overview',
    ], 'editor');

    $this->drupalLogin($editor);

    // Test can access admin areas
    $this->drupalGet('admin/dashboard/editor');
    $this->assertSession()->statusCodeEquals(200, 'Editor can access editor dashboard');

    $this->drupalGet('admin/content/review');
    $this->assertSession()->statusCodeEquals(200, 'Editor can access content review');

    // Test can edit ANY content
    $guest_user = $this->drupalCreateUser();
    $this->drupalCreateContentType(['type' => 'club', 'name' => 'Club']);
    
    $guest_node = Node::create([
      'type' => 'club',
      'title' => 'Guest User Club',
      'uid' => $guest_user->id(),
      'moderation_state' => 'review',
    ]);
    $guest_node->save();

    $this->drupalGet("node/{$guest_node->id()}/edit");
    $this->assertSession()->statusCodeEquals(200, 'Editor can edit any content');

    // Test can use all workflow transitions
    $this->assertSession()->fieldExists('moderation_state[0][state]');
  }

  /**
   * Test anonymous user permissions.
   */
  public function testAnonymousUserPermissions() {
    $this->drupalCreateContentType(['type' => 'club', 'name' => 'Club']);
    
    // Create published content
    $published_node = Node::create([
      'type' => 'club',
      'title' => 'Published Club',
      'moderation_state' => 'published',
      'status' => 1,
    ]);
    $published_node->save();

    // Create unpublished content  
    $draft_node = Node::create([
      'type' => 'club',
      'title' => 'Draft Club',
      'moderation_state' => 'draft',
      'status' => 0,
    ]);
    $draft_node->save();

    // Anonymous should see published content
    $this->drupalGet("node/{$published_node->id()}");
    $this->assertSession()->statusCodeEquals(200, 'Anonymous can view published content');

    // Anonymous should NOT see unpublished content
    $this->drupalGet("node/{$draft_node->id()}");
    $this->assertSession()->statusCodeEquals(403, 'Anonymous cannot view unpublished content');

    // Anonymous should NOT access creation forms
    $this->drupalGet('node/add/club');
    $this->assertSession()->statusCodeEquals(403, 'Anonymous cannot access creation forms');

    // Anonymous should NOT access admin areas
    $this->drupalGet('admin/dashboard/editor');
    $this->assertSession()->statusCodeEquals(403, 'Anonymous cannot access admin dashboard');
  }

  /**
   * Test authenticated user permissions.
   */
  public function testAuthenticatedUserPermissions() {
    $auth_user = $this->drupalCreateUser([
      'use basic_editorial transition create_new_draft',
      'use basic_editorial transition submit_for_review',
      'view own unpublished content',
    ]);

    $this->drupalLogin($auth_user);

    // Authenticated user should have basic workflow permissions
    // but specific content creation depends on additional permissions
    
    // Test can access user dashboard (if configured)
    $this->drupalGet('admin/dashboard/user');
    $this->assertSession()->statusCodeEquals(200, 'Authenticated user can access user dashboard');

    // Test CANNOT access admin areas without specific permissions
    $this->drupalGet('admin/content/review');
    $this->assertSession()->statusCodeEquals(403, 'Regular authenticated user cannot access content review');

    $this->drupalGet('admin/dashboard/editor');
    $this->assertSession()->statusCodeEquals(403, 'Regular authenticated user cannot access editor dashboard');
  }

  /**
   * Test role assignment and permission inheritance.
   */
  public function testRoleAssignmentAndInheritance() {
    // Create user and assign guest_editor role
    $user = $this->drupalCreateUser();
    $user->addRole('guest_editor');
    $user->save();

    // Verify role was added
    $this->assertTrue($user->hasRole('guest_editor'), 'User has guest_editor role');
    $this->assertTrue($user->hasRole('authenticated'), 'User retains authenticated role');

    $this->drupalLogin($user);

    // Should have guest_editor permissions
    $this->drupalCreateContentType(['type' => 'club', 'name' => 'Club']);
    $this->drupalGet('node/add/club');
    $this->assertSession()->statusCodeEquals(200, 'User with guest_editor role can create content');

    // Test role removal
    $user->removeRole('guest_editor');
    $user->save();

    $this->assertFalse($user->hasRole('guest_editor'), 'User no longer has guest_editor role');
    $this->assertTrue($user->hasRole('authenticated'), 'User still has authenticated role');
  }

  /**
   * Test workflow permissions for different content states.
   */
  public function testWorkflowStatePermissions() {
    $guest_editor = $this->drupalCreateUser([
      'create club content',
      'edit own club content',
      'use basic_editorial transition create_new_draft',
      'use basic_editorial transition submit_for_review',
      'view own unpublished content',
    ], 'guest_editor');

    $editor = $this->drupalCreateUser([
      'view any unpublished content',
      'edit any club content',
      'use basic_editorial transition publish',
      'use basic_editorial transition unpublish',
    ], 'editor');

    $this->drupalCreateContentType(['type' => 'club', 'name' => 'Club']);

    // Guest editor creates content
    $this->drupalLogin($guest_editor);
    $node = Node::create([
      'type' => 'club',
      'title' => 'State Permission Test',
      'uid' => $guest_editor->id(),
      'moderation_state' => 'draft',
    ]);
    $node->save();

    // Guest can edit in draft state
    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->statusCodeEquals(200);

    // Submit for review
    $node->set('moderation_state', 'review');
    $node->save();

    // Guest should still be able to view but limited editing options
    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->statusCodeEquals(200);

    // Editor can take over in review state
    $this->drupalLogin($editor);
    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->statusCodeEquals(200);

    // Editor can publish
    $node->set('moderation_state', 'published');
    $node->save();

    // Verify published content is publicly accessible
    $this->drupalLogout();
    $this->drupalGet("node/{$node->id()}");
    $this->assertSession()->statusCodeEquals(200);
  }

}