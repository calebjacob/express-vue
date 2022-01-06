import logger from '@/services/logger';
import { provide } from 'vue';
import {
  FormValidationModule,
  FormValidationModuleKey,
  FormValidateResponse,
  RegisterInputOptions,
  ValidationError
} from './types';

export function useFormValidation(): FormValidationModule {
  let inputs: RegisterInputOptions[] = [];

  function registerInput(input: RegisterInputOptions) {
    inputs.push(input);
  }

  function unregisterInput(name: string) {
    inputs = inputs.filter((input) => {
      return input.name !== name;
    });
  }

  async function validate(): Promise<FormValidateResponse> {
    let formErrors: ValidationError[] = [];
    const values: Record<string, any> = {};

    for (const input of inputs) {
      const inputErrors = await input.validate();
      formErrors = [...formErrors, ...inputErrors];
      values[input.name] = input.value.value;
    }

    const isValid = formErrors.length === 0;

    if (!isValid) {
      logger.info('❌ Invalid Form:', {
        formErrors,
        values
      });
    }

    return {
      isValid,
      values
    };
  }

  const module = {
    registerInput,
    unregisterInput,
    validate
  };

  provide(FormValidationModuleKey, module);

  return module;
}
