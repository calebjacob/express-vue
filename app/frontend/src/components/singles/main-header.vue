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

        <router-link
          v-else
          class="link"
          :to="{
            name: 'signIn'
          }"
        >
          Sign In
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { SessionModuleKey } from '@/modules/session';
  import { defineComponent } from 'vue';
  import injectStrict from '@/helpers/inject-strict';

  export default defineComponent({
    name: 'MainHeader',

    setup() {
      const { session, signOut } = injectStrict(SessionModuleKey);

      return {
        session,
        signOut
      };
    }
  });
</script>
