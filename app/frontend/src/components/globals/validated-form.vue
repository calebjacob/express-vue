<template>
  <form
    class="form"
    :class="{
      'form--dirty': form.isDirty,
      'form--disabled': form.isDisabled,
      'form--submitted': form.hasSubmitted
    }"
    @change="markAsDirty"
    @input="markAsDirty"
    @submit.prevent="submit"
    ref="element"
    novalidate
  >
    <fieldset
      class="form__wrapper"
      :disabled="form.isDisabled || form.isProcessing"
    >
      <slot :validated-form="form" />
    </fieldset>
  </form>
</template>

<script>
  import { ref, reactive } from 'vue';
  import { useForm } from 'vee-validate';

  export default {
    name: 'ValidatedForm',

    inheritAttrs: false,

    props: {
      isDisabled: {
        type: Boolean,
        default: false
      }
    },

    setup(props, { attrs }) {
      const element = ref();
      const form = reactive({
        hasSubmitted: false,
        isDirty: false,
        isSubmitting: false
      });
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
        form.isDirty = true;
      }

      async function submit() {
        form.hasSubmitted = true;
        form.isSubmitting = true;

        const { valid } = await validate();

        if (valid) {
          await attrs.onSubmit(values);
        } else {
          handleInvalidSubmit();
        }

        form.isSubmitting = false;
      }

      return {
        element,
        form,
        markAsDirty,
        submit
      };
    }
  };
</script>
