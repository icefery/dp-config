<script lang="jsx" setup>
import { SHARED_CONFIG_LIST, YAML_STATE } from '@/store'

import { Download } from '@element-plus/icons-vue'
import { ElCard, ElOption, ElSelect } from 'element-plus'
import FileSaver from 'file-saver'
import MonacoEditor from 'monaco-editor-vue3'

const options = {
  theme: 'vs',
  tabSize: 2,
  language: 'yaml',
  showFoldingControls: 'always',
  minimap: {
    enabled: false
  }
}

// 导出文件
const handleExport = () => {
  if (YAML_STATE.current) {
    const blob = new Blob([YAML_STATE.current.fileString], { type: 'text/yaml' })
    FileSaver.saveAs(blob, YAML_STATE.current.name)
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <el-select v-model="YAML_STATE.current" value-key="name">
        <template v-for="item of SHARED_CONFIG_LIST.filter(it => it.module === 'customYaml')" :key="item.name">
          <el-option :label="item.name" :value="item" />
        </template>
      </el-select>
      <el-button :icon="Download" circle @click="handleExport()" />
    </template>
    <template #default>
      <template v-if="YAML_STATE.current">
        <MonacoEditor v-model:value="YAML_STATE.current.fileString" :options="options" language="javascript" style="width: 100%; height: 1000px" theme="vs" />
      </template>
    </template>
  </el-card>
</template>
