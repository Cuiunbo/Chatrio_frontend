<template>
  <el-button text @click="dialog = true"
  >+
  </el-button>
  <el-drawer
      ref="drawerRef"
      v-model="dialog"
      title="New"
      direction="rtl"
      class="demo-drawer"
      size="350"
      :with-header="false"
  >
    <div class="demo-drawer__content">
      <el-tabs stretch="true" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Add Contacts/Group" name="first">
          <el-form :model="form">
            <el-form-item>
              <div style="flex: 1"></div>
              <el-radio-group v-model="form.isGroup" class="ml-4">
                <el-radio label="0">Contact</el-radio>
                <el-radio label="1">Group</el-radio>
              </el-radio-group>
              <div style="flex: 1"></div>
            </el-form-item>
            <el-form-item label="ID">
              <el-input clearable="true" class="in" v-model="form.id" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onClick">{{
                loading ? 'Submitting' : 'Submit'
              }}
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Create Group" name="second">
          <el-form :model="form">
            <el-form-item label="Group Name">
              <el-input clearable="true" class="in" v-model="form.id" autocomplete="off"/>

            </el-form-item>
            <el-form-item label="ID">
              <el-input clearable="true" class="in" v-model="form.id" autocomplete="off"/>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">Cancel</el-button>
            <el-button type="primary" :loading="loading" @click="onClick">{{
                loading ? 'Submitting' : 'Submit'
              }}
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {ElDrawer, ElMessageBox} from 'element-plus'
import axios from 'axios'
import store from '../../store/index'


import {set_Url} from '../../assets/setting';

const formLabelWidth = '80px'
let timer
const activeName = ref('first')
const table = ref(false)
const dialog = ref(false)
const loading = ref(false)

const form = reactive({
  isGroup: '0',
  id: '',
})

const drawerRef = ref<InstanceType<typeof ElDrawer>>()
const onClick = () => {
  loading.value = true;
  axios.post(set_Url + '/api/addContact',
      {username: store.state.userid, content: form}).then(res => {
    console.log(res)
  })
  loading.value = false;
  drawerRef.value!.close()
}

const cancelForm = () => {
  console.log(form.isGroup);
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
}
</script>

<style>
.in {
  /*width: 200px;*/
}

/*.demo-drawer__footer{*/
/*  align-content: center;*/
/*}*/
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>