import { isAfter, isToday } from 'date-fns'

const isDateCurrentOrFuture = (date: Date): boolean => {
  return isToday(date) || isAfter(date, new Date())
}

export default isDateCurrentOrFuture
