<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <validated-form v-slot="{ validatedForm }" :submit="submit">
          <div class="group">
            <h1 class="title title--2">Sign In</h1>
          </div>

          <div class="group">
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
                required: true
              }"
            />
          </div>

          <div class="group layout layout--horizontal">
            <p>
              Don't have an account?
              <router-link
                class="link secondary"
                :to="{
                  name: 'createAccount'
                }"
              >
                Register
              </router-link>
            </p>

            <button
              class="button"
              :class="{
                'button--loading': validatedForm.isSubmitting
              }"
              type="submit"
            >
              Sign In
              <span class="icon fa fa-arrow-right" />
            </button>
          </div>
        </validated-form>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { reactive } from 'vue';
  import { useErrors } from '@/modules/errors';
  import { useRouter } from 'vue-router';
  import { useSession } from '@/modules/session';

  export default defineComponent({
    name: 'SignInPage',

    setup() {
      const { signIn } = useSession();
      const { handleError } = useErrors();
      const router = useRouter();

      const state = reactive({
        email: 'frodo@baggins.com',
        password: 'shire'
      });

      async function submit() {
        try {
          await signIn({
            email: state.email,
            password: state.password
          });
          router.push({
            name: 'home'
          });
        } catch (error) {
          handleError(error);
        }
      }

      return {
        state,
        submit
      };
    }
  });
</script>
