<template>
  <div class="container">
    <h1>404</h1>

    <p>Oops! How'd you get here?</p>

    <router-link class="button" :to="{
      name: 'home'
    }">Go Home</router-link>
  </div>
</template>



<script>
  export default {
    name: '404',

    metaInfo() {
      return {
        title: '404'
      };
    }
  };
</script>
