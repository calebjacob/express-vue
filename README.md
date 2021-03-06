# Express Vue

A simple, Node starter project built with [Express](https://expressjs.com/), [Vue 3](https://vuejs.org/), [Vue CLI](https://github.com/vuejs/vue-cli), and [Sass (Indented Syntax)](https://sass-lang.com/documentation/syntax#the-indented-syntax).

*NOTE: Vuex is purposefully not included in this starter project. Vue 3's Composition API allows for a much simpler approach to global state management going forward. However, much larger projects might still benefit from Vuex. Also, keep an eye out for Vuex 5 - it will introduce big changes for Vuex according to [this article](https://www.smashingmagazine.com/2020/12/vuex-library/).*

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

The [Jest](https://facebook.github.io/jest/) testing framework is used to unit test all backend & frontend code. To run the backend and frontend test suite once:

```
npm test
```

Run the backend test suite once:

```
npm run test:backend
```

Run the backend test suite everytime a file changes:

```
npm run test:backend:watch
```

Run the frontend test suite once:

```
npm run test:frontend
```

Run the frontend test suite everytime a file changes:

```
npm run test:frontend:watch
```

## Linting

All backend and frontend code is automatically linted and fixed on commit. Linting uses a combo of Vue CLI, ESlint, and Prettier.

To lint and fix all code:

```
npm run lint
```

To lint and fix backend code:

```
npm run lint:backend
```

To lint and fix frontend code:

```
npm run lint:frontend
```

## Production Build

Create a production ready build:

```
npm run build
```

This will generate a `app/public/dist` folder with all frontend assets compiled - ready to be served by the Express app.

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

## Deploying With Dokku

The easiest way to get any Node app running is to use Dokku. Spin up a Dokku droplet on Digital Ocean: [Dokku Droplet by Digital Ocean](https://www.digitalocean.com/products/one-click-apps/dokku/)

**Note:** *Droplet must have at least 1GB of RAM or else the build will fail.*

Here are some miscellaneous tips:

##### Add Git Remote to Deploy:

```
git remote add dokku dokku@mydomain.com:my-app-name
git push dokku master
```

##### Routing App to Root Domain:

```
dokku domains:add my-app-name mydomain.com
```

##### Configure SSL/HTTPS Via Let's Encrypt:

Read documentation here: [Dokku - Let's Encrypt](https://github.com/dokku/dokku-letsencrypt)

##### App Crash Restart Policy:

```
dokku ps:set-restart-policy my-app-name always
```

##### Check Error Logs:

```
dokku ls
docker logs <container ID>
```

##### More Dokku Documentation:

For info on setting up other plugins (databases, etc), read this documentation: [Dokku - Application Deployment](http://dokku.viewdocs.io/dokku/deployment/application-deployment/)


