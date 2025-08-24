---
date: 2023-10-04
status: accepted
tags:
  - drush
  - drupal
  - deployments
contributors:
  - Andrew Berry
  - Juampy Novillo Requena
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Sally Young
title: Standardize the order of steps when building a Drupal site
context: When updating Drupal code and configuration in a given environment, it's useful to make sure all members of the team and all teams follow a consistent set of steps, in the same order. Having consistent steps across multiple projects will reduce onboarding for new team members.
---

## Decision

We standardize the build steps as:

```sh
vendor/bin/drush cache:rebuild --yes
vendor/bin/drush updatedb --yes
# Run config:import twice to make sure we catch any config that didn't declare
# a dependency correctly. This is also useful when importing large config sets
# as it can sometimes hit an out of memory error.
vendor/bin/drush config:import --yes || true
vendor/bin/drush config:import --yes
# Run update hooks that need to be run after config import. These need to be
# written as hook_deploy_NAME() hooks.
vendor/bin/drush deploy:hook --yes
vendor/bin/drush cache:rebuild -y
```

Developers should write update hooks using these guidelines:

### [`HOOK_update_N()`](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Extension!module.api.php/function/hook_update_N)

Code that does not rely on any Drupal services, entity CRUD operations,
entity APIs, router system, etc, usually to perform direct database queries.
Check [the documentation](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Extension!module.api.php/function/hook_update_N)
for more details about what is safe to use in these hooks.

These hooks are the first ones to be executed, before configuration is imported.

### [`HOOK_post_update_NAME()`](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Extension!module.api.php/function/hook_post_update_NAME)

These are called when Drupal is fully bootstrapped and all Drupal APIs are
safe to use. This is usually the place to write code that needs to alter content
but doesn't require the new configuration in place, since these hooks will be
executed before configuration is imported.

### [`HOOK_deploy_NAME()`](https://github.com/drush-ops/drush/tree/HEAD/drush.api.php)

These are equivalent to `HOOK_post_update_NAME()` in terms of APIs available,
the only difference being that this is executed _after_ configuration is
imported.

## Consequences

- Developers have a clear and consistent guide to use update hooks among
  projects.
- Automation can be built to ensure these steps are executed consistently.
