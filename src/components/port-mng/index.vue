<script lang="ts" setup>
import { PORT_MNG_STATE, SHARED_CONFIG_LIST } from '@/store'
import { Download } from '@element-plus/icons-vue'
import FileSaver from 'file-saver'
import PortNodeDiff from './PortNodeDiff.vue'
import PortNodeSame from './PortNodeSame.vue'
import PortPreAssign from './PortPreAssign.vue'
import PortRange from './PortRange.vue'
import PortStep from './PortStep.vue'

// 导出文件
const handleExport = () => {
  if (PORT_MNG_STATE.current) {
    const blob = new Blob([JSON.stringify(PORT_MNG_STATE.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, PORT_MNG_STATE.current.name)
  }
}
</script>

<template>
  <el-card>
    <!-- header 插槽 -->
    <template #header>
      <el-select v-model="PORT_MNG_STATE.current">
        <el-option v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'portMng')" :key="item.name" :label="item.name" :value="item" />
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
        <el-form-item label="portNodeSame">
          <PortNodeSame />
        </el-form-item>
      </el-form>
    </template>
  </el-card>
</template>
