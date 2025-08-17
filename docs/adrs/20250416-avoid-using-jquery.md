---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2025-04-16

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - front-end
  - javascript

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Adam Varn
  - Andrew Berry
  - Andy Blum
  - Chris DeLuca
  - Claire Ristow
  - Javier Reartes
  - Mateu Aguiló Bosch
  - Pauline Judge
title: Avoid using jQuery
context: jQuery is an unnecessary dependency for modern browsers.

---


## Decision

Avoid using jQuery. Use standard JavaScript alternatives instead.

## Exceptions

If a required project dependency itself depends on jQuery, it is fine to include that dependency. If the only way to interface with that dependency’s API is through jQuery, then that is acceptable.

## Consequences

JavaScript code will be more resilient to change; web platform native technologies like core JavaScript rarely if ever make backwards incompatible changes. A user library like jQuery can and has made updates that require API refactors.

Replicating jQuery's `parseHTML()` method is the latest addition to core JavaScript. However, that alternative, [`parseUnsafeHTML()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/parseHTMLUnsafe_static#browser_compatibility), has wide browser support, back to Safari 17.4, so should be generally safe to use.

## Additional Resources

- [You Might Not Need jQuery](https://youmightnotneedjquery.com)
