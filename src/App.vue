<script lang="ts" setup>
import ArgsTemplate from './components/args-template/index.vue'
import DeployDetails from './components/deploy-details/index.vue'
import FileManager from './components/file-manager/index.vue'
import PortMng from './components/port-mng/index.vue'
</script>

<template>
  <el-config-provider size="small" spellcheck="false">
    <el-container>
      <el-aside>
        <FileManager />
      </el-aside>
      <el-main>
        <el-tabs type="border-card">
          <el-tab-pane label="deployDetails">
            <DeployDetails></DeployDetails>
          </el-tab-pane>
          <el-tab-pane label="portMng">
            <PortMng />
          </el-tab-pane>
          <el-tab-pane label="argsTemplate">
            <ArgsTemplate />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-config-provider>
</template>
