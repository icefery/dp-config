<script lang="tsx" setup>
import { PORT_MNG_STATE, SHARED_ASSETS, SHARED_CONFIG_LIST } from '@/store'
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
    const blob = new Blob([JSON.stringify(PORT_MNG_STATE.current.json, null, ' ')], { type: 'text/json' })
    FileSaver.saveAs(blob, PORT_MNG_STATE.current.name)
  }
}
</script>

<template>
  <el-card>
    <!-- header 插槽 -->
    <template #header>
      <el-space>
        <el-select v-model="PORT_MNG_STATE.current" value-key="name">
          <template v-for="item in SHARED_CONFIG_LIST.filter(it => it.module === 'portMng')" :key="item.name">
            <el-option :label="item.name" :value="item" />
          </template>
        </el-select>
        <el-popconfirm title="请务必务必仔细检查!!!" width="200px" @confirm="handleExport()">
          <template #reference>
            <el-button :icon="Download" circle />
          </template>
        </el-popconfirm>
        <el-image :initial-index="4" :preview-src-list="[SHARED_ASSETS.twoPNG]" :src="SHARED_ASSETS.operationDescriptionPNG" fit="cover" style="width: 100px; height: 25px" />
      </el-space>
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
