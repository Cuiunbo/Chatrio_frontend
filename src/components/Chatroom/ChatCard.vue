<template>
        <el-card id="card" shadow="hover">
            <el-row class="demo-avatar demo-basic">
                <div class="demo-basic--circle">
                    <div class="block">
                        <el-avatar class="avatar" :shape="'square'" :size="50" :src="circleUrl"/>
                    </div>
                    <div class="details">
                        <el-row class="nickname">
                            77
                        </el-row>
                        <el-row class="message-detail">
                            88
                        </el-row>
                    </div>

                </div>
            </el-row>
        </el-card>
</template>
<script lang="ts" setup>
    import {reactive, toRefs} from 'vue'

    const state = reactive({
        circleUrl:
            'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        squareUrl:
            'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
        sizeList: ['small', '', 'large'] as const,
    })

    const {circleUrl, squareUrl, sizeList} = toRefs(state)
</script>

<style scoped>
    #card{
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
