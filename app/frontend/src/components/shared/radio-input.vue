<template>
  <div
    class="checkbox-input checkbox-input--boxes checkbox-input--radio"
    :class="{
      'checkbox-input--error': !!firstError
    }"
  >
    <div class="checkbox-input__options">
      <div v-for="(option, index) in options" :key="option.value.toString()" class="checkbox-input__option">
        <input class="checkbox-input__input" type="radio" v-bind="inputAttributes(index)" @change="onChange(option)" />

        <label
          class="checkbox-input__label"
          :for="inputAttributes(index).id"
          @click="onLabelClick(option, inputAttributes(index).id, $event)"
        >
          <slot name="option" :option="option">
            <span class="checkbox-input__label-text">
              {{ option.display }}
            </span>
          </slot>
        </label>
      </div>
    </div>

    <p v-if="firstError" class="input-error" role="alert">A selection is required</p>
  </div>
</template>

<script lang="ts" setup>
  import { toRef, watch } from 'vue';
  import { useInputValidation } from '@/modules/form-validation';

  export interface RadioOption {
    description?: string;
    display: string;
    value: string | number | boolean;
  }

  interface RadioValidations extends Record<string, any> {
    required?: boolean;
  }

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number | boolean | null): void;
  }>();

  const props = withDefaults(
    defineProps<{
      modelValue?: string | number | boolean | null;
      name: string;
      options: RadioOption[];
      validations?: RadioValidations;
    }>(),
    {
      modelValue: undefined,
      validations: () => {
        return {};
      }
    }
  );

  const validations = toRef(props, 'validations');

  const { firstError, value } = useInputValidation({
    label: 'Radio',
    initialValue: props.modelValue,
    name: props.name,
    validations
  });

  watch(
    () => props.options,
    (newOptions) => {
      const selectedOption = newOptions.find((option) => {
        return option.value === value.value;
      });
      onChange(selectedOption);
    },
    {
      deep: true
    }
  );

  watch(
    () => props.modelValue,
    (newModelValue) => {
      if (newModelValue !== value.value) {
        value.value = newModelValue;
      }
    }
  );

  function onChange(option: RadioOption | null | undefined) {
    if (option) {
      emit('update:modelValue', option.value);
    } else {
      emit('update:modelValue', null);
    }
  }

  function onLabelClick(option: RadioOption, inputId: string, event: Event) {
    if (option.value === value.value) {
      event.preventDefault();
      onChange(null);
      const input = document.getElementById(inputId);
      if (input) {
        input.focus();
      }
    }
  }

  function inputAttributes(index: number) {
    const option = props.options[index];

    return {
      'aria-invalid': !!firstError.value,
      checked: value.value === option.value ? true : undefined,
      id: `${props.name}_${index}`,
      name: props.name
    };
  }
</script>
