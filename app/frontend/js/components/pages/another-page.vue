<template>
  <div class="layout layout--vertical-align">
    <div class="section">
      <div class="container center max-width-mobile">
        <h1 class="title title--2">Here's a fancy form.</h1>

        <p>Try submitting something nice.</p>

        <hr />

        <validated-form @submit="myFormSubmitHandler">
          <text-input
            name="email"
            label="Email"
            icon-class="fa-envelope"
            type="email"
            :validations="{
              email: true,
              required: true,
              min: 8
            }"
            v-model="email"
          />

          <text-input
            name="password"
            label="Password"
            icon-class="fa-key"
            :validations="{
              required: true,
              min: 8
            }"
            v-model="password"
          />

          <text-input
            name="passwordConfirm"
            label="Confirm Password"
            icon-class="fa-key"
            :validations="{
              required: true,
              confirmed: '@password'
            }"
            v-model="passwordConfirm"
          />

          <p>
            Field One: {{ email }}
            <br />
            Field Two: {{ password }}
          </p>

          <button class="button" type="submit">Submit</button>

          <br />

          <router-link
            class="link light spacing"
            :to="{
              name: 'home'
            }"
          >
            Cancel
          </router-link>
        </validated-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import timer from '@/helpers/timer';

  export default {
    name: 'AnotherPage',

    setup() {
      const email = ref('');
      const password = ref('');
      const passwordConfirm = ref('');

      async function myFormSubmitHandler(a, b, c) {
        await timer(1000);
        console.log(a, b, c);
      }

      return {
        email,
        password,
        passwordConfirm,
        myFormSubmitHandler
      };
    }
  };
</script>
