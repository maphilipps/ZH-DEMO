---
date: 2021-07-23
status: accepted
tags:
  - contrib-modules
  - editorial-experience
contributors:
  - Andrew Berry
  - David Burns
  - Mateu Aguiló Bosch
title: Environment Indicator
context: All Drupal websites our team works on have one or more environments. At a minimum, there will be a production and a local development environment. Most projects will have production, staging, development preview, and local environments. Developers and QA often access different environments at the same time. Since making content or configuration changes on the wrong environment can have unintended consequences, it is important to be able to distinguish environments easily.
---
## Decision

All client sites will have the [Environment Indicator](https://www.drupal.org/project/environment_indicator) module installed and configured.

Environment colors will be configured as follows:


<table>
  <thead>
  <tr>
    <td>Environment</td>
    <td>Colors</td>
    <td>Suggested <code>fg_color</code></td>
    <td>Suggested <code>bg_color</code></td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Live</td>
    <td>White on Red</td>
    <td><code>#fff</code></td>
    <td><span style="color: #e7131a;">█</span> <code>#e7131a</code></td>
  </tr>
  <tr>
    <td>Staging</td>
    <td>White on Orange</td>
    <td><code>#fff</code></td>
    <td><span style="color: #b85c00">█</span> <code>#b85c00</code></td>
  </tr>
  <tr>
    <td>Development</td>
    <td>White on Green</td>
    <td><code>#fff</code></td>
    <td><span style="color: #307b24">█</span> <code>#307b24</code></td>
  </tr>
  <tr>
    <td>Branch Preview</td>
    <td>White on Blue</td>
    <td><code>#fff</code></td>
    <td><span style="color: #20688C">█</span> <code>#20688C</code></td>
  </tr>
  <tr>
    <td>Local</td>
    <td>White on Grey</td>
    <td><code>#fff</code></td>
    <td><span style="color: #505050">█</span> <code>#505050</code></td>
  </tr>
  </tbody>
</table>


## Consequences

Errors will be reduced as all screenshots by authenticated users will indicate the environment. Standard environment colors may conflict with existing site configuration, so each team will need to decide if colors should be changed on existing sites or not. Sites with blue / green deployments will need to determine their own color scheme. Teams deviating from the recommended colours will need to check the accessibility of their custom colors.

## Example Implementation

```php
<?php

// Environment indicator.
// See: https://pantheon.io/docs/environment-indicator#d8tab-id
if (isset($_ENV['PANTHEON_ENVIRONMENT'])) {
  switch ($_ENV['PANTHEON_ENVIRONMENT']) {
    case 'dev':
      $config['environment_indicator.indicator']['name'] = 'Dev';
      // Green-ish background.
      $config['environment_indicator.indicator']['bg_color'] = '#307b24';
      // White text.
      $config['environment_indicator.indicator']['fg_color'] = '#fff';
      break;

    case 'test':
      $config['environment_indicator.indicator']['name'] = 'Test';
      // Orange-ish background.
      $config['environment_indicator.indicator']['bg_color'] = '#b85c00';
      // White text.
      $config['environment_indicator.indicator']['fg_color'] = '#fff';
      break;

    case 'live':
      $config['environment_indicator.indicator']['name'] = 'Live';
      // Red-ish background.
      $config['environment_indicator.indicator']['bg_color'] = '#e7131a';
      // White text.
      $config['environment_indicator.indicator']['fg_color'] = '#fff';
      break;

    default:
      $config['environment_indicator.indicator']['name'] = 'Multidev';
      // Blue background.
      $config['environment_indicator.indicator']['bg_color'] = '##20688C';
      // White text.
      $config['environment_indicator.indicator']['fg_color'] = '#fff';
      break;
  }
}

// Replace this with however locals are detected.
if (getenv('IS_DDEV_PROJECT') == 'true') {
  $config['environment_indicator.indicator']['name'] = 'Local';
  // Grey-ish background.
  $config['environment_indicator.indicator']['bg_color'] = '#505050';
  // White text.
  $config['environment_indicator.indicator']['fg_color'] = '#fff';
}
```
