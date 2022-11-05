import type { IConfigFile, IPortMng } from '@/api/json'
import { reactive } from 'vue'

export interface State {
  list: IConfigFile<IPortMng>[]
  current: IConfigFile<IPortMng> | null
}

export const state = reactive<State>({ list: [], current: null })
