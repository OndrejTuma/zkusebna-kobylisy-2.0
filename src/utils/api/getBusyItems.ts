import { google } from 'googleapis'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'

const getBusyItems = async (timeMin?: string, timeMax?: string) => {
  if (!timeMin || !timeMax) {
    return []
  }

  const { calendarId, token } = await getTokenData()

  setOAuthCredentials(token)

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

  const { data: { items: events } } = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
  })

  if (!events || events.length === 0) {
    return []
  }

  return events.map(evt => {
    const { itemIds } = convertCalendarEventToReservation(evt)

    return itemIds
  }).reduce((itemIds, currentItemIds) => itemIds.concat(currentItemIds), [])
}

export default getBusyItems