<script lang="tsx" setup>
import type { IArgsTemplate } from '@/api/json'
import { ARGS_TEMPLATE_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'

const handleDelete = (index: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.serviceEnvs.splice(index, 1)
  }
}

const handleAdd = () => {
  if (ARGS_TEMPLATE_STATE.current) {
    const todo = { serviceName: '', envs: [], preShellEnvs: [] }
    if (ARGS_TEMPLATE_STATE.current.json.serviceEnvs) {
      ARGS_TEMPLATE_STATE.current.json.serviceEnvs.push(todo)
    } else {
      ARGS_TEMPLATE_STATE.current.json.serviceEnvs = [todo]
    }
  }
}
</script>

<template>
  <el-table :data="ARGS_TEMPLATE_STATE.current?.json.serviceEnvs" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope: IScope<IArgsTemplate['json']['serviceEnvs'][number]>">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column label="serviceName" prop="serviceName" width="150">
      <template #default="scope: IScope<IArgsTemplate['json']['serviceEnvs'][number]>">
        <el-input v-model="scope.row.serviceName" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="envs" prop="envs">
      <template #default="scope: IScope<IArgsTemplate['json']['serviceEnvs'][number]>">
        <el-input v-model="scope.row.envs" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="preShellEnvs" prop="preShellEnvs">
      <template #default="scope: IScope<IArgsTemplate['json']['serviceEnvs'][number]>">
        <el-input v-model="scope.row.preShellEnvs" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
