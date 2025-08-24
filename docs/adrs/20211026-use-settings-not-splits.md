---
date: 2021-10-26
status: accepted
tags:
  - dev-tools
  - drupal
contributors:
  - Andrew Berry
  - Dave Reid
  - Marcos Cano
  - Sally Young
title: Use settings.php for environment overrides and local settings
context: When developing a Drupal website, additional modules and configuration are useful for local and development environments.
---
Some teams try to leverage Config Split as a general purpose "override" tool for configuration. The presence of Config Split in the repository often leads teams to use it in production improperly, causing maintenance and development issues.

## Decision

Drupal projects will use the following techniques for managing environment-specific configuration:

1. Environment-specific settings files will be named `settings.ENVIRONMENT.php` and conditionally included.
2. `config_exclude_modules` will be used for [enabling modules on development sites](https://www.drupal.org/node/3079028).
3. [Config Ignore](https://www.drupal.org/project/config_ignore) will be used to ignore individual configuration objects.
  * [Webform Config Ignore](https://www.drupal.org/project/webform_config_ignore) is also acceptable for sites only needing to ignore Webform configuration.
4. [Config Split](https://www.drupal.org/project/config_split) will not be used for environment specific overrides.
5. [Config Pages](https://www.drupal.org/project/config_pages) will be used to store settings which should be preserved upon a configuration import, while providing a well organized UI to users.

Examples of environment-specific configuration include:

- Enabling the [Devel](https://www.drupal.org/project/devel) module.
- Enabling the database logging (`dblog`) module.
- Setting the default Drupal log level to "verbose".
- Enabling admin-only user interface modules like Field UI and Views UI.
- Enabling [Stage File Proxy](https://www.drupal.org/project/stage_file_proxy).
- Provide an UI to configure external API credentials (with Config Pages).

While not recommended by Lullabot, projects that are only storing configuration in the database can use [`drush config:import --partial --source`](https://www.drush.org/latest/commands/config_import/) to import development configuration to an environment during a deployment.

## Consequences

A standard way to manage and configure these tools will simplify project onboarding and debugging. However, some projects may already have a different method of managing development configuration, such as Configuration Split. In those cases, we only recommend refactoring to remove Config Split along side another significant change, such as entering the maintenance phase of a project or during a major Drupal version upgrade.
