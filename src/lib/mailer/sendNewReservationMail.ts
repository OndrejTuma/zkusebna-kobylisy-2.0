import { Reservation, ReservationItem, ReservationType } from 'LocalTypes'
import { populateEmailTemplate, sendMessage } from './mailer'

const subject = 'Rezervace byla vytvořena'
const title = ['Potvrzení', 'Rezervace']

const sendNewReservationMail = async (reservation: Reservation, items: ReservationItem[], reservationTypes: ReservationType[]) => {
  const { dateStart, dateEnd, email, reservationName } = reservation

  if (!email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }
  if (!dateStart || !dateEnd) {
    throw new Error('New reservation error: No reservation date provided')
  }

  const html = populateEmailTemplate({
    title, 
    reservation, 
    items, 
    reservationTypes
  })

  return sendMessage(
    email,
    subject,
    html,
  )
}

export default sendNewReservationMail
