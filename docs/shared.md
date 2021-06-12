# Shared

In the root `app/shared` folder, we can share reusable code and types between the backend and frontend. The most helpful/common use case would be to share API types between the backend and frontend.

## API Requset/Response Types

A really common challenge is keeping API requirements in sync between the backend and frontend. Inevitably, an existing endpoint will require a new parameter or implement some type of breaking change (relating to either the request or response). This is where using TypeScript for the backend and frontend really shines.

For every single endpoint, we should define request/response interfaces. These interfaces act as the contract between the backend and frontend. Whenever the contract (interface) needs to change for an endpoint, TypeScript will alert us of any backend or frontend changes required to respect those changes.

#### Example

For example, if we allow users to create an account, we might have a `CreateAccountBody` interface defined like so:

```
export interface CreateAccountBody {
  email: string;
  password: string;
}
```

Then 2 months down the road, we realize we need to start collecting a `fullName` field. We'd first update our interface (or contract) to add this new field:

```
export interface CreateAccountBody {
  email: string;
  fullName: string;
  password: string;
}
```

If we tried to verify our TS code right away, we'd get errors telling us that the frontend and backend haven't implemented `fullName` yet. Once we've correctly implemented support for `fullName`, those errors will go away due to us now respecting the new API contract. This is super cool!

#### Structure

You could keep track of all these API types in a single file like so: `shared/types/api.ts`. You could also break them up in to multiple files/folders as your project expands.
