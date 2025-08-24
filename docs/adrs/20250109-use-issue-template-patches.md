---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2025-01-09

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - composer

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Andrew Berry
  - Christian López Espínola
  - Dave Reid
  - Marcos Cano Miranda
  - Markie Casias
  - Mateu Aguiló Bosch

title: Use description template for upstream patches in composer
context: When managing patches in a `composer.json` file, clear and consistent descriptions improve maintainability and facilitate tooling. Currently, there is no standard template for describing patches, leading to inconsistent documentation.

---
## Decision

All upstream patches listed in the `composer.json` file **MUST follow the standardized template** for their description.
Project specific patches **MAY follow the standardized template**, and are encouraged to do so. The required format is 
slightly different if there is a relevant URL for the issue to link to, or not.

If there is an issue link:

```
Issue #<issue-number>: [<issue-title>](<issue-link>)
```

If there is no issue link:

```
Issue #<issue-number>: <issue-title>
```

Examples:

```shell
  - Issue #1234: [Implement the important feature](https://www.drupal.org/node/1234)
  - Issue #5678: [Fix compatibility with PHP 8.1](https://github.com/lullabot/my-php-library/pull/5678)
  - Issue #9101: Fix the important feature
```

This labeling standard applies to patches originating from issue trackers, like Drupal.org, GitHub, or any other platform.

When applicable, the issue number and title should directly reference the original issue in its respective tracker, providing clarity and traceability.
Implementation details:

  - The `<issue-number>` refers to the identifier assigned to the issue by its respective tracker. This information is required.
  - The `<issue-title>` matches the title of the issue or change request on the issue tracker. This information is required.
  - The `<issue-link>` points to the original issue, or change request. It can also point to an internal issue tracker with more information about the reasons why the patch is needed. This information is optional.

Example entry in `composer.json`:

```json
"extra": {
    "patches": {
        "drupal/core": {
            "Issue #1234: [Implement the important feature](https://www.drupal.org/node/1234)": "patches/upstream/drupal/core/1234-important-feature.patch"
         },
         "lullabot/my-php-library": {
            "Issue #5678: [Fix compatibility with PHP 8.4](https://github.com/lullabot/my-php-library/pull/5678)": "patches/upstream/lullabot/my-php-library/5678.patch",
            "Issue #91011: Fix the important feature": "patches/local/lullabot/my-php-library/91011.patch"
        }
    }
}
```

##  Consequences
Using a standarized format for describing patches in `composer.json` will improve readability, and traceability. It will also simplify writing tooling that analyzes patches, or identifies common issues across different projects.
