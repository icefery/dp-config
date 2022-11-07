<script lang="ts" setup>
import { DEPLOY_DETAILS_STATE } from '@/store'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElInputNumber, ElOption, ElSelect, ElSwitch, ElTable, ElTableColumn } from 'element-plus'

// 删除
const handleDelete = (index: number) => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployDetails.splice(index, 1)
  }
}

// 增加
const handleAdd = () => {
  if (DEPLOY_DETAILS_STATE.current) {
    DEPLOY_DETAILS_STATE.current.json.deployDetails.push({
      serviceName: '',
      templateJson: '',
      netMode: 'host',
      calicoYaml: '',
      calicoArgs: '',
      preShell: '',
      minMemory: '',
      priorityClass: 'high-priority',
      limitsMemory: '',
      templateYaml: '',
      imageTag: '',
      minDeployNumber: 0,
      sameNodeScale: false,
      diffNodeScale: false,
      hasCfgFlag: false,
      waitTime: 0
    })
  }
}
</script>

<template>
  <el-table :data="DEPLOY_DETAILS_STATE.current?.json.deployDetails" border max-height="300px" scrollbar-always-on>
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
    <el-table-column align="center" label="templateJson" prop="templateJson" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.templateJson" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="netMode" prop="netMode" width="150">
      <template #default="scope">
        <el-select v-model="scope.row.netMode">
          <el-option label="host" value="host" />
          <el-option label="calico" value="calico" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="calicoYaml" prop="calicoYaml" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.calicoYaml" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="calicoArgs" prop="calicoArgs" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.calicoArgs" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="preShell" prop="preShell" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.preShell" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="minMemory" prop="minMemory" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.minMemory" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="priorityClass" prop="priorityClass" width="150">
      <template #default="scope">
        <el-select v-model="scope.row.priorityClass">
          <el-option label="high-priority" value="high-priority" />
          <el-option label="low-priority" value="low-priority" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" label="limitsMemory" prop="limitsMemory" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.limitsMemory" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="templateYaml" prop="templateYaml" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.templateYaml" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="imageTag" prop="imageTag" width="150">
      <template #default="scope">
        <el-input v-model="scope.row.imageTag" spellcheck="false"></el-input>
      </template>
    </el-table-column>
    <el-table-column align="center" label="minDeployNumber" prop="minDeployNumber" width="150">
      <template #default="scope">
        <el-input-number v-model="scope.row.waitTime" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="sameNodeScale" prop="sameNodeScale" width="150">
      <template #default="scope">
        <el-switch v-model="scope.row.sameNodeScale" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="diffNodeScale" prop="diffNodeScale" width="150">
      <template #default="scope">
        <el-switch v-model="scope.row.diffNodeScale" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="hasCfgFlag" prop="hasCfgFlag" width="150">
      <template #default="scope">
        <el-switch v-model="scope.row.hasCfgFlag" />
      </template>
    </el-table-column>
    <el-table-column align="center" label="waitTime" prop="waitTime" width="150">
      <template #default="scope">
        <el-input-number v-model="scope.row.waitTime" />
      </template>
    </el-table-column>
  </el-table>
</template>
