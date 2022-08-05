import { CalendarEvent, Reservation } from 'LocalTypes'
import { joinItemIdsFromChunks } from './itemsChunks'

const convertCalendarEventToReservation = (event: CalendarEvent): Reservation => {
  const { id, start, end, summary, extendedProperties } = event

  return {
    id,
    dateStart: start?.date || start?.dateTime,
    dateEnd: end?.date || end?.dateTime,
    reservationType: extendedProperties?.shared?.reservationType,
    reservationName: summary,
    name: extendedProperties?.shared?.name,
    phone: extendedProperties?.shared?.phone,
    email: extendedProperties?.shared?.email,
    itemIds: joinItemIdsFromChunks(extendedProperties?.shared),
  }
}

export default convertCalendarEventToReservation