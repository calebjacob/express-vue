<template>
  <div class="layout layout--vertical-align">
    <div class="container center">
      <h1 class="title title--1 primary">Express Your Vue</h1>
      <p class="bigger">Can't beat that new car smell. Time to get coding!</p>
      
      <hr>

      <my-example some-text="hot dog" />

      <router-link class="button button--auto-width" :to="{
        name: 'another'
      }">
        View Another Page
      </router-link>
    </div>
  </div>
</template>



<script>
  export default {
    name: 'HomePage'
  };
</script>
