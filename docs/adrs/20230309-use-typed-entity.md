---
date: 2023-03-09

status: accepted

tags:
  - drupal
  - code quality

contributors:
  - Andrew Berry
  - Ignacio Sánchez Holgueras
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Matt Oliveira
  - Pablo López Escobés
  - Salvador Molina Moreno

title: Use Typed Entity to encapsulate business logic in dedicated classes

context: Wrapping the business logic for an entity using Typed Entity produces code that is easier to read, maintain, test, and discover.

---
## Context

It is well understood that having dedicated classes in object-oriented systems produces more maintainable systems. However, Drupal has a history of procedural code with "hooks" that spread business logic widely throughout a Drupal application.

The main alternative that we have considered is [Drupal core’s bundle classes](https://www.drupal.org/node/3191609). We determined that Typed Entity is a better solution for all the reasons highlighted in [this article comparing them](https://www.lullabot.com/articles/drupals-bundle-classes-empower-better-code).

Some of the advantages of Typed Entity over bundle classes are:
  - Reduced API surface.
  - Decouples classes from bundles. It allows more than one class per bundle.
  - Keeps custom logic and framework logic separated.
  - Flexible architecture.
  - Has separation of concerns with rendering logic.
  - Includes “repository” classes, which will avoid the need of static methods.

Advantages of bundle classes over Typed Entity:
 - Available in Drupal core. This makes it ubiquitous and well maintained.
 - Custom classes are instantiated without having to wrap them.

All things considered, we have decided that use of Typed Entity far outweighs bundle classes for encapsulating business logic in our projects.

## Decision

All new projects at Lullabot should use Typed Entity to wrap entities so that's easier to interact with them from other
code. This includes logic around loading entities from the database, creating entities, etc., that would otherwise be 
spread around different files in code.

## Consequences

Encapsulating business logic in their own objects will make said logic more understandable, easier to find, less error
prone, and more reusable. 

The developers can see their experience improved with IDE autocomplete.

The use of Repository classes will bring similar results and a more expressive organization around how entities are 
stored and loaded. This will lead to increased developer and client satisfaction.
