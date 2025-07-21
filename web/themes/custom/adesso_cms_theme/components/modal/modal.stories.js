/**
 * @file
 * Enhanced Modal stories with comprehensive QA testing
 * Focus on accessibility, focus management, and keyboard navigation
 */

import ModalTemplate from './modal.twig';
import './modal.behavior.js';
import { within, userEvent, expect } from '@storybook/test';
import { createEnhancedStory, accessibilityTestSuite, interactionTestSuite } from '../../.storybook/story-enhancement-template';

export default {
  title: 'General/Modal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Accessible modal component with focus management, keyboard navigation, and ARIA compliance. Follows WCAG 2.1 AA standards.',
      },
    },
  },
  argTypes: {
    button_text: {
      description: 'Text for the trigger button',
      control: 'text'
    },
    modal_name: {
      description: 'Unique identifier for the modal',
      control: 'text'
    },
    title: {
      description: 'Modal header title',
      control: 'text'
    },
    body: {
      description: 'Modal content body',
      control: 'text'
    },
    close_button: {
      description: 'Text for the close button',
      control: 'text'
    },
    save_button: {
      description: 'Configuration for the save button',
      control: 'object'
    }
  }
};

// Default modal story - Enhanced with comprehensive QA testing
export const Default = createEnhancedStory(
  {
    render: ModalTemplate,
    args: {
      button_text: 'Launch demo modal',
      modal_name: 'exampleModal',
      title: 'Modal title',
      body: '<p>Modal body text goes here.</p>',
      close_button: 'Cancel',
      save_button: {
        text: 'Save Changes',
        url: 'http://drupal.org/'
      }
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors.modal) {
        Drupal.behaviors.modal.attach(canvasElement);
      }
    }
  },
  {
    componentName: 'Modal',
    accessibilityTests: [
      { id: 'aria-modal', enabled: true },
      { id: 'aria-labelledby', enabled: true },
      { id: 'aria-describedby', enabled: true },
      { id: 'focus-trap', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
    ],
    interactionTests: [
      // Test modal opening
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Launch demo modal');
        await userEvent.click(triggerButton);
        
        const modal = canvas.getByRole('dialog');
        expect(modal).toBeInTheDocument();
        expect(modal).toHaveAttribute('aria-modal', 'true');
      },
      // Test focus management
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Launch demo modal');
        await userEvent.click(triggerButton);
        
        // First focusable element in modal should be focused
        const firstFocusable = canvas.getByText('Cancel');
        expect(firstFocusable).toHaveFocus();
      },
      // Test keyboard navigation
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Launch demo modal');
        await userEvent.click(triggerButton);
        
        // Test Tab cycling within modal
        await userEvent.tab();
        const saveButton = canvas.getByText('Save Changes');
        expect(saveButton).toHaveFocus();
        
        await userEvent.tab();
        const cancelButton = canvas.getByText('Cancel');
        expect(cancelButton).toHaveFocus();
      },
      // Test Escape key closes modal
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Launch demo modal');
        await userEvent.click(triggerButton);
        
        await userEvent.keyboard('{Escape}');
        
        const modal = canvas.queryByRole('dialog');
        expect(modal).not.toBeInTheDocument();
      },
      // Test close button
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Launch demo modal');
        await userEvent.click(triggerButton);
        
        const closeButton = canvas.getByText('Cancel');
        await userEvent.click(closeButton);
        
        const modal = canvas.queryByRole('dialog');
        expect(modal).not.toBeInTheDocument();
      },
    ],
    performanceTests: true,
  }
);

// Accessibility-focused modal story
export const AccessibilityFocused = createEnhancedStory(
  {
    render: ModalTemplate,
    args: {
      button_text: 'Open accessible modal',
      modal_name: 'accessibleModal',
      title: 'Accessible Modal Example',
      body: '<p>This modal demonstrates comprehensive accessibility features including focus management, keyboard navigation, and ARIA attributes.</p><p>Use Tab to navigate between interactive elements, Escape to close, and screen readers will announce the modal content properly.</p>',
      close_button: 'Close',
      save_button: {
        text: 'Confirm Action',
        url: '#'
      }
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors.modal) {
        Drupal.behaviors.modal.attach(canvasElement);
      }
    }
  },
  {
    componentName: 'AccessibleModal',
    accessibilityTests: [
      { id: 'color-contrast', enabled: true },
      { id: 'focus-management', enabled: true },
      { id: 'keyboard-navigation', enabled: true },
      { id: 'screen-reader-support', enabled: true },
      { id: 'aria-compliance', enabled: true },
    ],
    interactionTests: [
      accessibilityTestSuite.modal,
      // Test ARIA attributes
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Open accessible modal');
        await userEvent.click(triggerButton);
        
        const modal = canvas.getByRole('dialog');
        expect(modal).toHaveAttribute('aria-modal', 'true');
        expect(modal).toHaveAttribute('aria-labelledby');
        expect(modal).toHaveAttribute('aria-describedby');
      },
      // Test focus return
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Open accessible modal');
        await userEvent.click(triggerButton);
        
        await userEvent.keyboard('{Escape}');
        
        // Focus should return to trigger button
        expect(triggerButton).toHaveFocus();
      },
    ],
    performanceTests: true,
  }
);

// Form modal story
export const FormModal = createEnhancedStory(
  {
    render: ModalTemplate,
    args: {
      button_text: 'Edit Profile',
      modal_name: 'formModal',
      title: 'Edit User Profile',
      body: '<form><div><label for="name">Name:</label><input type="text" id="name" name="name" required></div><div><label for="email">Email:</label><input type="email" id="email" name="email" required></div></form>',
      close_button: 'Cancel',
      save_button: {
        text: 'Save Profile',
        url: '#'
      }
    },
    parameters: {
      docs: {
        description: {
          story: 'Modal with form elements demonstrating focus management with form inputs and validation.',
        },
      },
    },
    play: async ({ canvasElement }) => {
      if (typeof Drupal !== 'undefined' && Drupal.behaviors.modal) {
        Drupal.behaviors.modal.attach(canvasElement);
      }
    }
  },
  {
    componentName: 'FormModal',
    accessibilityTests: [
      { id: 'form-labels', enabled: true },
      { id: 'required-fields', enabled: true },
      { id: 'form-validation', enabled: true },
    ],
    interactionTests: [
      // Test form focus management
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Edit Profile');
        await userEvent.click(triggerButton);
        
        const nameInput = canvas.getByLabelText('Name:');
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute('required');
      },
      // Test form validation
      async (canvas, userEvent) => {
        const triggerButton = canvas.getByText('Edit Profile');
        await userEvent.click(triggerButton);
        
        const emailInput = canvas.getByLabelText('Email:');
        expect(emailInput).toHaveAttribute('type', 'email');
        expect(emailInput).toHaveAttribute('required');
      },
    ],
    performanceTests: true,
  }
);
