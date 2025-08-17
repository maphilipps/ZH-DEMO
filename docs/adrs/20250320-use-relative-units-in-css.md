---
date: 2025-03-20

status: accepted

tags:
  - front-end
  - css

contributors:
  - Andrew Berry
  - Aubrey Sambor
  - Chris DeLuca
  - John Kaeser
  - Kat Shaw
  - Pauline Judge
title: Use relative units in CSS for resizable content
context: Using relative units improves accessibility by ensuring that text and content does not overlap when zooming web pages or changing the base font size.

---
## Decision

Use [relative length](https://www.w3.org/TR/css-values-3/#relative-lengths) units (such as `rem`) for all applicable properties.

## Exceptions

[Absolute length](https://www.w3.org/TR/css-values-3/#absolute-lengths) units should be used for the following properties, instead of relative ones.

- `border`
- `box-shadow`
- `outline`

A [unitless value](https://css-tricks.com/almanac/properties/l/line-height/#aa-unitless-line-heights) should be used for `line-height`.

##  Consequences

Pages will be more accessible as [fonts will respect browser preferences](https://css-tricks.com/accessible-font-sizing-explained/) and [font sizes will not compound with each other](https://www.digitalocean.com/community/tutorials/css-rem-vs-em-units#compounding-effect-trouble-in-paradise). The same is true for content with [other relative units](https://www.digitalocean.com/community/tutorials/css-css-units-explained#relative-units).

## Additional Resources

- [Accessible Font Sizing, Explained](https://css-tricks.com/accessible-font-sizing-explained/)
- [PX or REM in CSS? Just Use REM](https://austingil.com/px-or-rem-in-css/)
- [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/)
- [Use Rems for Font Size to Respect User Preferences](https://www.aleksandrhovhannisyan.com/blog/use-rems-for-font-size/)
