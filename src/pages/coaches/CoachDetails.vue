<script>
import { RouterView } from 'vue-router';

export default {
  components: {
    RouterView,
  },
};
</script>

<template>
  <h1>Coach Details</h1>
  <RouterView />
  <base-button link to="/coaches/c1/contact">Contact</base-button>
</template>
