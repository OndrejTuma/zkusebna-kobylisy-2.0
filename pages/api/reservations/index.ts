import { google } from 'googleapis'
import dbConnect from 'Lib/dbConnect'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  NetworkFailedState,
  Reservation,
  ResponseCalendarEvent,
} from 'LocalTypes'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import transformRAParameters from 'Utils/transformRAParameters'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import { sendNewReservationMail } from 'Lib/mailer'

export type Data = ResponseCalendarEvent | Reservation[] | undefined

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | NetworkFailedState>,
) {
  await dbConnect()

  console.log('RESERVATIONS METHOD', req.method)

  try {
    const { calendarId, token } = await getTokenData()

    setOAuthCredentials(token)

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    const items = await Item.find()
    const reservationTypes = await ReservationTypeModel.find()

    switch (req.method) {
      case 'GET':
        const { sort, range, parsedRange: [from, to] } = transformRAParameters(req.query.filter, req.query.range, req.query.sort)

        const customFilter = req.query.filter ? JSON.parse(req.query.filter as string) : {}

        const filter = {
          calendarId,
          q: customFilter.title,
        }

        if (customFilter.current) {
          Object.assign(filter, { timeMin: new Date().toISOString() })
        }
        // get reservations for a specific month
        if (req.query.month) {
          const month = new Date(req.query.month as string)

          Object.assign(filter, { 
            timeMin: startOfMonth(month).toISOString(),
            timeMax: endOfMonth(month).toISOString(),
          })
        }

        const { data: { items: events } } = await calendar.events.list(filter)

        if (!events) {
          res.setHeader('Content-Range', `reservations ${range}/0`)
          res.status(200).json([])

          return
        }

        const reservations: Reservation[] = events.map(convertCalendarEventToReservation)

        const reservationsWithPrice = reservations.map(reservation => ({
          ...reservation,
          price: reservation.archived
            ? reservation.price
            : calculatePriceForReservation(reservation, items, reservationTypes),
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

        await sendNewReservationMail({
          ...req.body,
          price: calculatePriceForReservation(req.body, items, reservationTypes)
        })

        res.status(201).json(event)

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
