<script lang="tsx" setup>
import { ARGS_TEMPLATE_STATE } from '@/store'
import { computed } from 'vue'

const templateName = computed<string>({
  get: () => (ARGS_TEMPLATE_STATE.current ? ARGS_TEMPLATE_STATE.current.json.templateName : ''),
  set: value => ARGS_TEMPLATE_STATE.current && (ARGS_TEMPLATE_STATE.current.json.templateName = value)
})
</script>

<template>
  <el-input v-model="templateName" spellcheck="false" />
</template>
