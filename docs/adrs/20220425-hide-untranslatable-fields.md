---
date: 2022-04-25
status: accepted
tags:
  - drupal
contributors:
  - Andrew Berry
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Sally Young
title: Always hide non-translatable fields on translation forms
context: When content translation is enabled, it's possible to decide which fields can be translated.
---
By default, Drupal displays both translatable and non-translatable field on translation forms. This often leads to
editors changing values of a non-translatable field when translating content and inadvertently affecting all other
translations as well.

## Decision

When configuring field translatability in Drupal, all non-translatable fields should be hidden from the translation
forms.

### How to do it

Navigate to *Configuration -> Regional and Language -> Content language and translation* and make sure to check the
corresponding checkbox on each translatable bundle:

![Screenshot showing "Hide non translatable fields on translation forms checked off"](/assets/images/adrs/hide-non-translatable-fields.png)

##  Consequences

Projects will reduce changes of editorial confusion when translating content in Drupal.
