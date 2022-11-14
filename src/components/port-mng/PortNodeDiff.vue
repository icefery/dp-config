<script lang="tsx" setup>
import { PORT_MNG_STATE } from '@/store'
import { computed } from 'vue'

const portNodeDiff = computed({
  get: () => (PORT_MNG_STATE.current ? PORT_MNG_STATE.current.json.portNodeDiff : []),
  set: value => PORT_MNG_STATE.current && (PORT_MNG_STATE.current.json.portNodeDiff = value)
})

const portNodeDiffOptions = computed(() => {
  if (PORT_MNG_STATE.current) {
    const a = Array.from(
      new Set(
        //
        PORT_MNG_STATE.current.json.portPreAssign
          // 把calicoPortType按照‘，’拆分，以及portType拆分，把两个数组里面的元素放在 一起，合成一个大数组
          .map(it => [...(it.calicoPortType || '').split(','), ...(it.portType || '').split(',')])
          // 展开二维数组
          .flatMap(it => [...it])
          // 去空处理
          .filter(it => it !== '')
      )
    )
    return a
  }
  return []
})
</script>

<template>
  <el-select v-model="portNodeDiff" multiple style="width: 100%">
    <template v-for="item of portNodeDiffOptions">
      <el-option :label="item" :value="item" />
    </template>
  </el-select>
</template>
