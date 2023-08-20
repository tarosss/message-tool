import { serialize } from 'object-to-formdata';

// eslint-disable-next-line prefer-object-spread typescript-eslint no-unsafe-return
export const deepCopy = <T>(obj: Object): T => Object.assign({}, JSON.parse(JSON.stringify(obj)))

export const toFormData = (obj: Object) => {
  return serialize(obj, { indices: true })
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value)
  })
  console.log(formData)
  return formData
}
