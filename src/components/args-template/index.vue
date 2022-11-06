<script lang="ts" setup>
import { fetchFileList, type IArgsTemplate } from '@/api/json'
import { Download } from '@element-plus/icons-vue'
import FileSaver from 'file-saver'
import { onMounted } from 'vue'
import AllParams from './AllParams.vue'
import CommonEnvs from './CommonEnvs.vue'
import Desc from './Desc.vue'
import ShellParams from './ShellParams.vue'
import { state } from './store'
import TemplateName from './TemplateName.vue'

// 加载数据
onMounted(() => fetchFileList<IArgsTemplate>('argsTemplate').then(data => (state.list = data)))

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
    <template #header>
      <el-select v-model="state.current">
        <el-option v-for="item in state.list" :key="item.filename" :label="item.filename" :value="item" />
      </el-select>
      <el-button :icon="Download" circle @click="handleExport()"></el-button>
    </template>
    <el-form label-width="100px">
      <el-form-item label="templateName">
        <TemplateName />
      </el-form-item>
      <el-form-item label="desc">
        <Desc />
      </el-form-item>
      <el-form-item label="shellParams">
        <ShellParams />
      </el-form-item>
      <el-form-item label="commonEnvs">
        <CommonEnvs />
      </el-form-item>
      <el-form-item label="allParams">
        <AllParams />
      </el-form-item>
    </el-form>
  </el-card>
</template>
