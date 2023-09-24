import type { Reservation } from 'LocalTypes'

const parseGoogleCalendarEventsToReactCalendarEvents = (
  events: Reservation[]
) =>
  events.map(({ dateStart, dateEnd, itemIds, name, reservationName }) => ({
    title: reservationName,
    start: dateStart ? new Date(dateStart) : undefined,
    end: dateEnd ? new Date(dateEnd) : undefined,
    resource: {
      name,
      itemIds,
    },
  }))

  export default parseGoogleCalendarEventsToReactCalendarEvents