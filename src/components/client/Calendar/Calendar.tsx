import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import sub from 'date-fns/sub'
import { calendar_v3 } from 'googleapis'
import { useMemo } from 'react'
import { Calendar as ReactCalendar, dateFnsLocalizer, Event, SlotInfo } from 'react-big-calendar'
import Schema$Event = calendar_v3.Schema$Event

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
  showMore: (total: number) => `+ Zobrazit další (${total})`,
}

const parseGoogleCalendarEventsToReactCalendarEvents = (events: Schema$Event[]) => events.map(({
  description,
  end,
  extendedProperties,
  summary,
  start,
}) => ({
  title: summary,
  start: start?.date ? new Date(start.date) : start?.dateTime ? new Date(start.dateTime) : undefined,
  end: end?.date ? sub(new Date(end.date), { days: 1 }) : end?.dateTime ? new Date(end.dateTime) : undefined,
  allDay: !!start?.date,
  resource: {
    private: extendedProperties?.private,
    description,
  },
}))

export type onSelectEventType = (event: Event) => void
export type onSelectSlotType = (slotInfo: SlotInfo) => void

type CalendarProps = {
  events: Schema$Event[],
  onSelectEvent: onSelectEventType,
  onSelectSlot: onSelectSlotType,
}

const Calendar = ({ events, onSelectEvent, onSelectSlot }: CalendarProps) => {
  const reservations: Event[] = useMemo(() => parseGoogleCalendarEventsToReactCalendarEvents(events), [ events ])

  return (
    <div>
      <ReactCalendar
        culture={'cs'}
        localizer={localizer}
        events={reservations}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        views={[ 'month' ]}
        style={{ height: 700 }}
        messages={messages}
        popup
        // popupOffset={{x: 30, y: 20}}
        selectable
        onSelectSlot={onSelectSlot}
      />
    </div>
  )
}

export default Calendar