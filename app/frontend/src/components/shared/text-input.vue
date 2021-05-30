<template>
  <div
    class="text-input"
    :class="{
      'text-input--error': !!errorMessage,
      'text-input--has-content': !!value || value === 0,
      'text-input--has-icon': !!iconClass
    }"
  >
    <input
      v-bind="inputAttributes"
      ref="input"
      v-model="value"
      :type="type"
      class="text-input__input"
    />

    <label class="text-input__label" :for="inputAttributes.id">
      {{ label }}
    </label>

    <div class="text-input__icon" aria-hidden="true">
      <span v-if="iconClass" :class="['icon', 'fa', iconClass]" />
    </div>

    <p v-if="errorMessage" class="input-error" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { computed, nextTick, ref, watch } from 'vue';
  import { useField } from 'vee-validate';

  export default defineComponent({
    name: 'TextInput',

    inheritAttrs: false,

    props: {
      error: {
        type: String,
        default: null
      },
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
      const input = ref<HTMLCanvasElement | null>(null);

      const { errorMessage, setErrors, value } = useField(
        props.name,
        props.validations,
        {
          initialValue: props.modelValue,
          label: `"${props.label}"`,
          validateOnMount: true
        }
      );

      const inputAttributes = computed(() => {
        return {
          ...attrs,
          'aria-invalid': !!errorMessage.value,
          id: (attrs.id as string) || props.name
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

      watch(
        () => props.error,
        async (error) => {
          if (error) {
            await nextTick(); // NOTE: Without waiting 2 ticks, the form would still be disabled and the focus() wouldn't work
            await nextTick();

            setErrors(error);

            if (input.value) {
              input.value.focus();
            }
          }
        }
      );

      return {
        errorMessage,
        input,
        inputAttributes,
        value
      };
    }
  });
</script>
