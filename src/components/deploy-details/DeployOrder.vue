<script lang="ts" setup>
import { DEPLOY_DETAILS_STATE } from '@/store'
import { Delete, Plus } from '@element-plus/icons-vue'

// 删除
const handleDelete = (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployOrder.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    // 求数据中最大的 order
    const order = DEPLOY_DETAILS_STATE.current?.json.deployOrder.map(it => it.order).reduce((max, curr) => (max > curr ? max : curr), 0)
    DEPLOY_DETAILS_STATE.current.json.deployOrder.push({ serviceName: '', mustSucceed: false, order: order + 1 })
  }
}
</script>

<template>
  <el-table :data="DEPLOY_DETAILS_STATE.current?.json.deployOrder" border max-height="300px" scrollbar-always-on>
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
  </el-table>
</template>
