import { calendar } from '@googleapis/calendar'
import dbConnect from 'Lib/dbConnect'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import subDays from 'date-fns/subDays'
import addDays from 'date-fns/addDays'
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
import authorizeRequest from 'Utils/api/authorizeRequest'

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
        let isAuthorized = true
        try {
          await authorizeRequest(req)
        } catch (error) {
          isAuthorized = false 
        }

        const {
          filter: {
            allFilters: { current, clientMonth, title },
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
        // get reservations for a specific month to client calendar
        if (clientMonth) {
          const monthDate = new Date(clientMonth)

          calendarFilter.add('timeMin', subDays(startOfMonth(monthDate), 6).toISOString())
          calendarFilter.add('timeMax', addDays(endOfMonth(monthDate), 6).toISOString())
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
          event => convertCalendarEventToReservation(event, isAuthorized)
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
              id: event.id,
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
