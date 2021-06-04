/* ---- Checkbox Input ---- */

export interface CheckboxValidations {
  required?: boolean;
}

/* ---- RadioInput ---- */

export interface RadioOption {
  display: string;
  value: string | number;
}

export interface RadioValidations {
  required?: boolean;
}

/* ---- TextInput ---- */

// https://vee-validate.logaretm.com/v4/guide/global-validators

export interface TextInputValidations {
  alpha?: boolean;
  alpha_dash?: boolean;
  alpha_num?: boolean;
  alpha_spaces?: boolean;
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
