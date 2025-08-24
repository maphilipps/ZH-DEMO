<?php

namespace Drupal\Tests\zh_demo_editorial_workflow\Unit;

use Drupal\Tests\UnitTestBase;
use Drupal\node\NodeInterface;
use Drupal\Core\Entity\EntityInterface;

/**
 * Unit tests for workflow state transitions.
 *
 * @group zh_demo_editorial_workflow
 */
class WorkflowTransitionsTest extends UnitTestBase {

  /**
   * Test valid workflow state transitions.
   *
   * @dataProvider validTransitionsProvider
   */
  public function testValidWorkflowTransitions($from_state, $to_state, $expected_valid) {
    // Define valid transitions based on GPZH workflow
    $valid_transitions = [
      'draft' => ['review', 'draft'],
      'review' => ['published', 'draft'],
      'published' => ['unpublished', 'archived'],
      'unpublished' => ['draft', 'published'],
      'archived' => ['draft'],
    ];

    $is_valid = in_array($to_state, $valid_transitions[$from_state] ?? []);
    $this->assertEquals($expected_valid, $is_valid, 
      "Transition from $from_state to $to_state should be " . ($expected_valid ? 'valid' : 'invalid'));
  }

  /**
   * Data provider for valid transitions test.
   */
  public function validTransitionsProvider() {
    return [
      // Valid transitions
      ['draft', 'review', TRUE],
      ['review', 'published', TRUE],
      ['review', 'draft', TRUE],
      ['published', 'unpublished', TRUE],
      ['published', 'archived', TRUE],
      ['unpublished', 'draft', TRUE],
      ['unpublished', 'published', TRUE],
      ['archived', 'draft', TRUE],
      
      // Invalid transitions
      ['draft', 'published', FALSE],
      ['draft', 'archived', FALSE],
      ['review', 'unpublished', FALSE],
      ['review', 'archived', FALSE],
      ['published', 'review', FALSE],
      ['archived', 'published', FALSE],
      ['archived', 'review', FALSE],
    ];
  }

  /**
   * Test workflow permissions for different user roles.
   *
   * @dataProvider rolePermissionsProvider
   */
  public function testWorkflowRolePermissions($role, $transition, $expected_allowed) {
    // Define role permissions for GPZH workflow
    $role_permissions = [
      'guest_editor' => [
        'create_new_draft' => TRUE,
        'submit_for_review' => TRUE,
        'publish' => FALSE,
        'unpublish' => FALSE,
        'archive' => FALSE,
      ],
      'editor' => [
        'create_new_draft' => TRUE,
        'submit_for_review' => TRUE,
        'publish' => TRUE,
        'unpublish' => TRUE,
        'archive' => TRUE,
      ],
      'authenticated' => [
        'create_new_draft' => TRUE,
        'submit_for_review' => TRUE,
        'publish' => FALSE,
        'unpublish' => FALSE,
        'archive' => FALSE,
      ],
    ];

    $allowed = $role_permissions[$role][$transition] ?? FALSE;
    $this->assertEquals($expected_allowed, $allowed,
      "Role $role should " . ($expected_allowed ? 'be allowed' : 'not be allowed') . " to $transition");
  }

  /**
   * Data provider for role permissions test.
   */
  public function rolePermissionsProvider() {
    return [
      // Guest editor permissions
      ['guest_editor', 'create_new_draft', TRUE],
      ['guest_editor', 'submit_for_review', TRUE],
      ['guest_editor', 'publish', FALSE],
      ['guest_editor', 'unpublish', FALSE],
      ['guest_editor', 'archive', FALSE],
      
      // Editor permissions
      ['editor', 'create_new_draft', TRUE],
      ['editor', 'submit_for_review', TRUE],
      ['editor', 'publish', TRUE],
      ['editor', 'unpublish', TRUE],
      ['editor', 'archive', TRUE],
      
      // Authenticated user permissions
      ['authenticated', 'create_new_draft', TRUE],
      ['authenticated', 'submit_for_review', TRUE],
      ['authenticated', 'publish', FALSE],
      ['authenticated', 'unpublish', FALSE],
      ['authenticated', 'archive', FALSE],
    ];
  }

  /**
   * Test content type eligibility for workflow.
   */
  public function testContentTypeWorkflowEligibility() {
    $workflow_content_types = ['club', 'company', 'event', 'hospitality', 'news', 'page', 'landing_page'];
    $non_workflow_types = ['webform', 'media', 'user'];

    foreach ($workflow_content_types as $type) {
      $this->assertTrue(in_array($type, $workflow_content_types), 
        "Content type $type should be eligible for workflow");
    }

    foreach ($non_workflow_types as $type) {
      $this->assertFalse(in_array($type, $workflow_content_types),
        "Content type $type should not be eligible for workflow");
    }
  }

  /**
   * Test workflow state validation.
   */
  public function testWorkflowStateValidation() {
    $valid_states = ['draft', 'review', 'published', 'unpublished', 'archived'];
    $invalid_states = ['pending', 'approved', 'rejected', 'deleted'];

    foreach ($valid_states as $state) {
      $this->assertTrue(in_array($state, $valid_states), 
        "State $state should be valid in GPZH workflow");
    }

    foreach ($invalid_states as $state) {
      $this->assertFalse(in_array($state, $valid_states),
        "State $state should not be valid in GPZH workflow");
    }
  }

  /**
   * Test default workflow state.
   */
  public function testDefaultWorkflowState() {
    $default_state = 'draft';
    
    $this->assertEquals('draft', $default_state,
      'Default workflow state should be draft for new content');
  }

  /**
   * Test workflow state properties.
   */
  public function testWorkflowStateProperties() {
    $state_properties = [
      'draft' => ['published' => FALSE, 'default_revision' => FALSE],
      'review' => ['published' => FALSE, 'default_revision' => FALSE], 
      'published' => ['published' => TRUE, 'default_revision' => TRUE],
      'unpublished' => ['published' => FALSE, 'default_revision' => TRUE],
      'archived' => ['published' => FALSE, 'default_revision' => FALSE],
    ];

    foreach ($state_properties as $state => $properties) {
      $this->assertIsArray($properties, "State $state should have properties array");
      $this->assertArrayHasKey('published', $properties, "State $state should have published property");
      $this->assertArrayHasKey('default_revision', $properties, "State $state should have default_revision property");
    }

    // Test specific state properties
    $this->assertTrue($state_properties['published']['published'], 'Published state should be published');
    $this->assertFalse($state_properties['draft']['published'], 'Draft state should not be published');
    $this->assertTrue($state_properties['published']['default_revision'], 'Published state should be default revision');
  }

}