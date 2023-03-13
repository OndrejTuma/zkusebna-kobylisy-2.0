import type { Reservation } from 'LocalTypes'

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

  export default parseGoogleCalendarEventsToReactCalendarEvents