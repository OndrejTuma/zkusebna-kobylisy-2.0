import { google } from 'googleapis'
import { NetworkFailedState, Reservation } from 'LocalTypes'
import Token from 'Models/Token'
import { NextApiRequest, NextApiResponse } from 'next'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import { joinItemIdsFromChunks, splitItemIdsInChunks } from 'Utils/itemsChunks'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Reservation | NetworkFailedState>,
) {
  const { id } = req.query

  console.log('RESERVATION METHOD', req.method)

  try {
    const { calendarId, token } = await getTokenData(res)

    setOAuthCredentials(token)

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    switch (req.method) {
      case 'GET': {

        const reservation = await calendar.events.get({
          calendarId,
          eventId: id as string,
        }, {})

        res.status(200).json(convertCalendarEventToReservation(reservation.data))

        break
      }
      case 'PUT': {
        await calendar.events.update({
          calendarId,
          eventId: id as string,
          requestBody: convertReservationToCalendarEvent(req.body),
        }, {})

        res.status(200).end()

        break
      }
      case 'DELETE': {
        await calendar.events.delete({
          calendarId,
          eventId: id as string,
        }, {})

        res.status(200).end()

        break
      }
      default:
        res.status(400).end()
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}