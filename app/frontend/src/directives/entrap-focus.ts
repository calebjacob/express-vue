import { Directive, DirectiveBinding } from 'vue';

const entrapFocus: Directive = {
  beforeMount(element: HTMLElement, binding: DirectiveBinding): void {
    if (binding.value === false) {
      element.setAttribute('data-entrap', 'false');
    } else {
      element.setAttribute('data-entrap', 'true');
    }
  },

  mounted(element: HTMLElement): void {
    const inputSelector =
      'a, button:not([disabled]):not([tabindex="-1"]), input:not([type="hidden"]):not([disabled]):not([readonly]):not([tabindex="-1"]), textarea:not([type="hidden"]):not([disabled]):not([readonly]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

    function keyDownHandler(event: KeyboardEvent) {
      const shouldEntrap = element.getAttribute('data-entrap') === 'true';

      if (!shouldEntrap) {
        return;
      }

      if (event.key === 'Tab') {
        const allInputs = element.querySelectorAll<HTMLInputElement>(inputSelector);
        const visibleInputs: HTMLInputElement[] = [];
        let needsToBringFocusInside = true;

        for (let i = 0; i < allInputs.length; i++) {
          if (allInputs[i].clientHeight > 0) {
            visibleInputs.push(allInputs[i]);
          }
        }

        for (let i = 0; i < visibleInputs.length; i++) {
          if (document.activeElement && document.activeElement.isEqualNode(visibleInputs[i])) {
            needsToBringFocusInside = false;
            break;
          }
        }

        if (needsToBringFocusInside) {
          visibleInputs[0].focus();
          event.preventDefault();
        } else {
          const firstInput = visibleInputs[0];
          const lastInput = visibleInputs[visibleInputs.length - 1];

          if (event.shiftKey && event.target === firstInput) {
            event.preventDefault();
            lastInput.focus();
          } else if (!event.shiftKey && event.target === lastInput) {
            event.preventDefault();
            firstInput.focus();
          }
        }
      }
    }

    const $element = element as any;
    $element.$keyDownHandler = keyDownHandler;

    document.addEventListener('keydown', keyDownHandler, true);
  },

  unmounted(element: HTMLElement): void {
    const $element = element as any;
    document.removeEventListener('keydown', $element.$keyDownHandler, true);
  },

  updated(element: HTMLElement, binding: DirectiveBinding): void {
    if (binding.value === false) {
      element.setAttribute('data-entrap', 'false');
    } else {
      element.setAttribute('data-entrap', 'true');
    }
  }
};

export default entrapFocus;
