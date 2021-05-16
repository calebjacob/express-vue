<template>
  <form
    ref="element"
    class="form"
    :class="{
      'form--dirty': form.isDirty,
      'form--disabled': form.isDisabled,
      'form--submitted': form.hasSubmitted
    }"
    novalidate
    @change="markAsDirty"
    @input="markAsDirty"
    @submit.prevent="submitHandler"
  >
    <fieldset
      class="form__wrapper"
      :disabled="form.isDisabled || form.isSubmitting"
    >
      <slot :validated-form="form" />
    </fieldset>
  </form>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { ref, reactive } from 'vue';
  import { useForm } from 'vee-validate';

  export default defineComponent({
    name: 'ValidatedForm',

    inheritAttrs: false,

    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      submit: {
        type: Function,
        required: true
      }
    },

    setup(props) {
      const element = ref();
      const form = reactive({
        hasSubmitted: false,
        isDirty: false,
        isDisabled: false,
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

      async function submitHandler() {
        form.hasSubmitted = true;
        form.isSubmitting = true;

        const { valid } = await validate();

        if (valid) {
          await props.submit(values);
        } else {
          handleInvalidSubmit();
        }

        form.isSubmitting = false;
      }

      return {
        element,
        form,
        markAsDirty,
        submitHandler
      };
    }
  });
</script>
