---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2024-02-21

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - front-end
  - accessibility
  - performance

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Chris DeLuca
  - Javier Reartes
  - Kat Shaw
  - Cristina Chumillas
title: Use SVGs for icons
context: Using SVGs for icons has the best display, performance, and accessibility

---
## Decision

Icons will use SVGs, either [inline](https://css-tricks.com/using-svg/#aa-using-inline-svg) or with [the symbol tag](https://css-tricks.com/svg-symbol-good-choice-icons/), instead of an `<img>` tag or an icon font.

## Context

SVGs provide the best display, performance, and accessibility for icon graphics, or any graphics that use simple geometric shapes.

This is because SVGs are:

1. Resolution independent, so they always look the same on any screen or zoom level
2. [Fully accessible](https://css-tricks.com/accessible-svgs/), allowing authors to adapt the material to the context
3. Can be fully styled from CSS (if inlined or included via `<symbol>`)
4. Part of the page, not requiring additional network requests (if inlined or included via `<symbol>`)
5. [Preferred by the W3C](https://www.w3.org/TR/SVG-access/)


##  Consequences

Icons will be more accessible, performant, and attractive.
