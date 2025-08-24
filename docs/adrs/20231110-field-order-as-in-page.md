---
date: 2023-11-10

status: accepted

tags:
  - drupal
  - editorial-experience

contributors:
  - Andrew Berry
  - Greg Dunlap
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Megh Plunkett

title: Place form fields in the same order that they are rendered in the resulting page
context: When content types have dedicated pages, matching the display order makes edit forms easier to understand.

---
## Decision

When a content type has an associated "full page" design, the content type fields will match the order they are displayed at in a single-column viewport.

##  Consequences

Design changes may lead to editorial form changes that editors do not expect. However, since designs should always communicate intent and hierarchy, we should update the editorial forms and communicate the changes to editors.
