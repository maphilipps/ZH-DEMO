---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2022-04-26

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - devops

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context.
contributors:
  - Andrew Berry
  - David Burns
  - Marcos Cano
  - Mateu Aguiló Bosch
  - Sally Young
  - Salvador Molina Moreno
title: Use dedicated accounts for service integrations
context: Service integrations that use personal accounts tie the function of the service with the person's engagement with the project.
---
<!-- Here begins Markdown and HTML -->
Tying the normal operation of services to a person's engagement makes it more difficult for developers to roll off from
a project successfully. It also increases risk of breaking the client's service integrations when developers don't
remember to transition the integrations to another account.

Examples of these services include: GitHub, Circle CI, Tugboat, Jira, and Slack.

## Decision
<!-- Write the decision here -->
<!-- Headings will be shown in a table of contents with links -->
When integrating services together always use a dedicated account for the integration credentials instead of a person's
individual account.

### Implementation

Depending on the client, valid implementations include:

  - A dedicated email address and account per project or service, with credentials stored in a shared password manager. This e-mail address should be owned by the client i.e. not an `@lullabot.com` address.
  - A Slack email address (this can be obtained by going to `Channel Details / Integrations`). Again, this should be an e-mail address owned by the client that won't disappear when Lullabot rolls off the project.
  - For services that support it, a project access token (instead of a personal access token).

Don't use account aliases to register multiple bots for the same service like `projectname+ted.lasso@lullabot.com`, as spam filtering on the service side is likely to block account creation.

##  Consequences

<!-- What has to be done now that we've made the decision? -->
<!-- How will this impact us or our clients? -->
Rolling off a person will not have a side-effect on continued operations. Automated actions in service integrations will
not seem like they are performed by a person.
