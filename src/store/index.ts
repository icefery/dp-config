import type { IArgsTemplate, IDeployDetails, IPortMng, IR } from '@/api/json'
import { computed, reactive } from 'vue'

export const SHARED_STATE = reactive<{ list: IR[] }>({ list: [] })

export const SHARED_CONFIG_LIST = computed<(IDeployDetails | IPortMng | IArgsTemplate)[]>(() => {
  return SHARED_STATE.list
    .map(it => {
      const name = it.name
      const json = JSON.parse(it.fileString)
      if (json['deployOrder'] && json['deployDetails']) {
        return { name, module: 'deployDetails', json } as IDeployDetails
      } else if (json['portPreAssign'] && json['portRange']) {
        return { name, module: 'portMng', json } as IPortMng
      } else if (json['templateName'] && 'allParams') {
        return { name, module: 'argsTemplate', json } as IArgsTemplate
      } else {
        return null
      }
    })
    .filter(it => it !== null) as (IDeployDetails | IPortMng | IArgsTemplate)[]
})

export const DEPLOY_DETAILS_STATE = reactive<{ current: IDeployDetails | null }>({ current: null })

export const PORT_MNG_STATE = reactive<{ current: IPortMng | null }>({ current: null })

export const ARGS_TEMPLATE_STATE = reactive<{ current: IArgsTemplate | null }>({ current: null })
