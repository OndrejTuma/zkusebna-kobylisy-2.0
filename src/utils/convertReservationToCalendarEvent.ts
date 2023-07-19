import { CalendarEvent, AdminReservation } from 'LocalTypes'
import { splitItemIdsInChunks } from './itemsChunks'
import { createRecurrence } from './recurrence'

const convertReservationToCalendarEvent = (
  reservation: AdminReservation
): CalendarEvent => {
  const {
    archived,
    dateStart,
    dateEnd,
    email,
    FREQ,
    INTERVAL,
    isRecurring,
    itemIds,
    name,
    paid,
    phone,
    price,
    reservationName,
    reservationType,
    UNTIL,
  } = reservation

  const event = {
    start: {
      dateTime: dateStart,
      timeZone: 'Europe/Prague',
    },
    end: {
      dateTime: dateEnd,
      timeZone: 'Europe/Prague',
    },
    summary: reservationName,
    extendedProperties: {
      shared: {
        archived: archived ? 'true' : '',
        paid: paid ? 'true' : '',
        price: price ? String(price) : '',
        reservationType: reservationType || '',
        name: name || '',
        phone: phone || '',
        email: email || '',
        ...splitItemIdsInChunks(itemIds),
      },
    },
  }

  if (isRecurring) {
    return {
      ...event,
      recurrence: [createRecurrence({FREQ,INTERVAL,UNTIL})]
    }
  }

  return event
}

export default convertReservationToCalendarEvent
