<template>
    <el-scrollbar>
        <ChatCard v-for="count1 in this.length" :count="count1"
                  class="scrollbar-demo-item"
                  @click="joinRoom(count1)"
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
                this.$store.state.currentRoom = room-1;
                console.log(this.$store.state.currentRoom);
                // this.messages = this.state.rooms[room].history;
            },
        }
    }
</script>

<style scoped>
    .scrollbar-demo-item {
        margin-bottom: 2px;
    }
</style>
