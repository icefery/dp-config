<script lang="ts" setup>
import { computed } from 'vue'
import { state } from './store'

const commonEnvs = computed<string>({
  get: () => (state.current ? state.current.json.commonEnvs.join(',') : ''),
  set: value => state.current && (state.current.json.commonEnvs = value.split(','))
})
</script>

<template>
  <el-input v-model="commonEnvs" />
</template>