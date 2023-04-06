<template>
    <el-card id="card" shadow="hover">
        <el-row class="demo-avatar demo-basic">
            <div class="demo-basic--circle">
                <div class="block">
                <el-avatar class="avatar" :shape="'square'" :size="50" :src="squareUrl">
                    <div class="unread-dot" v-if="this.room.unread > 0"></div>
                </el-avatar>
                </div>
                <div class="details">
                    <el-row class="nickname">
                        {{this.room.roomName }}
                    </el-row>
                    <el-row class="message-detail" :style="{ color: 'gray',  fontSize: '5px',whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}">
                        {{ this.room.unread > 0 ? '['+this.room.unread + ']条' : '' }}
                        {{ this.room.history[this.room.history.length - 1].sender + ': ' + (this.room.history[this.room.history.length - 1].content.length + this.room.history[this.room.history.length - 1].sender.length > 10 ? (this.room.history[this.room.history.length - 1].content.slice(0, 13 - this.room.history[this.room.history.length - 1].sender.length) + '...') : this.room.history[this.room.history.length - 1].content) }}
                    </el-row>
                </div>
                
            </div>
        </el-row>
        <div class="last-message-time">
                    {{ formatTime(this.room.history[this.room.history.length - 1].time) }}
                </div>
    </el-card>
</template>
<script lang="ts">
    import {defineProps, reactive, toRefs} from 'vue'
    import {countdownEmits} from "element-plus";
import { method } from 'lodash';

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
        },
        methods:{
            formatTime(timeStr) {
                const date = new Date(timeStr);
                const now = new Date();
                if (
                    date.getFullYear() === now.getFullYear() &&
                    date.getMonth() === now.getMonth() &&
                    date.getDate() === now.getDate()
                ) {
                    // 当天时间，显示几点几分
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`;
                } else {
                    // 非当天时间，显示几月几日
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    return `${month}-${day}`;
                }
                },
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
.last-message-time {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 12px;
    color: #999;
}
.unread-dot {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }
 #card {
        height: 70px;
        width: 100%;
        /* display: flex; */
        align-items: center;
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
        border-right: 1px solid var(--el-border-color);
    }

    .demo-basic .block {
        flex: 1;
    }

    .demo-basic .el-col:not(:last-child) {
        border-right: 1px solid var(--el-border-color);
    }

    .avatar {
        margin-right: 10px;
        width: 30px;
        height: 30px;
    }

    .details {
        margin-left: 10px;
        flex: 1;
        
    }

    .nickname {
        font-size: 16px;
        margin-bottom: 4px;
    }

    .message-detail {
        font-size: 12px;
        line-height: 1.2;
        display: flex;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
