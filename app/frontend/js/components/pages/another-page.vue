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
            v-model="userDetails.email"
          />

          <text-input
            name="password"
            label="Password"
            icon-class="fa-key"
            :validations="{
              required: true,
              min: 8
            }"
            v-model="userDetails.password"
          />

          <radio-input
            name="favoriteThing"
            v-model="userDetails.favoriteThing"
            :options="favoriteThingOptions"
            :validations="{
              required: true
            }"
          />

          <checkbox-input
            name="acceptedTerms"
            v-model="userDetails.acceptedTerms"
            :validations="{
              required: true
            }"
          >
            I agree to the crazy terms.
          </checkbox-input>

          <hr />

          <p>Email: {{ userDetails.email }}</p>
          <p>Password: {{ userDetails.password }}</p>
          <p>Favorite Thing: {{ userDetails.favoriteThing }}</p>
          <p>Accepted Terms: {{ userDetails.acceptedTerms }}</p>

          <hr />

          <button class="button" type="submit">Submit</button>

          <br />

          <router-link
            class="link spacing"
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
  import { onMounted, ref, reactive } from 'vue';
  import timer from '@/helpers/timer';

  export default {
    name: 'AnotherPage',

    setup() {
      const userDetails = reactive({
        acceptedTerms: false,
        email: '',
        favoriteThing: '',
        password: ''
      });

      const favoriteThingOptions = ref([
        {
          display: 'Broncos',
          value: 'broncos'
        },
        {
          display: 'Food',
          value: 'food'
        },
        {
          display: 'Family',
          value: 'family'
        }
      ]);

      async function myFormSubmitHandler(values) {
        console.log('Submit start...', values);
        await timer(1000);
        console.log('Submit finish!');
      }

      // onMounted(async () => {
      //   await timer(2000);
      //   userDetails.email = 'asdf@asdf.com';
      //   userDetails.acceptedTerms = true;
      //   userDetails.favoriteThing = 'food';
      // });

      return {
        favoriteThingOptions,
        myFormSubmitHandler,
        userDetails
      };
    }
  };
</script>
