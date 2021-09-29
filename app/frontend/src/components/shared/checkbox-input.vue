<template>
  <div
    class="checkbox-input"
    :class="{
      'checkbox-input--error': !!errorMessage
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

    <p v-if="errorMessage" class="input-error" role="alert">This checkbox is required</p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  interface CheckboxValidations {
    required?: boolean;
  }

  interface Emit {
    (e: 'update:modelValue', value: boolean | null): void;
  }

  interface Props {
    modelValue: boolean | null;
    name: string;
    validations?: CheckboxValidations;
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

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    handleChange(target.checked);
    emit('update:modelValue', value.value);
  }

  const inputAttributes = computed(() => {
    return {
      'aria-invalid': !!errorMessage.value,
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
</script>
