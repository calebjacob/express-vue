# Styles

For styling, we use the [BEM](https://css-tricks.com/bem-101/) syntax in addition to using an [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) folder structure.

## Globals

The `styles/globals` folder is designed to handle things like variables, animations, resets, default element styles, etc.

## Atoms

If a class is entended for a simple DOM element that won't have any child elements (links, buttons, paragraphs), that class belongs in the `styles/atoms` folder. At `atom` is the smallest building block possible.

## Molecules

If a class is entended to have child DOM elements, that class belongs in the `styles/molecules` folder. A `molecule` can contain and style any number of atoms or child elements.

## Other Folders

The full Atomic Design pattern can also make use of additional folders. They can be useful for larger projects - such as `organisms`, `pages`, etc. However, `atoms` and `molecules` are usually the best starting point to avoid confusion.
