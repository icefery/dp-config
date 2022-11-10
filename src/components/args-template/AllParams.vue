<script lang="tsx" setup>
import type { IArgsTemplate } from '@/api/json'
import ValidationFailure from '@/components/validation/ValidationFailure'
import ValidationSuccess from '@/components/validation/ValidationSuccess'
import { ARGS_TEMPLATE_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { and } from '@/utils/validation'
import { Delete, Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'

// allParams 删除
const handleAllParamsDelete = (allParamsIndex: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.allParams.splice(allParamsIndex, 1)
  }
}

// allParams 增加
const handleAllParamsAdd = () => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.allParams.push({ key: '', const: false, value: '', rules: [] })
  }
}

// rules 删除
const handleRulesDelete = (allParamsIndex: number, rulesIndex: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    if (ARGS_TEMPLATE_STATE.current.json.allParams[allParamsIndex].rules) {
      ARGS_TEMPLATE_STATE.current.json.allParams[allParamsIndex].rules.splice(rulesIndex, 1)
    }
  }
}

// rules 增加
const handleRulesAdd = (allParamsIndex: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    if (ARGS_TEMPLATE_STATE.current.json.allParams[allParamsIndex].rules) {
      ARGS_TEMPLATE_STATE.current.json.allParams[allParamsIndex].rules.push({ from: '', key: '', content: '' })
    } else {
      ARGS_TEMPLATE_STATE.current.json.allParams[allParamsIndex].rules = [{ from: '', key: '', content: '' }]
    }
  }
}

// allParamsKey 校验
const allParamsKeyStatus = computed(() => (index: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    const row = ARGS_TEMPLATE_STATE.current.json.allParams[index]
    const others = ARGS_TEMPLATE_STATE.current.json.allParams.filter((it, idx) => idx !== index)
    const condition = and([
      row.key !== '', // 非空
      others.findIndex(it => it.key === row.key) === -1 // 唯一
    ])
    if (!condition) {
      return <ValidationFailure />
    }
  }
  return <ValidationSuccess />
})
</script>

<template>
  <el-table :data="ARGS_TEMPLATE_STATE.current?.json.allParams" border max-height="300px" scrollbar-always-on>
    <!-- allParams 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAllParamsAdd()" />
      </template>
      <template #default="allParamsScope: IScope<IArgsTemplate['json']['allParams'][number]>">
        <el-button :icon="Delete" circle type="danger" @click="handleAllParamsDelete(allParamsScope.$index)" />
      </template>
    </el-table-column>
    <!-- allParams 数据列 -->
    <el-table-column align="center" label="key" prop="key" width="250">
      <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
        <el-input v-model="scope.row.key" :suffix-icon="allParamsKeyStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="const" prop="const" width="150">
      <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
        <el-switch v-model="scope.row.const" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="value" prop="value">
      <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
        <el-input v-model="scope.row.value" spellcheck="false" />
      </template>
    </el-table-column>
    <!-- allParams 展开列 -->
    <el-table-column align="center" label="rules" prop="rules" type="expand">
      <template #default="allParamsScope: IScope<IArgsTemplate['json']['allParams'][number]>">
        <el-table :data="allParamsScope.row.rules" border max-height="300px" scrollbar-always-on>
          <!-- rules 占位列 -->
          <el-table-column align="center" fixed="left" width="50" />
          <!-- 操作列 -->
          <el-table-column align="center" fixed="left" width="50">
            <template #header>
              <el-button :icon="Plus" circle type="primary" @click="handleRulesAdd(allParamsScope.$index)" />
            </template>
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-button :icon="Delete" circle type="danger" @click="handleRulesDelete(allParamsScope.$index, rulesScope.$index)" />
            </template>
          </el-table-column>
          <!-- rules 数据列 -->
          <el-table-column align="center" label="from" prop="from" width="150">
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-select v-model="rulesScope.row.from">
                <el-option label="codeMap" value="codeMap" />
                <el-option label="properties" value="properties" />
                <el-option label="sql" value="sql" />
                <el-option label="serviceAttr" value="serviceAttr" />
                <el-option label="portFile" value="portFile" />
                <el-option label="portsFile" value="portsFile" />
                <el-option label="servicesPort" value="servicesPort" />
                <el-option label="ipPortAttr" value="ipPortAttr" />
                <el-option label="const" value="const" />
                <el-option label="specialIpPort" value="specialIpPort" />
                <el-option label="deployDetailAttr" value="deployDetailAttr" />
                <el-option label="valueFrom" value="valueFrom" />
                <el-option label="onePort" value="onePort" />
                <el-option label="nginxSpecialHandle" value="nginxSpecialHandle" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="key" prop="key" width="250">
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-input v-model="rulesScope.row.key" spellcheck="false" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="content" prop="content" width="250">
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-input v-model="rulesScope.row.content" spellcheck="false" />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
  </el-table>
</template>
