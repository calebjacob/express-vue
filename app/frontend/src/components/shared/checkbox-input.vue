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

<script lang="ts">
  import { CheckboxValidations } from '@/types/props';
  import { computed, defineComponent, PropType, toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  export default defineComponent({
    name: 'CheckboxInput',

    props: {
      modelValue: {
        type: Boolean,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      validations: {
        type: Object as PropType<CheckboxValidations>,
        default: () => {
          return {};
        }
      }
    },

    emits: ['update:modelValue'],

    setup(props, { emit }) {
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

      return {
        errorMessage,
        inputAttributes,
        onChange,
        value
      };
    }
  });
</script>
