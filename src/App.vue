<script lang="ts" setup>
import DeployDetails from './components/deploy-details/deploy-details.vue'
import PortMng from './components/port-mng/PortMng'
import ArgsTemplate from './components/args-template/ArgsTemplate'
</script>

<template>
  <el-config-provider size="small">
    <el-container>
      <el-aside>Aside</el-aside>
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
