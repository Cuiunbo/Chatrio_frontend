<script setup>

</script>
<template>
  <div class="content-wrapper">
    <div class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="search-container">
          <input type="text" placeholder="搜索" name="search" />
          <button type="submit"> +
          </button>
        </div>
      </div>
      <div class="sidebar-footer">
          <button class="infobutton" > 个人信息
          </button>
      </div>
      <div class="sidebar-content">聊天列表</div>
      
    </div>    
    <div class="chat-panel">
      <div class="chat-header">
        <button class="hidesidebar" @click="sidebarhide" >{
        </button>
        <button class="roombutton">~</button>
      </div>
      <div class="chat-messages">消息

      </div>
      <div class="message-input-container">
          <textarea
            v-model="input"
            placeholder="请输入消息"
            @input="updateCount"
          ></textarea>
          <div class="send-container">
            <div class="count">{{ count }} / {{ maxCount }}</div>
            <button class="send" @click="sendMessage">发送</button>
          </div>  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      maxCount: 500, // 最大字符数
    };
  },
  computed: {
    count() {
      return this.input.length;
    },
  },
  methods: {
    updateCount(event) {
      this.input = event.target.value.slice(0, this.maxCount);
    },
    sendMessage() {
      //TODO: 发送消息的逻辑
      console.log('发送消息:', this.input);
      this.input = ''; // 清空输入框
    },
    // sidebarhide
    sidebarhide() {
      var x = document.getElementById("sidebar");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    },
  },
};
</script>

<style>

.hidden {
  display: none;
}
.roombutton {
  float: right;
  padding: 0.75rem;
  border: none;
  /* background-color: #4CAF50; */
  color: gray;
  padding: 33px 36px;
  font-size: 20px;
  cursor: pointer;
}
.hidesidebar {
  float: left;
  padding: 0.75rem;
  border: none;
  /* background-color: #4CAF50; */
  color: gray;
  padding: 33px 10px;
  font-size: 20px;
  cursor: pointer;
}
.message-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding-left: 1rem;
  padding-right: 0rem;
  padding-top: 0rem;
  padding-bottom: 0rem;
}
textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  margin-bottom: 0px;
  border: none;
  background-color: var(--color-background);;
  color: var(--color-text);
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  resize: none;
  font-size: 16px;
  outline: none;
}
.send-container {
  display: flex;
  width: 97%;
  flex-direction: row;
  margin: 1rem;
}
.count {
  flex: 1;
  height: 0;
  margin: 0px;
  margin-bottom: 0px;
  font-size: 10px;
  color: #999;
}

.send {
  margin-top: 5px;
  padding: 8px 10px;
  background-color: var(--color-border);
  color: green;
  border: none;
  border-radius: 5px;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send:hover {
  background-color: var(--color-border-hover);
}
.sidebar-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}
.sidebar-footer {
  display: flex;
  flex-direction: column;
}
.infobutton {
  width: 100%;
  padding: 0.75rem;
  border: none;
}
.infobutton:hover {
  background-color: #f5f5f5;
}
.search-container {
  display: flex;
  padding: 1rem 0.5rem;
  background-color: #ffffff;
}

.search-container input[type="text"] {
  flex: 1;
}
.search-container button[type="submit"] {
  width: 14%; /* 调整按钮宽度 */
  font-size: 2rem; /* 调整按钮字体大小 */
  border-radius: 0.5rem;
  margin: 0.5rem 0.5rem;
}
.search-container button[type="submit"] {
  /* 其他样式 */
  margin-left: 10px; /* 添加右侧边距 */
  border: none; /* 去掉边框 */
  border-radius: 5px; 
  background-color: #d5d5d5; /* 设置背景颜色 */
  color: #000000fb; /* 设置文字颜色 */
  cursor: pointer; /* 添加指针样式 */
  transition: background-color 0.3s ease; /* 添加渐变效果 */
}

.search-container button[type="submit"]:hover {
  background-color: #7d7d7d; /* 鼠标悬停时的背景颜色 */
}
.content-wrapper {
  display: flex;
  height: 100vh;
}
.sidebar {
  width: 300px;
  background-color: var(--color-border);
  box-shadow: 0px 0px 6px #888888;
  border-top-right-radius:5rem ;
  z-index: 1;
}
.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.chat-header {
  height: 90px;
  background-color: whitesmoke;
}
.chat-messages {
  flex: 1;
}
.message-input-container {
  border-top: 1px solid var(--color-border);
  height: 200px;
  background-color: var(--color-background);
}
/* @media screen and (max-width: 768px) {
  .sidebar {
    width: 8%;
    display: none;
  }
} */
</style>