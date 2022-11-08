<script lang="ts" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portNodeDiff = computed({
  get: () => (PORT_MNG_STATE.current ? PORT_MNG_STATE.current.json.portNodeDiff.join(',') : ''),
  set: value => PORT_MNG_STATE.current && (PORT_MNG_STATE.current.json.portNodeDiff = value.split(','))
})
</script>

<template>
  <el-input v-model="portNodeDiff" />
</template>
