---
date: 2022-04-29
status: accepted
tags:
  - drupal
  - php
  - composer
contributors:
  - Andrew Berry
  - Cathy Theys
  - David Burns
  - James Sansbury
  - Marcos Cano
  - Mateu Aguiló Bosch

title: Configure Composer Patches to Use `-p2` as `patchLevel` for Drupal core
context: Drupal's git repository has a different directory structure than projects built on Drupal. Default Composer Patches settings can cause Drupal patches to be silently misapplied.

---

## Decision

When using [cweagans/composer-patches](https://github.com/cweagans/composer-patches), the following configuration will be used:

```
  "patchLevel": {
    "drupal/core": "-p2"
  },
```

## Consequences

Errors due to misapplied patches will be reduced.
