<script setup>
import { Delete, Plus } from '@element-plus/icons-vue'
import { state } from './store'

// 删除
const handleDelete = index => {
  if (state.current) {
    state.current.json.deployOrder.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (state.current) {
    // 求数据中最大的 order
    const order = state.current.json.deployOrder.map(it => it.order).reduce((max, curr) => (max > curr ? max : curr), 0)
    state.current.json.deployOrder.push({ serviceName: '', mustSucceed: false, order: order + 1 })
  }
}
</script>

<template>
  <el-table :data="state.current?.json.deployOrder" border max-height="500px" scrollbar-always-on>
    <el-table-column align="center" label="serviceName" prop="serviceName" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.serviceName" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="mustSucceed" prop="mustSucceed" width="150">
      <template #default="scope">
        <el-switch v-model="scope.row.mustSucceed" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="order" prop="order" width="150">
      <template #default="scope">
        <el-input-number v-model="scope.row.order" />
      </template>
    </el-table-column>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
  </el-table>
</template>