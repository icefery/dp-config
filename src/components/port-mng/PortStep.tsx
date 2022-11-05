import { ElInput } from 'element-plus'
import { computed, defineComponent } from 'vue'
import { state } from './store'

export default defineComponent({
  setup: () => {
    const portStep = computed<string>({
      get: () => {
        if (state.current) {
          return state.current.json.portStep.join(',')
        } else {
          return ''
        }
      },
      set: value => {
        if (state.current) {
          state.current.json.portStep = value.split(',')
        }
      }
    })
    return () => <ElInput v-model={portStep.value} />
  }
})
