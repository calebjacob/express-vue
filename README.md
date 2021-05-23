# Express Your Vue

A starter project ready to rock and roll!

- [Node](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Sass (Indented Syntax)](https://sass-lang.com/documentation/syntax#the-indented-syntax)
- [Font Awesome 5](https://fontawesome.com/icons?d=gallery&p=2).

It also includes the following linting & testing integrations:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)

*NOTE: Vuex is purposefully not included in this starter project. Vue 3's Composition API allows for a much simpler approach to global state management going forward. However, much larger projects might still benefit from Vuex. Also, keep an eye out for Vuex 5 - it will introduce big changes for Vuex according to [this RFC](https://github.com/kiaking/rfcs/blob/vuex-5/active-rfcs/0000-vuex-5.md).*

## Conventions & Documentation

- [Frontend](docs/frontend.md)
- [Styles](docs/styles.md)
- [Testing](docs/testing.md)
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
npm ci
```

Initialize git hooks:

```
npm run husky
```

You'll need to set up a local `.env` file to declare our required environment variables. You can copy the example file to get up and running locally:

```
cp .env.example .env
```

To get started with local development, boot up the backend server and frontend compilers/watchers:

```
npm run start:backend
npm run start:frontend
```

When running the frontend dev server via Vite, all changes will be hot loaded to your browser - eliminating the need to refresh manually after each change.

*NOTE: The dev server proxy settings inside `vite.config.js` might need to change per use case. It's set up to proxy all `/images` and `/api` requests through to the local backend server (Express backend app) by default.*

## Testing

To learn more about testing conventions and methodologies, check out our [Testing Methodologies](docs/testing.md) documentation.

### Unit/Integration Tests

The [Jest](https://facebook.github.io/jest/) testing framework is used to test all backend & frontend code.

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

### E2E Testing

The [Cypress](https://www.cypress.io/) testing framework is used to handle end to end testing. Before you run the test suite, you'll need to make sure you have the app running in production mode:

```
npm run production
```

To run the E2E test suite once in headless mode (`cypress run`):

```
npm run test:e2e
```

To run the E2E test suite in GUI mode (`cypress open`):

```
npm run test:e2e:gui
```

## Linting

*NOTE: All backend and frontend code is automatically linted and fixed on pre-commit. Linting uses a combo of ESlint and Prettier.*

To lint and fix all code:

```
npm run lint
```

## Verify Typescript Code

*NOTE: All backend and frontend code is automatically type checked and verified on pre-commit.*

Due to the development server watch/build process being focused on speedy compile times, not all type errors will come through when files are modified (especially for the frontend, which uses Vite). For the most part, your IDE should be able to help you catch type errors as you modify code.

To verify that all Typescript code will compile and no type errors exist (without generating any artifacts):

```
npm run verify
npm run verify:backend
npm run verify:frontend
```

## Production Build

Create a production ready build:

```
npm run build
```

This will generate an `app/backend/dist` and `app/frontend/dist` folder ready to be executed by Node and served by Express.
