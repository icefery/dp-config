import type { IConfigFile, IDeployDetails } from '@/api/json'
import { reactive } from 'vue'

export interface State {
  list: IConfigFile<IDeployDetails>[]
  current: IConfigFile<IDeployDetails> | null
}

export const state = reactive<State>({ list: [], current: null })
