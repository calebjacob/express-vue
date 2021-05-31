<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <validated-form v-slot="{ validatedForm }" :submit="submit">
          <div class="group">
            <h1 class="title title--2">Create an Account</h1>

            <div class="bubble layout layout--icon">
              <span class="icon fa fa-info"></span>
              <p class="smaller">
                <b>The auth service is mocked.</b> To register successfully, use
                "frodo@baggins.com" as the email and "the_shire" as the
                password. To trigger an email conflict, use "bilbo@baggins.com"
                as the email.
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
                required: true
              }"
            />

            <text-input
              v-model="state.email"
              name="email"
              label="Email"
              icon-class="fa-envelope"
              type="email"
              :error="state.emailError"
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

          <div class="group">
            <template v-if="state.showFavoriteThing">
              <p class="title title--5">What's your favorite thing?</p>

              <radio-input
                v-model="state.favoriteThing"
                name="favoriteThing"
                :options="favoriteThingOptions"
                :validations="{
                  required: true
                }"
              />
            </template>

            <button
              class="link primary margin-bottom"
              type="button"
              @click="toggleFavoriteThingQuestion"
            >
              {{ state.showFavoriteThing ? 'Hide' : 'Show' }} Question
            </button>
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
  import { useSession } from '@/modules/session';
  import { RadioOption } from '@/types/props';
  import sharedComponents from '@/components/shared';

  export default defineComponent({
    name: 'CreateAccountPage',

    components: {
      ...sharedComponents
    },

    setup() {
      const { createAccount } = useSession();
      const { handleError, handleErrorManually } = useErrors();
      const router = useRouter();

      const state = reactive({
        acceptedTerms: true,
        email: '',
        emailError: '',
        favoriteThing: '',
        fullName: '',
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
          const { errors } = handleErrorManually(error);

          const emailConflictError = errors.find(
            (e) => e.code === ApiErrorCode.EMAIL_CONFLICT
          );

          if (emailConflictError) {
            state.emailError = emailConflictError.message;
          } else {
            handleError(error);
          }
        }
      }

      function toggleFavoriteThingQuestion() {
        state.showFavoriteThing = !state.showFavoriteThing;
      }

      return {
        favoriteThingOptions,
        state,
        submit,
        toggleFavoriteThingQuestion
      };
    }
  });
</script>
