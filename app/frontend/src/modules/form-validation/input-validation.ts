import {
  InputValidationModule,
  InputValidationModuleOptions,
  FormValidationModuleKey,
  Validators,
  ValidationError
} from './types';
import { computed, ref, watch, onBeforeUnmount, inject } from 'vue';
import { validators } from './validators';

export function useInputValidation(options: InputValidationModuleOptions): InputValidationModule {
  const formValidation = inject(FormValidationModuleKey, null);

  const errors = ref<ValidationError[]>([]);
  const value = ref(options.initialValue);

  const firstError = computed(() => {
    return errors.value.length > 0 ? errors.value[0] : null;
  });

  if (formValidation) {
    formValidation.registerInput({
      name: options.name,
      validate,
      value
    });
  }

  validate();

  watch(value, () => {
    validate();
  });

  watch(options.validations, () => {
    validate();
  });

  onBeforeUnmount(() => {
    if (formValidation) {
      formValidation.unregisterInput(options.name);
    }
  });

  async function validate(): Promise<ValidationError[]> {
    const newValue = value.value;
    const collectedErrors: ValidationError[] = [];

    for (const [validatorKey, argument] of Object.entries(options.validations.value)) {
      const validator = validators[validatorKey as keyof Validators];

      if (newValue || newValue === 0 || validatorKey === 'required') {
        const errorMessage = await validator(newValue, argument);

        if (errorMessage) {
          collectedErrors.push({
            message: errorMessage,
            name: options.name,
            type: validatorKey
          });
        }
      }
    }

    errors.value = collectedErrors;

    return collectedErrors;
  }

  return {
    errors,
    firstError,
    value
  };
}
