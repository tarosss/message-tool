export const pushOrDelete = ({ array, data }: { array: any[], data: any }) => {
  if (array.includes(data)) {
    // 取り除く
    array = array.filter((d) => {
      return d !== data
    })
  } else {
    // 追加
    array.push(data)
  }
}
