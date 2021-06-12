# Frontend

In the `app/frontend/src` folder, we have a few special files.

- `index.ts` is the main entry point for the app where we instantiate our Vue instance and configure any plugins.
- `router.ts` is used to configure and register all `VueRouter` routes/pages and corresponding components.
- `globals.d.ts` is a declaration file required by Volar for component/prop type checking when using global components inside templates.

Two aliases are configured for the frontend:

- `@/...` = `app/frontend/src/...`
- `shared/...` = `app/shared/...`

The following folders are a good start to organizing typical application logic. Adding more specific folders/subfolders may be appropriate as the app scales.

## Components

All Vue components belong in `src/components`. The `app.vue` component lives all on its own since it's unique. It's the base component that wraps the entire project. This can be a good place to initiate logic that's required for the entire app (user session and auth, fetching global data, etc).

If a parent/child component design is required, a subfolder could be necessary in any of the corresponding folders. For example, if you were working on a `ShoppingCart` component, the structure might look like this:

```
src/components/singles/shopping-cart/index.vue
src/components/singles/shopping-cart/items.vue
src/components/singles/shopping-cart/payment.vue
```

#### Pages (src/components/pages)

A component used as a router/view component (home page, product page, etc). All components should use the `-page` file postfix and `Page` component name postfix to avoid naming collisions with non-page components. For example: `pages/home-page.ts > HomePage`.

#### Shared (src/components/shared)

A component shared throughout the app and can have multiple instances at any one time (buttons, inputs, etc).

Here are a few additional notes to keep in mind:

1. Whenever adding a new shared component, don't forget to export it in the `index.ts` file. This will allow other components to easily import all shared components.

2. As your project grows, it might be smart to have namespaced exports inside the shared folder. Maybe you'd have a `Base` group with very generic components (buttons, titles, icons, etc) and another `Form` group with all components related to forms (inputs, radios, checkboxes, etc).

3. A shared component itself should never import `@/components/shared`, as this would cause a circular dependency. If a shared component depends upon another shared component, it should import that component directly.

#### Singles (src/components/singles)

A component that should only ever have a single instance rendered at any one time (main header, main footer, etc). Single components should follow a `the-x` naming convention. The keyword `the` helps make it obvious when a component is meant to be used as a single.

## Helpers

Simple and reusable helper methods can live here. For example, you might have a `dollars()` helper method, which would format a number in to a US dollar format `dollars(4.2) > "$4.20"`.

## Modules

All Vue composistion modules live here. These modules are designed to share re-usable code and state throughout the app.

Some modules might need to export a single instance (singleton) that's shared throughout the whole codebase. However, other modules might need to be designed to create a new instance each time it's used. We can very easily support both of these module "flavors" with the following folder/file structure. Let's use a `session` module as an example:

- `modules/session/index.ts`: The entry point for the module that exposes the public API (the `useX()` module method, public types, etc). If a module should share a single instance each time it's used, that can be accomplished by creating a private module instance and returning it via a `useTheSession()` naming convention. If a module should create a new instance each time it's used, you'd simply export the hook via the `useSession()` naming convention (without the `The`).

- `modules/session/session.ts`: The module logic itself which exports a `useSession()` method to generate a module instance. This file could be broken down in to multiple subfiles if a module is becoming too large. The redundant folder and file name makes searching for the file much easier as the project grows.

- `modules/session/types.ts`: Any types/interfaces will be defined and exported here for the `session` module. Some of these might be exposed in the `index.ts` file if they should be public. This will help cut down on clutter inside the main module logic file `session.ts`.

## Services

This is a fairly broad category that could contain singletons, HTTP/API abstractions, and third party library instances.

## Types

Contains files that export frontend specific types that are shared throughout the app.