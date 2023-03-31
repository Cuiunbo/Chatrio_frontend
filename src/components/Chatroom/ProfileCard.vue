<template>
            <el-card :body-style="{ padding: '0px' }">
                <img
                        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                        class="image"
                />
                <div @click="print" style="padding: 14px">
                    <p>{{nickname}}</p>
                    <div class="bottom">
                        <p class="email">{{email}}</p>
                    </div>
                </div>
            </el-card>
</template>

<script lang="ts">

    export default {
        data() {
            return {
                nickname: 'Username',
                email:'default@email.com'
            };
        },
        methods: {
            print() {
                console.log(this.nickname)
            },
        },
    };
</script>

<style>
    .email {
        font-size: 12px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .button {
        padding: 0;
        min-height: auto;
    }

    .image {
        width: 100%;
        display: block;
    }
</style>
