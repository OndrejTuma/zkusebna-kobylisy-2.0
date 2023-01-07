import { dateTimeFormat, timeFormat } from 'Consts/dateTimeFormats'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'

const formatDateRange = (start: Date, end: Date) => {
  const isOneDayEvent = isSameDay(start, end)
  
  if (isOneDayEvent) {
    return `${format(start, dateTimeFormat)} - ${format(end, timeFormat)}`
  }

  return `${format(start, dateTimeFormat)} - ${format(end, dateTimeFormat)}`
}

export default formatDateRange
