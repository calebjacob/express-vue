<template>
  <div class="container">
    <h1>Other Page</h1>

    <p>Here's the current date and time: {{ Date.now() | moment('MMM D, YYYY - h:mm A') }}</p>

    <p>Here's a dollar amount: {{ 101.7 | dollars }}</p>



    <h2>Sign In</h2>

    <validated-form name="myForm" :valid-submit="updateUser">
      <label class="label" for="name">Name</label>

      <input class="text-input" type="text" name="name" id="name" placeholder="Name..." v-model="name" v-validate="{
        required: true,
        max: 10
      }">

      <p>{{ errors.first('myForm.name') }}</p>

      <label class="label" for="phone">Phone</label>

      <input class="text-input" type="phone" name="phone" id="phone" placeholder="Phone number..." v-model="phone" v-mask-input="'phone'" v-validate="{
        required: true
      }">

      <p>{{ errors.first('myForm.phone') }}</p>

      <button class="button" type="submit">Submit</button>
    </validated-form>



    <h2>User</h2>

    <div v-if="$user">
      <p>{{ $user }}</p>

      <button class="button" type="button" @click="resetUser">Reset</button>
    </div>

    <p v-else>Not signed in yet.</p>
  </div>
</template>



<script>
  import session from '@/services/session';



  export default {
    name: 'OtherPage',

    metaInfo() {
      return {
        title: 'Other Page'
      };
    },

    data() {
      return {
        name: null,
        phone: null
      };
    },

    methods: {
      resetUser() { // TEST
        session.reset();
      },

      updateUser() { // TEST
        session.user.set({
          name: this.name,
          phone: this.phone
        });
      }
    }
  };
</script>
