---
date: 2024-08-20

status: accepted

tags:
  - documentation

contributors:
  - Andrew Berry
  - Cathy Theys
  - Chris Albrecht
  - Christian López Espínola
  - Darren Petersen
  - David Burns
  - Marcos Cano
  - Pauline Judge  

title: Document project setup in README.md
context: Documentation for getting started on a project should always be found in the same place and use the same formatting.

---
## Decision

For consistency and to ease onboarding, all projects should have a `README.md` file at the root of the repository.

The README will start with the following template. It is important that `h1` tags (the `#`) are only used for the very first project name heading, and `h2`s and lower are used for further sections. GitHub and other tools will automatically use these to create a table of contents.

```
# Project Name

_A short introduction describing the project and its purpose._

## Getting Started
## Running Tests
```

`Getting Started` should contain the steps to clone the repository and have a working version of the code. A typical Drupal project will end with a fully functional Drupal site and a one-time login link.

### Organizing the README File

Initially, projects should put documentation directly in the README. As it grows, consider splitting longer sections into new files in a `docs/` directory, linked to from the README. Or better yet, see if setup and documentation can be simplified into fewer commands and steps.

Good heuristics to use to know when to create a separate document include:

1. The scope and context is large enough to make trying to read it in a single file too cumbersome.
2. The content is specific enough to a particular service or subsystem that it makes more sense to keep it with that service in a folder dedicated to that service (such as Storybook or Tugboat).
3. The content is managed by an external source.

### Documentation Scope

This applies to any documentation relevant to technical aspects of working with the project such as setting up a local environment and running tests.

## Consequences

Maintaining a consistent and organized documentation system for technical documentation will reduce the effort searching for common information. As well, it will avoid being dependent on other team members to get started on a project. Developers can work faster, make better decisions, and onboarding can happen more smoothly.
