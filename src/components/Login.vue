<script setup>
import WelcomeItem from './WelcomeItem.vue'
import home from './Home.vue'
</script>

<template>
  <home />
  <WelcomeItem>
    <template #heading>登录</template>
    <div class="login-container">
      <form @submit.prevent="confirm" class="login-form">
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
          <button type="submit" class="login-button">Log In</button>
        </div>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </WelcomeItem>
</template>


<script>
export default {
  name: "login",
  data(){
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods:{
      async confirm(){
      //   this.$router.push('/chat').then(() => {
      //   window.location.reload();
      // });
        this.$router.push('/chat')
        // try {
        //   // 发送登录请求
        //   console.log('登录中...')
        //   const response = await fetch('http://localhost:5000/api/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       username: this.username,
        //       password: this.password,
        //     }),
        //   })

        //   if (response.ok) {
        //     //TODO: 登录成功，跳转到首页
        //     this.$router.push('/chat')
        //     console.log('登录成功')
        //   } else {
        //     // 登录失败，显示错误信息
        //     const data = await response.json()
        //     this.error = data.message
        //     //TODO: 显示出没找到用户，请先注册，或者密码错误
        //     // this.$router.replace('/signup');
        //   }
        // } catch (error) {
        //   // 发送请求出错，显示错误信息
        //   this.error = '网络错误，请稍后再试'
        // }

    }
  }
}
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

@media (max-width: 600px) {
  .form-container {
    width: 100%;
    padding: 0 1.5rem;
  }
}

</style>
