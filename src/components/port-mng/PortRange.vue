<script lang="ts" setup>
import type { IPortMng } from '@/api/json'
import { state } from '@/components/port-mng/store'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'

interface Scope {
  row: IPortMng['portRange'][number]
  $index: number
}

const handleDelete = (index: number) => {
  if (state.current) {
    state.current.json.portRange.splice(index, 1)
  }
}
const handleAdd = () => {
  if (state.current) {
    state.current.json.portRange.push({ key: '', range: '' })
  }
}
</script>

<template>
  <el-table :data="state.current?.json.portRange" border max-height="300px" scrollbar-always-on>
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
      <template #default="scope: Scope">
        <el-input v-model="scope.row.key" />
      </template>
    </el-table-column>
    <el-table-column label="range" prop="range">
      <template #default="scope: Scope">
        <el-input v-model="scope.row.range" />
      </template>
    </el-table-column>
  </el-table>
</template>
