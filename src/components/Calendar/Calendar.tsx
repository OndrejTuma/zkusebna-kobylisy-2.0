import { Calendar as ReactCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    cs,
  },
})

const messages = {
  allDay: 'Celý den',
  previous: '<',
  next: '>',
  today: 'Dnes',
  month: 'Měsíc',
  week: 'Týden',
  day: 'Den',
  agenda: 'Agenda',
  date: 'Datum',
  time: 'Čas',
  event: 'Událost',
  showMore: (total: number) => `+ Zobrazit další (${total})`
};

type CalendarEvent = {
  title: string,
  start: Date,
  end: Date,
  allDay?: boolean
  resource?: any,
}

const Calendar = ({ events, onSelectEvent }: { events: CalendarEvent[] }) => {
  return (
    <div>
      <ReactCalendar
        culture={'cs'}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        views={['month']}
        style={{ height: 700 }}
        messages={messages}
        popup
        // popupOffset={{x: 30, y: 20}}
        selectable
        onSelectSlot={evt => {
          alert(JSON.stringify(evt, null, 2))
        }}
      />
    </div>
  )
}

export default Calendar