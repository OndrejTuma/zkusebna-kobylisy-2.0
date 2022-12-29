import nodemailer, { Transporter } from 'nodemailer'
import getTokenData from 'Utils/api/getTokenData'

const replyTo = 'Zkušebna Kobylisy <zkusebna.terezicka@gmail.com>'
const from = 'Zkušebna Kobylisy <zkusebna.terezicka@gmail.com>'

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
      // @ts-ignore next line
      service: 'gmail',
      auth,
    })
  }

  return transport
}

export const sendMessage = async (to: string, subject: string, html: string, text?: string) => {
  const transport = await getTransport()

  const result = await transport.sendMail({
    from,
    to,
    subject,
    html,
    text: text || html.replace(/(<([^>]+)>)/gi, ""),
    replyTo,
  })

  return result
}
