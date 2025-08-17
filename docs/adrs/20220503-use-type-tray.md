---
date: 2022-05-06
status: accepted
tags:
  - drupal
  - contrib-modules
  - editorial-experience
contributors:
  - Albert Hughes
  - Andrew Berry
  - Darren Petersen
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Megh Plunkett
title: Use Type Tray to improve editorial UX
context: Drupal's editorial experience in the "Add Content" page is confusing out of the box, especially when the content model's complexity increases.
---

While the greatest advantage is achieved on sites with a large number of
content types, the module still improves the usability of the "Add Content" on
smaller sites, allowing to group semantically similar content types together.

## Decision

Drupal sites will use [Type Tray](https://www.drupal.org/project/type_tray) to
enhance the usability of the "Add Content" page. Developers, strategists, and
product owners should work together to put in place categories that help the
site's editors.

Additionally, it's highly recommended to:
  - create imagery (icons and thumbnails) to better represent each content
type in a more visual manner.
  - produce relevant short / long descriptions that effectively help authors
when getting familiar with the content types

##  Consequences

A better experience for content editors when there are several content types
on a site, and they need context about which content type to use.
