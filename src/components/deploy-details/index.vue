<script lang="ts" setup>
import { DEPLOY_DETAILS_STATE, SHARED_CONFIG_LIST } from '@/store'
import { Download } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElForm, ElFormItem, ElOption, ElSelect } from 'element-plus'
import FileSaver from 'file-saver'
import { computed } from 'vue'
import DeployDetails from './DeployDetails.vue'
import DeployOrder from './DeployOrder.vue'

// 导出文件
const handleExport = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    const blob = new Blob([JSON.stringify(DEPLOY_DETAILS_STATE.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, DEPLOY_DETAILS_STATE.current.name)
  }
}

const upgradeOrderFirst = computed<string>({
  get: () => {
    // 当前配置文件存在 && 当前配置文件存在 upgradeOrder 字段
    if (DEPLOY_DETAILS_STATE.current && DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first.join(',')
    } else {
      return ''
    }
  },
  set: value => {
    // 当前配置文件存在
    if (DEPLOY_DETAILS_STATE.current) {
      // 当前配置文件存在 upgradeOrder 字段
      if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first = value.split(',')
      } else {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder = { first: value.split(','), last: [] }
      }
    }
  }
})

const upgradeOrderLast = computed<string>({
  get: () => {
    // 当前配置文件存在 && 当前配置文件存在 upgradeOrder 字段
    if (DEPLOY_DETAILS_STATE.current && DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last.join(',')
    } else {
      return ''
    }
  },
  set: value => {
    // 当前配置文件存在
    if (DEPLOY_DETAILS_STATE.current) {
      // 当前配置文件存在 upgradeOrder 字段
      if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last = value.split(',')
      } else {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder = { first: [], last: value.split(',') }
      }
    }
  }
})
</script>

<template>
  <el-card>
    <template #header>
      <!-- 选择文件 -->
      <el-select v-model="DEPLOY_DETAILS_STATE.current">
        <el-option v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'deployDetails')" :key="item.name" :label="item.name" :value="item" />
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
