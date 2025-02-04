<template>
  <TheHeader />
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';

import TheHeader from './components/layout/TheHeader.vue';

export default {
  name: 'App',
  components: {
    RouterView,
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}
</style>
