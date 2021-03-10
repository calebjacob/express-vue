<template>
  <form
    class="form"
    :class="{
      'form--dirty': isDirty,
      'form--disabled': isDisabled,
      'form--submitted': hasSubmitted
    }"
    @change="markAsDirty"
    @input="markAsDirty"
    @submit="submit"
    ref="element"
    novalidate
  >
    <fieldset class="form__wrapper" :disabled="isDisabled || isProcessing">
      <slot />
    </fieldset>
  </form>
</template>

<script>
  import { ref } from 'vue';
  import { useForm } from 'vee-validate';

  export default {
    name: 'ValidatedForm',

    inheritAttrs: false,

    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      isProcessing: {
        type: Boolean,
        default: false
      }
    },

    setup(props, { attrs }) {
      const element = ref(null);
      const hasSubmitted = ref(false);
      const isDirty = ref(false);
      const isSubmitting = ref(false);
      const { validate, values } = useForm();

      function handleInvalidSubmit() {
        console.log('invalid form submit');
        console.log(element);
        // TODO focus first invalid input
      }

      function markAsDirty() {
        isDirty.value = true;
      }

      async function submit(event) {
        event.preventDefault();

        hasSubmitted.value = true;
        isSubmitting.value = true;

        const { valid } = await validate();

        if (valid) {
          await attrs.onSubmit(values);
        } else {
          handleInvalidSubmit();
        }

        isSubmitting.value = false;
      }

      return {
        hasSubmitted,
        isDirty,
        isSubmitting,
        markAsDirty,
        submit
      };
    }
  };
</script>
