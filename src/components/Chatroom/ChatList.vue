<template>
    <el-scrollbar>
        <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            v-model="search"
            @input="searchRoom"
            ></el-input>
            <div v-if="this.showFilteredRooms" class="search-result">
                聊天室名称
                <ChatCard v-for="(room, index) in this.filteredRooms"
                            :key="room.roomId"
                            :room="room"
                            @click="joinRoom(index)"
                ></ChatCard>
            </div>
            <div v-if="!this.showFilteredRooms">
                <ChatCard v-for="(room, index) in this.$store.state.rooms"
                            :key="room.roomId"
                            :room="room"
                            @click="joinRoom(index)"
                ></ChatCard>
            </div>
            <div v-if="this.showFilteredHistory">
                聊天记录
                <ChatCard v-for="(room, index) in this.filteredHistory"
                            :key="room.roomId"
                            :room="room"
                            @click="joinRoom(index)"
                ></ChatCard>
            </div>
    </el-scrollbar>
</template>

<script>
    import ChatCard from './ChatCard.vue';
    export default {
        data() {
            return {
                search: '',
                filteredRooms: [],
                filteredHistory: [],
                showFilteredRooms: false,
                showFilteredHistory: false,

            };
        },
        components:{
            ChatCard,
        },
        data() {
            return {
                length:0,
            }
        },
        created() {
            this.$store.state.currentRoom = 0;
            this.$store.state.rooms[0].unread = 0;
        },
        methods:{
            // 切换聊天室
            joinRoom(room) {
                this.$store.state.currentRoom = room;
                console.log('切换聊天室:',this.$store.state.currentRoom);
                // this.messages = this.state.rooms[room].history;
                this.$store.state.rooms[room].unread = 0;
                this.search = '';
                this.showFilteredRooms = false;
            },
            // 搜索聊天室
            searchRoom() {
                const query = this.search;
                console.log('搜索聊天室:',query.toLowerCase());

                if (query) {
                    this.filteredRooms = this.$store.state.rooms.filter(
                    (room) => room.roomName.toLowerCase().indexOf(query.toLowerCase()) != -1
                    );
                    this.showFilteredRooms = true;
                    console.log('搜索结果:',this.filteredRooms);
                    // console.log('搜索结果:',this.showFilteredRooms);
                } else {
                    this.showFilteredRooms = false;
                }
                //搜索历史消息
                if (query) {
                    this.filteredHistory = this.$store.state.rooms.filter((room) => {
                        return room.history.some((message) => {
                        return message.content.toLowerCase().indexOf(query) !== -1;
                    });
                });
                    this.showFilteredHistory = true;
                    // console.log('搜索结果:',this.filteredRooms);
                    // console.log('搜索结果:',this.showFilteredRooms);
                } else {
                    this.showFilteredHistory = false;
                }
            },
        }
    }
</script>

<style scoped>
    .search-input {
        margin-bottom: 10px;
    }
    .scrollbar-demo-item {
        margin-bottom: 2px;
    }
</style>
