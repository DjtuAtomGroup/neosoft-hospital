export type IPage<T extends Record<string, never>> = {
  index: number
  size: number
  total?: number
  data?: T
}

export type IKVType = {
  key: string
  value: string
}
