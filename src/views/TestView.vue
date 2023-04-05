<script setup>
    import Header from '../components/Chatroom/Header.vue'
    import Test from '../components/Test.vue'
    import Input from '../components/Chatroom/Input.vue'
    import ChatList from '../components/Chatroom/ChatList.vue'
    import ProfileCard from '../components/Chatroom/ProfileCard.vue'
    import ChatCard from '../components/Chatroom/ChatCard.vue'
    import {set_Url} from '@/assets/setting';
import { keys } from 'lodash'

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
                    <ChatList></ChatList>
                </el-aside>
                <el-container>
                    <el-main id="main">

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

                currentRoom: 'user2',
                messages: [],
                state: {
                    currentUser: 'user1',
                    currentRoom: 'user2',
                },

            };
        },
        created() {
            this.username = this.$cookies.get('username');
            this.token = this.$cookies.get('token');
            this.email = this.$cookies.get('email');
            this.userid = this.$cookies.get('userid');
            this.$store.state.username = this.username;
            this.$store.state.email = this.email;
            this.$socket.emit("get_room_list", this.userid);

        },

        computed: {
            // count() {
            //     return this.input.length;
            // },

        },
        methods: {
            // // 刷新字数
            // updateCount(event) {
            //     this.input = event.target.value.slice(0, this.maxCount);
            // },
            // 切换聊天室
            joinRoom(room) {
                this.$store.state.currentRoom = room;
                this.messages = this.state.rooms[room].history;
            },
            // 发送消息
            sendMessage() {
                const message = {
                    content: {
                        time: new Date().toLocaleString('zh-CN', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        }),
                        content: this.input,
                        sender: this.username,
                    },
                    roomId: this.state.currentRoom,
                };
                console.log('发送消息:', message);
                this.$socket.emit("message", message);
                this.input = ''; // 清空输入框
            },
        },
        sockets: {
            // 接收消息
            message(data) {
                if (!this.state.rooms[data.roomId]) {
                    this.state.rooms[data.roomId] = {
                        history: [],
                    };
                }
                const room = this.state.rooms[data.roomId];
                if (!room.history[data.sender]) {
                    room.history[data.sender] = [];
                }
                room.history[data.sender].push(data['content']);
                this.messages.push(data['content']);
            },

            // 接收聊天室列表
            room_list(data) {
                console.log('接收聊天室列表:', data);
                // for (const room in data) {
                //     // console.log(data[room].room_name);
                //     // console.log(room)
                //     this.$store.state.rooms[data[room].room_name] ={
                //         history: [
                //         {
                //             time: new Date().toLocaleString('zh-CN', {
                //                 month: '2-digit',
                //                 day: '2-digit',
                //                 hour: '2-digit',
                //                 minute: '2-digit'
                //             }),
                //             content: this.username + '! Hi, 我们是好友了👿, 来聊天吧!',
                //             sender: data[room].room_name
                //             },
                //         ],
                //         roomId: room, 
                //         roomName: data[room].room_name, // 冗余
                //         num: data[room].num_members,
                //         //TODO: 未实现的群显示用户功能
                //         // roomType: data[room].room_type,
                //         // roomMembers: data[room].room_members,
                //         // membersNum: data[room].room_members.length,
                //     }
                // }
                this.$store.state.rooms=[];
                for (const room in data) {
                    const roomId = data[room][0];
                    const roomName = data[room][1];
                    const roomMember = data[room][2];
                    const index = parseInt(room);
                    const newRoom = {
                        history: [
                            {
                                time: new Date().toLocaleString('zh-CN', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }),
                                content: this.username + '! Hi, 我们是好友了👿, 来聊天吧!',
                                sender: roomName
                            },
                        ],
                        index: index,
                        roomId: roomId,
                        roomName: roomName,
                        memberNum: roomMember,
                    };
                    this.$store.state.rooms.push(newRoom);
                    // this.$store.state.roomsindex[roomName] = this.$store.state.rooms.length - 1;
                }

                console.log(this.$store.state);
                //const roomId = this.$store.state.roomsindex.roomId;
                //TODO:this.$socket.emit("get_all_history", roomId);
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
