<script setup>
    import Header from '../components/Chatroom/Header.vue'
    import Test from '../components/Test.vue'
    import Input from '../components/Chatroom/Input.vue'
    import ChatList from '../components/Chatroom/ChatList.vue'
    import ChatCard from '../components/Chatroom/ChatCard.vue'
</script>

<template>
    <div class="common-layout">
        <el-container id="container">
            <el-header id="header">
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside
                        id="aside">
                    <ChatList></ChatList>
                </el-aside>
                <el-container>
                    <el-main id="main">
                        <Test></Test>
                    </el-main>
                    <el-footer id="footer">
                        <Input></Input>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
        <el-button id="send-button"
        >Send
        </el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfoVisible: false,
                userId: '', // Replace with your user ID
                username: '', // Replace with your username
                token:'',
                input: '',
                maxCount: 500, // 最大字符数
                //TODO: 消息列表
                // messages: {username: 'test', message: 'test'},
                messages: [],
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
                this.$socket.emit("message", this.input);
                this.input = ''; // 清空输入框
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
        background: #778800;
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
