<script lang="ts" setup>
import type { IPortMng } from '@/api/json'
import { findJSON } from '@/api/json'
import { state } from '@/components/port-mng/store'
import { Download } from '@element-plus/icons-vue'
import FileSaver from 'file-saver'
import { onMounted } from 'vue'
import PortNodeDiff from './PortNodeDiff.vue'
import PortPreAssign from './PortPreAssign.vue'
import PortRange from './PortRange.vue'
import PortStep from './PortStep.vue'

// 加载数据
onMounted(() => findJSON<IPortMng>('portMng').then(data => (state.list = data)))

// 导出文件
const handleExport = () => {
  if (state.current) {
    const blob = new Blob([JSON.stringify(state.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, state.current.filename)
  }
}
</script>

<template>
  <el-card>
    <!-- header 插槽 -->
    <template #header>
      <el-select v-model="state.current">
        <template v-for="it of state.list">
          <el-option v-for="item in state.list" :key="item.filename" :label="item.filename" :value="item" />
        </template>
      </el-select>
      <el-button :icon="Download" @click="handleExport()" />
    </template>
    <!-- default 插槽-->
    <template #default>
      <el-form label-width="100px">
        <el-form-item label="portPreAssign">
          <PortPreAssign />
        </el-form-item>
        <el-form-item label="portRange">
          <PortRange />
        </el-form-item>
        <el-form-item label="portStep">
          <PortStep />
        </el-form-item>
        <el-form-item label="portNodeDiff">
          <PortNodeDiff />
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>
