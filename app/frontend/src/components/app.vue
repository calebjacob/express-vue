<template>
  <TheHeader />

  <div class="wrapper__content">
    <RouterView />
  </div>

  <TheFooter />

  <TheNotifications />
</template>

<script lang="ts" setup>
  import { provide } from 'vue';
  import { ExampleModuleKey, useExample } from '@/modules/example';
  import { useTheSession } from '@/modules/session';
  import TheNotifications from './singles/the-notifications.vue';
  import TheFooter from './singles/the-footer.vue';
  import TheHeader from './singles/the-header.vue';

  const session = useTheSession();
  session.load();

  const example = useExample();
  example.message.value = 'This is an example of using a provide/inject pattern.';
  provide(ExampleModuleKey, example);
</script>

<style lang="sass">
  @import '../../styles/globals/font-awesome.css'
  @import '../../styles/index'
</style>
