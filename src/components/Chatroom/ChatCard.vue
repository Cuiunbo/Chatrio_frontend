<template>
    <el-card id="card" shadow="hover">
        <el-row class="demo-avatar demo-basic">
            <div class="demo-basic--circle">
                <div class="block">
                    <el-avatar class="avatar" :shape="'square'" :size="50" :src="squareUrl"/>
                </div>
                <div class="details">
                    <el-row class="nickname">
                        {{ this.room.roomName }}
                    </el-row>
                    <el-row class="message-detail" :style="{ color: 'gray', fontFamily: 'Arial, sans-serif',  fontSize:'8px'}">
                        {{this.room.history[this.room.history.length - 1].sender 
                        +  ' :'+
                        this.room.history[this.room.history.length - 1].content}}
                    </el-row>
                    <el-row class="unread-count" v-if="this.room.unread > 0" :style="{ color: 'red', fontFamily: 'Arial, sans-serif',  fontSize:'8px'}">
                        Unread messages: {{ this.room.unread }}
                    </el-row>
                </div>

            </div>
        </el-row>
    </el-card>
</template>
<script lang="ts">
    import {defineProps, reactive, toRefs} from 'vue'
    import {countdownEmits} from "element-plus";

    export default {
        props: ['room'],
        data() {
            return {
                id: 0,
                roomname: '',
                members: 2,
                lastMessage: '',
                unread: 0,
            }
        },
        mounted() {
            const room_info= this.room
            // console.log(this.$store.state);
            this.id = room_info.id;
            this.roomname = room_info['roomName'];
            this.members = room_info.members;
            const a = room_info.history[room_info.history.length - 1]
            this.lastMessage =a.sender +  ' :'+a.content;
            // console.log(this.roomname);
        }
    }
    const state = reactive({
        squareUrl:
            'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        sizeList: ['small', '', 'large'] as const,
    })

    const {circleUrl, squareUrl, sizeList} = toRefs(state)
</script>

<style scoped>
    .message-detail {
        font-size: 15px;

    }
    #card {
        height: 90px;
    }

    .demo-basic {
        text-align: center;
    }

    .demo-basic .sub-title {
        margin-bottom: 10px;
        font-size: 14px;
        color: var(--el-text-color-secondary);
    }

    .demo-basic .demo-basic--circle,
    .demo-basic .demo-basic--square {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .demo-basic .block:not(:last-child) {
        /*border-right: 1px solid var(--el-border-color);*/
    }

    .demo-basic .block {
        flex: 1;
    }

    .demo-basic .el-col:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }

    .avatar {
        margin-right: 20px;
    }

    .details {
        margin-left: 15px;
    }

    .nickname {
        font-size: 20px;
    }

    .message-detail {
        font-size: 15px;
    }
</style>
