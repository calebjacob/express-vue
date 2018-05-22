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

Run the test suite once:

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

This will generate a `/dist` folder with all front-end assets compiled - ready to be served by some other server process.
