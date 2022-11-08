<script lang="tsx" setup>
import type { IArgsTemplate } from '@/api/json'
import { ARGS_TEMPLATE_STATE } from '@/store'
import { Delete, Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { and } from '../../utils/validation'
import ValidationFailure from '../validation/ValidationFailure'
import ValidationSuccess from '../validation/ValidationSuccess'

interface IAllParamsScope {
  row: IArgsTemplate['json']['allParams'][number]
  $index: number
}

interface IRulesScope {
  row: IArgsTemplate['json']['allParams'][number]['rules'][number]
  $index: number
}

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
      <template #default="allParamsScope: IAllParamsScope">
        <el-button :icon="Delete" circle type="danger" @click="handleAllParamsDelete(allParamsScope.$index)" />
      </template>
    </el-table-column>
    <!-- allParams 展开列 -->
    <el-table-column align="center" label="rules" prop="rules" type="expand">
      <template #default="allParamsScope: IAllParamsScope">
        <el-table :data="allParamsScope.row.rules" border max-height="300px" scrollbar-always-on>
          <!-- rules 占位列 -->
          <el-table-column align="center" fixed="left" width="50"></el-table-column>
          <!-- 操作列 -->
          <el-table-column align="center" fixed="left" width="50">
            <template #header>
              <el-button :icon="Plus" circle type="primary" @click="handleRulesAdd(allParamsScope.$index)" />
            </template>
            <template #default="rulesScope: IRulesScope">
              <el-button :icon="Delete" circle type="danger" @click="handleRulesDelete(allParamsScope.$index, rulesScope.$index)" />
            </template>
          </el-table-column>
          <!-- rules 数据列 -->
          <el-table-column label="from" prop="from" width="150">
            <template #default="rulesScope: IRulesScope">
              <el-input v-model="rulesScope.row.from" />
            </template>
          </el-table-column>
          <el-table-column label="key" prop="key" width="150">
            <template #default="rulesScope: IRulesScope">
              <el-input v-model="rulesScope.row.key" />
            </template>
          </el-table-column>
          <el-table-column label="content" prop="content" width="150">
            <template #default="rulesScope: IRulesScope">
              <el-input v-model="rulesScope.row.content" />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <!-- allParams 数据列 -->
    <el-table-column align="center" label="key" prop="key" width="250">
      <template #default="scope: IAllParamsScope">
        <el-input v-model="scope.row.key" :suffix-icon="allParamsKeyStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="const" prop="const" width="150">
      <template #default="scope: IAllParamsScope">
        <el-switch v-model="scope.row.const" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="value" prop="value">
      <template #default="scope: IAllParamsScope">
        <el-input v-model="scope.row.value" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
