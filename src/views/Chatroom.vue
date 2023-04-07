<script setup>
import Header from '../components/Chatroom/Header.vue'
import Input from '../components/Chatroom/Input.vue'
import ChatList from '../components/Chatroom/ChatList.vue'
// import {set_Url} from '@/assets/setting';
import ChatWindow from '../components/Chatroom/ChatWindow.vue'
import store from "../store";
// import store from "@/store";

</script>

<template>
  <div class="common-layout">
    <el-container id="container">
      <el-header id="header">
        <Header ref="ref_header"></Header>
      </el-header>
      <el-container>
        <el-aside
            id="aside">
          <ChatList ref="chat-list"
                    v-if="render"></ChatList>
        </el-aside>
        <el-container>
          <el-main id="main">
            <el-container style="">
              <el-header style="background: #9c9c9c;
              border-radius: 8px;
              display: flex;
              margin: 5px 5px 0 5px">
                <el-popover
                    placement="left"
                    :width="100"
                    trigger="hover"
                >
                  <div style="text-align: center">
                    RoomID: {{ store.state.rooms[store.state.currentRoom].roomId }}
                  </div>
                  <template #reference>
                    <div style="margin-top: 5px;
                              color: #eeeeee;
                              width: 50px;
                              font-size: 28px;">
                      {{ store.state.rooms[store.state.currentRoom].roomName }}
                    </div>
                  </template>
                </el-popover>
                <div style="position: absolute;
                              padding-top: 6px;
                              right: 5px;"
                >
                  <svg class="settings" style="position: absolute;
                              color: #eeeeee;
                              right: 10px;
                              width: 45px;
                              height: 45px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
                       data-v-ea893728="">
                    <path fill="currentColor"
                          d="M764.416 254.72a351.68 351.68 0 0 1 86.336 149.184H960v192.064H850.752a351.68 351.68 0 0 1-86.336 149.312l54.72 94.72-166.272 96-54.592-94.72a352.64 352.64 0 0 1-172.48 0L371.136 936l-166.272-96 54.72-94.72a351.68 351.68 0 0 1-86.336-149.312H64v-192h109.248a351.68 351.68 0 0 1 86.336-149.312L204.8 160l166.208-96h.192l54.656 94.592a352.64 352.64 0 0 1 172.48 0L652.8 64h.128L819.2 160l-54.72 94.72zM704 499.968a192 192 0 1 0-384 0 192 192 0 0 0 384 0z"></path>
                  </svg>
                </div>


                <!--                </div>-->


              </el-header>
              <el-main style="padding: 0 0 0 20px;
              margin-bottom: 0;
              overflow: hidden;
                              height: 100%">
                <ChatWindow ref="chat-window" v-if="render"></ChatWindow>
              </el-main>
            </el-container>
            <!--            <el-container>-->
            <!--              <el-header style="background: #9c9c9c;-->
            <!--              border-radius: 8px;-->
            <!--                                margin: 5px 5px 0 5px">-->
            <!--                <div style="margin-top: 5px;-->
            <!--                color: #eeeeee;-->
            <!--                            font-size: 28px;">-->
            <!--                  {{ store.state.rooms[store.state.currentRoom].roomName }}-->
            <!--                </div>-->
            <!--              </el-header>-->
            <!--              <el-main style="padding: 0 0 0 20px;-->
            <!--                              height: 65vh">-->
            <!--                <ChatWindow ref="chat-window" v-if="render"></ChatWindow>-->
            <!--              </el-main>-->
            <!--            </el-container>-->
          </el-main>
          <el-footer id="footer">
            <Input ref="input"></Input>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
  <el-button id="send-button" @click="sendMessage"
  >Send
  </el-button>
</template>

<script>
export default {
  data() {
    return {
      userInfoVisible: false,
      username: '', // Replace with your username
      email: '',
      token: '',
      input: '',
      maxCount: 500, // 最大字符数
      render: false,
      currentRoom: 'user2',
      messages: [],
      state: {
        currentUser: 'user1',
        currentRoom: 'user2',
      },

    };
  },
  // 页面生成 -> 证明 组件已经挂载
  // profile -> chatlist -> chatcard
  created() {
    this.username = this.$cookies.get('username');
    this.token = this.$cookies.get('token');
    this.email = this.$cookies.get('email');
    this.userid = this.$cookies.get('userid');
    this.$store.state.username = this.username;
    this.$store.state.email = this.email;
    this.$store.state.userid = this.userid;
    console.log(1);
    console.log('当前用户:', this.username, '组件加载完毕');
    console.log('前端发送获取列表请求');
    // roomlist -> 前端发送 get_room_list -> 后端发送 room_list
    this.$socket.emit("get_room_list", this.userid);
  },

  computed: {},
  methods: {
    // // 刷新字数
    // updateCount(event) {
    //     this.input = event.target.value.slice(0, this.maxCount);
    // },
    // 发送消息
    sendMessage() {
      const message = {
        content: {
          // data to "%Y-%m-%d %H:%M:%S"
          time: new Date().toLocaleString('zh-CN', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          content: this.$refs.input.textarea,
          sender: this.username,
        },
        roomId: this.$store.state.rooms[this.$store.state.currentRoom].roomId,
        userId: this.$cookies.get('token'),
      };
      console.log('发送消息:', message);
      this.$socket.emit("message", message);
      this.$refs.input.textarea = ''; // 清空输入框
    },
  },
  sockets: {
    // 接收消息
    message(data) {
      console.log('接收消息:', data);
      if (data.roomId in this.$store.state.roomsindex.roomId) {
        const roomIndex = this.$store.state.roomsindex.roomId[data.roomId];
        // console.log('index:', roomIndex);
        this.$store.state.rooms[roomIndex].history.push(data.content);
        console.log('接受消息成功添加到前端内存', this.$store.state.rooms[roomIndex].history);
        // 对state.rooms按照history的最后一条消息的时间排序
        this.$store.state.rooms.sort((a, b) => {
          // console.log('a:', a);
          // console.log('b:', b);
          const lastMsgTimeA = new Date(a.history[a.history.length - 1].time);
          const lastMsgTimeB = new Date(b.history[b.history.length - 1].time);
          // console.log('lastMsgTimeA:', lastMsgTimeA);
          // console.log('lastMsgTimeB:', lastMsgTimeB);
          if (lastMsgTimeA < lastMsgTimeB) {
            // console.log('a < b');
            return 1;
          } else if (lastMsgTimeA > lastMsgTimeB) {
            return -1;
          } else {
            return 0;
          }
        });
        for (let i = 0; i < this.$store.state.rooms.length; i++) {
          this.$store.state.roomsindex['roomName'][this.$store.state.rooms[i].roomName] = i;
          this.$store.state.roomsindex['roomId'][this.$store.state.rooms[i].roomId] = i;
        }
        console.log('state.rooms:', this.$store.state.rooms);

        // 对于当前聊天室的消息，不需要更新未读消息数
        if (this.$store.state.currentRoom !== roomIndex) {
          this.$store.state.rooms[roomIndex].unread += 1;
        } else {
          this.$refs["chat-window"].scrollBottom();
        }
      } else {
        // console.log('msg not for you');
      }
    },

    // 接收聊天室列表
    room_list(data) {
      // console.log(this.$store.state);
      // console.log('接收聊天室列表:', data);
      //         //TODO: 未实现的群显示用户功能
      //         // roomType: data[room].room_type,
      //         // roomMembers: data[room].room_members,
      //         // membersNum: data[room].room_members.length,
      //         // roomAvatar: data[room].room_avatar,
      this.$store.state.rooms = [];
      for (const room in data) {
        const roomName = data[room].room_name;
        const roomId = parseInt(room);
        // 判断这个房间是否已经存在于数组中
        const existingRoom = this.$store.state.rooms.find((room) => room.roomId === roomId);
        if (existingRoom) {
          continue;
        }
        const newRoom = {
          history: [],
          roomId: roomId,
          roomName: roomName,
          members_num: data[room].num_members,
        };
        this.$store.state.rooms.push(newRoom);
        this.$store.state.roomsindex['roomName'][roomName] = this.$store.state.rooms.length - 1;
        this.$store.state.roomsindex['roomId'][roomId] = this.$store.state.rooms.length - 1;
      }

      console.log("后端获取聊天室列表成功, 并发送给前端 : ", this.$store.state);
      // this.render = true;
      // console.log("render = true");
      const roomId = this.$store.state.roomsindex.roomId;
      this.$socket.emit("get_all_history", roomId);
    },

    room_history(data) {
      // console.log('接收聊天室历史消息:', data);
      // 通过roomId找到对应的roomindex
      const roomIndex = this.$store.state.roomsindex.roomId[data['room_id']];
      // if room dont have history, create a new array
      if (!this.$store.state.rooms[roomIndex].history) {
        console.log('room dont have history, create a new array');
        this.$store.state.rooms[roomIndex].history = [
          {
            time: new Date().toLocaleString('zh-CN', {
              hour12: false,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }),
            content: '欢迎来到聊天室',
            sender: '系统消息',
          },
        ];
      }
      for (const room in data['result'].history) {
        const sender = data['result'].history[room].sender;
        const content = data['result'].history[room].content;
        const time = data['result'].history[room].time;
        const newMessage = {
          time: time,
          content: content,
          sender: sender,
        };
        this.$store.state.rooms[roomIndex].history.push(newMessage);
      }
      // console.log(this.$store.state);
    },

    get_end(data) {
      // if history is empty, create a new array

      this.$store.state.rooms.sort((a, b) => {
        // console.log('a:', a);
        // console.log('b:', b);
        // if a history is empty, put it at the end
        if (a.history.length === 0) {
          console.log('a history is empty');
          //初始化history
          a.history = [
            {
              time: new Date().toLocaleString('zh-CN', {
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              content: '欢迎来到聊天室',
              sender: '系统消息',
            },
          ];
          return 1;
        }
        // if b history is empty, put it at the end
        if (b.history.length === 0) {
          console.log('b history is empty');
          //初始化history
          b.history = [
            {
              time: new Date().toLocaleString('zh-CN', {
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }),
              content: '欢迎来到聊天室',
              sender: '系统消息',
            },
          ];
          return -1;
        }
        const lastMsgTimeA = new Date(a.history[a.history.length - 1].time);
        const lastMsgTimeB = new Date(b.history[b.history.length - 1].time);
        // console.log('lastMsgTimeA:', lastMsgTimeA);
        // console.log('lastMsgTimeB:', lastMsgTimeB);
        if (lastMsgTimeA < lastMsgTimeB) {
          // console.log('a < b');
          return 1;
        } else if (lastMsgTimeA > lastMsgTimeB) {
          return -1;
        } else {
          return 0;
        }
      });
      //更新roomsindex
      for (let i = 0; i < this.$store.state.rooms.length; i++) {
        this.$store.state.roomsindex['roomName'][this.$store.state.rooms[i].roomName] = i;
        this.$store.state.roomsindex['roomId'][this.$store.state.rooms[i].roomId] = i;
      }
      this.render = true;

    },
  },
};
</script>
<style>
#container {
  height: 100%;
}

.common-layout {
  height: 100%;
  overflow: hidden;
}

#header {
  min-height: 60px;
  height: 7vh;
  padding: 0;
  /*background: #778888;*/
}

#main {
  background: #f8f8f8;
  height: 100%;
  padding: 0 0 0 0;
}

#aside {
  background: #f2f2f2;
  height: 93vh;
  padding: 5px;
  width: 300px;
  overflow-x: hidden;
}

#footer {
  padding: 0;
  height: fit-content;
}

#send-button {
  position: fixed;
  margin-left: 95%;
  margin-top: -6vh;
}

.settings{
  position: absolute;
  padding-top: 6px;
  right: 5px;
}
.settings:active{
  color:#2c3e50;
}
</style>
