import { CalendarEvent, Reservation } from 'LocalTypes'
import { joinItemIdsFromChunks } from './itemsChunks'

const convertCalendarEventToReservation = (event: CalendarEvent): Reservation => {
  const { id, start, end, summary, extendedProperties } = event

  return {
    archived: Boolean(extendedProperties?.shared?.archived),
    id,
    dateStart: start?.date || start?.dateTime,
    dateEnd: end?.date || end?.dateTime,
    email: extendedProperties?.shared?.email,
    itemIds: joinItemIdsFromChunks(extendedProperties?.shared),
    name: extendedProperties?.shared?.name,
    phone: extendedProperties?.shared?.phone,
    price: extendedProperties?.shared?.price ? parseInt(extendedProperties?.shared?.price) : 0,
    paid: Boolean(extendedProperties?.shared?.paid),
    reservationName: summary,
    reservationType: extendedProperties?.shared?.reservationType,
  }
}

export default convertCalendarEventToReservation