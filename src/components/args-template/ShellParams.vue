<script lang="ts" setup>
import { ARGS_TEMPLATE_STATE } from '@/store'
import { ElInput } from 'element-plus'
import { computed } from 'vue'

const shellParams = computed<string>({
  get: () => (ARGS_TEMPLATE_STATE.current ? ARGS_TEMPLATE_STATE.current.json.shellParams.join(',') : ''),
  set: value => ARGS_TEMPLATE_STATE.current && (ARGS_TEMPLATE_STATE.current.json.shellParams = value.split(','))
})
</script>

<template>
  <el-input v-model="shellParams" />
</template>
