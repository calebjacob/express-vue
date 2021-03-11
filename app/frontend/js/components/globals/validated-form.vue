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
      const element = ref();
      const hasSubmitted = ref(false);
      const isDirty = ref(false);
      const isSubmitting = ref(false);
      const { validate, values } = useForm();

      function handleInvalidSubmit() {
        const firstInvalidInput = element.value.querySelector(
          '[aria-invalid=true]'
        );

        if (firstInvalidInput) {
          firstInvalidInput.focus();
          firstInvalidInput.scrollIntoView({
            block: 'center',
            behavior: 'smooth'
          });
        }
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
        element,
        hasSubmitted,
        isDirty,
        isSubmitting,
        markAsDirty,
        submit
      };
    }
  };
</script>
