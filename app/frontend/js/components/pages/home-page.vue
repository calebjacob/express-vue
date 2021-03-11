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
          class="layout layout--horizontal layout--horizontal-equal layout--double-spacing layout--align-start layout--stack-600"
        >
          <div>
            <h3 class="title title--3">Here's Some Stuff</h3>

            <p>Hmmm... This is a nice paragraph right here.</p>

            <router-link
              class="button"
              :to="{
                name: 'another'
              }"
            >
              View a Page
            </router-link>
          </div>

          <div>
            <h3 class="title title--3">Notifications</h3>

            <div
              class="layout layout--horizontal layout--justify-start spacing"
            >
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
          </div>
        </div>
      </section>

      <section class="section">
        <h3 class="title title--3">Here's Some Actions</h3>

        <div
          class="layout layout--horizontal layout--justify-start layout--wrap"
        >
          <button
            class="button"
            :class="{
              'button--loading': exampleData.someDataIsLoading
            }"
            type="button"
            @click="load"
          >
            Load Data
          </button>

          <button
            class="button button--secondary"
            type="button"
            @click="loadWithError"
          >
            Load Bad Data
          </button>
        </div>

        <p v-if="exampleData.someData">
          Here's some loaded data.
          <br />
          Thing: {{ exampleData.someData.thing }}
          <br />
          Color: {{ exampleData.someData.color }}
          <br />
          Miles: {{ exampleData.someData.miles }}
        </p>
      </section>
    </div>
  </div>
</template>

<script>
  import useErrors from '@/modules/errors';
  import useExampleData from '@/modules/example-data';
  import useNotifications from '@/modules/notifications';

  export default {
    name: 'HomePage',

    setup() {
      const { loadExampleData, exampleData } = useExampleData();
      const { handleError } = useErrors();
      const { showNotification } = useNotifications();

      async function load() {
        try {
          await loadExampleData();
        } catch (error) {
          handleError(error);
        }
      }

      async function loadWithError() {
        try {
          throw new Error('This request failed on purpose.');
        } catch (error) {
          handleError(error);
        }
      }

      return {
        exampleData,
        load,
        loadWithError,
        showNotification
      };
    }
  };
</script>
