<template>
  <div class="container">
    <h1>Other Page</h1>

    <p>Here's the current date and time: {{ Date.now() | moment('MMM D, YYYY - h:mm A') }}</p>

    <p>Here's a dollar amount: {{ 101.7 | dollars }}</p>



    <h2>Sign In</h2>

    <validated-form name="myForm" :valid-submit="updateUser">
      <text-input type="text" label="Name" name="name" placeholder="Enter your name..." v-model="name" :validations="{
        required: true,
        max: 10
      }" />

      <text-input type="phone" label="Phone" name="phone" placeholder="Enter your phone..." v-model="phone" :validations="{
        required: true
      }" />

      <radio-input label="Age" name="age" :options="[
        {
          display: '20',
          value: 20
        },
        {
          display: '30',
          value: 30
        },
        {
          display: '40',
          value: 40
        },
      ]" v-model="age" :validations="{
        required: true
      }" />

      <p>Age: {{ age }}</p>

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
        age: null,
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
          age: this.age,
          name: this.name,
          phone: this.phone
        });
      }
    }
  };
</script>
