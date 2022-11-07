<script lang="ts" setup>
import { ARGS_TEMPLATE_STATE } from '@/store'
import { ElInput } from 'element-plus'
import { computed } from 'vue'

const commonEnvs = computed<string>({
  get: () => (ARGS_TEMPLATE_STATE.current ? ARGS_TEMPLATE_STATE.current.json.commonEnvs.join(',') : ''),
  set: value => ARGS_TEMPLATE_STATE.current && (ARGS_TEMPLATE_STATE.current.json.commonEnvs = value.split(','))
})
</script>

<template>
  <el-input v-model="commonEnvs" spellcheck="false" />
</template>
