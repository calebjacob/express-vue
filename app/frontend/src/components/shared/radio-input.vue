<template>
  <div
    class="checkbox-input checkbox-input--radio"
    :class="{
      'checkbox-input--error': !!errorMessage
    }"
  >
    <div class="checkbox-input__options">
      <div v-for="(option, index) in options" :key="option.value" class="checkbox-input__option">
        <input class="checkbox-input__input" type="radio" v-bind="inputAttributes(index)" @change="onChange(option)" />

        <label
          class="checkbox-input__label"
          :for="inputAttributes(index).id"
          @click="onLabelClick(option, inputAttributes(index).id, $event)"
        >
          <span class="checkbox-input__label-text">
            {{ option.display }}
          </span>
        </label>
      </div>
    </div>

    <p v-if="errorMessage" class="input-error" role="alert">A selection is required</p>
  </div>
</template>

<script lang="ts" setup>
  import { toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  interface Emit {
    (e: 'update:modelValue', value: string | number | boolean | null): void;
  }

  interface Props {
    modelValue: string | number | boolean | null;
    name: string;
    options: RadioOption[];
    validations?: RadioValidations;
  }

  export interface RadioOption {
    display: string;
    value: string | number;
  }

  interface RadioValidations {
    required?: boolean;
  }

  const emit = defineEmits<Emit>();

  const props = withDefaults(defineProps<Props>(), {
    validations: () => {
      return {};
    }
  });

  const validations = toRef(props, 'validations');
  const { errorMessage, handleChange, value } = useField(props.name, validations, {
    initialValue: props.modelValue,
    validateOnMount: true
  });

  function onChange(option: RadioOption | null | undefined) {
    if (option) {
      handleChange(option.value);
      emit('update:modelValue', option.value);
    } else {
      handleChange(null);
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
      'aria-invalid': !!errorMessage.value,
      checked: value.value === option.value ? true : undefined,
      id: `${props.name}_${index}`,
      name: props.name
    };
  }

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
</script>
