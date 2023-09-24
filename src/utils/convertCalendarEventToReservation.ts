import { CalendarEvent, Reservation } from 'LocalTypes'
import { joinItemIdsFromChunks } from './itemsChunks'

const convertCalendarEventToReservation = (
  event: CalendarEvent,
  isAuthorized?: boolean
): Reservation => {
  const {
    id,
    start,
    end,
    summary,
    extendedProperties,
    recurrence,
    recurringEventId,
  } = event

  const dateStart = start?.date || start?.dateTime
  const dateEnd = end?.date || end?.dateTime
  const itemIds = joinItemIdsFromChunks(extendedProperties?.shared)
  const name = extendedProperties?.shared?.name
  const reservationName = summary
  const reservationType = extendedProperties?.shared?.reservationType

  if (!isAuthorized) {
    return {
      id,
      dateStart,
      dateEnd,
      itemIds,
      name,
      reservationName,
      reservationType,
    }
  }

  const archived = Boolean(extendedProperties?.shared?.archived)
  const email = extendedProperties?.shared?.email
  const phone = extendedProperties?.shared?.phone
  const price = extendedProperties?.shared?.price
    ? parseInt(extendedProperties?.shared?.price)
    : 0
  const paid = Boolean(extendedProperties?.shared?.paid)

  return {
    archived,
    id,
    dateStart,
    dateEnd,
    email,
    itemIds,
    name,
    phone,
    price,
    paid,
    recurrence,
    recurringEventId,
    reservationName,
    reservationType,
  }
}

export default convertCalendarEventToReservation
