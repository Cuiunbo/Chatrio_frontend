<script setup>
    import Header from '../components/Chatroom/Header.vue'
    import Test from '../components/Test.vue'
    import Input from '../components/Chatroom/Input.vue'
    import ChatList from '../components/Chatroom/ChatList.vue'
    import ProfileCard from '../components/Chatroom/ProfileCard.vue'
    import ChatCard from '../components/Chatroom/ChatCard.vue'
</script>

<template>
    <div class="common-layout">
        <el-container id="container">
            <el-header  id="header">
                <Header ref="ref_header"></Header>
            </el-header>
            <el-container>
                <el-aside
                        id="aside">
                    <ChatList></ChatList>
                </el-aside>
                <el-container>
                    <el-main id="main">

                        <div v-for="(message, index) in messages" :key="index">
                            {{ message }}
                        </div>
                    </el-main>
                    <el-footer id="footer">
                        <Input ref="input"></Input>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
        <el-button id="send-button" @click="sendMessage"
        >Send
        </el-button>
    </div>
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
                state: {
                    currentUser: 'user1',
                    currentRoom: 'room1',
                    rooms: {
                        'user2': {
                            history: [
                                {time: '03/31  14:06', message: 'this user1🍤', sender: 'user1'},
                                {time: '03/31  14:07', message: 'that user2🧑‍🍼', sender: 'user2'}
                            ]
                        },
                        'user3': {
                            history: [
                                {time: '1', message: '我是user1, user3你好👿', sender: 'user1'},
                                {time: '2', message: 'user1你好, user3是我👿', sender: 'user3'}
                            ]
                        }
                    }
                },


                currentRoom: 'user2',
                messages: [],
            };
        },
        mounted() {
            this.username = this.$cookies.get('username');
            this.token = this.$cookies.get('token');
            this.email = this.$cookies.get('email');
            this.$socket.emit("join", this.username);
            this.$store.state.username=this.username;
            this.$store.state.email=this.email;
            // console.log(this.$store.state.email);
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
                console.log('发送消息:', this.$refs.input.textarea);
                this.$socket.emit("message", this.$refs.input.textarea);
                this.$refs.input.textarea = ''; // 清空输入框
            },
            showUserInfo() {
                this.userInfoVisible = !this.userInfoVisible;
                // this.token = this.$cookies.get('token');
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
        sockets: {
            message(data) {
                this.messages.push(data);
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
</style>
