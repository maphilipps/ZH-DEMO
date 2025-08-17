---
date: 2022-05-19
status: accepted
tags:
  - drupal
  - editorial-experience
contributors:
  - Adam Varn
  - Andrew Berry
  - Andy Blum
  - Cristina Chumillas
  - Kat Shaw
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matthew Tift
  - Pauline Judge

title: Use Claro for the Drupal administration theme
context: Claro offers a modern, responsive, and accessible interface that showcases Drupal's capabilities from the outset.

---

## Decision
Drupal sites will use the [Claro administration theme](https://www.drupal.org/docs/core-modules-and-themes/core-themes/claro-theme) to ensure a consistent client experience. Developers will use Claro to ensure accessibility and compatibility with contributed modules. 

##  Consequences
Standardizing its use across all Drupal sites ensures consistency for editors and developers across different sites. Using a built-in Drupal administration theme negates concerns about potentially unsupported/insecure contributed themes or an unfamiliar editorial experience.

There may be specific client needs that Claro does not serve "out of the box". These should be addressed through custom code or contributed modules, and not changing the administration theme.
