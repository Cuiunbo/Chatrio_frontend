<script setup>
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #heading>注册</template>
    <div class="login-container">
      <form @submit.prevent="signup" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">
            用户名: （建议编造）</label>
          <input
            v-model="username"
            id="username"
            type="text"
            name="username"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            oninvalid="this.setCustomValidity('请输入合规的电子邮件地址')"
            oninput="this.setCustomValidity('')"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="username" class="form-label">
            邮箱: （建议编造）</label>
          <input
            v-model="username"
            id="username"
            type="text"
            name="username"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            oninvalid="this.setCustomValidity('请输入合规的电子邮件地址')"
            oninput="this.setCustomValidity('')"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password" class="form-label">
            密码: （如：123）</label>
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
        <div class="form-group">
          <label for="password" class="form-label">
            确认密码: （如：123）</label>
          <input
            v-model="password"
            id="password"
            type="password"
            name="password"
            required
            class="form-input"
          />
        </div>
          <button type="submit" class="signup-button">Sign</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </WelcomeItem>
</template>

<script>
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

.signup-button {
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.signup-button:hover {
  background-color: var(--color-primary-dark);
}

@media (max-width: 600px) {
  .form-container {
    width: 100%;
    padding: 0 1.5rem;
  }
}

</style>
