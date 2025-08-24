---
date: 2022-09-20
status: accepted
tags:
  - git
contributors:
  - Andrew Berry
  - Chris DeLuca
  - David Burns
  - James Sansbury
  - Mateu Aguiló Bosch
  - Marcos Cano
  - Matt Oliveira
  - Owen Bush
  - Sally Young
  - Salvador Molina Moreno
title: Use [ticket-id]--[short-description] in feature branch names
context: Omitting key information in branch names can cause confusion over the purpose of a branch.

---
## Decision

Use `[ticket-id]--[short-description]` as the branch name when creating a new
feature branch. If a ticket doesn't exist, use a consistent keyword in place of a ticket ID. Suggested keywords include:

- `NOTICKET`: general purpose prefix for any time there is no ticket.
- `0`: An alternative general purpose prefix.
- `HOTFIX`: used for a branch containing a hotfix that does not have an
   associated ticket.

Do not use forward slashes (`/`) in branch names as this can cause confusion
and errors when trying to [interact with branches sharing prefixes](https://stackoverflow.com/questions/2527355/using-the-slash-character-in-git-branch-name/2527452#2527452).
For example, it is not possible to create a branch called `new-homepage` if
another branch called `new-homepage/fix-heading` exists. This can also cause
errors when pulling if a new branch conflicts with a local-only branch.

## Examples

Here are some examples of good branch names:

- `wta-249--scaffold-alert-content-type`
- `wta-NOTICKET--fix-tests-in-head`
- `wta-0--fix-tests-in-head`
- `HOTFIX--remove-has-krumo`
- `143--git-naming-conventions`
- `NOTICKET--troubleshoot-ci`

##  Consequences

Teams can choose to implement pull-request checks or pre-commit hooks that
validate branch names based off of a simple regular expression. For example,
the following command would fail if the branch name did not contain two dashes:

```sh
if ! git rev-parse --abbrev-ref HEAD | grep -qE '^main$|\-\-'; then
  echo "Please use the format [ticket-id]--[short-description] in branch names" >&2
  exit 1
fi
```

Developers can use branch names to automate commit messages and other common
tasks, such as [in this git commit message example](https://git.drupalcode.org/sandbox/deviantintegral-1080778/-/blob/master/bin/git-ici).
