<script lang="tsx" setup>
import { onMounted, reactive } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { Delete, Download, Plus } from '@element-plus/icons-vue'
import { type ConfigFile, findJSON } from '@/api/json'

interface State {
  list: ConfigFile[]
  current: ConfigFile | null
}

const state = reactive<State>({ list: [], current: null })

onMounted(() => findJSON('deployDetails').then(data => (state.list = data)))
</script>

<template>
  <el-card>
    <template #header>
      <!-- 选择文件 -->
      <el-select v-model="state.current">
        <el-option v-for="item in state.list" :key="item.filename" :label="item.filename" :value="item" />
      </el-select>
      <!-- 导出 -->
      <el-button :icon="Download" circle></el-button>
    </template>

    <el-form label-width="100px">
      <!-- deployOrder 属性 -->
      <el-form-item label="deployOrder">
        <el-table :data="state.current?.json.deployOrder" border max-height="500px" scrollbar-always-on>
          <el-table-column label="serviceName" prop="serviceName" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.serviceName" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="mustSucceed" prop="mustSucceed" width="150">
            <template #default="scope">
              <el-switch v-model="scope.row.mustSucceed" />
            </template>
          </el-table-column>
          <el-table-column label="order" prop="order">
            <template #default="scope">
              <el-input-number v-model="scope.row.order" />
            </template>
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column align="center" fixed="left" width="50">
            <template #header>
              <el-button :icon="Plus" circle type="primary" />
            </template>
            <template #default="scope">
              <el-button :icon="Delete" circle type="danger" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- deployDetails 属性 -->
      <el-form-item label="deployDetails">
        <el-table :data="state.current?.json.deployDetails" border max-height="500px" scrollbar-always-on>
          <el-table-column label="templateJson" prop="templateJson" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.templateJson" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="netMode" prop="netMode" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.netMode" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="calicoYaml" prop="calicoYaml" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.calicoYaml" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="calicoArgs" prop="calicoArgs" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.calicoArgs" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="preShell" prop="preShell" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.preShell" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="minMemory" prop="minMemory" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.minMemory" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="priorityClass" prop="priorityClass" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.priorityClass" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="limitsMemory" prop="limitsMemory" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.limitsMemory" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="templateYaml" prop="templateYaml" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.templateYaml" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="imageTag" prop="imageTag" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.imageTag" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="minDeployNumber" prop="minDeployNumber" width="150">
            <template #default="scope">
              <el-input v-model="scope.row.minDeployNumber" spellcheck="false"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="sameNodeScale" prop="sameNodeScale" width="150">
            <template #default="scope">
              <el-switch v-model="scope.row.sameNodeScale" />
            </template>
          </el-table-column>
          <el-table-column label="diffNodeScale" prop="diffNodeScale" width="150">
            <template #default="scope">
              <el-switch v-model="scope.row.diffNodeScale" />
            </template>
          </el-table-column>
          <el-table-column label="hasCfgFlag" prop="hasCfgFlag" width="150">
            <template #default="scope">
              <el-switch v-model="scope.row.hasCfgFlag" />
            </template>
          </el-table-column>
          <el-table-column label="waitTime" prop="waitTime" width="150">
            <template #default="scope">
              <el-input-number v-model="scope.row.waitTime" />
            </template>
          </el-table-column>
          <!-- 操作列 -->
          <el-table-column align="center" fixed="left" width="50">
            <template #header>
              <el-button :icon="Plus" circle type="primary" />
            </template>
            <template #default="scope">
              <el-button :icon="Delete" circle type="danger" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </el-card>
</template>
