---
date: 2025-01-24
status: accepted
tags:
  - drupal
  - accessibility
contributors:
  - Adam Varn
  - Aubrey Sambor
  - Kat Shaw
title: Use only one h1 on each page
context: Using one h1 on each page is best practice for accessibility and usability. 
---
## Decision
We will use only one `<h1>` heading on each page as it is best practice for the following reasons:
1. `<h1>` headings are meant to be unique and quickly convey the purpose of the page to all users. This is the case whether the user is sighted, blind or visually impaired, has a cognitive disability, has any other disability, or has no disability.
2. Screen reader users commonly use a [web rotor](https://support.apple.com/guide/voiceover/with-the-voiceover-rotor-mchlp2719/mac) to navigate web pages as it’s often faster for them to use. It quickly displays separate lists of headings, links, landmarks, form elements, etc.
3. Having multiple `<h1>` headings on one page ends up removing a meaningful page title from the page for screen reader users as it removes all context.
4. A good exercise for sighted users is to imagine navigating quickly through a site where none of the pages have visual page titles. How would you have any context for the meaning of each page? You’d likely feel lost.

### More information
* [Should you use multiple h1 heading elements on your page in 2022?](https://blog.shimin.io/should-you-use-multiple-h1-s-in-2022/)
* [A11yProject - Accessible heading structure - Headings in HTML](https://www.a11yproject.com/posts/how-to-accessible-heading-structure/)
* [Multiple h1 tags on Blogger](https://support.google.com/webmasters/thread/250613606/multiple-h1-tags-on-blogger?hl=en)
* [Deque U - Page must contain a level-one heading](https://dequeuniversity.com/rules/axe/4.1/page-has-heading-one)
* [mdn docs - h1–h6: The HTML Section Heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
* [How to Fix URLs with Multiple H1 Tags](https://sitechecker.pro/site-audit-issues/multiple-h1/)

##  Consequences
Having only one `<h1>` on each page will easily and quickly convey the purpose of the page to all users, regardless of how they choose to view the page.
