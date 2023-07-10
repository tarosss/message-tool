import { unref } from 'vue'

export function isString(data: any): data is string {
  return typeof unref(data) === 'string'
}
