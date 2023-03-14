<script setup>
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #heading>注册</template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">邮箱:</label>
          <input
            v-model="username"
            id="username"
            type="text"
            name="username"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">密码:</label>
          <input
            v-model="password"
            id="password"
            type="password"
            name="password"
            required
            class="form-input"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="login-button">Sign Up</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </WelcomeItem>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Sign Up',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');

    const login = async () => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            password: password.value
          })
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        // Login success
        window.location.href = '/dashboard';
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      username,
      password,
      error,
      login
    };
  }
};
</script>


<style>
.login-form {
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.login-button:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 600px) {
  .form-container {
    width: 100%;
    padding: 0 1.5rem;
  }
}

</style>
