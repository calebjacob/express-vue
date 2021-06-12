<template>
  <div
    class="text-input"
    :class="[
      {
        'text-input--error': !!errorMessage,
        'text-input--has-content': !!value || value === 0,
        'text-input--has-icon': !!iconClass
      },
      extraClasses
    ]"
  >
    <input v-bind="inputAttributes" ref="input" v-model="value" :type="type" class="text-input__input" />

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
  import { computed, PropType, ref, toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  interface TextInputValidations {
    alpha?: boolean;
    alpha_dash?: boolean;
    alpha_num?: boolean;
    alpha_spaces?: boolean;
    backend_error?: string;
    between?: {
      min: number;
      max: number;
    };
    digits?: number;
    dimensions?: {
      height: number;
      width: number;
    };
    email?: boolean;
    excluded?: Array<string | number | unknown>;
    ext?: Array<string>;
    image?: boolean;
    integer?: boolean;
    is?: string | number | boolean | unknown;
    is_not?: string | number | boolean | unknown;
    length?: number;
    max?: number;
    max_value?: number;
    mimes?: Array<string>;
    min?: number;
    min_value?: number;
    numeric?: boolean;
    one_of?: Array<string | number | unknown>;
    regex?: RegExp;
    required?: boolean;
    size?: number;
    url?: string | boolean;
  }

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
        type: Object as PropType<TextInputValidations>,
        default: () => {
          return {};
        }
      }
    },

    setup(props, { attrs }) {
      const input = ref<HTMLCanvasElement | null>(null);
      const validations = toRef(props, 'validations');

      const { errorMessage, value } = useField(props.name, validations, {
        initialValue: props.modelValue,
        label: `"${props.label}"`,
        validateOnMount: true
      });

      const inputAttributes = computed(() => {
        return {
          ...attrs,
          class: undefined,
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

      return {
        errorMessage,
        extraClasses: attrs.class,
        input,
        inputAttributes,
        value
      };
    }
  });
</script>
