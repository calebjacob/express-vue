<template>
  <header class="main-header">
    <div class="container">
      <button
        class="main-header__hamburger icon icon--medium fa fa-bars"
        type="button"
      />

      <router-link
        class="main-header__logo"
        :to="{
          name: 'home'
        }"
        >APP</router-link
      >

      <div class="main-header__right">
        <button
          v-if="session.currentUser"
          class="link"
          type="button"
          @click="signOut"
        >
          Sign Out
        </button>

        <button
          v-else
          class="link"
          type="button"
          @click="
            signIn({
              email: 'frodo@baggins.com',
              password: 'MyPassword!'
            })
          "
        >
          Sign In
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import injectStrict from '@/helpers/inject-strict';
  import { SessionModuleKey } from '@/modules/session';

  export default defineComponent({
    name: 'MainHeader',

    setup() {
      const { session, signIn, signOut } = injectStrict(SessionModuleKey);

      return {
        session,
        signIn,
        signOut
      };
    }
  });
</script>
