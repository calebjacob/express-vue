<template>
  <div
    class="checkbox-input checkbox-input--radio"
    :class="{
      'checkbox-input--error': !!errorMessage
    }"
  >
    <div class="checkbox-input__options">
      <div
        class="checkbox-input__option"
        v-for="(option, index) in options"
        :key="option.value"
      >
        <input
          class="checkbox-input__input"
          type="radio"
          v-bind="inputAttributes(index)"
          @change="onChange(option)"
        />

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

    <p class="input-error" role="alert" v-if="errorMessage">
      A selection is required
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  interface RadioOption {
    display: string;
    value: string | number | boolean;
  }

  export default defineComponent({
    name: 'RadioInput',

    inheritAttrs: false,

    props: {
      modelValue: {
        required: true
      },
      name: {
        type: String,
        required: true
      },
      options: {
        type: Array as PropType<RadioOption[]>,
        required: true
      },
      validations: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },

    setup(props, { emit }) {
      const modelValue = toRef(props, 'modelValue');
      const options = toRef(props, 'options');
      const { errorMessage, handleChange, value } = useField(
        props.name,
        props.validations,
        {
          initialValue: props.modelValue,
          validateOnMount: true
        }
      );

      function onChange(option: RadioOption | null | undefined) {
        if (option) {
          handleChange(option.value);
          emit('update:modelValue', option.value);
        } else {
          handleChange(null);
          emit('update:modelValue', null);
        }
      }

      function onLabelClick(
        option: RadioOption,
        inputId: string,
        event: Event
      ) {
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
        options,
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

      watch(modelValue, (newModelValue) => {
        if (newModelValue !== value.value) {
          value.value = newModelValue;
        }
      });

      return {
        errorMessage,
        inputAttributes,
        onChange,
        onLabelClick,
        value
      };
    }
  });
</script>
