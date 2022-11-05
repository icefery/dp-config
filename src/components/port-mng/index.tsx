import { ElButton, ElCard, ElForm, ElFormItem, ElOption, ElSelect } from 'element-plus'
import { defineComponent, onMounted } from 'vue'
import { Download } from '@element-plus/icons-vue'

import { state } from './store'
import { findJSON, type IPortMng } from '@/api/json'
import PortPreAssign from './PortPreAssign'
import PortRange from './PortRange'
import PortNodeDiff from './PortNodeDiff'
import PortStep from './PortStep'
import FileSaver from 'file-saver'

export default defineComponent({
  setup: (props, ctx) => {
    // 加载数据
    onMounted(() => findJSON<IPortMng>('portMng').then(data => (state.list = data)))
    // 导出文件
    const handleExport = () => {
      if (state.current) {
        const blob = new Blob([JSON.stringify(state.current.json)], { type: 'text/json' })
        FileSaver.saveAs(blob, state.current.filename)
      }
    }
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
              <ElButton icon={Download} circle onClick={() => handleExport()} />
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
