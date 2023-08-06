export const deepCopy = <T>(obj: Object): T => Object.assign({}, JSON.parse(JSON.stringify(obj)))