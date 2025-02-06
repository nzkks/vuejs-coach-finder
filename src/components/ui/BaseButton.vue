<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <RouterLink v-else :to="to" :class="mode">
    <slot></slot>
  </RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
  },
  components: {
    RouterLink,
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #044895;
  border: 1px solid #00259e;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #0552ab;
  border-color: #00259e;
}

.flat {
  background-color: transparent;
  color: #044895;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #044895;
  color: #044895;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #d2dcff;
}
</style>
