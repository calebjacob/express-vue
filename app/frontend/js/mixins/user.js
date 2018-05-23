import events from '@/services/events';
import session from '@/services/session';



const user = {
  created() {
    this.$getUser();

    events.$on('session:update:user', (event) => {
      this.global__user = event.user;
    });
  },

  computed: {
    $user: {
      get() {
        return this.global__user;
      }
    }
  },

  data() {
    return {
      global__user: null
    };
  },

  methods: {
    $getUser() {
      this.global__user = session.user.get();
    }
  }
};



export default user;
