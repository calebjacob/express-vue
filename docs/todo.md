# TODO

- [] Create module to handle backend errors for <validated-form>
  - Something like `ValidatedFormExtensions` to be exposed as `useValidatedFormExtensions()` and then passed as a prop to <validated-form>
  - Replace hacky :error prop flow for email on create account with this new module flow
- [] Use more explicit singleton pattern for certain modules like session, notifications, etc?
- [] Don't provide/inject session since that's a confusing example. Provide/inject some other dumby data.
- [] Write updated tests for BE
- [] Write updated tests for FE
- [] Write docs/backend.md
- [] Write docs/shared.md (talk about shared API and model interfaces that the FE can also use)
- [] Check out Nest JS
- [] Keep an eye on Vetur's experimental template interpolation. Currently it's unusable due to this issue: https://github.com/vuejs/vetur/issues/2668