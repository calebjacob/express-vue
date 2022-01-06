<template>
  <form
    ref="formElement"
    class="form"
    :class="{
      'form--dirty': form.isDirty,
      'form--submitted': form.hasSubmitted
    }"
    novalidate
    @change="markAsDirty"
    @input="markAsDirty"
    @submit.prevent="submitForm"
  >
    <fieldset class="form__wrapper" :disabled="form.isSubmitting">
      <slot :form="form" :validate-form="validateForm" />
    </fieldset>
  </form>
</template>

<script lang="ts">
  import { InjectionKey } from 'vue';

  interface ValidatedForm {
    hasSubmitted: boolean;
    isDirty: boolean;
    isSubmitting: boolean;
  }

  export const ValidatedFormKey: InjectionKey<ValidatedForm> = Symbol('ValidatedForm');
</script>

<script lang="ts" setup>
  import { nextTick, provide, ref, reactive } from 'vue';
  import { useTheNotifications } from '@/modules/notifications';
  import { useErrors } from '@/modules/errors';
  import { useFormValidation } from '@/modules/form-validation';
  import { FormValidateResponse } from '@/modules/form-validation/types';

  const props = withDefaults(
    defineProps<{
      submit(values?: Record<string, unknown>): Promise<void>;
    }>(),
    {}
  );

  const form = reactive<ValidatedForm>({
    hasSubmitted: false,
    isDirty: false,
    isSubmitting: false
  });
  const { handleError } = useErrors();
  const { validate } = useFormValidation();
  const { closeAllErrorNotifications } = useTheNotifications();
  const formElement = ref();

  provide(ValidatedFormKey, form);

  async function handleInvalidForm() {
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();

    // NOTE: Waiting 5 ticks ensures that the DOM will be updated in time to focus the correct input

    const firstInvalidInput = formElement.value.querySelector('[aria-invalid=true]');

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

  async function submitForm() {
    closeAllErrorNotifications();

    form.hasSubmitted = true;
    form.isSubmitting = true;

    const { isValid, values } = await validateForm();

    if (isValid) {
      try {
        await props.submit(values);
      } catch (error) {
        handleError(error);
      } finally {
        form.isSubmitting = false;
      }
    }

    form.isSubmitting = false;
  }

  async function validateForm(): Promise<FormValidateResponse> {
    const result = await validate();

    if (!result.isValid) {
      handleInvalidForm();
    }

    return result;
  }
</script>
