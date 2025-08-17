---
date: 2022-06-22
status: accepted
tags:
  - front-end
  - css
  - multilingual
contributors:
  - Adam Varn
  - Andrew Berry
  - Andy Blum
  - John Kaeser
  - Pauline Judge
title: Use CSS Logical Properties
context: Decoupling styles from a language's writing direction makes them easier to maintain across translations.
---
## Decision
We will use [CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) when writing styles that have a directional word or connotation to them. For example, instead of writing `margin-left`, we will use `margin-inline-start`.

### Enforcement & Automation
To help enforce this ADR, projects can utilize the [`stylelint-use-logical-spec`](https://github.com/Jordan-Hall/stylelint-use-logical-spec) plugin for stylelint, and can use the `--fix` flag to autofix errors detected for this ruleset.

### Exceptions
Though rare, there may be cases where a specific directional term is needed or preferred. In these cases, [stylelint can be disabled](https://stylelint.io/user-guide/ignore-code/), or [specific exceptions can be set](https://github.com/csstools/stylelint-use-logical#except) on the plugin referenced above.

##  Consequences
Styles will support any writing direction by default, which makes them easier to maintain and reduces content internationalization hurdles.

Styles will be less likely to have issues with specificity conflicts caused by localization overrides.
