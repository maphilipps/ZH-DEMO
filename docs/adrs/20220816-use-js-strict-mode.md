---
date: 2022-08-16
status: accepted
tags:
  - front-end
  - javascript
contributors:
  - Andrew Berry
  - Andy Blum
  - Chris DeLuca
  - Mateu Aguiló Bosch
title: Use JavaScript strict mode
context: Opt in to settings that raise errors for problematic code.
---

## Decision

Use JavaScript's [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) within all top-level
functions (nested functions will inherit strict mode).

If the project only includes non-vendor code in a bundle, strict mode
can be declared once at the top of the bundle file, instead of per
function. When in doubt, declare strict mode per function.

If using [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), strict mode is implied, and should not be declared.

### Use ESLint to detect non-strict files

Use [ESLint's strict rule](https://eslint.org/docs/latest/rules/strict)
to detect and enforce strict mode, if you are already using ESLint in
your project.

Add `strict` to the `rules` section of your ESLint configuration file.

```js
strict: [
  'error',
  'safe'
]
```

Some popular rule sets, like `airbnb-base`, [may not include](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/strict.js) this rule. Adding it to the eslint configuration file will ensure it is applied.

##  Consequences

JavaScript errors will be more noticeable, leading to better code quality.
