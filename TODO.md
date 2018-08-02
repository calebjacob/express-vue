# TODO

- [x] Check in on need of "retainLines": true in `.babelrc`: https://github.com/facebook/jest/issues/6108 - the need of this has been fixed/removed in Jest 23.1 (however, Vue CLI is using Jest 22 still)
- [ ] Use `jest.clearAllMocks` in all unit tests
- [ ] Implement Vue Router `scrollBehavior` from Pay at Table.
- [ ] Stylus doesn't log any errors on compilation (unkown variable, bad syntax) - use SASS? However, SASS depends `node-sass` which currently has security issues with v4.9: https://github.com/sass/node-sass/issues/2355
- [ ] Watch out for Vue 2.6 and next Vue Test Utils upgrade
