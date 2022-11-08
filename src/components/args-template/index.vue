<script lang="ts" setup>
import { ARGS_TEMPLATE_STATE, SHARED_CONFIG_LIST } from '@/store'
import { Download } from '@element-plus/icons-vue'
import { ElButton, ElCard, ElForm, ElFormItem, ElOption, ElSelect } from 'element-plus'
import FileSaver from 'file-saver'
import AllParams from './AllParams.vue'
import CommonEnvs from './CommonEnvs.vue'
import Desc from './Desc.vue'
import ServiceEnvs from './ServiceEnvs.vue'
import ShellParams from './ShellParams.vue'
import TemplateName from './TemplateName.vue'

// 导出文件
const handleExport = () => {
  if (ARGS_TEMPLATE_STATE.current) {
    const blob = new Blob([JSON.stringify(ARGS_TEMPLATE_STATE.current.json)], { type: 'text/json' })
    FileSaver.saveAs(blob, ARGS_TEMPLATE_STATE.current.name)
  }
}
</script>

<template>
  <el-card>
    <template #header>
      <el-select v-model="ARGS_TEMPLATE_STATE.current">
        <el-option v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'argsTemplate')" :key="item.name" :label="item.name" :value="item" />
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
      <el-form-item label="serviceEnvs">
        <ServiceEnvs />
      </el-form-item>
      <el-form-item label="allParams">
        <AllParams />
      </el-form-item>
    </el-form>
  </el-card>
</template>
