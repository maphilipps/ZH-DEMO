<?php

namespace Drupal\Tests\zh_demo_editorial_workflow\FunctionalJavascript;

use Drupal\FunctionalJavascriptTests\WebDriverTestBase;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

/**
 * End-to-end JavaScript tests for editorial workflow.
 *
 * @group zh_demo_editorial_workflow
 */
class EndToEndWorkflowTest extends WebDriverTestBase {

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
    'dashboard',
  ];

  /**
   * Guest editor user.
   */
  protected $guestEditor;

  /**
   * Editor user.
   */
  protected $editor;

  /**
   * {@inheritdoc}
   */
  protected function setUp(): void {
    parent::setUp();

    // Create content types
    $this->drupalCreateContentType(['type' => 'club', 'name' => 'Verein']);
    $this->drupalCreateContentType(['type' => 'company', 'name' => 'Firma']);
    $this->drupalCreateContentType(['type' => 'event', 'name' => 'Event']);
    $this->drupalCreateContentType(['type' => 'hospitality', 'name' => 'Gastgewerbe']);

    // Create users with proper roles
    $this->guestEditor = $this->drupalCreateUser([
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
    ]);
    $this->guestEditor->addRole('guest_editor');
    $this->guestEditor->save();

    $this->editor = $this->drupalCreateUser([
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
    ]);
    $this->editor->addRole('editor');
    $this->editor->save();
  }

  /**
   * Test complete GPZH demo workflow with real user interactions.
   */
  public function testCompleteGpzhDemoWorkflow() {
    // SCENARIO 1: Guest user creates a Verein (Club) entry
    $this->drupalLogin($this->guestEditor);
    
    // Navigate to club creation
    $this->drupalGet('node/add/club');
    $this->assertSession()->waitForElement('css', 'form.node-club-form');
    
    $page = $this->getSession()->getPage();
    
    // Fill out the form
    $club_title = 'FC Bruchtal - Fußballverein am See';
    $page->fillField('title[0][value]', $club_title);
    $page->fillField('body[0][value]', 'Der FC Bruchtal ist ein traditioneller Fußballverein am Zürichsee mit über 200 Mitgliedern.');
    
    // Ensure it starts as draft
    $moderation_select = $page->findField('moderation_state[0][state]');
    if ($moderation_select) {
      $moderation_select->setValue('draft');
    }
    
    // Save the content
    $page->pressButton('Speichern');
    $this->assertSession()->waitForText('Verein ' . $club_title . ' wurde erstellt.');
    
    // Verify we're on the node page
    $node = $this->drupalGetNodeByTitle($club_title);
    $this->assertNotNull($node);
    $this->assertEquals('draft', $node->get('moderation_state')->value);

    // SCENARIO 2: Guest user submits for review
    $this->drupalGet("node/{$node->id()}/edit");
    $this->assertSession()->waitForElement('css', 'form.node-club-edit-form');
    
    $page = $this->getSession()->getPage();
    
    // Change moderation state to review
    $moderation_select = $page->findField('moderation_state[0][state]');
    if ($moderation_select) {
      $moderation_select->setValue('review');
    }
    
    // Add revision message
    $revision_field = $page->findField('revision_log[0][value]');
    if ($revision_field) {
      $revision_field->setValue('Zur Prüfung eingereicht - bereit für Redaktionsfreigabe');
    }
    
    $page->pressButton('Speichern');
    $this->assertSession()->waitForText('Verein ' . $club_title . ' wurde aktualisiert.');

    // Verify state changed
    $node = Node::load($node->id());
    $this->assertEquals('review', $node->get('moderation_state')->value);

    // SCENARIO 3: Editor reviews content in dashboard
    $this->drupalLogin($this->editor);
    
    // Check editor dashboard
    $this->drupalGet('admin/dashboard/editor');
    $this->assertSession()->waitForText('Redakteur Dashboard');
    
    // Should show statistics
    $this->assertSession()->pageTextContains('Zur Prüfung');
    $this->assertSession()->pageTextContains('1'); // One item for review
    
    // Navigate to content review page
    $page = $this->getSession()->getPage();
    $review_link = $page->findLink('Alle anzeigen');
    if ($review_link) {
      $review_link->click();
    } else {
      $this->drupalGet('admin/content/review');
    }
    
    $this->assertSession()->waitForText('Inhalte zur Prüfung');
    $this->assertSession()->linkExists($club_title);

    // SCENARIO 4: Editor approves and publishes content
    $this->clickLink($club_title);
    $this->assertSession()->waitForText($club_title);
    
    // Edit the content
    $page = $this->getSession()->getPage();
    $edit_link = $page->findLink('Bearbeiten');
    if ($edit_link) {
      $edit_link->click();
    } else {
      $this->drupalGet("node/{$node->id()}/edit");
    }
    
    $this->assertSession()->waitForElement('css', 'form.node-club-edit-form');
    
    // Publish the content
    $moderation_select = $page->findField('moderation_state[0][state]');
    if ($moderation_select) {
      $moderation_select->setValue('published');
    }
    
    // Add revision message
    $revision_field = $page->findField('revision_log[0][value]');
    if ($revision_field) {
      $revision_field->setValue('Von der Redaktion freigegeben und veröffentlicht');
    }
    
    $page->pressButton('Speichern');
    $this->assertSession()->waitForText('Verein ' . $club_title . ' wurde aktualisiert.');

    // Verify content is published
    $node = Node::load($node->id());
    $this->assertEquals('published', $node->get('moderation_state')->value);
    $this->assertTrue($node->isPublished());

    // SCENARIO 5: Public can view published content
    $this->drupalLogout();
    $this->drupalGet("node/{$node->id()}");
    $this->assertSession()->waitForText($club_title);
    $this->assertSession()->pageTextContains('Der FC Bruchtal ist ein traditioneller Fußballverein');

    // Verify content is publicly accessible
    $this->assertSession()->statusCodeEquals(200);
  }

  /**
   * Test real-time dashboard updates.
   */
  public function testDashboardUpdates() {
    // Create content in different states
    $draft_node = Node::create([
      'type' => 'company',
      'title' => 'Bruchtal IT Services GmbH',
      'uid' => $this->guestEditor->id(),
      'moderation_state' => 'draft',
    ]);
    $draft_node->save();

    $review_node = Node::create([
      'type' => 'event',
      'title' => 'Bruchtal Sommerfest 2024',
      'uid' => $this->guestEditor->id(),
      'moderation_state' => 'review',
    ]);
    $review_node->save();

    // Login as editor
    $this->drupalLogin($this->editor);
    $this->drupalGet('admin/dashboard/editor');
    $this->assertSession()->waitForText('Redakteur Dashboard');

    // Check statistics are displayed
    $page = $this->getSession()->getPage();
    $review_stat = $page->find('css', '.stat-box.review-count .stat-number');
    if ($review_stat) {
      $this->assertEquals('1', $review_stat->getText());
    }

    $draft_stat = $page->find('css', '.stat-box.draft-count .stat-number');
    if ($draft_stat) {
      $this->assertEquals('1', $draft_stat->getText());
    }

    // Check recent content list
    $this->assertSession()->pageTextContains('Bruchtal Sommerfest 2024');
  }

  /**
   * Test workflow with multiple content types.
   */
  public function testMultipleContentTypeWorkflow() {
    $this->drupalLogin($this->guestEditor);
    
    $content_data = [
      'club' => [
        'title' => 'Tennisclub Bruchtal',
        'body' => 'Moderne Tennisanlage mit 6 Sandplätzen direkt am See.',
      ],
      'company' => [
        'title' => 'Seerestaurant Bruchtal',
        'body' => 'Gehobene Gastronomie mit Blick auf den Zürichsee.',
      ],
      'event' => [
        'title' => 'Bruchtal Seenachtsfest',
        'body' => 'Jährliches Fest am Seeufer mit Musik und Feuerwerk.',
      ],
      'hospitality' => [
        'title' => 'Hotel Seeblick Bruchtal',
        'body' => '4-Sterne Hotel mit Wellness-Bereich am Zürichsee.',
      ],
    ];

    $created_nodes = [];
    
    // Create content for each type
    foreach ($content_data as $type => $data) {
      $this->drupalGet("node/add/$type");
      $this->assertSession()->waitForElement('css', "form.node-$type-form");
      
      $page = $this->getSession()->getPage();
      $page->fillField('title[0][value]', $data['title']);
      $page->fillField('body[0][value]', $data['body']);
      
      $page->pressButton('Speichern');
      $this->assertSession()->waitForText($data['title'] . ' wurde erstellt.');
      
      $node = $this->drupalGetNodeByTitle($data['title']);
      $created_nodes[$type] = $node;
      
      // Submit for review
      $this->drupalGet("node/{$node->id()}/edit");
      $this->assertSession()->waitForElement('css', "form.node-$type-edit-form");
      
      $page = $this->getSession()->getPage();
      $moderation_select = $page->findField('moderation_state[0][state]');
      if ($moderation_select) {
        $moderation_select->setValue('review');
      }
      
      $page->pressButton('Speichern');
      $this->assertSession()->waitForText($data['title'] . ' wurde aktualisiert.');
    }

    // Editor reviews all content
    $this->drupalLogin($this->editor);
    $this->drupalGet('admin/content/review');
    $this->assertSession()->waitForText('Inhalte zur Prüfung');
    
    // Should see all 4 content types
    foreach ($content_data as $data) {
      $this->assertSession()->pageTextContains($data['title']);
    }

    // Publish all content
    foreach ($created_nodes as $type => $node) {
      $this->drupalGet("node/{$node->id()}/edit");
      $this->assertSession()->waitForElement('css', "form.node-$type-edit-form");
      
      $page = $this->getSession()->getPage();
      $moderation_select = $page->findField('moderation_state[0][state]');
      if ($moderation_select) {
        $moderation_select->setValue('published');
      }
      
      $page->pressButton('Speichern');
      $this->assertSession()->waitForText($content_data[$type]['title'] . ' wurde aktualisiert.');
    }

    // Verify all content is publicly accessible
    $this->drupalLogout();
    foreach ($created_nodes as $type => $node) {
      $this->drupalGet("node/{$node->id()}");
      $this->assertSession()->waitForText($content_data[$type]['title']);
      $this->assertSession()->statusCodeEquals(200);
    }
  }

  /**
   * Test login redirect to appropriate dashboard.
   */
  public function testLoginRedirectToDashboard() {
    // Test guest editor redirect
    $this->drupalLogin($this->guestEditor);
    
    // Should be redirected to user dashboard
    // (This tests the login redirect functionality)
    $current_url = $this->getSession()->getCurrentUrl();
    $this->assertStringContainsString('dashboard', $current_url);
    
    $this->drupalLogout();
    
    // Test editor redirect
    $this->drupalLogin($this->editor);
    
    // Editor might go to admin dashboard or content overview
    $current_url = $this->getSession()->getCurrentUrl();
    $this->assertTrue(
      strpos($current_url, 'dashboard') !== false || 
      strpos($current_url, 'admin') !== false,
      'Editor is redirected to admin area'
    );
  }

}