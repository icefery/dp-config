import type { IArgsTemplate, IConfigFile } from '@/api/json'
import { reactive } from 'vue'

export interface State {
  list: IConfigFile<IArgsTemplate>[]
  current: IConfigFile<IArgsTemplate> | null
}

export const state = reactive<State>({ list: [], current: null })
