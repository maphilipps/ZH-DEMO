---
# In the metadata section, # is a comment, not a heading.
# If other ADRs are added before this one is finished, set the date to
# today's date to push it to the top of the list.
date: 2022-07-05

# New ADRs start at accepted, and no longer relevant ADRs are deprecated.
status: accepted

# Tags are freeform - see existing ADRs for ideas
tags:
  - javascript
  - front-end
  - back-end
  - developer-experience

# Include anyone who was involved in the decision or discussions. The goal
# is to have a list for the future so the team has a starting point to ask
# for any missing historical context. This list should be sorted alphabetically
# by first name.
contributors:
  - Andrew Berry
  - Andy Blum
  - James Bain
  - James Sansbury
  - Javier Reartes
  - Mateu Aguiló Bosch
  - Matt Oliveira
  - Nacho Sánchez
  - Nate Lampton

title: Use TypeScript for pure JavaScript development
context: Strictly typed languages like TypeScript avoid unexpected behavior, prevent bugs, and improve code maintainability.

---

Bugs introduced by missing types are hard to find and often present themselves as edge cases. [TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript that introduces static types for JavaScript code (among other features).

## Decision

We will favor TypeScript over JavaScript when authoring code for front-end development using a JS framework, or back-end development using Node.js.

### Considerations

This decision is backed by peer-reviewed and cited research papers that prove that TypeScript indeed reduces the number of bugs introduced. These include:

- Stefan Hanenberg, Sebastian Kleinschmager, Romain Robbes, Éric Tanter, and Andreas Stefik. 2014. **An empirical study on the impact of static typing on software maintainability.** Empirical Software Engineering 19, 5 (2014), 1335ś1382. https://doi.org/10.1007/s10664-013-9289-1
- Clemens Mayer, Stefan Hanenberg, Romain Robbes, Éric Tanter, and Andreas Stefik. 2012. **An empirical study of the influence of static type systems on the usability of undocumented software.** In Proceedings of the 27th Annual ACM SIGPLAN Conference on Object-Oriented Programming, Systems, Languages, and Applications, OOPSLA 2012, Tucson, AZ, USA, October 21-25, 2012. 683ś702. https://doi.org/10.1145/2384616.2384666
- Samuel Spiza and Stefan Hanenberg. 2014. **Type names without static type checking already improve the usability of APIs (as long as the type names are correct): an empirical study.** In 13th International Conference on Modular- ity, MODULARITY ’14, Lugano, Switzerland, April 22-26, 2014. 99ś108. https://doi.org/10.1145/2577080.2577098
- Andreas Stuchlik and Stefan Hanenberg. 2011. **Static vs. dynamic type systems: an empirical study about the relationship between type casts and development time.** In Proceedings of the 7th Symposium on Dynamic Languages, DLS 2011, October 24, 2011, Portland, OR, USA, Theo D’Hondt (Ed.). ACM, 97ś106. https://doi.org/10.1145/2047849.2047861

More specifically about TypeScript:

- Zheng Gao, Christian Bird, and Earl T. Barr. 2017. **To type or not to type: quantifying detectable bugs in JavaScript.** In Proceedings of the 39th International Conference on Software Engineering, ICSE 2017, Buenos Aires, Argentina, May 20-28, 2017, Sebastián Uchitel, Alessandro Orso, and Martin P. Robillard (Eds.). IEEE / ACM, 758ś769. https://doi.org/10.1109/ICSE.2017.75

All the findings rely on code editor integrations for suggestions, and on the TypeScript compiler validation. Make sure to set those up in your local environment.

### Exceptions

Some external tools and integrations do not support TypeScript. In those cases the use of JavaScript is accepted. This includes:

- Configuration files for adjacent apps like Storybook.
- JavaScript code used for tooling, like `.eslintrc.js`, `tailwind.config.js`, etc.

## Consequences

We acknowledge that TypeScript code is more complex than JavaScript. This means that new features or changes will take longer to develop. We accept this cost because we expect to spend less time testing and bug fixing. We believe the balance is positive, as using TypeScript increases our efficiency.

We will be more efficient because developers and quality assurance engineers will spend less time in the cycle of reporting and fixing bugs.
