import { ComputedRef, InjectionKey, Ref } from 'vue';

// Modules

export interface FormValidationModule {
  registerInput(options: RegisterInputOptions): void;
  unregisterInput(name: string): void;
  validate(): Promise<FormValidateResponse>;
}

export interface InputValidationModule {
  errors: Ref<ValidationError[]>;
  firstError: ComputedRef<ValidationError | null>;
  value: Ref<Value>;
}

export interface InputValidationModuleOptions {
  initialValue: Value;
  label: string;
  name: string;
  validations: Ref<ValidationOptions>;
}

// Other

export interface FormValidateResponse {
  isValid: boolean;
  values: Record<string, any>;
}

export interface RegisterInputOptions {
  name: string;
  validate(): Promise<ValidationError[]>;
  value: Ref<Value>;
}

export type Value = string | number | boolean | null | undefined;

export interface ValidationOptions {
  email?: boolean;
  length?: number;
  lengthMax?: number;
  lengthMin?: number;
  max?: number;
  min?: number;
  numeric?: boolean;
  phone?: boolean;
  regex?: ValidatorArgumentRegex;
  required?: boolean;
}

export interface ValidationError {
  message: string;
  name: string;
  type: string;
}

export interface ValidatorArgumentRegex {
  regex: RegExp;
  message?: string;
}

export type ValidatorResult = Promise<string | null> | string | null;

export interface Validators {
  email(value: Value, argument: any): ValidatorResult;
  length(value: Value, argument: any): ValidatorResult;
  lengthMax(value: Value, argument: any): ValidatorResult;
  lengthMin(value: Value, argument: any): ValidatorResult;
  max(value: Value, argument: any): ValidatorResult;
  min(value: Value, argument: any): ValidatorResult;
  numeric(value: Value, argument: any): ValidatorResult;
  phone(value: Value, argument: any): ValidatorResult;
  regex(value: Value, argument: any): ValidatorResult;
  required(value: Value, argument: any): ValidatorResult;
}

export const FormValidationModuleKey: InjectionKey<FormValidationModule> = Symbol('FormValidationModule');
