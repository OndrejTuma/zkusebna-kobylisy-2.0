import { google } from 'googleapis'
import { NetworkFailedState, Reservation } from 'LocalTypes'
import Item from 'Models/Item'
import ReservationTypeModel from 'Models/ReservationType'
import { NextApiRequest, NextApiResponse } from 'next'
import getTokenData from 'Utils/api/getTokenData'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'
import calculatePriceForReservation from 'Utils/calculatePriceForReservation'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import convertReservationToCalendarEvent from 'Utils/convertReservationToCalendarEvent'

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

        const { data: calendarEvent } = await calendar.events.get({
          calendarId,
          eventId: id as string,
        }, {})

        const reservation: Reservation = convertCalendarEventToReservation(calendarEvent)

        const items = await Item.find()
        const reservationTypes = await ReservationTypeModel.find()

        const reservationWithPrice = {
          ...reservation,
          price: reservation.archived
                 ? reservation.price
                 : calculatePriceForReservation(reservation, items, reservationTypes),
        }

        res.status(200).json(reservationWithPrice)

        break
      }
      case 'PUT': {
        const { data: calendarEvent } = await calendar.events.update({
          calendarId,
          eventId: id as string,
          requestBody: convertReservationToCalendarEvent(req.body),
        }, {})

        const reservation = convertCalendarEventToReservation(calendarEvent)

        res.status(200).json(reservation)

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
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
