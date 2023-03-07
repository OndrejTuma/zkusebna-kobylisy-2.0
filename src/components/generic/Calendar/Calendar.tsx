import { styled } from '@mui/material/styles'
import type { Reservation } from 'LocalTypes'
import React, { useMemo } from 'react'
import Container from '@mui/material/Container'
import {
  Calendar as ReactCalendar,
  CalendarProps as ReactCalendarProps,
  Event,
} from 'react-big-calendar'
import styles, { classes } from './styles'
import messages from './consts/messages'
import localizer from './utils/localizer'
import parseGoogleCalendarEventsToReactCalendarEvents from './utils/parseGoogleCalendarEventsToReactCalendarEvents'
import { onSelectEventType, onSelectSlotType, onNavigateType } from './types'


const ReactBigCalendar = styled(ReactCalendar as React.ComponentType<
  ReactCalendarProps<Event>
>)(styles)

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
    <Container maxWidth={'lg'}>
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
        className={classes.root}
      />
    </Container>
  )
}

export default Calendar
