---
date: 2022-06-21
status: deprecated
tags:
  - meta

contributors:
  - Andrew Berry
  - Mateu Aguiló Bosch
title: Use gatsby-theme-adr to manage the ADRs
context: We need a site generator to publish our ADRs.

---
_Replaced by [Use 11ty to manage the ADRs](/adr/20240913-11ty-adr/)_.
## Decision

We will use Gatsby along with a [gatsby subtheme](https://github.com/Lullabot/gatsby-theme-adr)
to generate a website for [architecture.lullabot.com](https://architecture.lullabot.com).

We initially used [log4brains](https://github.com/thomvaill/log4brains) which
met many of our needs. However, it did not support key features like [embedding local images](https://github.com/thomvaill/log4brains/issues/4),
and went through a through a period of minimal maintainership.
Our team determined that creating our own theme would be more effective for our
needs.

##  Consequences

We have expanded the possible scope for our team from being simply "users" of
ADR generator to developers and maintainers. We will need to respond to bug
reports and feature requests in a timely manner.
