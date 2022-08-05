import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'
import dbConnect from 'Lib/dbConnect'
import { NetworkFailedState } from 'LocalTypes'
import Token from 'Models/Token'
import { NextApiRequest, NextApiResponse } from 'next'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import { joinItemIdsFromChunks, splitItemIdsInChunks } from 'Utils/itemsChunks'

import type { Data } from './'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | NetworkFailedState>,
) {
  // TODO: create a middleware for tokens validation
  const { id } = req.query

  await dbConnect()

  console.log('RESERVATION METHOD', req.method)

  const tokens = await Token.findOne().sort({ $natural: -1 })

  if (!tokens) {
    const error = 'Chybí token pro Google kalendář a nelze zobrazit rezervace. Navštivte stránku /auth kde si token vygenerujete'

    return res.status(401).json({ error })
  }

  if (!tokens.calendar_id) {
    const error = 'Není definovaný kalendář pro rezervace. Navštivte stránku /auth kde si vygenerujete token a zvolíte kalendář'

    return res.status(401).json({ error })
  }

  oAuth2Client.setCredentials({
    refresh_token: tokens.refresh_token,
  })

  try {
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    switch (req.method) {
      case 'GET': {

        const reservation = await calendar.events.get({
          calendarId: tokens.calendar_id,
          eventId: id,
        })

        res.status(200).json(convertCalendarEventToReservation(reservation.data))

        break
      }
      case 'PUT': {
        await calendar.events.update({
          calendarId: tokens.calendar_id,
          eventId: id,
          requestBody: convertReservationToCalendarEvent(req.body),
        })

        res.status(200).end()

        break
      }
      case 'DELETE': {
        await calendar.events.delete({
          calendarId: tokens.calendar_id,
          eventId: id,
        })

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