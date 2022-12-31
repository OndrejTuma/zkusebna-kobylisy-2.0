import format from 'date-fns/format'
import getDay from 'date-fns/getDay'
import cs from 'date-fns/locale/cs'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import type { Reservation } from 'LocalTypes'
import React, { useMemo } from 'react'
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
  dateFnsLocalizer,
  Event,
  SlotInfo,
} from 'react-big-calendar'

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

const parseGoogleCalendarEventsToReactCalendarEvents = (
  events: Reservation[]
) =>
  events.map(({ dateStart, dateEnd, itemIds, reservationName }) => ({
    title: reservationName,
    start: dateStart ? new Date(dateStart) : undefined,
    end: dateEnd ? new Date(dateEnd) : undefined,
    resource: {
      itemIds,
    },
  }))

export type onNavigateType = (date: Date) => void
export type onSelectEventType = (event: Event) => void
export type onSelectSlotType = (slotInfo: SlotInfo) => void

const ReactBigCalendar = ReactCalendar as React.ComponentType<
  ReactCalendarProps<Event>
>

type CalendarProps = {
  reservations?: Reservation[]
  onNavigate?: onNavigateType
  onSelectEvent?: onSelectEventType
  onSelectSlot?: onSelectSlotType
}

const Calendar = ({ reservations, onNavigate, onSelectEvent, onSelectSlot }: CalendarProps) => {
  const events: Event[] = useMemo(
    () => parseGoogleCalendarEventsToReactCalendarEvents(reservations || []),
    [reservations]
  )

  return (
    <ReactBigCalendar
      culture={'cs'}
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      onNavigate={onNavigate}
      onSelectEvent={onSelectEvent}
      views={['month']}
      style={{ height: 700 }}
      messages={messages}
      popup
      popupOffset={{ x: 30, y: 20 }}
      selectable
      onSelectSlot={onSelectSlot}
    />
  )
}

export default Calendar
