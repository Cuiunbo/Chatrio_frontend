<script setup>
    import ChatCard from './ChatCard.vue'
    import ProfileCard from './ProfileCard.vue'
    import Drawer from './Drawer.vue'

</script>
<template>
    <el-menu
            type="primary"
            id="header"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
    >
        <el-menu-item index="0">
            <img alt="Vue logo" class="logo" src="@/assets/pinialogo.svg" width="40" height="40"/>
        </el-menu-item>
        <div class="flex-grow"/>
        <el-menu-item index="1">
            <Drawer></Drawer>
        </el-menu-item>
        <el-sub-menu index="2">
            <template #title>Profile</template>
                <ProfileCard id="profile"></ProfileCard>
        </el-sub-menu>
        <div id="chatrio">
            Chatrio
        </div>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                nickname:'2',
                email: ''
            };
        },
    };
</script>

<style>
    #chatrio {
        @import "src/assets/font/font.css";
        font-size: 40px;
        color: hsla(160, 100%, 37%, 1);
        font-family: Ubuntu, serif;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #header {
        width: 100%;
    }

    .flex-grow {
        flex-grow: 1;
    }
    #profile{
        height: 100%;
        margin: 0 5px;
    }
</style>
