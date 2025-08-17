---
date: 2022-04-29
status: accepted
tags:
  - drupal
  - composer
  - php
contributors:
  - Andrew Berry
  - Cathy Theys
  - David Burns
  - James Sansbury
  - Marcos Cano
  - Mateu Aguiló Bosch

title: Break composer install if patches don't apply
context: Allowing builds to succeed with failed patches can lead to malformed code or hidden errors.

---

## Decision

When using [cweagans/composer-patches](https://github.com/cweagans/composer-patches)
to manage patches, use the following configuration:

```
  "composer-exit-on-patch-failure": true,
```

## Consequences

Errors related to patches will surface earlier in the development process, such as when running automated updates.
