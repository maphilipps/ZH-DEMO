---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2022-06-22

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - drupal
  - node-form
  - editorial-experience
  - performance
  - seo

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Andrew Berry
  - Cristina Chumillas
  - Greg Dunlap
  - Karen Stevenson
  - Marcos Cano
  - Megh Plunkett
title: Do not add the Metatag field to the node form
context: The metatag field makes the node form slow and overly complex for editorial users.

---

## Decision

We will not enable the Metatags field to override metatags on content forms.

The [Metatag module](https://www.drupal.org/project/metatag) is used to provide
metadata and SEO information. The easiest, most performant way to configure it is
to set values at the global or content type level, on the metatag settings using
tokens for the field values.

There is a general consensus that the metadata should match the actual content
of the page it belongs to, so configuring it to use tokens that pull values
directly from that content is the ideal solution. It is always preferable to
any solution that hard-codes text into the metatag fields.

There is also an option to add a metatag field to the node form via the
"Manage fields" form. It is used to allow editors to override the default values
provided by global or content type settings. This field creates a long, complex,
field that contains every possible metatag field option, allowing editors to
override the token values with their own custom text.

![Metatags field configuration](/assets/images/adrs/20220622-1-do-not-add-metatags-to-node-form/metatags-field-config.png)

There are several problems with this option. It allows editors to change the
metadata in ways that may make metadata inconsistent, or even invalid. It
adds unnecessary complexity to the node form that often has to be
hidden or managed with custom code. It also can create performance problems,
sometimes making the node form so heavy that it won't even load or save.

![Metatags on article form](/assets/images/adrs/20220622-1-do-not-add-metatags-to-node-form/metatags-article-form.png)

The best solution is to discuss why overrides are necessary, and eliminate
them whenever possible. Where they are necessary, it is better to provide a
regular Drupal field or fields just for the data that might be overridden.
Then, use a token for those fields in the content type configuration settings.

The fields used for metadata can be configured with descriptions about what
metadata is needed and how it will be used. That information will be much
more clear than the standard Metatag field. Access to those fields can then be
restricted using standard options for Drupal field level access.

##  Consequences

Editors will have a more streamlined experience when defining metatags,
and projects maintainability will be improved.

We suggest discussing with clients this option and the reasons for using
this solution before adding the Metatag field to the node form on new
projects, as well as raising the question on inherited projects that already
use the Metatag field.
