---
date: 2025-04-24
status: accepted
tags:
  - drupal
  - images
contributors:
  - Andrew Berry
  - Andy Blum
  - Dave Reid
  - David Burns
  - Javier Reartes
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matthew Tift
  - Megh Plunkett
  - Nate Lampton
title: Use ImageMagick with Drupal
context: Drupal requires the GD PHP extension, but many sites prefer ImageMagick for better performance, flexibility, and reliability. This choice affects image features, speed, and deployment in various hosting environments.
---

## Decision

Use the [ImageMagick](https://www.drupal.org/project/imagemagick) module as the default image processing library for Drupal projects.

Historically, ImageMagick has been considered more capable than GD. While GD may be slightly faster for a large number of small images, this difference is usually negligible. For larger projects, defaulting to ImageMagick is preferred. Even smaller projects benefit, as they are more likely to hit out-of-memory errors from high-resolution uploads. [Pantheon](https://docs.pantheon.io/external-libraries#imagemagick) and [Acquia](https://acquia.my.site.com/s/article/360005255734-Scoping-the-impact-of-image-processing) both recommend ImageMagick.

## Consequences

### Enhanced Image Processing and Resource Optimization

ImageMagick offers broader image manipulation capabilities than GD and helps reduce memory-related issues, especially with large images.

### Consistent Implementation on Hosting Platforms

ImageMagick is readily available on platforms like Pantheon and DDEV. Enabling it on Tugboat requires adding a [few lines](https://docs.tugboatqa.com/starter-configs/tutorials/pantheon/) to the `.tugboat/config.yml` file.

```
    commands:
      init:
        - apt-get update
        - apt-get install -y imagemagick
```

### Module Dependency

Using ImageMagick requires installing and enabling the [ImageMagick Drupal module](https://www.drupal.org/project/imagemagick). 

### Configuration

Configure the module according to the instructions in the [README](https://git.drupalcode.org/project/imagemagick/-/blob/4.0.x/README.md#configuration).

### Exceptions

While ImageMagick is the default, smaller projects—especially those hosted outside Acquia or Pantheon—may opt out if the added module and system dependency introduce unnecessary overhead.
