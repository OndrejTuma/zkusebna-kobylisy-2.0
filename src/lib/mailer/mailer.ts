import { Reservation, ReservationType, ReservationItem } from 'LocalTypes'
import nodemailer, { Transporter } from 'nodemailer'
import getTokenData from 'Utils/api/getTokenData'
import fs from 'fs'
import path from 'path'
import Handlebars from 'handlebars'
import Payment from 'Lib/payment'
import formatDateRange from 'Utils/formatDateRange'
import getDiscountPrice from 'Utils/getDiscountPrice'
import getCETDate from 'Utils/getCETDate'
import formatNumberToCZK from 'Utils/formatNumberToCZK'

Handlebars.registerHelper('if_even', function (conditional, options) {
  if (conditional % 2 === 0) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

// const replyTo = 'Zkušebna Kobylisy <zkusebna.terezicka@gmail.com>'
const replyTo = ''
const from = 'Zkušebna Kobylisy <zkusebna.terezicka@gmail.com>'
const homepageUrl = 'https://rezervace.zkusebna-kobylisy.cz/'

let transport: Transporter | undefined

export const getMailerAuth = async () => {
  const { accessToken, user, token: refreshToken } = await getTokenData()

  return {
    type: 'OAuth2',
    user,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
    accessToken,
  }
}

export const getTransport = async (): Promise<Transporter> => {
  if (!transport) {
    const auth = await getMailerAuth()

    transport = nodemailer.createTransport({
      // TODO: figure out how to make this work with types
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore next line
      service: 'gmail',
      auth,
    })
  }

  return transport
}

export const sendMessage = async (
  to: string,
  subject: string,
  html: string,
  text?: string
) => {
  const transport = await getTransport()

  const result = await transport.sendMail({
    from,
    to,
    subject,
    html,
    text: text || html.replace(/(<([^>]+)>)/gi, ''),
    replyTo,
  })

  return result
}

export const populateEmailTemplate = (
  title: string[],
  reservation: Reservation,
  items: ReservationItem[],
  reservationTypes: ReservationType[],
  updateText?: string,
) => {
  const source = fs.readFileSync(
    path.join(
      process.cwd(),
      'src',
      'lib',
      'mailer',
      'template',
      'default.html'
    ),
    'utf8'
  )

  const template = Handlebars.compile(source)

  const { dateStart, dateEnd, price, reservationName } = reservation

  const date = formatDateRange(getCETDate(dateStart!), getCETDate(dateEnd!))
  const discount =
    reservationTypes.find(({ id }) => id === reservation.reservationType)
      ?.discount ?? 1
  const reservationItems = items
    .filter(({ id }) => reservation.itemIds.includes(id))
    .map(({ image, price, title }) => ({
      image,
      title,
      price: formatNumberToCZK(getDiscountPrice(price, discount)),
    }))

  const qrCode =
    price && reservationName
      ? Payment.getQRPayment(price, reservationName)
      : undefined

  return template({
    date,
    homepageUrl,
    qrCode,
    price: formatNumberToCZK(price!),
    accountNumber: Payment.getBankAccount(),
    reservation,
    title,
    items: reservationItems,
    updateText,
  })
}
