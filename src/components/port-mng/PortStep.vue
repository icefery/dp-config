<script lang="ts" setup>
import { state } from '@/components/port-mng/store'
import { computed } from 'vue'

const portStep = computed<string>({
  get: () => (state.current ? state.current.json.portStep.join(',') : ''),
  set: value => state.current && (state.current.json.portStep = value.split(','))
})
</script>
<template>
  <el-input v-model="portStep" />
</template>
