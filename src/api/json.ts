import request from '../utils/request'

export interface ConfigFile {
  filename: string
  type: 'deployDetails' | 'portMng' | 'argsTemplate'
  json: any
}

export const findJSON = async (type: ConfigFile['type']) =>
  await request<ConfigFile[]>({
    url: '/json',
    params: { type }
  }).then(response => response.data)
