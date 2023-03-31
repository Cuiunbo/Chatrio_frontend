<script setup>
    import Avatar1 from '../Utils/Avatar.vue'
</script>
<template>
    <el-card :body-style="{ padding: '0px' }">
        <Avatar1></Avatar1>
        <div @click="print" style="padding: 14px">
            <p>{{ nickname }}</p>
            <div class="bottom">
                <p class="email">{{ email }}</p>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        // data() {
        //     return {
        //         nickname: 'Username',
        //         email: 'default@email.com'
        //     };
        // },
        // methods: {
        //     print() {
        //         console.log(this.nickname);
        //     },
        // },
        // created() {
        //     this.nickname = this.$store.state.username;
        //     this.email = this.$store.state.email;
        // }
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
