<template>
  <div class="layout layout--vertical-align">
    <div class="container">
      <section class="section center">
        <div class="icon icon--large icon--block fa fa-rocket light"></div>

        <h1 class="title title--1 primary">Express Your Vue</h1>
        <h2 class="title title--2">
          Can't beat that new car smell. Time to get coding!
        </h2>
      </section>

      <section class="section center">
        <my-example some-text="hot dog" />

        <div class="layout layout--horizontal layout--justify-center">
          <router-link
            class="button button--auto-width"
            :to="{
              name: 'another'
            }"
          >
            Button One
          </router-link>

          <router-link
            class="button button--auto-width button--secondary"
            :to="{
              name: 'another'
            }"
          >
            Button Two
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomePage'
  };
</script>
