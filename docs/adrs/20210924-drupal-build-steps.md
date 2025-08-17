---
date: 2021-09-24
status: deprecated
tags:
  - drush
  - deployments
contributors:
  - Andrew Berry
  - Marcos Cano
  - Sally Young
title: Define the order of steps when building a Drupal site
context: When updating Drupal code and configuration in a given environment, it's useful to make sure all members of the team and all teams follow a consistent set of steps, in the same order. Having consistent steps across multiple projects will reduce onboarding for new team members.
---

## Decision

**This ADR has been replaced** [by this new version](/adr/20230929-drupal-build-steps).

We standardize the build steps as:

```sh
vendor/bin/drush cache:clear plugin -y
# Run numbered module updates (hook_update_N) only.
vendor/bin/drush updatedb --no-post-updates -y
# Run config:import twice to make sure we catch any config that didn't declare
# a dependency correctly. This is also useful when importing large config sets
# as it can sometimes hit an out of memory error.
vendor/bin/drush config:import -y || true
vendor/bin/drush config:import -y
# Run updatedb again for updates dependent on config changes
# This second run should fire all hook_post_update_NAME() hooks.
vendor/bin/drush updatedb --no-cache-clear -y
vendor/bin/drush cache:rebuild -y
```

Developers should write update hooks using these guidelines:

### [`HOOK_update_N()`](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Extension!module.api.php/function/hook_update_N)

Code that does not rely on any Drupal APIs, usually to perform direct database
queries.

These hooks are the first ones to be executed, before configuration is imported.

### [`HOOK_post_update_NAME()`](https://api.drupal.org/api/drupal/core!lib!Drupal!Core!Extension!module.api.php/function/hook_post_update_NAME)

These are called when Drupal is fully bootstrapped and all Drupal APIs are
safe to use.

Using the approach outlined above with two `drush updatedb` executions,
implementations of this hook will be executed _after_ configuration is imported,
so developers are able to rely on new config being available when it's executed.

### Limitations

At time of writing, there is at least one scenario where the steps above could
cause issues in deployments. When a deployment includes a module being
enabled (through config changes in `core.extension.yml`) and it has a weight
different than 0, the detection of post_update hooks in the second execution
of `drush updatedb` doesn't work.

When using the order of operations described in this ADR, try to avoid
deployments that contain new modules with weight greater than 0 and post_update
hooks, even if these hooks are implemented in unrelated modules.

## Consequences

- Developers have a clear and consistent guide to use update hooks among
  projects.
- Automation can be built to ensure these steps are executed consistently.
