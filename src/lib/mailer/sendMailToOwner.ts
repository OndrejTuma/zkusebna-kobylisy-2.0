import { Reservation, ReservationItem, ReservationType } from 'LocalTypes'
import getTokenData from 'Utils/api/getTokenData'
import { populateEmailTemplate, sendMessage } from './mailer'

type MailType = 'new' | 'update'
type MailData = {
  reservation: Reservation
  items?: ReservationItem[]
  reservationTypes?: ReservationType[]
}

const sendMailToOwner = async (type: MailType, data: MailData) => {
  const { user } = await getTokenData()

  const subject =
    type === 'new' ? 'Vznikla nová rezervace' : 'Rezervace byla upravena'

  const html = populateEmailTemplate({
    title: [type === 'new' ? 'Nová' : 'Upravená', 'Rezervace'],
    templateName: 'admin',
    customText: `https://rezervace.zkusebna-kobylisy.cz/admin#/reservations/${data.reservation.id}`,
    ...data,
  })

  sendMessage(user, subject, html)
}

export default sendMailToOwner
