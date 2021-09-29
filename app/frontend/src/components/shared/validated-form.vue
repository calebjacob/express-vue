<template>
  <form
    ref="element"
    class="form"
    :class="{
      'form--dirty': form.isDirty,
      'form--submitted': form.hasSubmitted
    }"
    novalidate
    @change="markAsDirty"
    @input="markAsDirty"
    @submit.prevent="submitHandler"
  >
    <fieldset class="form__wrapper" :disabled="form.isSubmitting">
      <slot :validated-form="form" />
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { nextTick, ref, reactive } from 'vue';
  import { useForm } from 'vee-validate';
  import { useTheNotifications } from '@/modules/notifications';

  interface Props {
    submit(values?: Record<string, any>): Promise<void>;
  }

  const props = defineProps<Props>();

  const element = ref();
  const form = reactive({
    hasSubmitted: false,
    isDirty: false,
    isSubmitting: false
  });
  const { validate, values } = useForm();
  const { closeAllErrorNotifications } = useTheNotifications();

  async function handleInvalidSubmit() {
    await nextTick(); // NOTE: Without waiting a tick, the form would still be disabled and the focus() wouldn't work

    const firstInvalidInput = element.value.querySelector('[aria-invalid=true]');

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
    closeAllErrorNotifications();

    form.hasSubmitted = true;
    form.isSubmitting = true;

    const { valid } = await validate();

    if (valid) {
      await props.submit(values);
      form.isSubmitting = false;
    } else {
      form.isSubmitting = false;
      handleInvalidSubmit();
    }
  }
</script>
