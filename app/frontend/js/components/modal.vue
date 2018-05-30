<template>
  <transition name="modal" v-if="isOpen">
    <div class="modal" :class="{
      'modal--compact': modalStyle === 'compact'
    }">
      <div class="layout layout--vertical-align" v-entrap-focus>
        <div class="layout__primary">
          <div class="container">
            <button class="modal__close" type="button" @click="$closeModal(name)">Close</button>

            <div class="modal__wrapper">
              <slot/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>



<script>
  import events from '@/services/events';



  export default {
    name: 'Modal',

    props: {
      modalStyle: {
        type: String,
        default: null
      },

      name: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        isOpen: false
      };
    },

    created() {
      events.$on(`modals:close:${this.name}`, this.close);
      events.$on(`modals:open:${this.name}`, this.open);
    },

    destroyed() {
      events.$off(`modals:close:${this.name}`);
      events.$off(`modals:open:${this.name}`);
    },

    mounted() {
      document.body.appendChild(this.$el);
    },

    methods: {
      close() {
        this.isOpen = false;

        document.body.style.overflow = '';
      },

      focusFirstInput() {
        this.$nextTick(() => {
          const allInputs = this.$el.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const firstInput = allInputs[1]; // the first input after the default modal close button

          if (firstInput) {
            firstInput.focus();
          }
        });
      },

      open() {
        const vm = this;

        this.isOpen = true;

        function closeModalOnEscapeKeyUp(event) {
          if (event.keyCode === 27) {
            document.removeEventListener('keyup', closeModalOnEscapeKeyUp);
            vm.close(vm.name);
          }
        }

        document.body.style.overflow = 'hidden';

        document.addEventListener('keyup', closeModalOnEscapeKeyUp);

        this.focusFirstInput();
      }
    }
  };
</script>
