---
date: 2022-03-20
status: accepted
tags:
  - drupal
contributors:
  - Andrew Berry
  - Marcos Cano
title: Lock entity language on edit forms
context: Editors new to Drupal often try to translate content by changing the language on existing content, causing confusion for site visitors.
redirect_from:
  - /adr/20220320-pevent-language-change/
---
## Decision

Projects where Content Translation is enabled will use the following configuration when setting up translatability of content entities:

- Step 1: Expose Language selector on entity forms:

Navigate to *Configuration -> Regional and Language -> Content language and translation* and check "Show language selector on create and edit pages"

- Step 2: Use a form alter in custom code to prevent it from being changed when the entity is being edited. This can be accomplished with code similar to the one below:

```php
/**
 * Implements hook_form_BASE_FORM_ID_alter() for node_form.
 */
function mymodule_form_node_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  /** @var \Drupal\node\NodeInterface $node */
  $node = $form_state->getFormObject()->getEntity();
  // Disable the language dropdown if this is an edit operation.
  if (!$node->isNew() && isset($form['langcode']['widget'][0]['value'])) {
    $form['langcode']['widget'][0]['value']['#disabled'] = TRUE;
  }
}
```

It's possible this behavior changes in the future, below are a few feature requests to change this in Drupal core:
- https://www.drupal.org/project/drupal/issues/2986823
- https://www.drupal.org/project/drupal/issues/2860826

##  Consequences

We will reduce chances of editors inadvertently changing the language of existing content when they intend to create a new translation.
