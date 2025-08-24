---
date: 2022-05-11
status: accepted
tags:
contributors:
  - Andrew Berry
  - Andy Blum
  - Mateu Aguiló Bosch
  - Matthew Tift
  - Megh Plunkett
  - Sally Young
title: Use inclusive language in code and technical writing
context: Inclusive language can make technical subjects more inviting and understandable.
---
## Context
We are actively working on growing our team in an inclusive and diverse manner, and we work with clients with different backgrounds. We want to avoid terms with unintended connotations or nuances, and communicate our ideas more clearly by avoiding terms that do not translate well or require specific cultural knowledge to understand easily.

## Decision

When writing code or technical documents, authors should favor inclusive language and semantically meaningful terms that better communicate the concepts intended.

We won't override upstream systems using non-inclusive terminology, but we will file feature requests as appropriate, since using different terminology at the same time can be confusing.

For existing code, we will follow the [model of Config Split](https://www.drupal.org/project/config_split/issues/3191329), where they phased in changes until they had a 2.x branch where they broke compatibility.

### Examples

When the term "master" could be used authors should substitute "default", "primary", [or "main"](https://github.com/github/renaming), dependent upon the context of the usage. Similarly, terms derived from cultural analogies such as "black hat" and "whitelist" should be replaced with more semantically explicit terms like "nefarious actor" and "allow list", respectively.

When using pronouns in documentation, use gender-neutral singular "they" unless you're referencing a specific person. For example, instead of "After the user has filled out the form, she submits it" use "After the user has filled out the form, they submit it".

These posts on changing Git's default branch describe how different organizations improved terminology when that term was deeply embedded in software and documentation:

- [The default branch for newly-created repositories is now main (GitHub)](https://github.blog/changelog/2020-10-01-the-default-branch-for-newly-created-repositories-is-now-main/)
- [The new Git default branch name (GitLab)](https://about.gitlab.com/blog/2021/03/10/new-git-default-branch-name/)
- [Moving away from Master as the default name for Branches in Git (Bitbucket)](https://bitbucket.org/blog/moving-away-from-master-as-the-default-name-for-branches-in-git)

To learn more about inclusive language, consider these resources. Note the content linked here may change over time and is not exhaustive or specifically reviewed for their content.

- [Inclusive Language in Technology (Northwestern University)](https://www.it.northwestern.edu/about/it-projects/dei/glossary.html)
- [Inclusive Language Guide for Tech Companies and Startups (Medium)](https://medium.com/pm101/inclusive-language-guide-for-tech-companies-and-startups-f5b254d4a5b7)
- [Inclusive Language at Pantheon and in the Pantheon Community](https://pantheon.io/docs/inclusive-language)

##  Consequences

Our documentation, code, and technical literature will have fewer unintended connotations, and it will be easier to understand for all. This will reduce friction, confusion, and time clarifying concepts during our interactions.
