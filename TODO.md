# TODO

- [x] Rename frontend main.js file to index.js - have it export `app` instead of `main`. Rename `app` component to `layout`.
- [x] Get tests running for frontend
- [x] Create dummy API endpoint
- [x] Create dummy middleware and include in routers index
- [x] Get tests running/written for all of backend
- [x] Try moving dist folder into public (via static inside static)
- [x] Try using vue cli serve command for local dev
- [x] Cleanup dist folder after every build
- [x] Sort out all package.json scripts / commands for starting / building (update README)
- [x] Fix modal event.$on() bug still firing for previously destroyed modals
- [x] Close modal on background click
- [x] Remove nib? Autoprefixer seems to already be taking care of the heavy lifting.
- [ ] Stylus doesn't log any errors on compilation (unkown variable, bad syntax) - use SASS?
- [ ] Copy over all frontend JS and replace for simple-vue
- [ ] Check in on need of "retainLines": true in `.babelrc`: https://github.com/facebook/jest/issues/6108 - the need of this has been fixed/removed in Jest 23.1 (however, Vue CLI is using Jest 22 still)
