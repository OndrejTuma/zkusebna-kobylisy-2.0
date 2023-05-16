import { Reservation } from 'LocalTypes'
import { populateEmailTemplate, sendMessage } from './mailer'

const subject = 'Rezervace byla smazána'
const title = ['Smazání', 'Rezervace']

const sendReservationDeleteMail = (reservation: Reservation, reason?: string | string[]) => {
  const { email, reservationName } = reservation
  
  if (!email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }

  const customText = reason ? `<strong>Důvod:</strong> ${reason}` : undefined

  const html = populateEmailTemplate({
    title, 
    reservation: {
      ...reservation,
      // in order to hide QR code with payment information
      paid: true,
    },
    customText,
  })

  return sendMessage(email, subject, html)
}

export default sendReservationDeleteMail
