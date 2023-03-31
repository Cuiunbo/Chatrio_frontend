<script setup>
    import ChatCard from './ChatCard.vue'
</script>
<template>
    <el-scrollbar >
        <ChatCard v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</ChatCard>
    </el-scrollbar>
</template>

<style scoped>
    .scrollbar-demo-item{
        margin-bottom: 2px;
    }
</style>
