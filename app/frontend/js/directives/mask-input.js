const formats = {
  cardNumber: {
    segments: [4, 4, 4, 4],
    separator: ' '
  },

  cardExpiration: {
    segments: [2, 2],
    separator: '/'
  },

  phone: {
    segments: [3, 3, 4],
    separator: '-'
  }
};



function mask(element, type) {
  const isDeleting = element.value.length < element.dataset.oldValue.length;
  let strippedValue = element.value.replace(/[^0-9]/g, '');
  let maskedValue = '';
  let position = 0;
  let format;

  if (typeof type === 'string') {
    format = formats[type];

    // Prepend a "0" to the front of certain inputs (turns 3/12 in to 03/12 automatically):

    if (!isDeleting) {
      if (type === 'cardExpiration') {
        if (strippedValue && strippedValue[0] !== '1' && strippedValue[0] !== '0') {
          strippedValue = `0${strippedValue}`;
        }
      }
    }
  }

  else {
    format = type;
  }

  format.segments.forEach((segment, i) => {
    let characters = strippedValue.substr(position, segment);
    const isLastSegment = (i + 1) === format.segments.length;

    if (characters.length === segment && !isLastSegment) {
      characters += format.separator;
    }

    maskedValue += characters;
    position += segment;
  });

  /*
    When the change is triggered by user deleting characters in input,
    don't leave a trailing separator (example: 303-123-). Constantly
    appending the trailing separator would keep the user from being
    able to delete anything past it due to the separator constantly
    reappearing after every delete attempt:
  */

  if (isDeleting) {
    const lastCharacters = maskedValue.substr(maskedValue.length - format.separator.length, format.separator.length);

    if (lastCharacters === format.separator) {
      maskedValue = maskedValue.substr(0, maskedValue.length - format.separator.length);
    }
  }

  updateValue(element, maskedValue);
}



function updateValue(element, maskedValue) {
  let caretPosition = document.activeElement.selectionEnd;
  const caretIsAtEnd = element.value.length === caretPosition;
  const inputEvent = new Event('input', {
    bubbles: true
  });

  element.value = maskedValue;
  element.dataset.oldValue = maskedValue;

  // if cursor was at end when user changed input, push it to end, else keep it where it was:

  if (document.activeElement === element) {
    if (caretIsAtEnd) {
      caretPosition = element.value.length;
    }

    element.setSelectionRange(caretPosition, caretPosition);
  }

  element.dispatchEvent(inputEvent);
}



const maskInput = {
  componentUpdated(element, binding) {
    element.dataset.oldValue = element.dataset.oldValue || '';

    const type = binding.value;
    const changed = element.dataset.oldValue !== element.value;

    if (changed && type) {
      mask(element, type);
    }
  }
};



export default maskInput;
