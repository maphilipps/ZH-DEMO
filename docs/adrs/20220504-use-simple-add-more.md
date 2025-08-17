---
date: 2022-05-06
status: accepted
tags:
  - drupal
  - contrib-modules
  - editorial-experience
contributors:
  - Andrew Berry
  - Frances Duncan
  - Hawkeye Tenderwolf
  - Marcos Cano
  - Mateu Aguiló Bosch
title: Use Simple Add More to improve editorial experience
context: Drupal core by default outputs the maximum number of values (cardinality) as empty elements on entity forms, which usually represents a poor user-experience.
---

## Decision

Drupal sites will use [Simple Add More](https://www.drupal.org/project/sam) to
enhance the usability of entity forms.

### Considerations

This is recommended on both new projects and existing sites, since it improves
the editorial UX with low effort.

## Alternatives considered

There is [a core issue](https://www.drupal.org/project/drupal/issues/1156338)
to provide similar functionality, using core's built-in AJAX button. This
solution using client-side JS might become obsolete when the above core issue
is fixed.

##  Consequences

We will provide a better editorial experience using form elements for fields that accept more than one value.
