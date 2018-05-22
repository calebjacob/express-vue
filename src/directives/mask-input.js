const formats = {
  creditCard: {
    segments: [4, 4, 4, 4],
    separator: '-'
  },

  phone: {
    segments: [3, 3, 4],
    separator: '-'
  }
};



function mask(element, type) {
  const isDeleting = element.value.length < element.dataset.oldValue.length;
  const strippedValue = element.value.replace(/[^0-9]/g, '');
  let maskedValue = '';
  let position = 0;
  let format;

  if (typeof type === 'string') {
    format = formats[type];
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

  if (isDeleting && maskedValue.substr(maskedValue.length - 1, 1) === format.separator) {
    maskedValue = maskedValue.substr(0, maskedValue.length - 1);
  }

  updateValue(element, maskedValue);
}



function updateValue(element, value) {
  let caretPosition = document.activeElement.selectionEnd;
  const caretIsAtEnd = element.value.length === caretPosition;
  const inputEvent = new Event('input', {
    bubbles: true
  });

  element.value = value;
  element.dataset.oldValue = value;

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

    if (changed) {
      mask(element, type);
    }
  }
};



export default maskInput;
