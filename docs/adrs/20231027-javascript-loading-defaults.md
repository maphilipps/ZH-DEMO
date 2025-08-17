---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2023-10-27

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - javascript
  - front-end
  - performance

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Andy Blum
  - Aubrey Sambor
  - Chris DeLuca
  - Mateu Aguiló Bosch
  - Sally Young
title: Load JavaScript as external resource with defer attribute
context: Loading JavaScript as deferred has the best default performance

---
## Decision

When loading external JavaScript files in HTML, they will have the `defer` attribute.

```html
  <script src="/path/to/file.js" defer>
```

When adding JavaScript files with Drupal Libraries, this will require adding the `defer` attribute on a per-file basis:

```yml
my_library:
  version: 1.0.0
  js:
    js/my-script.js:
      attributes:
        defer: true
```

## Context

Adding `defer` to `<script src="...">` tags will create the most performant page-loading experience:

* The `async` attribute tells the browser to continue parsing HTML while the JavaScript file is downloading, but to allow the script to interrupt parsing for execution.

* The `defer` attribute tells the browser to avoid executing the JavaScript until the entire document has been parsed. Scripts with the defer attribute will be fetched asynchronously by default. Without the `defer` attribute, the initial rendering of the page could be significantly delayed on devices with older or slower processors.

* Avoid using both `async` and `defer` on a `<script>` tag as `defer` already provides all the benefits of `async` and adding both may result in inconsistent or undesirable cross-browser behavior.

## Exceptions

There are rare instances when JavaScript should be added into the body of the HTML document, such as removing a `no-js` class from the `<html>` element. In this case, inline blocking JavaScript is preferable to avoid cumulative layout shifts and perceived reflows of the document. For example, in the code below, the HTML document is sent to the browser with a `no-js` class to prevent displaying portions of the page that require JavaScript. By adding an inline style early in the document, we can prevent the browser from rendering the page once with the `no-js` class and then reflowing when `no-js` is removed.

```html
<html class="no-js">
  <head>
    <script>
      document.documentElement.classList.remove('no-js');
    </script>
    <style>
      .no-js #app {
        display:none;
      }
    </style>
  </head>
  <body>
  </body>
</html>
```

##  Consequences

Requesting & executing JavaScript in this manner should lead to more performant page loading and the most consistent script execution since scripts will not run until the entire DOM is in place. This, in turn, will create a better experience for end-users and a better score on objective performance metrics.

## Additional Resources

* [[MDN]: The Script Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
* [[MDN]: Optimizing Startup Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Optimizing_startup_performance)
* [What's The Difference Between Async &amp; Defer?](https://pagespeedchecklist.com/async-and-defer)
