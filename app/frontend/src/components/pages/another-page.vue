<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <validated-form
          :submit="myFormSubmitHandler"
          v-slot="{ validatedForm }"
        >
          <div class="group center">
            <h1 class="title title--2">Here's a fancy form.</h1>
          </div>

          <hr />

          <div class="group">
            <text-input
              name="email"
              label="Email"
              icon-class="fa-envelope"
              type="email"
              :validations="{
                email: true,
                required: true
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
          </div>

          <div class="group">
            <template v-if="userDetails.favoriteThingShow">
              <p class="title title--5">What's your favorite thing?</p>

              <radio-input
                name="favoriteThing"
                v-model="userDetails.favoriteThing"
                :options="favoriteThingOptions"
                :validations="{
                  required: true
                }"
              />
            </template>

            <button
              class="link primary spacing"
              type="button"
              @click="toggleFavoriteThingQuestion"
            >
              {{ userDetails.favoriteThingShow ? 'Hide' : 'Show' }} Question
            </button>
          </div>

          <div class="group">
            <p class="title title--5">Terms & Conditions</p>
            <checkbox-input
              name="acceptedTerms"
              v-model="userDetails.acceptedTerms"
              :validations="{
                required: true
              }"
            >
              I agree to the crazy terms.
            </checkbox-input>
          </div>

          <hr />

          <div class="group layout layout--horizontal">
            <router-link
              class="link primary spacing"
              :to="{
                name: 'home'
              }"
            >
              Cancel
            </router-link>

            <button
              class="button"
              :class="{
                'button--loading': validatedForm.isSubmitting
              }"
              type="submit"
            >
              Submit
              <span class="icon fa fa-arrow-right"></span>
            </button>
          </div>
        </validated-form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import timer from '@/helpers/timer';
  import { RadioOption } from '@/components/globals/radio-input.vue';
  import { defineComponent } from 'vue';
  import { ref, Ref, reactive } from 'vue';

  export default defineComponent({
    name: 'AnotherPage',

    setup() {
      const userDetails = reactive({
        acceptedTerms: false,
        email: '',
        favoriteThing: '',
        favoriteThingShow: true,
        password: ''
      });

      const favoriteThingOptions: Ref<RadioOption[]> = ref([
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

      async function myFormSubmitHandler(values: Record<string, any>) {
        await timer(1000);
        window.alert(JSON.stringify(values));
      }

      function toggleFavoriteThingQuestion() {
        userDetails.favoriteThingShow = !userDetails.favoriteThingShow;
      }

      return {
        favoriteThingOptions,
        myFormSubmitHandler,
        toggleFavoriteThingQuestion,
        userDetails
      };
    }
  });
</script>
