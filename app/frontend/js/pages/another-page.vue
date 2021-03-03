<template>
  <div class="layout layout--vertical-align">
    <div class="container center">
      <h1 class="title title--2">This is another page.</h1>

      <router-link class="link primary" :to="{
        name: 'home'
      }">
        Go Back
      </router-link>
    </div>
  </div>
</template>



<script>
  export default {
    name: 'AnotherPage'
  };
</script>
