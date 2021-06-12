# Backend

In the `app/backend/src` folder, we have a few special files.

- `config.ts` exposes all app config options.
- `index.ts` is the main entry point for the app where we instantiate and configure our Express instance, configure various plugins, and start the server process.

Two aliases are configured for the backend:

- `@/...` = `app/backend/src/...`
- `shared/...` = `app/shared/...`

The following folders are a good start to organizing typical application logic. Adding more specific folders/subfolders may be appropriate as the app scales.

## Helpers

Simple and reusable helper methods can live here. For example, you might have a `dollars()` helper method, which would format a number in to a US dollar format `dollars(4.2) > "$4.20"`.

## Models

Any database logic (schemas, model definitions, etc) should live here. The structure of this folder will probably depend on what database and ORM best fits the application's needs.

## Routes

There are 3 primary types (and folders) for routes:

1. API: routes that return JSON for the frontend to consume (usually namespaced starting with `/api/...`).
2. Middleware: any middleware logic that should be run before routes.
3. Pages: routes that return HTML (a server side rendered view).

In general, routes should handle as little business logic as possible. Routes should simply listen for a request, interact with services to perform an action (modify data, fetch data, or initiate any action), and then return a response.

## Services

Services are singletons that abstract/handle various business and application logic. The vast majority of business logic should happen in this layer. For example:

- `services/auth.ts` would expose methods for signing in, signing out, varifying the current user's session etc.
- `services/logger.ts` would expose methods for logging various info and errors.

## Types

Contains files that export backend specific types that are shared throughout the app.