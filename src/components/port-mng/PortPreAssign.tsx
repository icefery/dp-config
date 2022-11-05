import type { IPortMng } from '@/api/json'
import { Delete, Plus } from '@element-plus/icons-vue'
import { ElButton, ElInput, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent } from 'vue'
import { state } from './store'

interface Scope {
  row: IPortMng['portPreAssign'][number]
  $index: number
}

const handleDelete = (index: number) => {
  if (state.current) {
    state.current.json.portPreAssign.splice(index, 1)
  }
}

const handleAdd = () => {
  if (state.current) {
    state.current.json.portPreAssign.push({ portType: '', calicoPortType: '', serviceName: '' })
  }
}

export default defineComponent({
  setup: (props, ctx) => {
    return () => (
      <ElTable data={state.current?.json.portPreAssign} maxHeight="500px" scrollbarAlwaysOn border>
        <ElTableColumn prop="serviceName" label="serviceName" width="150">
          {{ default: (scope: Scope) => <ElInput v-model={scope.row.serviceName} /> }}
        </ElTableColumn>
        <ElTableColumn prop="portType" label="portType">
          {{ default: (scope: Scope) => <ElInput v-model={scope.row.portType} /> }}
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
