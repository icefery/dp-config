import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElOption, ElSelect, ElTable, ElTableColumn, ElTag } from 'element-plus'
import { defineComponent, onMounted, reactive } from 'vue'
import { Delete, Download, Plus } from '@element-plus/icons-vue'
import { type ConfigFile, findJSON } from '../../api/json'

interface State {
  list: ConfigFile[]
  current: ConfigFile | null
}

const state = reactive<State>({ list: [], current: null })

const PortPreAssign = () => (
  <ElTable data={state.current?.json.portPreAssign} maxHeight="500px" scrollbarAlwaysOn border>
    <ElTableColumn prop="serviceName" label="serviceName" width="150">
      {{
        default: (scope: any) => <ElInput v-model={scope.row.serviceName} />
      }}
    </ElTableColumn>
    <ElTableColumn prop="portType" label="portType">
      {{
        default: (scope: any) =>
          ((scope.row.portType || '') as string)
            .split(',')
            .filter(it => it !== '')
            .map(it => <ElTag closable>{it}</ElTag>)
      }}
    </ElTableColumn>
    {/* 操作列 */}
    <ElTableColumn width="50" fixed="left" align="center">
      {{
        default: (scope: any) => <ElButton icon={Delete} circle type="danger" />,
        header: () => <ElButton icon={Plus} circle type="primary" />
      }}
    </ElTableColumn>
  </ElTable>
)

const PortRange = () => (
  <ElTable data={state.current?.json.portRange} maxHeight="500px" scrollbarAlwaysOn border>
    <ElTableColumn prop="key" label="key" width="150">
      {{ default: (scope: any) => <ElInput v-model={scope.row.key} /> }}
    </ElTableColumn>
    <ElTableColumn prop="range" label="range">
      {{ default: (scope: any) => <ElInput v-model={scope.row.range} /> }}
    </ElTableColumn>
    {/* 操作列 */}
    <ElTableColumn width="50" fixed="left" align="center">
      {{
        default: (scope: any) => <ElButton icon={Delete} circle type="danger" />,
        header: () => <ElButton icon={Plus} circle type="primary" />
      }}
    </ElTableColumn>
  </ElTable>
)

const PortStep = () => null

const PortNodeDiff = () => (
  <>
    {((state.current?.json.portNodeDiff || []) as string[]).map(it => (
      <ElTag closable>{it}</ElTag>
    ))}
  </>
)

export default defineComponent({
  setup: (props, ctx) => {
    onMounted(() => findJSON('portMng').then(data => (state.list = data)))
    return () => (
      <ElCard>
        {{
          header: () => (
            <>
              <ElSelect v-model={state.current}>
                {state.list.map(it => (
                  <ElOption label={it.filename} value={it} />
                ))}
              </ElSelect>
              <ElButton icon={Download} circle />
            </>
          ),
          default: () => (
            <ElForm labelWidth="100px">
              <ElFormItem label="portPreAssign">
                <PortPreAssign />
              </ElFormItem>
              <ElFormItem label="portRange">
                <PortRange />
              </ElFormItem>
              <ElFormItem label="portStep">
                <PortStep />
              </ElFormItem>
              <ElFormItem label="portNodeDiff">
                <PortNodeDiff />
              </ElFormItem>
            </ElForm>
          )
        }}
      </ElCard>
    )
  }
})
