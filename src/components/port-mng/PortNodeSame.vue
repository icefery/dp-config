<script lang="ts" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portNodeSame = computed({
  get: () => (PORT_MNG_STATE.current ? PORT_MNG_STATE.current.json.portNodeSame.join(',') : ''),
  set: value => PORT_MNG_STATE.current && (PORT_MNG_STATE.current.json.portNodeSame = value.split(','))
})
</script>

<template>
  <el-input v-model="portNodeSame" />
</template>
