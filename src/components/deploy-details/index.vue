<script lang="ts" setup>
import { fetchFileList, type IDeployDetails } from '@/api/json'
import { Download } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElForm, ElFormItem, ElOption, ElSelect } from 'element-plus'
import FileSaver from 'file-saver'
import { computed, onMounted } from 'vue'
import DeployDetails from './DeployDetails.vue'
import DeployOrder from './DeployOrder.vue'
import { state } from './store'

// 加载数据
onMounted(() => fetchFileList<IDeployDetails>('deployDetails').then(data => (state.list = data)))

// 导出文件
const handleExport = () => {
  if (state.current) {
    const blob = new Blob([JSON.stringify(state.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, state.current.filename)
  }
}

const upgradeOrderFirst = computed<string>({
  get: () => (state.current?.json?.upgradeOrder?.first || []).join(','),
  set: value => {
    if (state.current) {
      if (state.current.json.upgradeOrder) {
        state.current.json.upgradeOrder.first = value.split(',')
      } else {
        state.current.json.upgradeOrder = { first: value.split(','), last: [] }
      }
    }
  }
})

const upgradeOrderLast = computed<string>({
  get: () => (state.current?.json?.upgradeOrder?.last || []).join(','),
  set: value => {
    if (state.current) {
      if (state.current.json.upgradeOrder) {
        state.current.json.upgradeOrder.last = value.split(',')
      } else {
        state.current.json.upgradeOrder = { first: [], last: value.split(',') }
      }
    }
  }
})
</script>

<template>
  <el-card>
    <template #header>
      <!-- 选择文件 -->
      <el-select v-model="state.current">
        <el-option v-for="item in state.list" :key="item.filename" :label="item.filename" :value="item" />
      </el-select>
      <!-- 导出 -->
      <el-button :icon="Download" circle @click="handleExport()"></el-button>
    </template>
    <el-form label-width="100px">
      <!-- deployOrder 属性 -->
      <el-form-item label="deployOrder">
        <DeployOrder />
      </el-form-item>
      <!-- deployDetails 属性 -->
      <el-form-item label="deployDetails">
        <DeployDetails />
      </el-form-item>
      <!-- upgradeOrder.first 属性 -->
      <el-form-item label="upgradeOrder.first">
        <el-input v-model="upgradeOrderFirst" />
      </el-form-item>
      <!-- upgradeOrder.last 属性 -->
      <el-form-item label="upgradeOrder.last">
        <el-input v-model="upgradeOrderLast" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
