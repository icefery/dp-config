<script lang="ts" setup>
import type { IPortMng } from '@/api/json'
import { PORT_MNG_STATE } from '@/store'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'

interface Scope {
  row: IPortMng['json']['portRange'][number]
  $index: number
}

const handleDelete = (index: number) => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portRange.splice(index, 1)
  }
}
const handleAdd = () => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portRange.push({ key: '', range: '' })
  }
}
</script>

<template>
  <el-table :data="PORT_MNG_STATE.current?.json.portRange" border max-height="300px" scrollbar-always-on>
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
        <el-input v-model="scope.row.key" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="range" prop="range">
      <template #default="scope: Scope">
        <el-input v-model="scope.row.range" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
