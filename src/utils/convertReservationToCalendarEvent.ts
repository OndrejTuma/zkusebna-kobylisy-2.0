import { CalendarEvent, Reservation } from 'LocalTypes'
import { splitItemIdsInChunks } from './itemsChunks'

const convertReservationToCalendarEvent = (reservation: Reservation): CalendarEvent => {
  const { archived, dateStart, dateEnd, price, reservationType, reservationName, name, phone, email, itemIds } = reservation

  return {
    start: {
      dateTime: dateStart,
    },
    end: {
      dateTime: dateEnd,
    },
    summary: reservationName,
    extendedProperties: {
      shared: {
        archived: archived ? 'true' : '',
        price: price ? String(price) : '',
        reservationType: reservationType || '',
        name: name || '',
        phone: phone || '',
        email: email || '',
        ...splitItemIdsInChunks(itemIds),
      },
    },
  }
}

export default convertReservationToCalendarEvent