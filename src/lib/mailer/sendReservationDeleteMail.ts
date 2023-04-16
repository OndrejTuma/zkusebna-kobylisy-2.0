import { Reservation } from 'LocalTypes'
import { populateEmailTemplate, sendMessage } from './mailer'

const subject = 'Rezervace byla smazána'
const title = ['Smazání', 'Rezervace']

const sendReservationDeleteMail = (reservation: Reservation) => {
  const { email, reservationName } = reservation
  
  if (!email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }

  const html = populateEmailTemplate({
    title, 
    reservation, 
  })

  return sendMessage(email, subject, html)
}

export default sendReservationDeleteMail
