import { calendar } from '@googleapis/calendar'
import subSeconds from 'date-fns/subSeconds'
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
import { updateRecurrenceUntil } from 'Utils/recurrence'
import setTimeFromDateToDate from 'Utils/setTimeFromDateToDate'

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
        let isAuthorized = true
        try {
          await authorizeRequest(req)
        } catch (error) {
          isAuthorized = false 
        }

        const { data: calendarEvent } = await events.get(
          {
            calendarId,
            eventId,
          },
          {}
        )

        const reservation: Reservation =
          convertCalendarEventToReservation(calendarEvent, isAuthorized)

        const items = await Item.find()
        const reservationTypes = await ReservationTypeModel.find()

        const reservationWithPrice = {
          ...reservation,
          // if reservation is recurring, set default value for recurrenceType
          // used in modal on edit page
          ...(reservation.recurringEventId ? { recurrenceType: 0 } : {}),
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

        const { data: currentCalendarEvent } = await events.get({
          calendarId,
          eventId,
        })

        const previousReservation: Reservation =
          convertCalendarEventToReservation(currentCalendarEvent)

        const recurringEventId = currentCalendarEvent.recurringEventId

        // recurring event
        if (recurringEventId) {
          const { recurrenceType } = req.body

          const { data: originalCalendarEvent } = await events.get({
            calendarId,
            eventId: recurringEventId,
          })

          switch (recurrenceType) {
            // update from current event on
            case '1': {
              await events.update({
                calendarId,
                eventId: recurringEventId,
                requestBody: {
                  ...originalCalendarEvent,
                  recurrence: [
                    updateRecurrenceUntil(
                      originalCalendarEvent.recurrence?.[0] as string,
                      subSeconds(
                        new Date(
                          currentCalendarEvent.start?.dateTime as string
                        ),
                        1
                      ).toISOString()
                    ),
                  ],
                },
              })

              const { data: event } = await events.insert({
                calendarId,
                requestBody: {
                  ...convertReservationToCalendarEvent(req.body),
                  recurrence: originalCalendarEvent.recurrence,
                },
              })

              return res
                .status(200)
                .json(convertCalendarEventToReservation(event))
            }
            // update all recurring events
            case '2': {
              const { data: calendarEvent } = await events.update({
                calendarId,
                eventId: recurringEventId,
                requestBody: {
                  ...originalCalendarEvent,
                  ...convertReservationToCalendarEvent(req.body),
                  start: {
                    timeZone: 'Etc/UTC',
                    dateTime: setTimeFromDateToDate(
                      new Date(req.body.dateStart),
                      new Date(originalCalendarEvent.start?.dateTime as string)
                    ).toISOString(),
                  },
                  end: {
                    timeZone: 'Etc/UTC',
                    dateTime: setTimeFromDateToDate(
                      new Date(req.body.dateEnd),
                      new Date(originalCalendarEvent.end?.dateTime as string)
                    ).toISOString(),
                  },
                },
              })

              return res
                .status(200)
                .json(convertCalendarEventToReservation(calendarEvent))
            }
          }
        }

        const { data: calendarEvent } = await events.update({
          calendarId,
          eventId,
          requestBody: convertReservationToCalendarEvent(req.body),
        })

        const items = await Item.find()
        const reservationTypes = await ReservationTypeModel.find()

        const reservationPrice = calculatePriceForReservation(
          req.body,
          items,
          reservationTypes
        )

        // send email for non-recurring reservations
        if (!recurringEventId) {
          await sendReservationUpdateMail(
            previousReservation,
            {
              ...req.body,
              price: reservationPrice,
            },
            items,
            reservationTypes
          )
        }

        res.status(200).json(convertCalendarEventToReservation(calendarEvent))

        break
      }
      case 'DELETE': {
        await authorizeRequest(req)

        const { reason, recurrenceType } = req.query

        const { data: calendarEvent } = await events.get({
          calendarId,
          eventId,
        })

        const recurringEventId = calendarEvent.recurringEventId

        // recurring event
        if (recurringEventId) {
          const { data: originalCalendarEvent } = await events.get({
            calendarId,
            eventId: recurringEventId,
          })

          switch (recurrenceType) {
            // delete from current event on
            case '1': {
              await events.update({
                calendarId,
                eventId: recurringEventId,
                requestBody: {
                  ...originalCalendarEvent,
                  recurrence: [
                    updateRecurrenceUntil(
                      originalCalendarEvent.recurrence?.[0] as string,
                      subSeconds(
                        new Date(calendarEvent.start?.dateTime as string),
                        1
                      ).toISOString()
                    ),
                  ],
                },
              })

              return res.status(200).end()
            }
            // delete all recurring events
            case '2': {
              await events.delete({
                calendarId,
                eventId: recurringEventId,
              })

              return res.status(200).end()
            }
          }
        }

        await events.delete({
          calendarId,
          eventId,
        })

        const reservation = convertCalendarEventToReservation(calendarEvent)

        // send email for non-recurring reservations
        if (!recurringEventId) {
          await sendReservationDeleteMail(reservation, reason)
        }

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
