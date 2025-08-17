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
  - Sally Young

title: Store Composer Patches configuration in composer.json
context: Validating a complete Composer configuration is important to ensuring build issues are caught early.

---
# Decision

When using [cweagans/composer-patches](https://github.com/cweagans/composer-patches), patches will be specified in `composer.json` and not `composer.patches.json`. We will not use the `patches-file` configuration key. This ensures that `composer validate` lints the entire Composer configuration, including patches.

# Consequences

Projects that have a separate patches file will need to inline their configuration. Given the clear benefits in having a valid Composer configuration, we view this as worthwhile for all existing and inherited projects.
