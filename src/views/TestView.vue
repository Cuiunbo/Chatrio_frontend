<script setup>
    import Header from '../components/Chatroom/Header.vue'
    import Test from '../components/Test.vue'
    import Input from '../components/Chatroom/Input.vue'
    import ChatList from '../components/Chatroom/ChatList.vue'
    import ProfileCard from '../components/Chatroom/ProfileCard.vue'
    import ChatCard from '../components/Chatroom/ChatCard.vue'
    import {set_Url} from '@/assets/setting';
    import {keys} from 'lodash'
    import ChatWindow from '../components/Chatroom/ChatWindow.vue'

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
                    <ChatList v-if="render"></ChatList>
                </el-aside>
                <el-container>
                    <el-main id="main">
                      <!-- <ChatWindow></ChatWindow> -->
                        <!--                        <div v-for="(message, index) in messages" :key="index">-->
                        <!--                            {{ message }}-->
                        <!--                        </div>-->
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

        computed: {

        },
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
                        time : new Date().toLocaleString('zh-CN', {
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
                    console.log('接受消息成功添加到前端内存',this.$store.state.rooms[roomIndex].history);
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
                    }
                }
                else {
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
                        history: [

                        ],
                        roomId: roomId,
                        roomName: roomName,
                        members_num: data[room].num_members,
                    };
                    this.$store.state.rooms.push(newRoom);
                    this.$store.state.roomsindex['roomName'][roomName] = this.$store.state.rooms.length - 1;
                    this.$store.state.roomsindex['roomId'][roomId] = this.$store.state.rooms.length - 1;
                }

                console.log("后端获取聊天室列表成功, 并发送给前端 : ",this.$store.state);
                // this.render = true;
                // console.log("render = true");
                const roomId = this.$store.state.roomsindex.roomId;
                this.$socket.emit("get_all_history", roomId);
                },

            room_history(data) {
                // console.log('接收聊天室历史消息:', data);
                // 通过roomId找到对应的roomindex
                const roomIndex = this.$store.state.roomsindex.roomId[data['room_id']];
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
                this.render = true;
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
                //更新roomsindex
                for (let i = 0; i < this.$store.state.rooms.length; i++) {
                    this.$store.state.roomsindex['roomName'][this.$store.state.rooms[i].roomName] = i;
                    this.$store.state.roomsindex['roomId'][this.$store.state.rooms[i].roomId] = i;
                }
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
    }

    #aside {
        background: #f2f2f2;
        height: 92vh;
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
</style>
