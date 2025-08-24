---
date: 2022-12-14
status: accepted
tags:
  - drupal
contributors:
  - Andrew Berry
  - Darren Petersen
  - David Burns
  - Hawkeye Tenderwolf
  - John Kaeser
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matt Oliveira
  - Pablo López Escobés
  - Salvador Molina Moreno

title: Leverage view modes when rendering entities
context: Rendering entities using view modes have multiple benefits. These include better maintainability, faster initial development time, better performance, and hardened security.

---
<!-- Here begins Markdown and HTML -->
## Decision

We will favor rendering entities through view modes, even when we are not implementing a design system. We will also aim for minimal business logic inside of the template. We will, preferably, code this logic in preprocess functions, bundle class getters, and entity hooks.

### Background

This ADR puts in writing an existing practice at Lullabot. However, there are occasions where we might work with external vendors, our client's staff, or junior devs who work with different practices and conventions. This ADR aims to highlight the need to check for these situations and correct them if possible.

View modes are even more recommended when the client is implementing a design system for the entity component designs.

### Potential Exceptions

Examples of situations where we **should** use a view mode:

  - Rendering looks generic enough that it would make sense as an item in a View of entities.
  - The representation has a clear meaning in the customer’s or project's design language, even if it is not generic or reusable.
  - If the creation of a view mode seems to imply other new view modes for every single variation, we still use a view mode. However, we keep it to a single (or few) view modes and leverage pre-processing to prepare the template values.

Examples of situations where we **should not** use a view mode:

  - The representation is not generic at all, very bespoke rendering logic with context-dependent or request-dependent alters. In this case maybe a theme function or a custom render element can handle it.

### Additional Considerations

In order to improve inline documentation for display modes, we have developed the Drupal module [Display Mode Guidelines](https://www.drupal.org/project/dmg). This module aims to promote an appropriate use of each view mode and to avoid unnecessary proliferation of view modes.

## Consequences

Sites following this ADR will be more performant, will suffer from fewer bugs related to entity rendering, and will take less time to implement.
