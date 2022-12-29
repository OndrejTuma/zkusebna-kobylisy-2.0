import { Reservation } from 'LocalTypes'
import { sendMessage } from './mailer'
import Payment from 'Lib/payment'
import format from 'date-fns/format'

const subject = 'Rezervace byla vytvořena'

const sendNewReservationMail = (reservation: Reservation) => {
  const { dateStart, dateEnd, email, price, reservationName } = reservation
  
  if (!email) {
    throw new Error('New reservation error: No email provided')
  }
  if (!reservationName) {
    throw new Error('New reservation error: No reservation name provided')
  }
  if (!dateStart || !dateEnd) {
    throw new Error('New reservation error: No reservation date provided')
  }

  const message = [`<p>Rezervace <strong>${reservationName}</strong> byla úspěšně vytvořena.</p>`]

  if (price && price > 0) {
    message.push(`<p>Cena za rezervaci je <strong>${reservation.price} Kč</strong>.</p>`)
    message.push(`<p>Platbu proveďte na účet <strong>${Payment.getBankAccount()}</strong></p>`)
    message.push(`<p><img width="150" alt="${Payment.getPaymentMessage(reservationName)}" src="${Payment.getQRPayment(price, reservationName)}" /></p>`)
    message.push('<p>Nebo hotově správci zkušebny.</p>')
  }

  message.push(`<p>Termín rezervace: <strong>${format(new Date(dateStart), 'dd.MM. H:mm')} - ${format(new Date(dateEnd), 'dd.MM. H:mm')}</strong></p>`)

  return sendMessage(email, subject, message.join(''))
}

export default sendNewReservationMail
