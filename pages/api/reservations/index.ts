import { google } from 'googleapis'
import dbConnect from 'Lib/dbConnect'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  NetworkState,
  Reservation,
  ResponseCalendarEvent,
} from 'LocalTypes'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import { sendNewReservationMail } from 'Lib/mailer'
import { Filter, parseRAFilters } from 'Lib/filters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<ResponseCalendarEvent | Reservation[]>>
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
        const {
          filter: {
            allFilters: { current, month, title },
          },
          range,
          sort,
        } = parseRAFilters(req.query)

        const calendarFilter = new Filter({
          calendarId,
          q: title,
        })

        // filter expired reservations
        if (current) {
          calendarFilter.add('timeMin', new Date().toISOString())
        }
        // get reservations for a specific month
        if (month) {
          const monthDate = new Date(month)

          calendarFilter.add('timeMin', startOfMonth(monthDate).toISOString())
          calendarFilter.add('timeMax', endOfMonth(monthDate).toISOString())
        }

        const {
          data: { items: events },
        } = await calendar.events.list(calendarFilter.allFilters)

        if (!events) {
          res.setHeader('Content-Range', `reservations ${range.print()}/0`)
          res.status(200).json([])

          return
        }

        const reservations: Reservation[] = events.map(
          convertCalendarEventToReservation
        )

        const reservationsWithPrice = reservations.map((reservation) => ({
          ...reservation,
          price: reservation.archived
            ? reservation.price
            : calculatePriceForReservation(
                reservation,
                items,
                reservationTypes
              ),
        }))

        reservationsWithPrice.sort(sort.sortFn)

        res.setHeader(
          'Content-Range',
          `reservations ${range.print()}/${reservationsWithPrice.length}`
        )
        res
          .status(200)
          .json(reservationsWithPrice.slice(range.from, range.to + 1))

        break
      case 'POST':
        const event = await calendar.events.insert({
          calendarId,
          requestBody: convertReservationToCalendarEvent(req.body),
        })

        const reservationPrice = calculatePriceForReservation(
          req.body,
          items,
          reservationTypes
        )

        await sendNewReservationMail({
          ...req.body,
          price: reservationPrice,
        }, items, reservationTypes)

        res.status(201).json(event)

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
