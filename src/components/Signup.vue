<script setup>
import WelcomeItem from './WelcomeItem.vue'
import home from './Home.vue'
import {RouterLink} from 'vue-router'
import {set_Url} from '@/assets/setting';
</script>

<template>
  <div class="container">
    <home/>
    <WelcomeItem>
      <template #heading>注册</template>
      <div class="login-container">
        <form @submit.prevent="signup" class="login-form">
          <div class="form-group">
            <label for="username" class="form-label">
              用户名: </label>
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
            <label for="username" class="form-label">
              邮箱: </label>
            <input
                v-model="email"
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
                name="password"
                required
                class="form-input"
            />
          </div>
          <div class="form-group">
            <div class="form-group">
              <label for="password" class="form-label">
                确认密码: </label>
              <input
                  v-model="pw"
                  id="password"
                  name="password"
                  required
                  class="form-input"
              />
            </div>
            <button type="submit" class="signup-button">Sign</button>
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
  data() {
    return {
      username: '',
      password: '',
      pw: "",
      email: '',
      error: '',
    }
  },
  methods: {
    async signup() {
      if (this.password != this.pw) {
        this.error = '两次密码不相同'
      }
      else {
        try {
          // 发送登录请求
          console.log('登录中...')
          // const response = await fetch('http://47.94.222.108:5000/api/signup', {
          const response = await fetch(set_Url + '/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: this.username,
              email:this.email,
              password: this.password,
            }),
          })

          if (response.ok) {
            this.$router.push('/chat')
            console.log('登录成功')
          } else {
            // 登录失败，显示错误信息
            const data = await response.json()
            this.error = data.message
            // this.$router.replace('/signup');
          }
        } catch (error) {
          // 发送请求出错，显示错误信息
          this.error = '网络错误，请稍后再试'
        }
      }
    }
  }
}
</script>


<style scoped>
@media (min-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
    /* flex-wrap: wrap;  */
  }
}

.login-form {
  background-color: var(--color-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  /* max-width: 512px; */
  /* margin: 0 auto; */
}

.form-group {
  margin-bottom: 0.8rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--color-text);
}

input[type='text'],
input[id='password'] {
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
