<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <!-- <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

      <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <label>
          Username:
          <input v-model="username" type="text" name="username" required>
        </label>
        <label>
          Password:
          <input v-model="password" type="password" name="password" required>
        </label>
        <button type="submit">Login</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem> -->

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>登录</template>
    <div class="login-container">
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">邮箱:</label>
          <input v-model="username" id="username" type="text" name="username" required class="form-input">
        </div>
        <div class="form-group">
          <label for="password" class="form-label">密码:</label>
          <input v-model="password" id="password" type="password" name="password" required class="form-input">
        </div>
        <div class="form-group">
          <button type="submit" class="login-button">Log In</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </WelcomeItem>

  <!-- <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem> -->
</template>

<style>
.login-container {
display:block;
justify-content: center;
align-items: center;
/* height: vh; */
background-color: var(--color-background-mute);
}

.logo {
margin-bottom: 2.5rem;
}

.form-container {
width: 30rem;
}

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
margin-bottom: 0.5rem;
color: var(--color-text);
}

input[type="text"],
input[type="password"] {
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




/* .login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-bg-2);
}

.logo {
  margin-bottom: 2.5rem;
}

.form-container {
  width: 30rem;
}

.login-form {
  background-color: var(--color-bg-1);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.login-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-1);
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
} */
/* .login-form {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

.login-form label {
  color: var(--color-heading);
}

.login-form input[type="text"],
.login-form input[type="password"] {
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.login-form button {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
} */
</style>
