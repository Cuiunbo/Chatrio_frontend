<template>
    <el-button text @click="dialog = true"
    >+</el-button>
    <el-drawer
            ref="drawerRef"
            v-model="dialog"
            title="New Contacts"
            direction="rtl"
            class="demo-drawer"
            size="350"
    >
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item>
                    <div style="flex: 1"></div>
                    <el-radio-group v-model="radio1" class="ml-4">
                        <el-radio label="1">Option 1</el-radio>
                        <el-radio label="2">Option 2</el-radio>
                    </el-radio-group>
                    <div style="flex: 1"></div>
                </el-form-item>
                <el-form-item label="ID">
<!--                    <div style="flex: 1"></div>-->
                    <el-input class="in" v-model="form.name" autocomplete="off" />
<!--                    <div style="flex: 1"></div>-->
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button @click="cancelForm">Cancel</el-button>
                <el-button type="primary" :loading="loading" @click="onClick">{{
                        loading ? 'Submitting ...' : 'Submit'
                    }}</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import { ElDrawer, ElMessageBox } from 'element-plus'

    const formLabelWidth = '80px'
    let timer

    const table = ref(false)
    const dialog = ref(false)
    const loading = ref(false)

    const form = reactive({
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
    })

    const gridData = [
        {
            date: '2016-05-02',
            name: 'Peter Parker',
            address: 'Queens, New York City',
        },
        {
            date: '2016-05-04',
            name: 'Peter Parker',
            address: 'Queens, New York City',
        },
        {
            date: '2016-05-01',
            name: 'Peter Parker',
            address: 'Queens, New York City',
        },
        {
            date: '2016-05-03',
            name: 'Peter Parker',
            address: 'Queens, New York City',
        },
    ]

    const drawerRef = ref<InstanceType<typeof ElDrawer>>()
    const onClick = () => {
        drawerRef.value!.close()
    }

    const cancelForm = () => {
        loading.value = false
        dialog.value = false
        clearTimeout(timer)
    }
</script>

<style >
    .in{
       /*width: 200px;*/
    }

</style>