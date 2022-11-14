<script lang="tsx" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portNodeSame = computed({
  get: () => (PORT_MNG_STATE.current ? PORT_MNG_STATE.current.json.portNodeSame : []),
  set: value => PORT_MNG_STATE.current && (PORT_MNG_STATE.current.json.portNodeSame = value)
})

const portNodeSameOptions = computed(() => {
  if (PORT_MNG_STATE.current) {
    const a = Array.from(
      new Set(
        //
        PORT_MNG_STATE.current.json.portPreAssign
          //
          .map(it => [...(it.calicoPortType || '').split(','), ...(it.portType || '').split(',')])
          //
          .flatMap(it => [...it])
          //
          .filter(it => it !== '')
      )
    )
    return a
  }
  return []
})
</script>

<template>
  <el-select v-model="portNodeSame" multiple style="width: 100%">
    <template v-for="item of portNodeSameOptions">
      <el-option :label="item" :value="item" />
    </template>
  </el-select>
</template>
