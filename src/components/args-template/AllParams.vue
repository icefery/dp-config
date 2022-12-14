<script lang="tsx" setup>
import type { IArgsTemplate } from '@/api/json'
import ValidationFailure from '@/components/validation/ValidationFailure'
import ValidationSuccess from '@/components/validation/ValidationSuccess'
import { ARGS_TEMPLATE_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { and } from '@/utils/validation'
import { Delete, Plus } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

const currentRules = ref<IArgsTemplate['json']['allParams'][number]>()

const rules = computed<IArgsTemplate['json']['allParams'][number]['rules']>({
  get: () => {
    if (ARGS_TEMPLATE_STATE.current && currentRules.value) {
      return currentRules.value.rules
    }
    return []
  },
  set: value => {
    if (ARGS_TEMPLATE_STATE.current && currentRules.value) {
      currentRules.value.rules = value
    }
  }
})

// allParams 删除
const handleAllParamsDelete = (allParamsIndex: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.allParams.splice(allParamsIndex, 1)
  }
}

// allParams 增加
const handleAllParamsAdd = () => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.allParams.unshift({ key: '', const: false, value: '', rules: [] })
  }
}

// rules 删除
const handleRulesDelete = (rulesIndex: number) => {
  if (ARGS_TEMPLATE_STATE.current && currentRules.value) {
    if (currentRules.value.rules) {
      currentRules.value.rules.splice(rulesIndex, 1)
    }
  }
}

// rules 增加
const handleRulesAdd = () => {
  if (ARGS_TEMPLATE_STATE.current && currentRules.value) {
    if (currentRules.value.rules) {
      currentRules.value.rules.unshift({ from: '', key: '', content: '' })
    } else {
      currentRules.value.rules = [{ from: '', key: '', content: '' }]
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

//allParams中可选Key来自于shellParams、commonEnvs、serviceEnvs三部分
const allParamsKeyOptions = computed(() => (index: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    const a = Array.from(
      new Set([
        //获取shellParams中内容
        ...ARGS_TEMPLATE_STATE.current.json.shellParams,
        //获取commonEnvs中内容
        ...ARGS_TEMPLATE_STATE.current.json.commonEnvs,
        //获取serviceEnvs中内容
        ...(ARGS_TEMPLATE_STATE.current.json.serviceEnvs || []).map(it => [...(it.envs || []), ...(it.preShellEnvs || [])]).flatMap(it => [...it])
      ])
    )
    const b = ARGS_TEMPLATE_STATE.current.json.allParams.filter((it, idx) => idx !== index).map(it => it.key)
    return a.filter(it => !b.includes(it))
  }
  return []
})

const handleCurrentChange = (currentRow: IArgsTemplate['json']['allParams'][number], oldRow: IArgsTemplate['json']['allParams'][number]) => {
  if (ARGS_TEMPLATE_STATE.current) {
    currentRules.value = currentRow
  }
}
</script>

<template>
  <el-row :gutter="12" style="width: 100%">
    <el-col :span="12">
      <el-table :data="ARGS_TEMPLATE_STATE.current?.json.allParams" border highlight-current-row max-height="300px" scrollbar-always-on @current-change="handleCurrentChange">
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
        <el-table-column align="center" label="key" prop="key" width="200">
          <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
            <el-select v-model="scope.row.key" filterable="">
              <template v-for="item of allParamsKeyOptions(scope.$index)" :key="item">
                <el-option :label="item" :value="item" />
              </template>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="const" prop="const" width="50">
          <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
            <el-switch v-model="scope.row.const" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="value" prop="value">
          <template #default="scope: IScope<IArgsTemplate['json']['allParams'][number]>">
            <el-input v-model="scope.row.value" :disabled="!scope.row.const" spellcheck="false" />
          </template>
        </el-table-column>
        <!-- allParams 展开列 -->
        <el-table-column align="center" label="rules" width="50">
          <template #default="allParamsScope: IScope<IArgsTemplate['json']['allParams'][number]>">
            <!-- <el-icon>
              <ArrowRightBold />
            </el-icon> -->
            <el-button circle icon="el-icon-search"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="12" style="width: 100%">
      <template v-if="currentRules">
        <el-table :data="rules" border max-height="300px" scrollbar-always-on>
          <!-- 操作列 -->
          <el-table-column align="center" fixed="left" width="50">
            <template #header>
              <el-button :icon="Plus" circle type="primary" @click="handleRulesAdd()" />
            </template>
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-button :icon="Delete" circle type="danger" @click="handleRulesDelete(rulesScope.$index)" />
            </template>
          </el-table-column>
          <!-- rules 数据列 -->
          <el-table-column align="center" label="key" prop="key" width="200">
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-input v-model="rulesScope.row.key" spellcheck="false" />
            </template>
          </el-table-column>
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
          <el-table-column align="center" label="content" prop="content">
            <template #default="rulesScope: IScope<IArgsTemplate['json']['allParams'][number]['rules'][number]>">
              <el-input v-model="rulesScope.row.content" spellcheck="false" />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-empty description="rules" />
      </template>
    </el-col>
  </el-row>
</template>
