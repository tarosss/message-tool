import { format as dataFnsFormat, isThisYear as dataFnsIsThisYear } from 'date-fns'
import { ja } from 'date-fns/locale'

export const specialFormat = (date: string, includeDay: boolean = false) => {
  const tempDate = new Date(date)
  let dateFormat = dataFnsIsThisYear(tempDate) ? 'MM月dd日' : 'yyyy年MM月dd日'

  if (includeDay) {
    dateFormat += ' (E)'
  }

  return dataFnsFormat(tempDate, dateFormat, { locale: ja })
}

export const format = (
  { date, formatString } : { date: string | null, formatString: string | null },
) => {
  const n = date === null ? new Date() : new Date(date)
  const s = formatString === null ? 'yyyy-MM-dd HH:mm:ss' : formatString
  return dataFnsFormat(n, s)
}
