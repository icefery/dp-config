<script lang="tsx" setup>
import type { IPortMng } from '@/api/json'
import { DEPLOY_DETAILS_STATE, PORT_MNG_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'
import { computed } from 'vue'
import ValidationFailure from '../validation/ValidationFailure'
import ValidationSuccess from '../validation/ValidationSuccess'

// 删除
const handleDelete = (index: number) => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portPreAssign.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portPreAssign.unshift({ portType: '', calicoPortType: '', serviceName: '' })
  }
}

// portType 禁用状态
const portTypeDisabled = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portPreAssign[index]
    const [deployDetail] = DEPLOY_DETAILS_STATE.current.json.deployDetails.filter(it => it.serviceName === row.serviceName)
    if (deployDetail && deployDetail.netMode === 'calico') {
      return true
    }
  }
  return false
})

// portType 禁用状态
const calicoPortTypeDisabled = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portPreAssign[index]
    const [deployDetail] = DEPLOY_DETAILS_STATE.current.json.deployDetails.filter(it => it.serviceName === row.serviceName)
    if (deployDetail && deployDetail.netMode === 'host') {
      return true
    }
  }
  return false
})

// serviceName 校验
const serviceNameStatus = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portPreAssign[index]
    const condition = DEPLOY_DETAILS_STATE.current.json.deployDetails.findIndex(it => it.serviceName === row.serviceName) >= 0
    if (!condition) {
      return <ValidationFailure />
    }
  }
  return <ValidationSuccess />
})

// portType 校验
const portTypeStatus = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portPreAssign[index]
    const [deployDetail] = DEPLOY_DETAILS_STATE.current.json.deployDetails.filter(it => it.serviceName === row.serviceName)
    if (deployDetail && deployDetail.netMode === 'calico') {
      return <ValidationSuccess />
    }
    if (!row.portType) {
      return <ValidationSuccess />
    }
    for (const pt of row.portType.split(',')) {
      const existing = PORT_MNG_STATE.current.json.portRange.findIndex(it => it.key === pt) >= 0
      if (!existing) {
        return <ValidationFailure />
      }
    }
  }
  return <ValidationSuccess />
})

// calicoPortType 校验
const calicoPortTypeStatus = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portPreAssign[index]
    const [deployDetail] = DEPLOY_DETAILS_STATE.current.json.deployDetails.filter(it => it.serviceName === row.serviceName)
    if (deployDetail && deployDetail.netMode === 'host') {
      return <ValidationSuccess />
    }
    if (!row.calicoPortType) {
      return <ValidationSuccess />
    }
    for (const pt of row.calicoPortType.split(',')) {
      const existing = PORT_MNG_STATE.current.json.portRange.findIndex(it => it.key === pt) >= 0
      if (!existing) {
        return <ValidationFailure />
      }
    }
  }
  return <ValidationSuccess />
})

const serviceNameOptions = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current && DEPLOY_DETAILS_STATE.current) {
    const a = DEPLOY_DETAILS_STATE.current.json.deployDetails.map(it => it.serviceName)
    const b = PORT_MNG_STATE.current.json.portPreAssign.filter((it, idx) => idx !== index).map(it => it.serviceName)
    return a.filter(it => !b.includes(it))
  }
  return []
})
</script>

<template>
  <el-table :data="PORT_MNG_STATE.current?.json.portPreAssign" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column label="serviceName" prop="serviceName" width="150">
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-select v-model="scope.row.serviceName">
          <template v-for="item of serviceNameOptions(scope.$index)">
            <el-option :label="item" :value="item" />
          </template>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="calicoPortType" prop="calicoPortType" width="300">
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-input v-model="scope.row.calicoPortType" :disabled="calicoPortTypeDisabled(scope.$index)" :suffix-icon="calicoPortTypeStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="portType" prop="portType">
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-input v-model="scope.row.portType" :disabled="portTypeDisabled(scope.$index)" :suffix-icon="portTypeStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
