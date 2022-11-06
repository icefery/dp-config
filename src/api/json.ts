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

export const findJSON = async <T extends IDeployDetails | IPortMng | IArgsTemplate>(type: IConfigFile<T>['type']) => {
  return await request<IConfigFile<T>[]>({
    url: '/json',
    params: { type }
  }).then(response => response.data)
}
