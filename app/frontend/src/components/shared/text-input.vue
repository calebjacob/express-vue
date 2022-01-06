<template>
  <div
    class="text-input"
    :class="[
      {
        'text-input--search': props.type === 'search',
        'text-input--no-label': props.type === 'search',
        'text-input--error': !!firstError,
        'text-input--has-content': !!value || value === 0,
        'text-input--has-icon': !!iconClass
      },
      $attrs.class
    ]"
  >
    <input v-bind="inputAttributes" class="text-input__input" @input="inputHandler" />

    <label class="text-input__label" :for="inputAttributes.id">
      {{ label }}
    </label>

    <div class="text-input__icon" aria-hidden="true">
      <span v-if="iconClass" :class="['icon', iconClass]" />
    </div>

    <p v-if="firstError" class="input-error" role="alert">
      {{ firstError.message }}
    </p>
  </div>
</template>

<script lang="ts">
  export default {
    inheritAttrs: false
  };
</script>

<script lang="ts" setup>
  import { useAttrs } from 'vue';
  import { computed, toRef, watch } from 'vue';
  import { useInputValidation } from '@/modules/form-validation';
  import { ValidationOptions } from '@/modules/form-validation/types';
  import maskString, { MaskStringOptions, defaultMaskOptions } from '@/helpers/mask-string';

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | null | undefined): void;
  }>();

  const props = withDefaults(
    defineProps<{
      error?: string;
      iconClass?: string;
      label: string;
      mask?: MaskStringOptions;
      modelValue?: string | number | null;
      name: string;
      type?: string;
      validations?: ValidationOptions;
    }>(),
    {
      error: '',
      iconClass: '',
      mask: undefined,
      modelValue: undefined,
      type: 'text',
      validations: () => {
        return {};
      }
    }
  );

  const attrs = useAttrs();
  const customMask = toRef(props, 'mask');
  let previousInputValue = '';

  const validations = computed(() => {
    let defaultValidations: ValidationOptions = {};

    if (props.type === 'email') {
      defaultValidations = {
        email: true
      };
    } else if (props.type === 'tel') {
      defaultValidations = {
        phone: true
      };
    }

    return {
      ...defaultValidations,
      ...props.validations
    };
  });

  const { firstError, value } = useInputValidation({
    initialValue: props.modelValue,
    label: props.label,
    name: props.name,
    validations
  });

  const inputAttributes = computed(() => {
    return {
      ...attrs,
      'aria-invalid': !!firstError.value,
      class: undefined,
      id: (attrs.id as string) || props.name,
      type: props.type,
      value: value.value
    };
  });

  const mask = computed<MaskStringOptions | null>(() => {
    if (customMask.value) {
      return customMask.value;
    }
    if (props.type === 'tel') {
      return defaultMaskOptions.phone;
    }
    return null;
  });

  watch(
    () => props.modelValue,
    (newModelValue) => {
      if (newModelValue !== value.value) {
        value.value = newModelValue || null;
      }
    }
  );

  function applyMask(newValue: string, previousValue: string): string {
    return mask.value ? maskString(newValue, previousValue, mask.value) : newValue;
  }

  function inputHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    let newValue: string | number | null = input.value;

    if (input.type === 'number') {
      if (!input.value && input.value !== '0') {
        newValue = null;
      } else {
        const numberValue = Number(input.value);
        newValue = isNaN(numberValue) ? null : numberValue;
      }
    } else {
      newValue = applyMask(newValue, previousInputValue);
      previousInputValue = newValue;
      input.value = newValue;
    }

    emit('update:modelValue', newValue);
  }
</script>
