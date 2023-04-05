<script setup>
import WelcomeItem from './WelcomeItem.vue'
import { RouterLink} from 'vue-router'
import { set_Url } from '@/assets/setting';

import home from './Home.vue'
</script>

<template>
  <div class="container">
  <home />
  <WelcomeItem>
    <template #heading>登录</template>
    <div class="login-container">
      <form @submit.prevent="confirm" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">
            邮箱: </label>
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
            密码: </label>
          <input
            v-model="password"
            id="password"
            type="password"
            name="password"
            required
            class="form-input"
          />
          <el-input></el-input>
        </div>
        <div class="form-group">
          <button type="submit" class="login-button">Log In</button>
        </div>
        
      </form>
      <div v-if="error" class="error">{{ error }}</div>
      <nav>
        <RouterLink to="/">登录</RouterLink>
        <RouterLink to="/signup">注册</RouterLink>
      </nav>
    </div>
    
  </WelcomeItem>
    
  </div>
</template>


<script>
export default {
  data(){
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods:{
      async confirm(){
        try {
          // 发送登录请求
          console.log('登录中...')
          // const response = await fetch('http://localhost:5000/api/login', {
          const response = await fetch(set_Url+'/api/login', {
          // const response = await fetch('http://10.1.148.246:5000/api/login', {
          // const response = await fetch('http://47.94.222.108:5000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          })

          if (response.ok) {
            // Store the token as a cookie
            const data = await response.json();
            this.$cookies.set('token', data.token);
            this.$cookies.set('username', data.username);
            this.$cookies.set('email', data.email);
            this.$cookies.set('userid', data.userid);
            console.log("Set Cookies_TOKEN: "+this.$cookies.get('token'))
            this.$router.push('/chat')
          } else {
            // 登录失败，显示错误信息
            const data = await response.json()
            this.error = data.message
          }
        } catch (error) {
          // 发送请求出错，显示错误信息
          this.error = '网络错误，请稍后再试'
        }

    }
  }
}
</script>

<style>

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
.container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 2rem;
  height: 100vh;
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
  transition: background-color 0.3s ease;
}

.login-button:active {
  background-color: var(--color-border-hover);
}
.error {
  color: red;
  font-size: 18px;
  margin-top: 10px;
}
h3 {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}
@media (min-width: 1024px) {
  .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
  /* flex-wrap: wrap;  */
}
}
</style>
