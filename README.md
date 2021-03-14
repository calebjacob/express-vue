# Express Vue

A simple, Node starter project built with [Express](https://expressjs.com/), [Vue 3](https://vuejs.org/), [Vue CLI](https://github.com/vuejs/vue-cli), and [Sass (Indented Syntax)](https://sass-lang.com/documentation/syntax#the-indented-syntax).

*NOTE: Vuex is purposefully not included in this starter project. Vue 3's Composition API allows for a much simpler approach to global state management going forward. However, much larger projects might still benefit from Vuex. Also, keep an eye out for Vuex 5 - it will introduce big changes for Vuex according to [this RFC](https://github.com/kiaking/rfcs/blob/vuex-5/active-rfcs/0000-vuex-5.md).*

## Conventions & Documentation

- [Frontend](docs/frontend.md)
- [Styles](docs/styles.md)
- [Testing](docs/testing.md)
- [Modules & Mocking](docs/modules-and-mocking.md)
- [Deploying With Dokku](docs/dokku.md)

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

To get started with local development, boot up the backend server and frontend compilers/watchers:

```
npm run start:backend
npm run start:frontend
```

When running the frontend dev server via Vue CLI, all changes will be hot loaded to your browser - eliminating the need to refresh manually after each change.

## Testing

The [Jest](https://facebook.github.io/jest/) testing framework is used to unit test all backend & frontend code. To learn more about testing conventions and methodologies, check out this project's `docs/testing.md` documentation.

### Unit/Integration Tests

To run the backend and frontend test suite once:

```
npm test
```

Other test commands:

```
npm run test:backend
npm run test:backend:watch
npm run test:frontend
npm run test:frontend:watch
```

## Linting

All backend and frontend code is automatically linted and fixed on commit. Linting uses a combo of Vue CLI, ESlint, and Prettier.

To lint and fix all code:

```
npm run lint
```

Other lint commands

```
npm run lint:backend
npm run lint:frontend
```

## Production Build

Create a production ready build:

```
npm run build
```

This will generate a `app/public/dist` folder with all frontend assets compiled - ready to be served by the Express app.


