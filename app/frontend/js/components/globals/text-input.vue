<template>
  <div
    class="text-input"
    :class="{
      'text-input--error': !!errorMessage,
      'text-input--has-content': !!value || value === 0,
      'text-input--has-icon': !!iconClass
    }"
  >
    <input class="text-input__input" v-bind="inputAttributes" v-model="value" />

    <label class="text-input__label" :for="inputAttributes.id">
      {{ label }}
    </label>

    <div class="text-input__icon" aria-hidden="true">
      <span :class="['icon', 'fa', iconClass]" v-if="iconClass" />
    </div>

    <p class="text-input__error" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
  import { computed, ref, watch } from 'vue';
  import { useField } from 'vee-validate';

  export default {
    name: 'TextInput',

    props: {
      iconClass: {
        type: String,
        default: null
      },
      label: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      modelValue: {
        type: [String, Number],
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      validations: {
        type: Object,
        default() {
          return {};
        }
      }
    },

    setup(props, { attrs }) {
      const { value, errorMessage } = useField(props.name, props.validations, {
        initialValue: props.modelValue,
        label: props.label
      });

      const inputAttributes = computed(() => {
        const attributes = {
          id: props.name,
          ...attrs,
          'aria-invalid': !!errorMessage.value
        };

        delete attributes.value;

        return attributes;
      });

      return {
        errorMessage,
        inputAttributes,
        value
      };
    }
  };
</script>
