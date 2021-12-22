<template>
  <div class="layout layout--vertical-align">
    <section class="section">
      <div class="container mw-mobile center">
        <div class="group">
          <h1 class="title title--2 color-danger">Oops! Something went wrong.</h1>
          <p>Either this page doesn't exist or we're experiencing some technical difficulties.</p>
        </div>

        <hr />

        <RouterLink
          class="button"
          :to="{
            name: 'home'
          }"
        >
          Go Home
        </RouterLink>
      </div>
    </section>
  </div>
</template>
