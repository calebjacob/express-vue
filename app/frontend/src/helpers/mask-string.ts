export interface MaskStringOptions {
  format: string;
  preFormatter?(newValue: string, previousValue?: string): string;
}

export const defaultMaskOptions = {
  phone: {
    format: 'XXX-XXX-XXXX',
    preFormatter(newValue: string, previousValue: string): string {
      if (previousValue.length === 0) {
        const strippedValue = newValue.replace(/[^0-9]/g, '');
        return strippedValue.substring(strippedValue.length - 10);
      }

      return newValue;
    }
  }
};

export default function maskString(
  newValue: string,
  previousValue: string,
  { format, preFormatter }: MaskStringOptions
): string {
  const isDeleting = previousValue.length > newValue.length;

  if (isDeleting) {
    return newValue;
  }

  let hasRunOutOfCharacters = false;
  let maskedValue = '';
  const maskCharacters = format.split('');
  const valueCharacters = preFormatter ? preFormatter(newValue, previousValue).split('') : newValue.split('');

  for (const mc of maskCharacters) {
    if (mc !== 'X') {
      maskedValue += mc;
    }

    if (hasRunOutOfCharacters) {
      break;
    }

    if (mc === 'X') {
      for (const c of valueCharacters.slice()) {
        valueCharacters.shift();

        if (/[0-9]/.test(c)) {
          maskedValue += c;
          break;
        }
      }
    }

    hasRunOutOfCharacters = valueCharacters.length === 0;
  }

  return maskedValue;
}
