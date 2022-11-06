<script lang="ts" setup>
import { computed } from 'vue'
import { state } from './store'

const templateName = computed<string>({
  get: () => (state.current ? state.current.json.templateName : ''),
  set: value => state.current && (state.current.json.templateName = value)
})
</script>

<template>
  <el-input v-model="templateName" />
</template>
