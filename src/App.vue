<script lang="tsx" setup>
import ArgsTemplate from './components/args-template/index.vue'
import DeployDetails from './components/deploy-details/index.vue'
import FileManager from './components/file-manager/index.vue'
import PortMng from './components/port-mng/index.vue'
import YamlEditor from './components/yaml-editor/index.vue'
</script>

<template>
  <el-config-provider size="small">
    <el-container>
      <el-aside>
        <FileManager />
      </el-aside>
      <el-main>
        <el-tabs style="height: 100%" type="border-card">
          <el-tab-pane label="deployDetails">
            <DeployDetails />
          </el-tab-pane>
          <el-tab-pane label="portMng">
            <PortMng />
          </el-tab-pane>
          <el-tab-pane label="argsTemplate">
            <ArgsTemplate />
          </el-tab-pane>
          <el-tab-pane label="yaml-editor">
            <YamlEditor />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-config-provider>
</template>
