<template>
  <div
    class="checkbox-input"
    :class="{
      'checkbox-input--error': !!firstError
    }"
  >
    <div class="checkbox-input__option">
      <input class="checkbox-input__input" type="checkbox" v-bind="inputAttributes" @change="onChange" />

      <label class="checkbox-input__label" :for="inputAttributes.id">
        <span class="checkbox-input__label-text">
          <slot />
        </span>
      </label>
    </div>

    <p v-if="firstError" class="input-error" role="alert">This checkbox is required</p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRef, watch } from 'vue';
  import { useInputValidation } from '@/modules/form-validation';

  interface CheckboxValidations extends Record<string, any> {
    required?: boolean;
  }

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean | null): void;
  }>();

  const props = withDefaults(
    defineProps<{
      modelValue?: boolean | null;
      name: string;
      validations?: CheckboxValidations;
    }>(),
    {
      modelValue: undefined,
      validations: () => {
        return {};
      }
    }
  );

  const validations = toRef(props, 'validations');

  const inputAttributes = computed(() => {
    return {
      'aria-invalid': !!firstError.value,
      checked: value.value ? true : undefined,
      id: props.name
    };
  });

  watch(
    () => props.modelValue,
    (newModelValue) => {
      if (newModelValue !== value.value) {
        value.value = newModelValue;
      }
    }
  );

  const { firstError, value } = useInputValidation({
    label: 'Checkbox',
    initialValue: props.modelValue,
    name: props.name,
    validations
  });

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
  }
</script>
