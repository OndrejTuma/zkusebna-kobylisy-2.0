import { dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn'

import monthValues from '../consts/monthValues'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    cs: {
      ...cs,
      localize: {
        ...cs.localize,
        month: buildLocalizeFn({
          values: monthValues,
          defaultWidth: 'wide',
          formattingValues: monthValues,
          defaultFormattingWidth: 'wide',
        }),
      },
    },
  },
})

export default localizer
