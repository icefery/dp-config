<script lang="ts" setup>
import { computed } from 'vue'
import { state } from './store'

const desc = computed<string>({
  get: () => (state.current ? state.current.json.desc : ''),
  set: value => state.current && (state.current.json.desc = value)
})
</script>

<template>
  <el-input v-model="desc" />
</template>
