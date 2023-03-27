import { calendar } from '@googleapis/calendar'
import {
  sendReservationDeleteMail,
  sendReservationUpdateMail,
} from 'Lib/mailer'
import { NetworkState, Reservation } from 'LocalTypes'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import { NextApiRequest, NextApiResponse } from 'next'
import authorizeRequest from 'Utils/api/authorizeRequest'
import getTokenData from 'Utils/api/getTokenData'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<Reservation>>
) {
  const eventId = req.query.id as string

  console.log('RESERVATION METHOD', req.method)

  try {
    const { calendarId, token } = await getTokenData()

    setOAuthCredentials(token)

    const { events } = calendar({ version: 'v3', auth: oAuth2Client })

    switch (req.method) {
      case 'GET': {
        const { data: calendarEvent } = await events.get(
          {
            calendarId,
            eventId,
          },
          {}
        )

        const reservation: Reservation =
          convertCalendarEventToReservation(calendarEvent)

        const items = await Item.find()
        const reservationTypes = await ReservationTypeModel.find()

        const reservationWithPrice = {
          ...reservation,
          price: reservation.archived
            ? reservation.price
            : calculatePriceForReservation(
                reservation,
                items,
                reservationTypes
              ),
        }

        res.status(200).json(reservationWithPrice)

        break
      }
      case 'PUT': {
        await authorizeRequest(req)

        const { data: calendarEvent } = await events.update(
          {
            calendarId,
            eventId,
            requestBody: convertReservationToCalendarEvent(req.body),
          },
          {}
        )

        const reservation = convertCalendarEventToReservation(calendarEvent)

        await sendReservationUpdateMail(req.body)

        res.status(200).json(reservation)

        break
      }
      case 'DELETE': {
        await authorizeRequest(req)

        const { data: calendarEvent } = await events.get(
          {
            calendarId,
            eventId,
          },
          {}
        )

        await events.delete(
          {
            calendarId,
            eventId,
          },
          {}
        )

        const reservation = convertCalendarEventToReservation(calendarEvent)

        await sendReservationDeleteMail(reservation)

        res.status(200).end()

        break
      }
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
