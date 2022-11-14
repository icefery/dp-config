<script lang="tsx" setup>
import { DEPLOY_DETAILS_STATE, SHARED_CONFIG_LIST } from '@/store'
import { Download } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElForm, ElFormItem, ElImage, ElOption, ElSelect, ElSpace } from 'element-plus'
import FileSaver from 'file-saver'
import { computed, ref } from 'vue'
import ValidationFailure from '../validation/ValidationFailure'
import ValidationSuccess from '../validation/ValidationSuccess'
import DeployDetails from './DeployDetails.vue'
import DeployOrder from './DeployOrder.vue'

// 导出文件
const handleExport = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    const blob = new Blob([JSON.stringify(DEPLOY_DETAILS_STATE.current.json, null, ' ')], { type: 'text/json' })
    FileSaver.saveAs(blob, DEPLOY_DETAILS_STATE.current.name)
  }
}

// upgradeOrder.first 字段
const upgradeOrderFirst = computed<string[]>({
  get: () => {
    // 当前配置文件存在 && 当前配置文件存在 upgradeOrder 字段
    if (DEPLOY_DETAILS_STATE.current && DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first
    } else {
      return []
    }
  },
  set: value => {
    // 当前配置文件存在
    if (DEPLOY_DETAILS_STATE.current) {
      // 当前配置文件存在 upgradeOrder 字段
      if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder.first = value
      } else {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder = { first: value, last: [] }
      }
    }
  }
})

// upgradeOrder.last 字段
const upgradeOrderLast = computed<string[]>({
  get: () => {
    // 当前配置文件存在 && 当前配置文件存在 upgradeOrder 字段
    if (DEPLOY_DETAILS_STATE.current && DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
      return DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last
    } else {
      return []
    }
  },
  set: value => {
    // 当前配置文件存在
    if (DEPLOY_DETAILS_STATE.current) {
      // 当前配置文件存在 upgradeOrder 字段
      if (DEPLOY_DETAILS_STATE.current.json.upgradeOrder) {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder.last = value
      } else {
        DEPLOY_DETAILS_STATE.current.json.upgradeOrder = { first: [], last: value }
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

const upgradeOrderFirstOptions = computed(() => {
  if (DEPLOY_DETAILS_STATE.current) {
    const a = DEPLOY_DETAILS_STATE.current.json.deployDetails.map(it => it.serviceName)
    const b = (DEPLOY_DETAILS_STATE.current.json.upgradeOrder || { fist: [], last: [] }).last
    return a.filter(it => !b.includes(it))
  }
  return []
})

const upgradeOrderLastOptions = computed(() => {
  if (DEPLOY_DETAILS_STATE.current) {
    const a = DEPLOY_DETAILS_STATE.current.json.deployDetails.map(it => it.serviceName)
    const b = (DEPLOY_DETAILS_STATE.current.json.upgradeOrder || { first: [], last: [] }).first
    return a.filter(it => !b.includes(it))
  }
  return []
})
//

const visable = ref<boolean>(false)

// 操作说明
</script>

<template>
  <el-card>
    <template #header>
      <el-space>
        <!-- 选择文件 -->
        <el-select v-model="DEPLOY_DETAILS_STATE.current" value-key="name">
          <template v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'deployDetails')" :key="item.name">
            <el-option :label="item.name" :value="item" />
          </template>
        </el-select>
        <!-- 导出 -->
        <el-popconfirm title="请务必务必仔细检查!!!" width="200px" @confirm="handleExport()">
          <template #reference>
            <el-button :icon="Download" circle />
          </template>
        </el-popconfirm>
        <el-image :initial-index="4" :preview-src-list="['/src/assets/1.png']" fit="cover" src="/src/assets/operation-description.png" style="width: 100px; height: 25px" />
      </el-space>
    </template>
    <template #default>
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
          <el-select v-model="upgradeOrderFirst" filterable multiple style="width: 100%">
            <template v-for="item of upgradeOrderFirstOptions">
              <el-option :label="item" :value="item" />
            </template>
          </el-select>
        </el-form-item>
        <!-- upgradeOrder.last 属性 -->
        <el-form-item label="upgradeOrder.last">
          <el-select v-model="upgradeOrderLast" filterable multiple style="width: 100%">
            <template v-for="item of upgradeOrderLastOptions">
              <el-option :label="item" :value="item" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>
