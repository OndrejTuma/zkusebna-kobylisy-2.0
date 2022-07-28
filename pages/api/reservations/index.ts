import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'
import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NetworkFailedState, ResponseCalendarEvents, Reservation, ResponseCalendarEvent, CalendarEvent } from 'LocalTypes'
import transformRAParameters from 'Utils/transformRAParameters'
import { joinItemIdsFromChunks, splitItemIdsInChunks } from 'Utils/itemsChunks'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

export type Data = ResponseCalendarEvent | Reservation[] | undefined

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | NetworkFailedState>,
) {
  await dbConnect()

  console.log('RESERVATIONS METHOD', req.method)

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
      case 'GET':
        const { range, parsedRange: [ from, to ], sort } = transformRAParameters(req.query.filter as string, req.query.range as string, req.query.sort as string)

        const eventsData = await calendar.events.list({
          calendarId: tokens.calendar_id,
        })
        const events = eventsData?.data?.items

        if (!events) {
          res.setHeader('Content-Range', `reservations ${range}/0`)
          res.status(200).json([])

          return
        }

        const formattedEvents: Reservation[] = events.map(({id, start, end, summary, extendedProperties}) => ({
          id,
          dateStart: start?.date || start?.dateTime,
          dateEnd: end?.date || end?.dateTime,
          reservationType: extendedProperties?.shared?.reservationType,
          reservationName: summary,
          name: extendedProperties?.shared?.name,
          phone: extendedProperties?.shared?.phone,
          email: extendedProperties?.shared?.email,
          itemIds: joinItemIdsFromChunks(extendedProperties?.shared),
        }))

        const sortKey = Object.keys(sort)[0] as keyof Reservation
        const sortValue = Object.values(sort)[0] as number

        formattedEvents.sort((a, b) => {
          // TODO: fix
          // @ts-ignore
          return (a[sortKey] > b[sortKey] ? 1 : -1) * sortValue
        })

        res.setHeader('Content-Range', `reservations ${range}/${formattedEvents.length}`)
        res.status(200).json(formattedEvents.slice(from, to + 1))

        break
      case 'POST':
        const { dateStart, dateEnd, reservationType, reservationName, name, phone, email, items } = req.body

        const event = await calendar.events.insert({
          calendarId: tokens.calendar_id,
          requestBody: {
            start: {
              dateTime: dateStart,
            },
            end: {
              dateTime: dateEnd,
            },
            summary: reservationName,
            extendedProperties: {
              shared: {
                reservationType,
                name,
                phone,
                email,
                ...splitItemIdsInChunks(items),
              },
            },
          },
        })

        res.status(201).json(event)

        break
      default:
        res.status(400).end()
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
