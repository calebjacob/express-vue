<template>
  <div
    class="text-input"
    :class="[
      {
        'text-input--error': !!errorMessage,
        'text-input--has-content': !!value || value === 0,
        'text-input--has-icon': !!iconClass
      },
      $attrs.class
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
  export default {
    inheritAttrs: false
  };
</script>

<script lang="ts" setup>
  import { useAttrs } from 'vue';
  import { computed, ref, toRef, watch } from 'vue';
  import { useField } from 'vee-validate';

  interface Props {
    error?: string;
    iconClass?: string;
    label: string;
    modelValue: string | number | null;
    name: string;
    type?: string;
    validations?: TextInputValidations;
  }

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

  const props = withDefaults(defineProps<Props>(), {
    error: '',
    iconClass: '',
    type: 'text',
    validations: () => {
      return {};
    }
  });

  const attrs = useAttrs();
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
</script>
