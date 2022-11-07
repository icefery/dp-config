<script lang="ts" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portStep = computed<string>({
  get: () => (PORT_MNG_STATE.current ? PORT_MNG_STATE.current.json.portStep.join(',') : ''),
  set: value => PORT_MNG_STATE.current && (PORT_MNG_STATE.current.json.portStep = value.split(','))
})
</script>
<template>
  <el-input v-model="portStep" spellcheck="false" />
</template>
