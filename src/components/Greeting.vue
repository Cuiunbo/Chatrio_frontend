<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>这是一个小型的Web端即使通讯系统, 请登录以开始体验~
      <br><br>注意 : 数据库服务器可能不定期清库
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  margin-top: 0rem;
  margin-bottom: 1.2rem;
}

h3 {
  font-size: 0.9rem;
  color: gainsboro;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
