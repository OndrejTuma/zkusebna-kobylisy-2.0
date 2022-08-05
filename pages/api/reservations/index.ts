import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import Token from 'Models/Token'
import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  NetworkFailedState,
  ResponseCalendarEvents,
  Reservation,
  ResponseCalendarEvent,
  CalendarEvent, ReservationItem, ReservationType
} from 'LocalTypes'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import getDiscountPrice from 'Utils/getDiscountPrice'
import transformRAParameters from 'Utils/transformRAParameters'
import { joinItemIdsFromChunks, splitItemIdsInChunks } from 'Utils/itemsChunks'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

const getReservationWithPrices = (reservations: Reservation[], items: ReservationItem[], reservationTypes: ReservationType[]) =>
  reservations.map(reservation => {
    const reservationType = reservationTypes.find(({id}) => id === reservation.reservationType)
    const price: number = items.filter(({id}) => reservation.itemIds.includes(id)).map(({price}) => price).reduce<number>((sum, price) => sum + price, 0)
    const reducedPrice = getDiscountPrice(price, reservationType!.discount)

    return {
      ...reservation,
      price: reducedPrice,
    }
  })

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
        const {
          range,
          parsedRange: [ from, to ],
          sort,
        } = transformRAParameters(req.query.filter as string, req.query.range as string, req.query.sort as string)

        const eventsData = await calendar.events.list({
          calendarId: tokens.calendar_id,
        })
        const events = eventsData?.data?.items

        if (!events) {
          res.setHeader('Content-Range', `reservations ${range}/0`)
          res.status(200).json([])

          return
        }

        const reservations: Reservation[] = events.map(convertCalendarEventToReservation)

        const items = await Item.find()
        const reservationTypes = await ReservationTypeModel.find()

        const reservationsWithPrice = getReservationWithPrices(reservations, items, reservationTypes)

        const sortKey = Object.keys(sort)[0] as keyof Reservation
        const sortValue = Object.values(sort)[0] as number

        reservationsWithPrice.sort((a, b) => {
          // TODO: fix
          // @ts-ignore
          return (a[sortKey] > b[sortKey] ? 1 : -1) * sortValue
        })

        res.setHeader('Content-Range', `reservations ${range}/${reservationsWithPrice.length}`)
        res.status(200).json(reservationsWithPrice.slice(from, to + 1))

        break
      case 'POST':
        const event = await calendar.events.insert({
          calendarId: tokens.calendar_id,
          requestBody: convertReservationToCalendarEvent(req.body),
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
