import { unref } from 'vue'

export function isString(data: any): data is string {
  return typeof unref(data) === 'string'
}

export function isNumber(data: any): data is Number {
  return typeof unref(data) === 'number'
}
