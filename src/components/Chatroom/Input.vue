<template>
    <div>
        <el-input
                id="input"
                v-model="textarea"
                :rows="2"
                type="textarea"
                resize="none"
                maxlength="200"
                placeholder="Please input"
        >
        </el-input>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                textarea: ''
            };
        },
        methods: {
            print() {
                console.log(this.textarea)
            },
            
        },
    };
</script>

<style>
    #input {
        height: 150px;
        margin-bottom: 3px;
    }


</style>