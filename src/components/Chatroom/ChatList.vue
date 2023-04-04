<template>
    <el-scrollbar>
        <ChatCard v-for="index in this.listCount" count="index" class="scrollbar-demo-item">{{ item }}</ChatCard>
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
                listCount: 0,
                idList: [],
                nameList: [],
            }
        },
        created() {
            this.listCount = this.$store.state.idList.length;
        }
    }
</script>

<style scoped>
    .scrollbar-demo-item {
        margin-bottom: 2px;
    }
</style>
