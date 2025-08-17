---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2022-09-06

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - drupal
  - devops

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Andrew Berry
  - David Burns
  - Matt Oliveira
title: Use identical cache backends on development environments
context: Using memory caches like Memcached or Redis in production but not in development environments can lead to bugs and confusion.

---
## Decision

Development environments (like [Tugboat](https://tugboat.qa)) will use the same cache backend as production environments. Local environments will also use the same backend.

Using different cache backends on non-production environments can lead to tricky bugs that are hard to diagnose. For example:

- When production environments change cache backends, such as from database caching to a memory cache, it is possible for stale entries to be left in the database. These entries may cause unexpected behaviour on other environments if they are still using the default database backend.
- Automated tests may miss production bugs if the bug only occurs when using a memory cache backend.

Projects using [ddev](https://architecture.lullabot.com/adr/20211207-ddev-locals/) should use [ddev-memcached](https://github.com/drud/ddev-memcached) or [ddev-redis](https://github.com/drud/ddev-redis) to add the appropriate cache server.

Tugboat images for both [Memcached and Redis](https://docs.tugboatqa.com/reference/tugboat-images/) are also available.

##  Consequences

All environments will be more consistent with each other, reducing the chances of "it only happens in production" bugs.

Developers working on local environments may be surprised to not see cache entries in the database. Inspecting caches with database tools like PHPStorm's database viewer is simpler than inspecting Memcached or Redis contents. They will need to become familiar with Drush's [cache:get](https://www.drush.org/latest/commands/cache_get/) command.
