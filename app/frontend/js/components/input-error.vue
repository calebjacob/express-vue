<template>
  <p class="input-error" :class="{
    'input-error--after-submit-attempt': afterSubmitAttempt
  }" v-if="error">{{ error }}</p>
</template>



<script>
  export default {
    name: 'InputError',

    props: {
      afterSubmitAttempt: {
        type: Boolean,
        default: false
      },

      error: {
        type: String,
        default: null
      }
    }
  };
</script>
