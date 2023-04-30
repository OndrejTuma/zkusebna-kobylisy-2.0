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
import EventComponent from './EventComponent'
import DateCellComponent from './DateCellComponent'

const components = {
  event: EventComponent,
  dateCellWrapper: DateCellComponent,
}

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
    <Container maxWidth={'lg'} sx={{
      marginBottom: 10,
      marginTop: 10,
    }}>
      <ReactBigCalendar
        className={classes.root}
        components={components}
        culture={'cs'}
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        onNavigate={onNavigate}
        onSelectEvent={onSelectEvent}
        views={['month']}
        messages={messages}
        popup
        popupOffset={{ x: 30, y: 20 }}
        selectable
        onSelectSlot={onSelectSlot}
      />
    </Container>
  )
}

export default Calendar
