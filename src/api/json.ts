import { SHARED_STATE } from '@/store'
import request from '../utils/request'

export interface IDeployDetails {
  deployOrder: {
    serviceName: string
    mustSucceed: boolean
    order: number
  }[]
  deployDetails: {
    serviceName: string
    templateJson: string
    netMode: string
    calicoYaml: string
    calicoArgs: string
    preShell: string
    minMemory: string
    priorityClass: string
    limitsMemory: string
    templateYaml: string
    imageTag: string
    minDeployNumber: number
    sameNodeScale: boolean
    diffNodeScale: boolean
    hasCfgFlag: boolean
    waitTime: number
  }[]
  upgradeOrder: {
    first: string[]
    last: string[]
  }
}

export interface IPortMng {
  portPreAssign: {
    portType: string
    calicoPortType: string
    serviceName: string
  }[]
  portRange: {
    key: string
    range: string
  }[]
  portStep: string[]
  portNodeDiff: string[]
}

export interface IArgsTemplate {
  templateName: string
  desc: string
  shellParams: string[]
  commonEnvs: string[]
  allParams: {
    key: string
    const: boolean
    value: string
    rules: {
      from: string
      key: string
      content: string
    }[]
  }[]
}

export interface IConfigFile<T extends IDeployDetails | IPortMng | IArgsTemplate> {
  filename: string
  type: 'deployDetails' | 'portMng' | 'argsTemplate'
  json: T
}

export interface IR {
  _id: string
  name: string
  fileString: string
  size: number
  type: 'json' | 'xml'
}

export const fetchFileList = async () => {
  await request<IR[]>({ url: '/admin/api/OriginJson' }).then(response => {
    SHARED_STATE.list = response.data
      .map(it => {
        const json = JSON.parse(it.fileString)
        let type
        if (json['deployOrder'] && json['deployDetails']) {
          type = 'deployDetails'
        } else if (json['portPreAssign' && json['portRange']]) {
          type = 'portMng'
        } else if (json['templateName' && json['allParams']]) {
          type = 'argsTemplate'
        }
        if (type) {
          return { filename: it.name, type, json }
        } else {
          return null
        }
      })
      .filter(it => it !== null) as IConfigFile<IDeployDetails | IPortMng | IArgsTemplate>[]
    return response.data
  })
}
