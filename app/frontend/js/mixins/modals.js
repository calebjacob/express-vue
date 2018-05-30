import events from '@/services/events';



const modals = {
  methods: {
    $closeModal(name) {
      events.$emit(`modals:close:${name}`);
    },

    $openModal(name) {
      events.$emit(`modals:open:${name}`);
    }
  }
};



export default modals;
