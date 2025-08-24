---
date: 2021-10-26
status: accepted
tags:
  - devops
  - locals
  - drupal
  - contrib-modules
contributors:
  - Andrew Berry
  - Chris Albrecht
  - Darren Petersen
  - Marcos Cano
title: Stage File Proxy for static files
context: Lullabot often works on projects that have large numbers of static file assets in production, such as images or PDFs. Keeping a complete copy of those files for each environment is wasteful, since developers tend to only look at a small portion of a site locally. A solution is needed to reduce disk use and the time it takes to update an environment.
---

## Decision

Drupal sites will use [Stage File Proxy](https://www.drupal.org/project/stage_file_proxy) to automatically download files on-demand to each environment.

## Consequences

Custom code and update hooks may assume that a file is on disk, and not call the right methods to ensure that Stage File Proxy has a chance to download the image first. In those cases, the code is not using Drupal's API properly and should be treated as a bug to fix. [#3145608: Include derivative links although the image doesn't exist (for compatibility with stage_file_proxy)](https://www.drupal.org/project/consumer_image_styles/issues/3145608) in Consumer Image Styles has an example of the type of bug that may be surfaced.

Initial page loads may be slower as images are downloaded locally. Front-end performance testing should ensure that images have been loaded before any profiles are recorded.

Stage File Proxy [does not support private files](https://www.drupal.org/project/stage_file_proxy/issues/2879046). If a site relies heavily on private file uploads, Stage File Proxy may not be appropriate. Very few Lullabot clients use private files, so this is unlikely to come up in practice.

## Example Implementation

Place the following in `settings.php` for local, development, and continuous integration environments:

```php
<?php

// Documentation for Stage File Proxy configuration options.
// @see https://git.drupalcode.org/project/stage_file_proxy/-/blob/HEAD/INSTALL.md#configuration
$config['stage_file_proxy.settings']['origin'] = 'https://www.example.com';
// Transfer the remote file to the local machine.
$config['stage_file_proxy.settings']['hotlink'] = FALSE;
// Request original image when using image styles.
$config['stage_file_proxy.settings']['use_imagecache_root'] = TRUE;
```

In early development, a production URL for assets may not exist. In that case, consider setting `$config['stage_file_proxy.settings']['origin']` to an upstream development server.

`$config['stage_file_proxy.settings']['hotlink']` is not recommended. If the image changes, is deleted, or the environment is unavailable, it can be tricky to determine if the problem is a bug in locally changed code or the remote server.

Sometimes sites inherited from other teams or companies do not have a consistent origin to serve from. In those cases, consider omitting the `stage_file_proxy_origin` setting, and configuring it in the UI by hand.
