# TODO

- [X] Implement basic SASS styles and atomic folder structure. Use native CSS variables.
- [] Add basic services like axios, error handling, logging, etc
- [] Implement some global components and sort out `js/globals.js`
  - Add plugins like `vue-meta` and some type of form validation
- [] Implement a `js/modules` folder with an example of using composition API
- [] Add basic vuex store pattern for handling loading/errors
- [] Refactor/simplify any BE code
- [] Write updated tests for all BE/FE and reformat test layout (deps first)
- [] Leverage vue cli hot reload and proxy for local dev.
- [] Make sure all NPM `script` commands are defined for build process.
- [] Update README with new commands and flows
- [] Sort out `.eslintrc.js` file - why is prettier behaving weird?
- [] Figure out what this means in `.eslintrc.js` - does it need to be updated?
    ```overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]```