<template>
  <section>
    <base-card>
      <h1>Register as a coach now!</h1>
      <coach-form></coach-form
    ></base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
};
</script>
