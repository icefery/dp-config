import { ElInput } from 'element-plus'
import { computed, defineComponent } from 'vue'
import { state } from './store'

export default defineComponent({
  setup: () => {
    const portNodeDiff = computed({
      get: () => (state.current ? state.current.json.portNodeDiff.join(',') : ''),
      set: value => state.current && (state.current.json.portNodeDiff = value.split(','))
    })
    return () => <ElInput v-model={portNodeDiff.value} />
  }
})
