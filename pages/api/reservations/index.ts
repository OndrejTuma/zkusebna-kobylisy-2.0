import { calendar } from '@googleapis/calendar'
import dbConnect from 'Lib/dbConnect'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import type { NextApiRequest, NextApiResponse } from 'next'
import type {
  NetworkState,
  Reservation,
} from 'LocalTypes'
import getTokenData from 'Utils/api/getTokenData'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import { sendNewReservationMail, sendMailToOwner } from 'Lib/mailer'
import { Filter, parseRAFilters } from 'Lib/filters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<Reservation | Reservation[]>>
) {
  await dbConnect()

  console.log('RESERVATIONS METHOD', req.method)

  try {
    const { calendarId, token } = await getTokenData()

    setOAuthCredentials(token)

    const { events } = calendar({ version: 'v3', auth: oAuth2Client })

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
          singleEvents: true,
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
          data: { items: reservationEvents },
        } = await events.list(calendarFilter.allFilters)

        if (!reservationEvents) {
          res.setHeader('Content-Range', `reservations ${range.print()}/0`)
          res.status(200).json([])

          return
        }

        const reservations: Reservation[] = reservationEvents.map(
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
        const isRecurring = req.body.isRecurring

        const { data: event } = await events.insert({
          calendarId,
          requestBody: convertReservationToCalendarEvent(req.body),
        })

        const reservationPrice = calculatePriceForReservation(
          req.body,
          items,
          reservationTypes
        )

        // send email for non-recurring reservations
        if (!isRecurring) {
          await sendNewReservationMail(
            {
              ...req.body,
              price: reservationPrice,
            },
            items,
            reservationTypes
          )
          await sendMailToOwner('new', {
            reservation: {
              ...req.body,
              price: reservationPrice,
            },
            items,
            reservationTypes,
          })
        }

        res.status(201).json(convertCalendarEventToReservation(event))

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
