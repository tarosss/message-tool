// eslint-disable-next-line prefer-object-spread typescript-eslint no-unsafe-return
export const deepCopy = <T>(obj: Object): T => Object.assign({}, JSON.parse(JSON.stringify(obj)))