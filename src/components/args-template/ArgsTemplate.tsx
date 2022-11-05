import { type ConfigFile, findJSON } from '@/api/json'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElOption, ElSelect, ElSwitch, ElTable, ElTableColumn, ElTag } from 'element-plus'
import { computed, defineComponent, onMounted, reactive } from 'vue'
import { Delete, Download, Plus } from '@element-plus/icons-vue'

interface State {
  list: ConfigFile[]
  current: ConfigFile | null
}

const state = reactive<State>({ list: [], current: null })

const TemplateName = defineComponent({
  setup: (props, ctx) => {
    const templateName = computed({
      get: () => state.current?.json.templateName,
      set: value => {
        if (state.current?.json) {
          state.current.json.templateName = value
        }
      }
    })
    return () => <ElInput v-model={templateName.value} />
  }
})

const Desc = defineComponent({
  setup: (props, ctx) => {
    const desc = computed({
      get: () => state.current?.json.desc,
      set: value => {
        if (state.current?.json) {
          state.current.json.desc = value
        }
      }
    })
    return () => <ElInput v-model={desc.value} />
  }
})

const ShellParams = defineComponent({
  setup: (props, ctx) => {
    const shellParams = computed<string[]>({
      get: () => state.current?.json.shellParams || [],
      set: value => {
        if (state.current?.json) {
          state.current.json.shellParams = value
        }
      }
    })
    return () => (
      <>
        {shellParams.value.map(it => (
          <ElTag closable>{it}</ElTag>
        ))}
      </>
    )
  }
})

const CommonEnvs = defineComponent({
  setup(props, ctx) {
    const commonEnvs = computed<string[]>({
      get: () => state.current?.json.commonEnvs || [],
      set: value => {
        if (state.current?.json) {
          state.current.json.commonEnvs = value
        }
      }
    })
    return () => (
      <>
        {commonEnvs.value.map(it => (
          <ElTag closable>{it}</ElTag>
        ))}
      </>
    )
  }
})

//
const AllParams = () => (
  <ElTable data={state.current?.json.allParams} maxHeight="500px" scrollbarAlwaysOn border>
    <ElTableColumn prop="key" label="key" width="150">
      {{ default: (scope: any) => <ElInput v-model={scope.row.key} /> }}
    </ElTableColumn>
    <ElTableColumn prop="const" label="const" width="150">
      {{ default: (scope: any) => <ElSwitch v-model={scope.row.const} /> }}
    </ElTableColumn>
    <ElTableColumn prop="value" label="value" width="150">
      {{ default: (scope: any) => <ElInput v-model={scope.row.value} /> }}
    </ElTableColumn>
    <ElTableColumn prop="rules" label="rules" type="expand">
      {{
        default: (scope: { row: { rules: any[] | undefined } }) => (
          <ElTable data={scope.row.rules}>
            <ElTableColumn prop="from" label="from" width="150">
              {{ default: (scope: any) => <ElInput v-model={scope.row.from} /> }}
            </ElTableColumn>
            <ElTableColumn prop="key" label="key" width="150">
              {{ default: (scope: any) => <ElInput v-model={scope.row.from} /> }}
            </ElTableColumn>
            <ElTableColumn prop="content" label="content" width="150">
              {{ default: (scope: any) => <ElInput v-model={scope.row.from} /> }}
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

export default defineComponent({
  setup: (props, ctx) => {
    onMounted(() => findJSON('argsTemplate').then(data => (state.list = data)))
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
              <ElFormItem label="templateName">
                <TemplateName />
              </ElFormItem>
              <ElFormItem label="desc">
                <Desc />
              </ElFormItem>
              <ElFormItem label="shellParams">
                <ShellParams />
              </ElFormItem>
              <ElFormItem label="commonEnvs">
                <CommonEnvs />
              </ElFormItem>
              <ElFormItem label="allParams">
                <AllParams />
              </ElFormItem>
            </ElForm>
          )
        }}
      </ElCard>
    )
  }
})
