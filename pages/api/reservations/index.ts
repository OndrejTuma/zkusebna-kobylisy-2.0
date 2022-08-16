import { google } from 'googleapis'
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
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import getDiscountPrice from 'Utils/getDiscountPrice'
import transformRAParameters from 'Utils/transformRAParameters'
import { joinItemIdsFromChunks, splitItemIdsInChunks } from 'Utils/itemsChunks'

export type Data = ResponseCalendarEvent | Reservation[] | undefined

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | NetworkFailedState>,
) {
  await dbConnect()

  console.log('RESERVATIONS METHOD', req.method)

  try {
    const { calendarId, token } = await getTokenData(res)

    setOAuthCredentials(token)

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    switch (req.method) {
      case 'GET':
        const { sort, range, parsedRange: [from, to] } = transformRAParameters(req.query.filter, req.query.range, req.query.sort)

        const parsedFilter = req.query.filter ? JSON.parse(req.query.filter as string) : {}

        const eventsData = await calendar.events.list({
          calendarId,
          q: parsedFilter.title,
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

        const reservationsWithPrice = reservations.map(reservation => ({
          ...reservation,
          price: calculatePriceForReservation(reservation, items, reservationTypes),
        }))

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
          calendarId,
          requestBody: convertReservationToCalendarEvent(req.body),
        })

        res.status(201).json(event)

        break
      default:
        res.status(400).end()
    }
  } catch (err) {
    console.log('Request to /api/reservations failed')
    console.error(err)
    res.status(400).json({ error: err.message })
  }
}
