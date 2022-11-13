<script lang="tsx" setup>
import type { IArgsTemplate } from '@/api/json'
import { ARGS_TEMPLATE_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElCol, ElForm, ElInput, ElRow, ElTable, ElTableColumn } from 'element-plus'
import { computed, ref } from 'vue'

const handleDelete = (index: number) => {
  if (ARGS_TEMPLATE_STATE.current) {
    ARGS_TEMPLATE_STATE.current.json.serviceEnvs.splice(index, 1)
  }
}

const handleAdd = () => {
  if (ARGS_TEMPLATE_STATE.current) {
    const todo = { serviceName: '', envs: [], preShellEnvs: [] }
    if (ARGS_TEMPLATE_STATE.current.json.serviceEnvs) {
      type A = IArgsTemplate['json']['serviceEnvs'][number]
      ARGS_TEMPLATE_STATE.current.json.serviceEnvs.push(todo)
    } else {
      ARGS_TEMPLATE_STATE.current.json.serviceEnvs = [todo]
    }
  }
}

const currentServiceEnvs = ref<IArgsTemplate['json']['serviceEnvs'][number]>()

const serviceName = computed<string>({
  get: () => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      return currentServiceEnvs.value.serviceName
    }
    return ''
  },
  set: value => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      currentServiceEnvs.value.serviceName = value
    }
  }
})

const envs = computed<string>({
  get: () => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      if (currentServiceEnvs.value.envs) {
        return currentServiceEnvs.value.envs.join(',')
      }
    }
    return ''
  },
  set: value => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      currentServiceEnvs.value.envs = value.split(',')
    }
  }
})

const preShellEnvs = computed<string>({
  get: () => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      if (currentServiceEnvs.value.preShellEnvs) {
        return currentServiceEnvs.value.preShellEnvs.join(',')
      }
    }
    return ''
  },
  set: value => {
    if (ARGS_TEMPLATE_STATE.current && currentServiceEnvs.value) {
      currentServiceEnvs.value.preShellEnvs = value.split(',')
    }
  }
})

const handleCurrentChange = (currentRow: IArgsTemplate['json']['serviceEnvs'][number], oldRow: IArgsTemplate['json']['serviceEnvs'][number]) => {
  currentServiceEnvs.value = currentRow
}
</script>

<template>
  <el-row style="width: 100%">
    <el-col :span="6">
      <el-table :data="ARGS_TEMPLATE_STATE.current?.json.serviceEnvs" border highlight-current-row max-height="300px" scrollbar-always-on @current-change="handleCurrentChange">
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
        <el-table-column align="center" label="serviceName" prop="serviceName">
          <template #default="scope: IScope<IArgsTemplate['json']['serviceEnvs'][number]>">
            <el-input v-model="scope.row.serviceName" disabled spellcheck="false" />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="18">
      <template v-if="currentServiceEnvs">
        <el-form label-width="100px">
          <el-form-item label="serviceName">
            <el-input v-model="serviceName" spellcheck="false" style="width: 100%" />
          </el-form-item>
          <el-form-item label="envs">
            <el-input v-model="envs" spellcheck="false" style="width: 100%" />
          </el-form-item>
          <el-form-item label="preShellEnvs">
            <el-input v-model="preShellEnvs" spellcheck="false" style="width: 100%" />
          </el-form-item>
        </el-form>
      </template>
    </el-col>
  </el-row>
</template>
