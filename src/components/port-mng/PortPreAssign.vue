<script lang="tsx" setup>
import type { IPortMng } from '@/api/json'
import { PORT_MNG_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'

const handleDelete = (index: number) => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portPreAssign.splice(index, 1)
  }
}

const handleAdd = () => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portPreAssign.push({ portType: '', calicoPortType: '', serviceName: '' })
  }
}
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
        <el-input v-model="scope.row.serviceName" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="calicoPortType" prop="calicoPortType" width="300">
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-input v-model="scope.row.calicoPortType" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="portType" prop="portType">
      <template #default="scope: IScope<IPortMng['json']['portPreAssign'][number]>">
        <el-input v-model="scope.row.portType" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
