---
date: 2021-10-06
status: accepted
tags:
  - scripting
contributors:
  - Mateu Aguiló Bosch
title: Avoid command aliases and short options
context: When writing scripts for CI tasks or local procedures, it is helpful to have the full command spelled out. Having the long options and avoiding command aliases will reduce chances of misinterpretation and mistakes. This will also reduce the need for checking the documentation while reading or reviewing a script.
---
## Decision

We will use the long form of command names and their options when writing
scripts shared with the team.

Examples:

  - We will write `drush config:status` and not `drush cst`.
  - We will write `cut --delimiter=' ' --fields=1,4 --only-delimited` and not
    `cut -sd' ' -f1,4`.
  - We will write `git checkout` and not `git co` or `gco`.

## Consequences

Developers have a clear understanding of the intent of the script their are
reading.
