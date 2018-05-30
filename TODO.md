# TODO

- [x] Rename frontend main.js file to index.js - have it export `app` instead of `main`. Rename `app` component to `layout`.
- [x] Get tests running for frontend
- [x] Create dummy API endpoint
- [x] Create dummy middleware and include in routers index
- [x] Get tests running/written for all of backend
- [x] Try moving dist folder into public (via static inside static)
- [ ] Try using vue cli serve command for local dev
- [ ] Cleanup dist folder after every build
- [ ] Sort out all package.json scripts / commands for starting / building (update README)
- [ ] Fix modal event.$on() bug still firing for previously destroyed modals
- [ ] Check in on need of "retainLines": true in `.babelrc`: https://github.com/facebook/jest/issues/6108
- [ ] Remove nib? Autoprefixer seems to already be taking care of the heavy lifting.
- [ ] Stylus doesn't log any errors on compilation (unkown variable, bad syntax)
- [ ] Copy over all frontend JS and replace for simple-vue
