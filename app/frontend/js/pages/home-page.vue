<template>
  <div class="layout layout--vertical-align">
    <div class="container">
      <section class="section center">
        <div class="icon icon--large icon--block fa fa-rocket light"></div>

        <h1 class="title title--1 primary">Express Your Vue</h1>
        <h2 class="title title--2">
          Can't beat that new car smell. Time to get coding!
        </h2>
      </section>

      <section class="section center">
        <my-example some-text="hot dog" />

        <div class="layout layout--horizontal layout--justify-center">
          <router-link
            class="button button--auto-width"
            :to="{
              name: 'another'
            }"
          >
            View a Page
          </router-link>
        </div>
      </section>

      <section class="section center">
        <h3 class="title title--3">Notifications</h3>

        <div class="layout layout--horizontal layout--justify-center">
          <button
            class="link success"
            type="button"
            @click="
              showNotification({
                type: 'success',
                message: 'This was great!'
              })
            "
          >
            Success
          </button>

          <button
            class="link danger"
            type="button"
            @click="
              showNotification({
                type: 'error',
                message: 'Oops! That was not so great.'
              })
            "
          >
            Error
          </button>

          <button
            class="link"
            type="button"
            @click="
              showNotification({
                message: 'This is very regular.'
              })
            "
          >
            Regular
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import useNotifications from '@/composables/notifications';

  export default {
    name: 'HomePage',

    setup() {
      const { showNotification } = useNotifications();

      return {
        showNotification
      };
    }
  };
</script>
