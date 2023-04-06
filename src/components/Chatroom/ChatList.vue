<template>
    <el-scrollbar>
        <!-- <ChatCard v-for="count1 in this.length" :count="count1"
                  class="scrollbar-demo-item"
                  @click="joinRoom(count1)"
        ></ChatCard> -->
        <ChatCard v-for="(room, index) in this.$store.state.rooms"
                    :key="room.roomId"
                    :room="room"
                    @click="joinRoom(index)"
        ></ChatCard>
    </el-scrollbar>
</template>

<script>
    import ChatCard from './ChatCard.vue';

    export default {
        components:{
            ChatCard,
        },
        data() {
            return {
                length:0,
            }
        },
        created() {
            this.length=this.$store.state.rooms.length;
            
        },
        methods:{
            // 切换聊天室
            joinRoom(room) {
                this.$store.state.currentRoom = room;
                console.log('切换聊天室:',this.$store.state.currentRoom);
                // this.messages = this.state.rooms[room].history;
                this.$store.state.rooms[room].unread = 0;
            },
        }
    }
</script>

<style scoped>
    .scrollbar-demo-item {
        margin-bottom: 2px;
    }
</style>
