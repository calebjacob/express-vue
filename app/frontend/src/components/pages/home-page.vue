<template>
  <div class="layout layout--vertical-align">
    <div class="container">
      <section class="section center">
        <h1 class="title title--1">Express Your Vue</h1>
        <h2 class="title title--2 color-text-2">
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
            layout--stack-tablet
          "
        >
          <div v-if="session.currentUser">
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
          </div>

          <div v-else>
            <h3 class="title title--3">You are not signed in.</h3>

            <p>
              Account info won't be saved on registration. The auth flow is
              mocked on the backend.
            </p>

            <div class="layout layout--horizontal layout--justify-start">
              <router-link
                class="button"
                :to="{
                  name: 'signIn'
                }"
              >
                Sign In
              </router-link>

              <router-link
                class="button button--secondary"
                :to="{
                  name: 'createAccount'
                }"
              >
                Register
              </router-link>
            </div>
          </div>

          <div>
            <h3 class="title title--3">Notifications</h3>

            <div class="group">
              <div
                class="
                  layout layout--horizontal layout--justify-start
                  margin-bottom
                "
              >
                <button
                  class="link color-success"
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
                  class="link color-danger"
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

            <h3 class="title title--3">Actions</h3>

            <div class="layout layout--horizontal layout--justify-start">
              <button
                type="button"
                class="button button--border button--small"
                @click="somethingPublic"
              >
                <span class="icon fa fa-globe"></span>
                Public
              </button>
              <button
                type="button"
                class="button button--border button--small"
                @click="somethingPrivate"
              >
                <span class="icon fa fa-lock"></span>
                Private
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useTheSession } from '@/modules/session';
  import {
    useTheNotifications,
    NotificationType
  } from '@/modules/notifications';
  import { useErrors } from '@/modules/errors';
  import {
    SomethingPublicResponse,
    SomethingPrivateResponse
  } from 'shared/types/api';
  import http from '@/services/http';
  // import injectStrict from '@/helpers/inject-strict';

  export default defineComponent({
    name: 'HomePage',

    setup() {
      // const { session } = injectStrict(SessionModuleKey);
      const { session } = useTheSession();
      const { showNotification } = useTheNotifications();
      const { handleError } = useErrors();

      async function somethingPrivate() {
        try {
          const response = await http.get<SomethingPrivateResponse>(
            '/api/something-private'
          );

          console.log('Private Info:', response.data);

          showNotification({
            type: NotificationType.SUCCESS,
            message: 'A private API was accessed!'
          });
        } catch (error) {
          handleError(error);
        }
      }

      async function somethingPublic() {
        try {
          const response = await http.get<SomethingPublicResponse>(
            '/api/something-public'
          );

          console.log('Public Info:', response.data);

          showNotification({
            type: NotificationType.SUCCESS,
            message: 'A public API was accessed!'
          });
        } catch (error) {
          handleError(error);
        }
      }

      return {
        NotificationType,
        session,
        showNotification,
        somethingPrivate,
        somethingPublic
      };
    }
  });
</script>
