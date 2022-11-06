import type { IArgsTemplate, IConfigFile, IDeployDetails, IPortMng } from '@/api/json'
import { reactive } from 'vue'

export const SHARED_STATE = reactive<{
  list: IConfigFile<IDeployDetails | IPortMng | IArgsTemplate>[]
}>({
  list: []
})
