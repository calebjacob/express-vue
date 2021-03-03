<template>
  <p>This is an example component! Here's some text: {{ someText }}</p>
</template>



<script>
  export default {
    name: 'MyExample',

    props: {
      someText: {
        type: String,
        required: true
      }
    }
  }
</script>
