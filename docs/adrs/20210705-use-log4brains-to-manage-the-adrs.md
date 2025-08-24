---
date: 2021-07-04
status: deprecated
tags:
  - dev-tools
  - doc
  - meta
contributors:
  - Andrew Berry
  - David Burns
  - Mateu Aguiló Bosch
title: Use Log4brains to manage the ADRs
redirect_from:
  - /adr/20210705-use-log4branis-to-manage-the-adrs/
---
_Replaced by [Use gatsby-theme-adr to manage the ADRs](/adr/20220621-gatsby-theme-adr/)_.
## Context and Problem Statement

We want to record architectural decisions made in this project.
Which tool(s) should we use to manage these records?

## Considered Options

- [Log4brains](https://github.com/thomvaill/log4brains): architecture knowledge base (command-line + static site generator)
- [ADR Tools](https://github.com/npryce/adr-tools): command-line to create ADRs
- [ADR Tools Python](https://bitbucket.org/tinkerer_/adr-tools-python/src/master/): command-line to create ADRs
- [adr-viewer](https://github.com/mrwilson/adr-viewer): static site generator
- [adr-log](https://adr.github.io/adr-log/): command-line to create a TOC of ADRs

## Decision Outcome

![Log4brains](/assets/images/adrs/Log4brains-logo-full.png)

Chosen option: "Log4brains", because it includes the features of all the other tools, and even more.
