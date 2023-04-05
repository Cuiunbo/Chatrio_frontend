<template>
    <el-button text @click="dialog = true"
    >+</el-button>
    <el-drawer
            ref="drawerRef"
            v-model="dialog"
            title="New Contacts"
            direction="rtl"
            class="demo-drawer"
    >
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item label="Name" :label-width="formLabelWidth">
                    <el-input class="in" v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Area" :label-width="formLabelWidth">
                    <el-select
                            v-model="form.region"
                            placeholder="Please select activity area"
                    >
                        <el-option label="Area1" value="shanghai" />
                        <el-option label="Area2" value="beijing" />
                    </el-select>
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
    .in {
        :deep(.el-input__wrapper) {
            box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
            background: rgba(0, 0, 0, 0.1);
        }
    }

</style>