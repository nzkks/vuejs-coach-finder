<template>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError"
    ><p>{{ error }}</p></base-dialog
  >
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your Email</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      />
      <div v-if="!email.isValid" class="error-text">Email is required</div>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.val"
        @blur="clearValidity('message')"
      ></textarea>
      <div v-if="!message.isValid" class="error-text">Message is required</div>
    </div>
    <p v-if="!formIsValid" class="error-text">
      Please fix the above errors and submit again.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      error: null,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;

      if (this.email.isValid && this.message.isValid) {
        this.formIsValid = true;
      } else {
        this.formIsValid = false;
      }
    },
    validateForm() {
      this.formIsValid = true;

      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }

      if (this.message.val === '') {
        this.message.isValid = false;
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        coachId: this.$route.params.id,
        email: this.email.val,
        message: this.message.val,
      };

      try {
        await this.$store.dispatch('requests/contactCoach', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.$router.replace('/coaches');
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 6px;
}

input:focus,
textarea:focus {
  border-color: #002d8d;
  background-color: #e6ecfd;
  outline: none;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.error-text {
  color: red;
}

.actions {
  text-align: center;
}
</style>
