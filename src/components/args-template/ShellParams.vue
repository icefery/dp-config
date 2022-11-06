<script lang="ts" setup>
import { computed } from 'vue'
import { state } from './store'

const shellParams = computed<string>({
  get: () => (state.current ? state.current.json.shellParams.join(',') : ''),
  set: value => state.current && (state.current.json.shellParams = value.split(','))
})
</script>

<template>
  <el-input v-model="shellParams" />
</template>
