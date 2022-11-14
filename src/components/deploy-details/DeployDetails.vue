<script lang="tsx" setup>
import type { IDeployDetails } from '@/api/json'
import ValidationFailure from '@/components/validation/ValidationFailure'
import ValidationSuccess from '@/components/validation/ValidationSuccess'
import { DEPLOY_DETAILS_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { and } from '@/utils/validation'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElInputNumber, ElOption, ElSelect, ElSwitch, ElTable, ElTableColumn } from 'element-plus'
import { computed } from 'vue'

// 删除
const handleDelete = (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployDetails.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployDetails.unshift({
      serviceName: '',
      templateJson: '',
      netMode: 'host',
      calicoYaml: '',
      calicoArgs: '',
      preShell: '',
      minMemory: '',
      priorityClass: 'high-priority',
      limitsMemory: '',
      templateYaml: '',
      imageTag: '',
      minDeployNumber: 0,
      sameNodeScale: false,
      diffNodeScale: false,
      hasCfgFlag: false,
      waitTime: 0
    })
  }
}

// serviceName 校验
const serviceNameStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    const others = DEPLOY_DETAILS_STATE.current.json.deployDetails.filter((it, idx) => idx !== index)
    const condition = and([
      row.serviceName !== '', // service 非空
      row.serviceName.charCodeAt(0) >= 97 && row.serviceName.charCodeAt(0) <= 122, // 首字母小写
      others.findIndex(it => it.serviceName === row.serviceName) === -1 // 唯一
    ])
    if (!condition) {
      DEPLOY_DETAILS_STATE.exportable = false
      return <ValidationFailure />
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// templateJson 校验
const templateJsonStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    if (row.netMode === 'host') {
      const condition = and([row.templateJson !== ''])
      if (!condition) {
        DEPLOY_DETAILS_STATE.exportable = false
        return <ValidationFailure />
      }
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// templateYaml 校验
const templateYamlStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    if (row.netMode === 'host') {
      const condition = and([row.templateYaml !== ''])
      if (!condition) {
        DEPLOY_DETAILS_STATE.exportable = false
        return <ValidationFailure />
      }
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// calicoArgs 校验
const calicoArgsStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    if (row.netMode === 'calico') {
      const condition = and([row.calicoArgs !== ''])
      if (!condition) {
        DEPLOY_DETAILS_STATE.exportable = false
        return <ValidationFailure />
      }
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// calicoYaml
const calicoYamlStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    if (row.netMode === 'calico') {
      const condition = and([row.calicoYaml !== ''])
      if (!condition) {
        DEPLOY_DETAILS_STATE.exportable = false
        return <ValidationFailure />
      }
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// minMemory 校验
const minMemoryStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    const condition = and([row.minMemory !== ''])
    if (!condition) {
      DEPLOY_DETAILS_STATE.exportable = false
      return <ValidationFailure />
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// limitsMemory 校验
const limitsMemoryStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    const condition = and([row.limitsMemory !== ''])
    if (!condition) {
      DEPLOY_DETAILS_STATE.exportable = false
      return <ValidationFailure />
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})

// imageTag 校验
const imageTagStatus = computed(() => (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    const row = DEPLOY_DETAILS_STATE.current.json.deployDetails[index]
    const condition = and([row.imageTag !== ''])
    if (!condition) {
      DEPLOY_DETAILS_STATE.exportable = false
      return <ValidationFailure />
    }
  }
  DEPLOY_DETAILS_STATE.exportable = true
  return <ValidationSuccess />
})
</script>

<template>
  <el-table :data="DEPLOY_DETAILS_STATE.current?.json.deployDetails" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column align="center" label="serviceName" prop="serviceName" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.serviceName" :suffix-icon="serviceNameStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="netMode" prop="netMode" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-select v-model="scope.row.netMode">
          <el-option label="host" value="host" />
          <el-option label="calico" value="calico" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="templateJson" prop="templateJson" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.templateJson" :suffix-icon="templateJsonStatus(scope.$index)" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="templateYaml" prop="templateYaml" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.templateYaml" :suffix-icon="templateYamlStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="calicoYaml" prop="calicoYaml" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.calicoYaml" :suffix-icon="calicoYamlStatus(scope.$index)" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="calicoArgs" prop="calicoArgs" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.calicoArgs" :suffix-icon="calicoArgsStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="preShell" prop="preShell" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.preShell" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="minMemory" prop="minMemory" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.minMemory" :suffix-icon="minMemoryStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="priorityClass" prop="priorityClass" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-select v-model="scope.row.priorityClass">
          <el-option label="high-priority" value="high-priority" />
          <el-option label="low-priority" value="low-priority" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="limitsMemory" prop="limitsMemory" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.limitsMemory" :suffix-icon="limitsMemoryStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="imageTag" prop="imageTag" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input v-model="scope.row.imageTag" :suffix-icon="imageTagStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="minDeployNumber" prop="minDeployNumber" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input-number v-model="scope.row.waitTime" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="sameNodeScale" prop="sameNodeScale" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-switch v-model="scope.row.sameNodeScale" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="diffNodeScale" prop="diffNodeScale" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-switch v-model="scope.row.diffNodeScale" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="hasCfgFlag" prop="hasCfgFlag" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-switch v-model="scope.row.hasCfgFlag" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="waitTime" prop="waitTime" width="150">
      <template #default="scope: IScope<IDeployDetails['json']['deployDetails'][number]>">
        <el-input-number v-model="scope.row.waitTime" />
      </template>
    </el-table-column>
  </el-table>
</template>
