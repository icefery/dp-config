<script lang="ts" setup>
import { ARGS_TEMPLATE_STATE } from '@/store'
import { ElInput } from 'element-plus'
import { computed } from 'vue'

const desc = computed<string>({
  get: () => (ARGS_TEMPLATE_STATE.current ? ARGS_TEMPLATE_STATE.current.json.desc : ''),
  set: value => ARGS_TEMPLATE_STATE.current && (ARGS_TEMPLATE_STATE.current.json.desc = value)
})
</script>

<template>
  <el-input v-model="desc" spellcheck="false" />
</template>
