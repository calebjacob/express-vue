<template>
  <div class="container">
    <h1>The Future Awaits</h1>

    <p>
      {{ subtitle }}

      View another page:

      <router-link :to="{
        name: 'otherPage'
      }">Link</router-link>
    </p>

    <p v-if="weatherIsLoading">Loading current weather...</p>

    <p v-else-if="weatherFailedToLoad">Weather report has failed to load.</p>

    <p v-else>Weather report for Lakewood, CO: <b>{{ weather.temperature }}° - {{ weather.description }}</b></p>

    <img src="/images/favicon.png" alt="Fav Icon">

    <br>
    <br>

    <button class="button" type="button" @click="$openModal('example')">Open a Modal</button>

    <modal name="example">
      <h1>Hello!</h1>

      <p>This is an example modal.</p>

      <button class="button" type="button" @click="$closeModal('example')">Ok</button>
    </modal>
  </div>
</template>



<script>
  import weather from '@/services/weather';



  export default {
    name: 'Home',

    metaInfo() {
      return {
        title: 'Home'
      };
    },

    data() {
      return {
        subtitle: 'Time to get to work...',
        weather: {
          temperature: 0,
          description: null
        },
        weatherIsLoading: false,
        weatherFailedToLoad: false
      };
    },

    created() {
      this.loadCurrentWeather();
    },

    methods: {
      async loadCurrentWeather() {
        this.weatherIsLoading = true;
        this.weatherFailedToLoad = false;

        try {
          const currentWeather = await weather.current();

          this.weather.temperature = currentWeather.main.temp;
          this.weather.description = currentWeather.weather[0].description;
        }

        catch (error) {
          this.weatherFailedToLoad = true;
        }

        this.weatherIsLoading = false;
      }
    }
  };
</script>
