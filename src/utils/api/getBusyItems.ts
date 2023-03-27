import { calendar } from '@googleapis/calendar'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'

const getBusyItems = async (timeMin?: string, timeMax?: string) => {
  if (!timeMin || !timeMax) {
    return []
  }

  const { calendarId, token } = await getTokenData()

  setOAuthCredentials(token)

  const { events } = calendar({ version: 'v3', auth: oAuth2Client })

  const {
    data: { items: reservationEvents },
  } = await events.list({
    calendarId,
    timeMin,
    timeMax,
  })

  if (!reservationEvents || reservationEvents.length === 0) {
    return []
  }

  return reservationEvents
    .map((evt) => {
      const { itemIds } = convertCalendarEventToReservation(evt)

      return itemIds
    })
    .reduce((itemIds, currentItemIds) => itemIds.concat(currentItemIds), [])
}

export default getBusyItems
