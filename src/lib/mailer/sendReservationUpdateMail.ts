import { Reservation, ReservationItem, ReservationType } from 'LocalTypes'
import getReservationChanges, { convertChangesToString } from 'Utils/getReservationChanges'
import { populateEmailTemplate, sendMessage } from './mailer'

const subject = 'Rezervace byla upravena'
const title = ['Změna', 'Rezervace']

const sendReservationUpdateMail = (previousReservation: Reservation, reservation: Reservation, items: ReservationItem[], reservationTypes: ReservationType[]) => {
  if (!reservation.email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservation.reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }
  if (!reservation.dateStart || !reservation.dateEnd) {
    throw new Error('New reservation error: No reservation date provided')
  }

  const reservationChanges = getReservationChanges(previousReservation, reservation)

  if (Object.keys(reservationChanges).length === 0) {
    return
  }

  const customText = `Byly provedeny následující změny: <br/>${convertChangesToString(reservationChanges, items, reservationTypes)}`

  const html = populateEmailTemplate({
    title, 
    reservation, 
    items, 
    reservationTypes, 
    customText
  })

  return sendMessage(reservation.email, subject, html)
}

export default sendReservationUpdateMail
