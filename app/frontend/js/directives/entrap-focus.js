const entrapFocus = {
  inserted(element) {
    const inputToAutoFocus = element.querySelector('a, button, input, select, textarea, [tabindex]');

    inputToAutoFocus.focus();

    element.addEventListener('keydown', (event) => {
      if (event.keyCode === 9) {
        const inputs = element.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstInput = inputs[0];
        const lastInput = inputs[inputs.length - 1];

        if (event.shiftKey && event.target === firstInput) {
          event.preventDefault();
          lastInput.focus();
        }

        else if (!event.shiftKey && event.target === lastInput) {
          event.preventDefault();
          firstInput.focus();
        }
      }
    }, true);
  }
};



export default entrapFocus;
