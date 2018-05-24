# Express Vue

A simple, Node starter project built with Express and Vue. Integrated with [Vue CLI](https://github.com/vuejs/vue-cli).

## Getting Started

To get started, make sure you have NVM installed to manage your current version of Node and NPM:

```
brew install nvm
```

Once NVM has been installed, navigate to the project's root directory and run:

```
nvm install
nvm use
```

Now install all of the project's dependencies via NPM:

```
npm install
```

To get started with local development, boot up the server, compilers, and watchers:

```
npm start
```

## Testing & Linting

The [Jest](https://facebook.github.io/jest/) testing framework is used to unit test all backend & frontend code. To run the test suite once:

```
npm test
```

Run the test suite everytime a file changes:

```
npm run test:watch
```

Lint all code and auto fix syntax issues:

```
npm run lint
```

## Production Build

Create a production ready build:

```
npm run build
```

This will generate a `/dist` folder with all frontend assets compiled - ready to be served by some other server process.

## Conventions

### Module Management

- For all backend JS, use CJS (Common JS) `require() / module.exports` for module management.
- For all frontend JS, use ESM (ECMAScript Module) `import / export` for module management.

Due to Node currently having only expirmental support for [ESM](https://nodejs.org/api/esm.html), `require()` is still the smartest and "hack-free" approach for managing modules in all Node related code.

Since Webpack & Babel take care of transpiling all frontend JS, ESM `import / export` syntax is supported and should be used in all frontend related code.

### Mocking Modules

Jest has a really cool ability to [mock modules](https://facebook.github.io/jest/docs/en/mock-functions.html#mocking-modules) based on special `__mocks__` folders (which can be nested throughout the project structure).

The project's root `__mocks__` folder will mock modules installed in `node_modules`. Since these modules could be used by both the frontend and backend, make sure to export the mock using `module.exports` syntax (instead of using ESM export syntax). This CJS export syntax will work regardless if it's being used to mock a CJS or EMS dependency.

- If a `__mocks__` folder exists inside the backend directory, use CJS `module.exports`.
- If a `__mocks__` folder exists inside the frontend directory, use ESM `export`.

