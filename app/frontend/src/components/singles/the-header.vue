<template>
  <header class="header">
    <div class="container">
      <button class="header__hamburger icon icon--medium fa fa-bars" type="button" />

      <router-link
        class="header__logo"
        :to="{
          name: 'home'
        }"
        >APP</router-link
      >

      <div class="header__right">
        <button v-if="session.currentUser" class="link" type="button" @click="signOut">Sign Out</button>

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
  import { useTheSession } from '@/modules/session';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TheHeader',

    setup() {
      const { session, signOut } = useTheSession();

      return {
        session,
        signOut
      };
    }
  });
</script>
