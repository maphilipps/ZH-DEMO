---
date: 2021-12-12
status: accepted
tags:
  - drupal
  - deployment
  - automation
  - devops
contributors:
  - Andrew Berry
  - David Burns
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matthew Tift
title: Confirm Drupal site configuration is always in a default state
context: Configuration should never be in an overridden state after configuration import(s) have been completed.
---
When there is overridden configuration it indicates that code and database are not in sync. This creates confusion as to if a branch is safe to merge or a release is safe to deploy.

Overridden configuration can be caused by module updates that alter existing configuration. These are easily overlooked when using an automated package updater like [Dependabot](https://dependabot.com/) or [Violinist.io](https://violinist.io).

## Decision

After running the standard [Drupal build steps](/adr/20210924-drupal-build-steps/) we should
follow up with `drush config:status` and check the results of that command for `No differences`. If differences are
found we should fail the build.

Example: `[[ $(vendor/bin/drush config:status --format=json --state=Different) == '[]' ]] || exit 1` 

### Resolving Overridden Configuration Errors

When the above status check fails, there are several steps developers can take to attempt to fix the issue.

1. Double-check the config really isn't importable. Often, all that's needed is to commit missing new configuration files to the branch. Use `git status` locally to double-check.
2. Otherwise, start a new temporary branch from the latest commit on the `main` branch.
3. Refresh the local database with the latest copy from production or whatever the upstream source is.
4. Run the build steps.
5. Copy the changes from the original branch to the new branch. `git cherry-pick` is helpful here.
6. Import the config with `drush config:import`.
7. Verify there are no changes to export with `drush config:status`.
8. If differences still show, there may be a bug in a module or in custom code.
  * Roll back your changes to the last commit on main and re-import configuration.
  * Recreate the configuration changes step-by-step, importing and exporting each time until the issue is found.
  * Once found, file a bug ticket in the site project, or in the appropriate upstream project.

## Consequences

When configuration status checks fail, developers will need to determine how to resolve the error, which often might be as simple as re-exporting configuration and committing the changes.

For example:
  
  - If a module was updated and introduced new configuration, a developer will need to re-export configuration to capture the changes.
  - If a developer missed adding configuration changes to their pull request, they will need to re-create and export the configuration locally and push again.
