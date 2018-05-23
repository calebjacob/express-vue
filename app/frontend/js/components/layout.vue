<template>
  <div>
    <router-view/>
  </div>
</template>



<script>
  export default {
    name: 'Layout',

    metaInfo: {
      titleTemplate(titleChunk) {
        return titleChunk ? `${titleChunk} | Simple Vue` : 'Simple Vue';
      }
    }
  };
</script>



<style lang="stylus">
  @import '../../styles/main'
</style>
