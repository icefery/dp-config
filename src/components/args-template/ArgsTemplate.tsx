import { type ConfigFile, findJSON } from '@/api/json'
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElOption, ElSelect, ElTag } from 'element-plus'
import { defineComponent, onMounted, reactive } from 'vue'
import { Download } from '@element-plus/icons-vue'

interface State {
  list: ConfigFile[]
  current: ConfigFile | null
}

const state = reactive<State>({ list: [], current: null })

const TemplateName = () => <ElInput v-model={state.current?.json.templateName} />
//
// const Desc = () => <ElInput v-model={state.current?.json.desc} spellcheck="false" />
//
const ShellParams = () => (
  <>
    {((state.current?.json.shellParams || '') as string)
      .split(',')
      .filter(it => it !== '')
      .map(it => (
        <ElTag closable>{it}</ElTag>
      ))}
  </>
)
//
// const CommonEnvs = () => (
//   <>
//     {((state.current?.json.commonEnvs || '') as string)
//       .split(',')
//       .filter(it => it !== '')
//       .map(it => (
//         <ElTag closable>{it}</ElTag>
//       ))}
//   </>
// )
//
// const AllParams = () => (
//   <ElTable data={state.current?.json.portPreAssign} maxHeight="500px" scrollbarAlwaysOn border>
//     <ElTableColumn prop="key" label="key" width="150">
//       {{ default: scope => <ElInput v-model={scope.row.key} spellcheck="false" /> }}
//     </ElTableColumn>
//     <ElTableColumn prop="const" label="const" width="150">
//       {{ default: scope => <ElSwitch v-model={scope.row.const} /> }}
//     </ElTableColumn>
//     <ElTableColumn prop="value" label="value" width="150">
//       {{ default: scope => <ElInput v-model={scope.row.value} spellcheck="false" /> }}
//     </ElTableColumn>
//     <ElTableColumn prop="rules" label="rules" type="expand">
//       {{
//         default: scope => (
//           <ElTable data={scope.row.rules}>
//             <ElTableColumn prop="from" label="from" width="150">
//               {{ default: scope => <ElInput v-model={scope.row.from} spellcheck="false" /> }}
//             </ElTableColumn>
//           </ElTable>
//         )
//       }}
//     </ElTableColumn>
//     {/* 操作列 */}
//     <ElTableColumn width="50" fixed="left" align="center">
//       {{
//         default: scope => <ElButton icon={Delete} circle type="danger" />,
//         header: () => <ElButton icon={Plus} circle type="primary" />
//       }}
//     </ElTableColumn>
//   </ElTable>
// )

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
                {/*<TemplateName />*/}
              </ElFormItem>
              <ElFormItem label="desc">
                {/*<Desc />*/}
              </ElFormItem>
              <ElFormItem label="shellParams">
                <ShellParams />
              </ElFormItem>
              <ElFormItem label="commonEnvs">
                {/*<CommonEnvs />*/}
              </ElFormItem>
              <ElFormItem label="allParams">
                {/*<AllParams />*/}
              </ElFormItem>
            </ElForm>
          )
        }}
      </ElCard>
    )
  }
})
