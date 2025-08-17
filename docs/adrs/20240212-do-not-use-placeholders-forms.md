---
date: 2024-02-12

status: accepted

tags:
  - drupal
  - editorial-experience

contributors:
  - Andrew Berry
  - Andy Blum
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Megh Plunkett
title: Do not use placeholder text in form fields
context: Placeholder text introduces significant usability and accessibility issues and should be avoided.

---
## Decision

Use placeholder text in fields as little as possible, favoring static field labels and help text.

Common issues with placeholders include:

- Insufficent contrast between the placeholder and the text field.
- Issues perceiving the placeholder as it vanishes when content is entered.
- Poor display for users browsing with [Windows High Contrast Mode](https://www.smashingmagazine.com/2022/06/guide-windows-high-contrast-mode/).

For in-depth explanations, see the following resources:

- [Don’t Use The Placeholder Attribute](https://www.smashingmagazine.com/2018/06/placeholder-attribute/)
- [Placeholder text in W3.org's Form Instructions](https://www.w3.org/WAI/tutorials/forms/instructions/#placeholder-text)
- [The Anatomy of Accessible Forms: The Problem with Placeholders](https://www.deque.com/blog/accessible-forms-the-problem-with-placeholders/)

##  Consequences

Forms will be more usable for a variety of users. Designers and developers will need to remember not to use placeholder settings in form designs, when configuring Drupal fields, or developing custom forms.
