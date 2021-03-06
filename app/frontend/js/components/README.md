# Components

The `app.vue` component lives all on its own since it's unique. It's the base component that wraps the entire project. This can be a good place to initiate logic that's required for the entire app (user session and auth, fetching global data, etc).

## Globals

If a component is shared throughout the app and can have multiple instances at any one time, the component belongs in the `components/globals` folder.

## Singles

If a component should only ever have a single instance at any one time, the component belongs in the `components/single` folder.