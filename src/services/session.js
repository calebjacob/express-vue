import events from '@/services/events';
import storage from '@/services/storage';



const session = {
  reset() {
    this.user.set(null);
  },


  user: {
    get() {
      return storage.local.get('user');
    },

    set(user) {
      storage.local.set('user', user);

      events.$emit('session:update:user', {
        user
      });
    }
  }
};



export default session;
