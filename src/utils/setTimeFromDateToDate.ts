import getDate from 'date-fns/getDate'
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import setDate from 'date-fns/setDate'
import setMonth from 'date-fns/setMonth'
import setYear from 'date-fns/setYear'

const setTimeFromDateToDate = (fromDate: Date, toDate: Date): Date => {
  return setYear(
    setMonth(setDate(fromDate, getDate(toDate)), getMonth(toDate)),
    getYear(toDate)
  )
}

export default setTimeFromDateToDate
