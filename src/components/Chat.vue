<template>
    <div class="header">
        <div class="logo">
            <img src="@/assets/pinialogo.svg" alt="Pinia logo" width="30"/>
        </div>

        <div class="user">
             <button class="user-name" @click="showMenu = !showMenu">{{ userName }}</button>

            <div class="menu" v-show="showMenu">
                <ul>
                    <li><a href="#" @click="logout">退出登录</a></li>
                </ul>
            </div>
        </div>

    <div class="chat-body">
        <!-- 左侧栏 -->
        <div class="sidebar">
          <div class="search-container">
            <input type="text" placeholder="搜索用户" />
            <button>搜索</button>
          </div>
          <ul class="chat-list">
            <li v-for="(user, index) in userList" :key="index" @click="openChat(user)">
              <img :src="user.avatar" alt="avatar" />
              <div class="chat-info">
                <p>{{ user.username }}</p>
                <p class="last-message">{{ user.lastMessage }}</p>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- 右侧聊天页面 -->
        <div class="chat-panel">
          <div class="chat-header">
            <img :src="chatUser.avatar" alt="avatar" />
            <h3>{{ chatUser.username }}</h3>
          </div>
          <ul class="chat-messages">
            <li v-for="(message, index) in chatMessages" :key="index" :class="{'me': message.isMe}">
              <div class="message-content">{{ message.content }}</div>
            </li>
          </ul>
          <div class="message-input-container">
            <input type="text" v-model="messageInput" placeholder="请输入消息内容" />
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          id: 1,
          username: 'Alice',
          avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
          lastMessage: 'Hello, how are you doing?',
          messages: [
            { content: 'Hello Alice!', isMe: false },
            { content: 'I am doing great, thanks for asking.', isMe: true },
            { content: 'How about you?', isMe: true },
            { content: 'I am good too, thanks!', isMe: false },
          ],
        },
        {
          id: 2,
          username: 'Bob',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
          lastMessage: 'Are you free this weekend?',
          messages: [
            { content: 'Hey Bob, what\'s up?', isMe: false },
            { content: 'Not much, just wondering if you are free this weekend?', isMe: true },
            { content: 'Sure, what did you have in mind?', isMe: false },
            { content: 'Let\'s go catch a movie or something.', isMe: true },
          ],
        },
      ],
      chatUser: {},
      chatMessages: [],
      messageInput: '',
      showMenu: false,
    };
  },
  methods: {
    openChat(user) {
      this.chatUser = user;
      this.chatMessages = user.messages;
    },
    sendMessage() {
      if (this.messageInput.trim() === '') {
        return;
      }
        this.chatMessages.push({
            content: this.messageInput,
            isMe: true,
        });
        this.messageInput = '';
    },
    },
};
</script>