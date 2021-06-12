<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile center">
        <div class="group">
          <h1 class="title title--2 color-danger">Oops! Something went wrong.</h1>
          <p>Either this page doesn't exist or we're experiencing some technical difficulties.</p>
        </div>

        <hr />

        <router-link
          class="button"
          :to="{
            name: 'home'
          }"
        >
          Go Home
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ErrorPage'
  });
</script>
