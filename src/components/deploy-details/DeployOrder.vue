<script lang="tsx" setup>
import type { IDeployDetails } from '@/api/json'
import { DEPLOY_DETAILS_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { and } from '@/utils/validation'
import { Delete, Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'
import ValidationFailure from '../validation/ValidationFailure'
import ValidationSuccess from '../validation/ValidationSuccess'

// 删除
const handleDelete = (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployOrder.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    // 求数据中最大的 order
    const order = DEPLOY_DETAILS_STATE.current?.json.deployOrder.map(it => it.order).reduce((max, curr) => (max > curr ? max : curr), 0)
    DEPLOY_DETAILS_STATE.current.json.deployOrder.push({ serviceName: '', mustSucceed: false, order: order + 1 })
  }
}

const serviceNameStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployOrder[index]
    const others = DEPLOY_DETAILS_STATE.current.json.deployOrder.filter((it, idx) => idx !== index)
    const condition = and([
      DEPLOY_DETAILS_STATE.current.json.deployDetails.filter(it => it.serviceName === row.serviceName).length > 0, // serviceName 必须在 deployDetails 中存在
      others.findIndex(it => it.serviceName === row.serviceName) === -1 // 唯一
    ])
    if (!condition) {
      return <ValidationFailure />
    }
  }
  return <ValidationSuccess />
})

const serviceNameOptions = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const a = DEPLOY_DETAILS_STATE.current.json.deployDetails.map(it => it.serviceName)
    const b = DEPLOY_DETAILS_STATE.current.json.deployOrder.filter((it, idx) => idx !== index).map(it => it.serviceName)
    return a.filter(it => !b.includes(it))
  }
  return []
})
</script>

<template>
  <el-table :data="DEPLOY_DETAILS_STATE.current?.json.deployOrder" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope: IScope<IDeployDetails['json']['deployOrder'][number]>">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column align="center" label="serviceName" prop="serviceName" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployOrder'][number]>">
        <el-select v-model="scope.row.serviceName" filterable>
          <template v-for="item of serviceNameOptions(scope.$index)">
            <el-option :label="item" :value="item" />
          </template>
        </el-select>
        <!-- <el-input v-model="scope.row.serviceName" :suffix-icon="serviceNameStatus(scope.$index)" spellcheck="false" /> -->
      </template>
    </el-table-column>
    <el-table-column align="center" label="mustSucceed" prop="mustSucceed" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployOrder'][number]>">
        <el-switch v-model="scope.row.mustSucceed" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="order" prop="order" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployOrder'][number]>">
        <el-input-number v-model="scope.row.order" />
      </template>
    </el-table-column>
  </el-table>
</template>
