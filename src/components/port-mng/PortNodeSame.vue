<script lang="tsx" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portNodeSame = computed({
  get: () => {
    if (PORT_MNG_STATE.current) {
      if (PORT_MNG_STATE.current.json.portNodeSame) {
        return PORT_MNG_STATE.current.json.portNodeSame.join(',')
      }
    }
    return ''
  },
  set: value => {
    if (PORT_MNG_STATE.current) {
      PORT_MNG_STATE.current.json.portNodeSame = value.split(',')
    }
  }
})
</script>

<template>
  <el-input v-model="portNodeSame" spellcheck="false" />
</template>
