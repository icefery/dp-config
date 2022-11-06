<script lang="ts" setup>
import { state } from '@/components/port-mng/store'
import { computed } from 'vue'

const portNodeDiff = computed({
  get: () => (state.current ? state.current.json.portNodeDiff.join(',') : ''),
  set: value => state.current && (state.current.json.portNodeDiff = value.split(','))
})
</script>

<template>
  <el-input v-model="portNodeDiff" />
</template>
