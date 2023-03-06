import { Reservation } from 'LocalTypes'
import { sendMessage } from './mailer'

const subject = 'Rezervace byla smazána'

const sendReservationDeleteMail = (reservation: Reservation) => {
  const { email, reservationName } = reservation
  
  if (!email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }

  const message = [`<p>Rezervace <strong>${reservationName}</strong> byla právě odstraněna správcem zkušebny.</p>`]

  message.push(`<p>Pokud potřebujete více informací, můžete odpovědět na tento email.</p>`)

  return sendMessage(email, subject, message.join(''))
}

export default sendReservationDeleteMail
