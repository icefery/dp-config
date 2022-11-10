<script lang="tsx" setup>
import { DEPLOY_DETAILS_STATE, SHARED_CONFIG_LIST } from '@/store'
import { Download } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus'
import FileSaver from 'file-saver'
import { computed } from 'vue'
import ValidationFailure from '../validation/ValidationFailure'
import ValidationSuccess from '../validation/ValidationSuccess'
import DeployDetails from './DeployDetails.vue'
import DeployOrder from './DeployOrder.vue'

// 导出文件
const handleExport = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    const blob = new Blob([JSON.stringify(DEPLOY_DETAILS_STATE.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, DEPLOY_DETAILS_STATE.current.name)
  }
}

// upgradeOrder.first 字段
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

// upgradeOrder.last 字段
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

// upgradeOrder.first 校验
const upgradeOrderFirstStatus = computed(() => () => {
  if (DEPLOY_DETAILS_STATE.current) {
    if (!DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return <ValidationSuccess />
    }
    if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first.filter(it => it !== '').length === 0) {
      return <ValidationSuccess />
    }
    for (const serviceName of DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first) {
      const existing = DEPLOY_DETAILS_STATE.current.json.deployDetails.findIndex(it => it.serviceName === serviceName) >= 0
      if (!existing) {
        return <ValidationFailure />
      }
      const intersect = DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last.filter(it => it === serviceName)
      if (intersect.length !== 0) {
        return <ValidationFailure />
      }
    }
  }
  return <ValidationSuccess />
})

// upgradeOrder.last 校验
const upgradeOrderLastStatus = computed(() => () => {
  if (DEPLOY_DETAILS_STATE.current) {
    if (!DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return <ValidationSuccess />
    }
    if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last.filter(it => it !== '').length === 0) {
      return <ValidationSuccess />
    }
    for (const serviceName of DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last) {
      const existing = DEPLOY_DETAILS_STATE.current.json.deployDetails.findIndex(it => it.serviceName === serviceName) >= 0
      if (!existing) {
        return <ValidationFailure />
      }
      const intersect = DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first.filter(it => it === serviceName)
      if (intersect.length !== 0) {
        return <ValidationFailure />
      }
    }
  }
  return <ValidationSuccess />
})
</script>

<template>
  <el-card>
    <template #header>
      <!-- 选择文件 -->
      <el-select v-model="DEPLOY_DETAILS_STATE.current" value-key="name">
        <template v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'deployDetails')" :key="item.name">
          <el-option :label="item.name" :value="item" />
        </template>
      </el-select>
      <!-- 导出 -->
      <el-button :icon="Download" circle @click="handleExport()" />
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
        <el-input v-model="upgradeOrderFirst" :suffix-icon="upgradeOrderFirstStatus" spellcheck="false" />
      </el-form-item>
      <!-- upgradeOrder.last 属性 -->
      <el-form-item label="upgradeOrder.last">
        <el-input v-model="upgradeOrderLast" :suffix-icon="upgradeOrderLastStatus" spellcheck="false" />
      </el-form-item>
    </el-form>
  </el-card>
</template>
