<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <validated-form v-slot="{ validatedForm }" :submit="submit">
          <div class="group">
            <h1 class="title title--2">Create an Account</h1>
          </div>

          <div class="group">
            <div class="bubble layout layout--icon">
              <span class="icon fa fa-lock color-secondary"></span>
              <p class="smaller">
                <b class="color-text-1">The auth service is mocked.</b> To
                register successfully, use "frodo@baggins.com" as the email and
                "the_shire" as the password. To trigger an email conflict, use
                "bilbo@baggins.com" as the email.
              </p>
            </div>
          </div>

          <div class="group">
            <text-input
              v-model="state.fullName"
              name="fullName"
              label="Full Name"
              icon-class="fa-user"
              :validations="{
                required: state.fullNameIsRequired
              }"
            />

            <text-input
              v-model="state.email"
              name="email"
              label="Email"
              icon-class="fa-envelope"
              type="email"
              :validations="{
                email: true,
                required: true
              }"
            />

            <text-input
              v-model="state.password"
              name="password"
              label="Password"
              icon-class="fa-key"
              type="password"
              :validations="{
                min: 8,
                required: true
              }"
            />
          </div>

          <div v-if="state.showFavoriteThing" class="group">
            <p class="title title--5">What's your favorite thing?</p>

            <radio-input
              v-model="state.favoriteThing"
              name="favoriteThing"
              :options="favoriteThingOptions"
              :validations="{
                required: true
              }"
            />
          </div>

          <div class="group">
            <checkbox-input
              v-model="state.acceptedTerms"
              name="acceptedTerms"
              :validations="{
                required: true
              }"
            >
              I agree to the crazy
              <a href="#" class="link">Terms & Conditions</a>
            </checkbox-input>
          </div>

          <hr />

          <div class="group layout layout--horizontal">
            <p>
              Already have an account?
              <router-link
                class="link"
                :to="{
                  name: 'signIn'
                }"
              >
                Sign In
              </router-link>
            </p>

            <button
              class="button button--icon-end"
              :class="{
                'button--loading': validatedForm.isSubmitting
              }"
              type="submit"
            >
              Register
              <span class="icon fa fa-arrow-right" />
            </button>
          </div>

          <hr />

          <div
            class="
              group
              layout layout--horizontal layout--justify-start layout--wrap
            "
          >
            <button
              class="button button--border button--small"
              type="button"
              @click="toggleFavoriteThingQuestion"
            >
              {{ state.showFavoriteThing ? 'Hide' : 'Show' }} Question
            </button>

            <button
              class="button button--border button--small"
              type="button"
              @click="toggleFullNameIsRequired"
            >
              Make Full Name
              {{ state.fullNameIsRequired ? 'Optional' : 'Required' }}
            </button>
          </div>
        </validated-form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { ApiErrorCode } from 'shared/types/api';
  import { defineComponent, ref } from 'vue';
  import { reactive, Ref } from 'vue';
  import { useErrors } from '@/modules/errors';
  import { useRouter } from 'vue-router';
  import { useTheSession } from '@/modules/session';
  import { RadioOption } from '@/types/props';
  import sharedComponents from '@/components/shared';

  export default defineComponent({
    name: 'CreateAccountPage',

    components: {
      ...sharedComponents
    },

    setup() {
      const { createAccount } = useTheSession();
      const { handleError } = useErrors();
      const router = useRouter();

      const state = reactive({
        acceptedTerms: true,
        email: '',
        favoriteThing: '',
        fullName: '',
        fullNameIsRequired: true,
        password: '',
        showFavoriteThing: true
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

      async function submit() {
        try {
          await createAccount({
            email: state.email,
            fullName: state.fullName,
            password: state.password
          });

          router.push({
            name: 'home'
          });
        } catch (error) {
          const { errors } = handleError(error);

          const emailConflictError = errors.find(
            (e) => e.code === ApiErrorCode.EMAIL_CONFLICT
          );

          if (emailConflictError) {
            console.log(
              'Email conflict was detected. Exra logic could be run here to handle this specific error'
            );
          }
        }
      }

      function toggleFavoriteThingQuestion() {
        state.showFavoriteThing = !state.showFavoriteThing;
      }

      function toggleFullNameIsRequired() {
        state.fullNameIsRequired = !state.fullNameIsRequired;
      }

      return {
        favoriteThingOptions,
        state,
        submit,
        toggleFavoriteThingQuestion,
        toggleFullNameIsRequired
      };
    }
  });
</script>
