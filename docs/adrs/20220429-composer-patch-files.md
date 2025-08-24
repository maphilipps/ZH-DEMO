---
date: 2022-04-29
status: accepted
tags:
  - drupal
  - php
  - composer
contributors:
  - Andrew Berry
  - Cathy Theys
  - David Burns
  - James Sansbury
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Sally Young

title: Use local copies of patch files
context: When using [cweagans/composer-patches](https://github.com/cweagans/composer-patches), it is important that patch sources are consistent and do not change between builds.

---

## Decision

When using [cweagans/composer-patches](https://github.com/cweagans/composer-patches), publicly hosted patch files will be downloaded and stored in your project in a `patches` directory. Local patch files shall be referenced in composer.json. Do not reference remote URLs to patch files in composer.json as their contents may change leading to unexpected build failures.

### Using a patch from drupal.org

Download the patch and store it in the `patches/upstream/` directory in your project.
Make sure the file name at minimum references the drupal.org issue and comment numbers.

```
  "drupal/replicate_actions": {
    "Issue #3179837: Make sure translations are replicated unpublished as well": "patches/upstream/replicate_actions-3179837-2.patch"
  },
```

### Use a local patch to refer to a drupal.org Merge Request without patches

When referring to an issue that doesn't have a patch (only a Merge Request),
never use the GitLab URL with the `.patch` suffix. Follow the
[instructions](https://www.drupal.org/docs/develop/git/using-git-to-contribute-to-drupal/creating-issue-forks-and-merge-requests#s-downloading-a-patch-file-from-a-merge-request)
on how to create a local patch from a Merge Request, and save it in the
`patches/upstream/` directory in your project.

```
  "Issue #2823541: Allow exposed filters AJAX calls to persist query params": "patches/upstream/2823541-41-rerolled-on-9.2.7.patch",
```

### Use local patches for project-specific modifications

When a patch is needed but it can't be contributed back because it's too
specific to the project, store the patch in the `patches/local/` directory:

```
  "Redirect users to the document library after creating documents": "patches/local/redirect-to-doc-library.patch",
```

## Consequences

Upstream changes to in-development patches will not be automatically applied to projects. It's possible that inherited projects or external teams expect this behaviour. However, given the stability and security issues inherent in such an approach, we will update project processes and Composer configuration to match this ADR.
