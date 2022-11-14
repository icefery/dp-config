<script lang="tsx" setup>
import { ARGS_TEMPLATE_STATE } from '@/store'
import { ElInput } from 'element-plus'
import { computed } from 'vue'

const commonEnvs = computed<string>({
  get: () => {
    if (ARGS_TEMPLATE_STATE.current) {
      if (ARGS_TEMPLATE_STATE.current.json.commonEnvs) {
        return ARGS_TEMPLATE_STATE.current.json.commonEnvs.join(',')
      }
    }
    return ''
  },
  set: value => {
    if (ARGS_TEMPLATE_STATE.current) {
      ARGS_TEMPLATE_STATE.current.json.commonEnvs = value.split(',')
    }
  }
})
</script>

<template>
  <el-input v-model="commonEnvs" spellcheck="false" />
</template>
