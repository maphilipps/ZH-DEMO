---
date: 2022-02-08
status: accepted
tags:
  - drupal
contributors:
  - Andrew Berry
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matthew Tift
  - Megh Plunkett
  - Nate Lampton
title: Consistently name entity fields
context: Adopting a consistent set of rules when naming entities in Drupal can reduce errors and improve maintainability.

---

##  Decision

Use English when creating non-visitor-facing names. Adopt US-English spelling (e.g. "color" instead of "colour").

Try keeping visitor-facing labels and their corresponding machine names as similar as possible (ideally identical).

When naming fields, use one of the two formats below:

### 1- On non-reusable fields
Use the format `field_{bundle}__{name}`

* For example: `field_customer__logo` or `field_image__caption` .
* Use underscores `_` to separate multi-word names ( `field_news_pr__hero_image` )
* When necessary, abbreviate the field name, not the bundle.

### 2- On reusable (shared) fields, 
Use the format `field_{name}`

* For example: `field_categories`.

##  Consequences

Drupal fields will gain uniformity by following a consistent set of naming guidelines.
