<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occorred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <base-dialog
        :show="!!error"
        title="An error occurred!"
        @close="handleError"
        ><p>{{ error }}</p></base-dialog
      >
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: !email.isValid }">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.val"
            @blur="validateForm"
          />
          <div v-if="!email.isValid" class="error-text">Email is required</div>
        </div>
        <div class="form-control" :class="{ invalid: !password.isValid }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.val"
            @blur="validateForm"
          />
          <div v-if="!password.isValid" class="error-text">
            Password is required
          </div>
        </div>
        <p v-if="!formIsValid" class="error-text">
          Please fix the above errors and submit again.
        </p>
        <div class="actions">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">{{
            switchModeButtonCaption
          }}</base-button>
        </div>
      </form></base-card
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      mode: 'login',
      formIsValid: true,
      error: null,
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (this.email.val === '' || !this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      } else {
        this.email.isValid = true;
      }
      if (this.password.val === '' || this.password.val.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      } else {
        this.password.isValid = true;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email.val,
        password: this.password.val,
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }

        const redirectURL = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectURL);
      } catch (error) {
        this.error = error.message || 'Failed to authenticate!';
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
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

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 6px;
}

input:focus {
  border-color: #002d8d;
  background-color: #e6ecfd;
  outline: none;
}

.invalid input {
  border: 1px solid red;
}

.error-text {
  color: red;
}

.actions {
  text-align: center;
}
</style>
