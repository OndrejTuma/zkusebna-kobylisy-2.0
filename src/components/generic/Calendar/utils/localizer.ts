import { dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    cs,
  },
})

export default localizer