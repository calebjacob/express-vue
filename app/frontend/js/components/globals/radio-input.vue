<template>
  <div class="checkbox-input checkbox-input--radio">
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

        <label class="checkbox-input__label" :for="inputAttributes(index).id">
          <span class="checkbox-input__label-text">
            {{ option.display }}
          </span>
        </label>
      </div>
    </div>
  </div>

  <p class="checkbox-input__error">
    {{ errorMessage }}
  </p>
</template>

<script>
  import { toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  export default {
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
        type: Array,
        required: true
      },
      validations: {
        type: Object,
        default() {
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

      function onChange(option) {
        if (option) {
          handleChange(option.value);
          emit('update:modelValue', option.value);
        } else {
          handleChange(null);
          emit('update:modelValue', null);
        }
      }

      function inputAttributes(index) {
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
        newOptions => {
          const selectedOption = newOptions.find(option => {
            return option.value === value.value;
          });
          onChange(selectedOption);
        },
        {
          deep: true
        }
      );

      watch(modelValue, newModelValue => {
        if (newModelValue !== value.value) {
          value.value = newModelValue;
        }
      });

      return {
        errorMessage,
        inputAttributes,
        onChange,
        value
      };
    }
  };
</script>
