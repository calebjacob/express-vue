<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container max-width-mobile">
        <ValidatedForm v-slot="{ validatedForm }" :submit="submit">
          <div class="group">
            <h1 class="title title--2">Sign In</h1>
          </div>

          <div v-if="state.sessionDidExpire" class="group">
            <div class="bubble layout layout--icon">
              <span class="icon fa fa-lock color-secondary"></span>
              <p>Your session has expired. Please sign in to continue.</p>
            </div>
          </div>

          <template v-else>
            <hr />
            <div class="group">
              <div class="layout layout--icon">
                <span class="icon fa fa-lock color-secondary"></span>
                <p>
                  <b class="color-text-1">The auth service is mocked.</b> To sign in successfully, use
                  "frodo@baggins.com" for the email and "the_shire" as the password.
                </p>
              </div>
            </div>
          </template>

          <div class="group">
            <TextInput
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

            <TextInput
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
              <RouterLink
                class="link"
                :to="{
                  name: 'createAccount'
                }"
              >
                Register
              </RouterLink>
            </p>

            <button
              class="button button--icon-end"
              :class="{
                'button--loading': validatedForm.isSubmitting
              }"
              type="submit"
            >
              Sign In
              <span class="icon fa fa-arrow-right" />
            </button>
          </div>
        </ValidatedForm>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useErrors } from '@/modules/errors';
  import { useRouter } from 'vue-router';
  import { useTheSession } from '@/modules/session';
  import ValidatedForm from '../shared/validated-form.vue';
  import TextInput from '../shared/text-input.vue';

  const { signIn } = useTheSession();
  const { handleError } = useErrors();
  const router = useRouter();

  const state = reactive({
    email: 'frodo@baggins.com',
    password: 'the_shire',
    sessionDidExpire: router.currentRoute.value.query.expired === 'true'
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
</script>
