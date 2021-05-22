<template>
  <div class="layout layout--vertical-align">
    <div class="container">
      <section class="section center">
        <h1 class="title title--1 primary">Express Your Vue</h1>
        <h2 class="title title--2">
          Can't beat that new car smell. Time to get coding!
        </h2>
      </section>

      <section class="section">
        <div
          class="
            layout
            layout--horizontal
            layout--horizontal-equal
            layout--double-spacing
            layout--align-start
            layout--stack-600
          "
        >
          <div>
            <h3 class="title title--3">Want to see a form?</h3>

            <p>Great! Just click the button below.</p>

            <router-link
              class="button"
              :to="{
                name: 'another'
              }"
            >
              View Form
              <span class="icon fa fa-arrow-right" />
            </router-link>
          </div>

          <div>
            <h3 class="title title--3">Notifications</h3>

            <div
              class="
                layout layout--horizontal layout--justify-start
                margin-bottom
              "
            >
              <button
                class="link success"
                type="button"
                @click="
                  showNotification({
                    type: NotificationType.SUCCESS,
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
                    type: NotificationType.ERROR,
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
                    type: NotificationType.GENERIC,
                    message: 'This is very regular.'
                  })
                "
              >
                Regular
              </button>
            </div>
          </div>
        </div>
      </section>

      <section v-if="session.currentUser" class="section">
        <h3 class="title title--3">Here's Your Account:</h3>

        <ul>
          <li>
            <p>Full Name: {{ session.currentUser.fullName }}</p>
          </li>
          <li>
            <p>Email: {{ session.currentUser.email }}</p>
          </li>
          <li>
            <p>ID: {{ session.currentUser.id }}</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import injectStrict from '@/helpers/inject-strict';
  import { SessionModuleKey } from '@/modules/session';
  import { useNotifications, NotificationType } from '@/modules/notifications';

  export default defineComponent({
    name: 'HomePage',

    setup() {
      const { session } = injectStrict(SessionModuleKey);
      const { showNotification } = useNotifications();

      return {
        NotificationType,
        session,
        showNotification
      };
    }
  });
</script>
