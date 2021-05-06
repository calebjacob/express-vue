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

    <p class="input-error" role="alert" v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { computed, toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  export default defineComponent({
    name: 'TextInput',

    inheritAttrs: false,

    props: {
      iconClass: {
        type: String,
        default: null
      },
      label: {
        type: String,
        required: true
      },
      modelValue: {
        type: [String, Number],
        required: true
      },
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      validations: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },

    setup(props, { attrs }) {
      const modelValue = toRef(props, 'modelValue');
      const { errorMessage, value } = useField(props.name, props.validations, {
        initialValue: props.modelValue,
        label: `"${props.label}"`,
        validateOnMount: true
      });

      const inputAttributes = computed(() => {
        return {
          ...attrs,
          'aria-invalid': !!errorMessage.value,
          id: attrs.id || props.name
        };
      });

      watch(modelValue, (newModelValue) => {
        if (newModelValue !== value.value) {
          value.value = newModelValue;
        }
      });

      return {
        errorMessage,
        inputAttributes,
        value
      };
    }
  });
</script>
