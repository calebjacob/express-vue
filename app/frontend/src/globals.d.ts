/*
  NOTE: This declaration file is required by Volar for component/prop type checking
  when using global components inside templates.
  https://github.com/johnsoncodehk/volar
*/

declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];
  }
}

export {};
