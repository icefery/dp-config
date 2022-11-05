import type { IPortMng } from '@/api/json'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent } from 'vue'
import { state } from './store'

interface Scope {
  row: IPortMng['portRange'][number]
  $index: number
}

export default defineComponent({
  setup: () => {
    const handleDelete = (index: number) => {
      if (state.current) {
        state.current.json.portRange.splice(index, 1)
      }
    }
    const handleAdd = () => {
      if (state.current) {
        state.current.json.portRange.push({ key: '', range: '' })
      }
    }

    return () => (
      <ElTable data={state.current?.json.portRange} maxHeight="500px" scrollbarAlwaysOn border>
        <ElTableColumn prop="key" label="key" width="150">
          {{ default: (scope: Scope) => <ElInput v-model={scope.row.key} /> }}
        </ElTableColumn>
        <ElTableColumn prop="range" label="range">
          {{ default: (scope: Scope) => <ElInput v-model={scope.row.range} /> }}
        </ElTableColumn>
        {/* 操作列 */}
        <ElTableColumn width="50" fixed="left" align="center">
          {{
            header: () => <ElButton icon={Plus} circle type="primary" onClick={() => handleAdd()} />,
            default: (scope: Scope) => <ElButton icon={Delete} circle type="danger" onClick={() => handleDelete(scope.$index)} />
          }}
        </ElTableColumn>
      </ElTable>
    )
  }
})
