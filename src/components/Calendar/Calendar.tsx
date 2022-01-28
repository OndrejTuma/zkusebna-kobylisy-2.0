import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'

const locales = {
  'cs-CZ': cs,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

type CalendarEvent = {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,
}

const Calendar = ({ events, onSelectEvent }: { events: CalendarEvent[] }) => {
  return (
    <ReactCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={onSelectEvent}
      views={['month']}
      style={{ height: 500 }}
    />
  )
}

export default Calendar