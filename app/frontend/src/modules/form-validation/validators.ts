import { ValidatorArgumentRegex, Validators, Value, ValidatorResult } from './types';

export const validators: Validators = {
  email(value: string, argument: boolean): ValidatorResult {
    if (!argument) {
      return null;
    }

    const isValid = /^.+@.+\..+[^.]$/.test(value);
    return isValid ? null : 'Must be a valid email';
  },

  length(value: string, argument: number): ValidatorResult {
    const isValid = value.length === argument;
    return isValid ? null : `Must be ${argument} characters`;
  },

  lengthMax(value: string, argument: number): ValidatorResult {
    const isValid = value.length <= argument;
    return isValid ? null : `Must be ${argument} characters or less`;
  },

  lengthMin(value: string, argument: number): ValidatorResult {
    const isValid = value.length >= argument;
    return isValid ? null : `Must be at least ${argument} characters`;
  },

  max(value: number, argument: number): ValidatorResult {
    const isValid = value <= argument;
    return isValid ? null : `Must be ${argument} or less`;
  },

  min(value: number, argument: number): ValidatorResult {
    const isValid = value >= argument;
    return isValid ? null : `Must be at least ${argument}`;
  },

  numeric(value: string, argument: boolean): ValidatorResult {
    if (!argument) {
      return null;
    }

    const isValid = /^[0-9]+$/.test(value);
    return isValid ? null : 'Must be a number';
  },

  phone(value: string, argument: boolean): ValidatorResult {
    if (!argument) {
      return null;
    }

    const isValid = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value);
    return isValid ? null : 'Must be a valid phone number';
  },

  regex(value: string, argument: ValidatorArgumentRegex): ValidatorResult {
    const isValid = argument.regex.test(value);
    return isValid ? null : argument?.message || 'Format is invalid';
  },

  required(value: Value, argument: boolean): ValidatorResult {
    if (!argument) {
      return null;
    }

    const isValid = !!value || value === 0;
    return isValid ? null : 'Field is required';
  }
};
