# Testing Methodologies

First off, give this great article a read: [Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests)

To learn more about writing effective tests for Vue in particular, please refer to the [Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/v3/#what-is-this-guide). Also, check out this [YouTube Playlist](https://www.youtube.com/playlist?list=PLC2LZCNWKL9ahK1IoODqYxKu5aA9T5IOA) to get a beginner focused intro to testing Vue 3 components.

## Unit/Integration Testing

A mistake I made early on in my career was favoring pure, isolated unit tests over any other form of testing - thinking it was "THE right way" to do things. This article does a great job illustrating why isolated unit tests aren't all that helpful: [Why I Never Use Shallow Rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering).

Another mistake I made early on was testing implementation details instead of behavior. For a good read on this, check out [Testing Behavior vs. Testing Implementation](https://teamgaslight.com/blog/testing-behavior-vs-testing-implementation).

The goal is to have tests that mimic the real world as much as possible. In this way, you'll notice your tests trend more towards integration testing - more so than pure, isolated unit testing.

For example, prefer using `mount()` over `shallowMount()` when testing Vue components. You'll end up with a more realistic/helpful test due to the actual components interacting with each other. There will be times when certain dependencies need to be mocked, but in general, try to stay away from mocking dependencies (exceptions being things like network requests).

**In summary, don't worry too much about "unit" vs "integration" testing. Good testing tests behavior (not implementation details) in real world conditions (as few mocks/stubs as possible).**

#### Structure

Each module of code (JS file) should have a test file living alonside it in the same folder. This gives us easy access to our tests and makes it obvious when a module doesn't have any tests yet. Also, any relative dependencies won't need to have their paths altered. For example, this folder/file structure would look like:

```
app/src/components/globals/main-header.vue
app/src/components/globals/main-header.test.js
app/src/helpers/timer.js
app/src/helpers/timer.test.js
```

The other approach is having a completely separate folder where all your tests live. I've found that approach causes the following headaches:

- Having to modify dependency import paths due to living in a different folder structure.
- Maintaining a mirrored directory structure for tests is thankless work that feels like a chore.
- It can be difficult to quickly navigate between implementation and corresponding test file.
- It is quite common to browse code on GitHub and other code hosting sites these days, and the separation of test files makes it hard to see how well-tested a codebase is.

## End To End (E2E) Testing

E2E testing allows us to simulate a real world user interacting with our app - which gives us very high confidence that our app continues to work.

In general, focus only on critical flows (sign in, checkout, etc) instead of worrying about E2E testing your entire app. This can give you a lot of confidence, while also not bogging your test suite down with too many E2E tests. An oversized E2E test suite can create a new set of headaches.

#### Structure

Since E2E testing is a unique beast compared to unit/integration testing, we'll have a special folder dedicated just for E2E tests: `/e2e`

Inside this folder, you might have 3 files testing the most critical flows of your app: `e2e/tests/checkout.e2e.js`, `e2e/tests/sign-in.e2e.js`, and `e2e/tests/browse-items.e2e.js`.

Note the `.e2e.js` naming convention to differentiate from other tests.