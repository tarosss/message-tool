import { format, isThisYear } from 'date-fns'
import { ja } from 'date-fns/locale';

export const specialFormat = (date: string, includeDay: boolean = false) => {
  const tempDate = new Date(date) 
  let dateFormat = isThisYear(tempDate) ? 'MM月dd日' : 'yyyy年MM月dd日'

  if (includeDay) {
    dateFormat += ' (E)'
  }
  return format(tempDate, dateFormat, { locale:ja })
}
