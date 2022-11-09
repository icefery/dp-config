<script lang="tsx" setup>
import type { IPortMng } from '@/api/json'
import { PORT_MNG_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'

const handleDelete = (index: number) => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portStep.splice(index, 1)
  }
}
const handleAdd = () => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portStep.push({ key: '', step: '' })
  }
}
</script>

<template>
  <el-table :data="PORT_MNG_STATE.current?.json.portStep" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column label="key" prop="key" width="150">
      <template #default="scope: IScope<IPortMng['json']['portStep'][number]>">
        <el-input v-model="scope.row.key" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="step" prop="step">
      <template #default="scope: IScope<IPortMng['json']['portStep'][number]>">
        <el-input v-model="scope.row.step" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
