<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <validated-form v-slot="{ validatedForm }" :submit="submit">
          <div class="group">
            <h1 class="title title--2">Create an Account</h1>
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
            <checkbox-input
              v-model="state.acceptedTerms"
              name="acceptedTerms"
              :validations="{
                required: true
              }"
            >
              I agree to the crazy
              <a href="#" class="link regular">Terms & Conditions</a>
            </checkbox-input>
          </div>

          <hr />

          <div class="group layout layout--horizontal">
            <p>
              Already have an account?
              <router-link
                class="link secondary"
                :to="{
                  name: 'signIn'
                }"
              >
                Sign In
              </router-link>
            </p>

            <button
              class="button"
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
  import { defineComponent } from 'vue';
  import { reactive } from 'vue';
  import { useErrors } from '@/modules/errors';
  import { useRouter } from 'vue-router';
  import { useSession } from '@/modules/session';

  export default defineComponent({
    name: 'CreateAccountPage',

    setup() {
      const { createAccount } = useSession();
      const { handleError, handleErrorManually } = useErrors();
      const router = useRouter();

      const state = reactive({
        acceptedTerms: true,
        email: '',
        emailError: '',
        fullName: '',
        password: ''
      });

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

      return {
        state,
        submit
      };
    }
  });
</script>
