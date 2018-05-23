const dropDown = {
  bind(element, binding) {
    const options = binding.value;

    function close() {
      element.classList.remove(options.class);

      document.removeEventListener('click', close);

      setTimeout(() => {
        element.addEventListener('click', open);
      });
    }

    function open() {
      element.classList.add(options.class);
      element.removeEventListener('click', open);

      setTimeout(() => {
        document.addEventListener('click', close);
      });
    }

    element.addEventListener('click', open);
  }
};



export default dropDown;
