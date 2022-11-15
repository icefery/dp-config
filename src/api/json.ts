import { SHARED_STATE } from '@/store'
import request from '@/utils/request'

export interface IDeployDetails {
  name: string
  type: 'xml' | 'json' | 'yaml'
  module: 'deployDetails'
  json: {
    deployOrder: {
      serviceName: string
      mustSucceed: boolean
      order: number
    }[]
    deployDetails: {
      serviceName: string
      templateJson: string
      netMode: 'host' | 'calico'
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
}

export interface IPortMng {
  name: string
  type: 'xml' | 'json' | 'yaml'
  module: 'portMng'
  json: {
    portPreAssign: {
      portType: string
      calicoPortType: string
      serviceName: string
    }[]
    portRange: {
      key: string
      range: string
    }[]
    portStep: {
      key: string
      step: string
    }[]
    portNodeDiff: string[]
    portNodeSame: string[]
  }
}

export interface IArgsTemplate {
  name: string
  type: 'xml' | 'json' | 'yaml'
  module: 'argsTemplate'
  json: {
    templateName: string
    desc: string
    shellParams: string[]
    commonEnvs: string[]
    serviceEnvs: {
      serviceName: string
      envs: string[]
      preShellEnvs: string[]
    }[]
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
}

export interface ICustomYaml {
  name: string
  type: 'xml' | 'json' | 'yaml'
  module: 'customYaml'
  fileString: string
}

// 接口响应类型
export interface IR {
  _id?: string
  name: string
  fileString: string
  size: number
  type: string
}

// 加载文件列表
export async function fetchFileList() {
  await request<IR[]>({
    url: '/admin/api/OriginJson',
    method: 'GET'
  }).then(response => (SHARED_STATE.list = response.data))
}

// 上传文件
export async function uploadFile(todos: IR[]) {
  await request<void>({ url: '/admin/api/OriginJson', method: 'POST', data: todos }).then(response => fetchFileList())
}

// 删除文件
export async function deleteFile(id: string) {
  await request<void>({ url: `/admin/api/OriginJson/${id}`, method: 'DELETE' }).then(response => fetchFileList())
}
