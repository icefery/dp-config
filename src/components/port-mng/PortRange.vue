<script lang="tsx" setup>
import type { IPortMng } from '@/api/json'
import ValidationFailure from '@/components/validation/ValidationFailure'
import ValidationSuccess from '@/components/validation/ValidationSuccess'
import { PORT_MNG_STATE } from '@/store'
import type { IScope } from '@/types/element-plus'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'
import { computed } from 'vue'

const handleDelete = (index: number) => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portRange.splice(index, 1)
  }
}
const handleAdd = () => {
  if (PORT_MNG_STATE.current) {
    PORT_MNG_STATE.current.json.portRange.push({ key: '', range: '' })
  }
}

// range 校验
const rangeStatus = computed(() => (index: number) => {
  if (PORT_MNG_STATE.current) {
    const row = PORT_MNG_STATE.current.json.portRange[index]
    const groups = row.range
      .replace(/([\[\]])/g, '')
      .split(',')
      .map(segment => {
        const [left, right] = segment.split('-').map(point => Number.parseInt(point))
        const result = []
        for (let i = left; i <= right; i++) {
          result.push(i)
        }
        return result
      })

    for (const ports of groups) {
      if (ports.length === 0) {
        return <ValidationFailure />
      }
    }

    for (let i = 0; i < groups.length; i++) {
      for (const port of groups[i]) {
        const otherPorts = groups
          .filter((it, idx) => idx !== i)
          .reduce((prev, curr) => {
            prev.push(...curr)
            return prev
          }, [])
        const intersect = otherPorts.filter(it => it === port)
        if (intersect.length !== 0) {
          return <ValidationFailure />
        }
      }
    }
  }
  return <ValidationSuccess />

  //   const all = PORT_MNG_STATE.current.json.portRange.map(it => {
  //     const key = it.key
  //     const ports = it.range
  //       .replace(/([\[\]])/g, '')
  //       .split(',')
  //       .map(segment => {
  //         const [left, right] = segment.split('-').map(point => Number.parseInt(point))
  //         const result = []
  //         for (let i = left; i <= right; i++) {
  //           result.push(i)
  //         }
  //         return result
  //       })
  //       .flatMap(segment => [...segment])
  //     return { key, ports }
  //   })

  //   const row = all[index]

  //   if (row.ports.length === 0) {
  //     return <ValidationFailure />
  //   }

  //   if (row.ports.filter(it => it < 1 || it > 65535).length !== 0) {
  //     return <ValidationFailure />
  //   }

  //   const others = all.filter((it, idx) => idx !== index)

  //   for (const rowPort of row.ports) {
  //     for (const other of others) {
  //       const intersect = other.ports.filter(it => it === rowPort)
  //       if (intersect.length !== 0) {
  //         return <ValidationFailure />
  //       }
  //     }
  //   }
  // }
  // return <ValidationSuccess />
})
</script>

<template>
  <el-table :data="PORT_MNG_STATE.current?.json.portRange" border max-height="300px" scrollbar-always-on>
    <!-- 操作列 -->
    <el-table-column align="center" fixed="left" width="50">
      <template #header>
        <el-button :icon="Plus" circle type="primary" @click="handleAdd()" />
      </template>
      <template #default="scope">
        <el-button :icon="Delete" circle type="danger" @click="handleDelete(scope.$index)" />
      </template>
    </el-table-column>
    <!-- 数据列 -->
    <el-table-column label="key" prop="key" width="450">
      <template #default="scope: IScope<IPortMng['json']['portRange'][number]>">
        <el-input v-model="scope.row.key" spellcheck="false" />
      </template>
    </el-table-column>
    <el-table-column label="range" prop="range">
      <template #default="scope: IScope<IPortMng['json']['portRange'][number]>">
        <el-input v-model="scope.row.range" :suffix-icon="rangeStatus(scope.$index)" spellcheck="false" />
      </template>
    </el-table-column>
  </el-table>
</template>
