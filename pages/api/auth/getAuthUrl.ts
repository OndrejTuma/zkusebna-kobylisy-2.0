import { NetworkFailedState, ResponseAuthUrl } from 'LocalTypes'
import type { NextApiRequest, NextApiResponse } from 'next'
import oAuth2Client from 'Utils/api/oAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseAuthUrl | NetworkFailedState>,
) {
  try {
    // Generate the url that will be used for the consent dialog.
    const url = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        // nodemailer requires full access to the account to work properly
        'https://mail.google.com/',
        // 'https://www.googleapis.com/auth/gmail.send',
        // 'https://www.googleapis.com/auth/gmail.metadata',
      ],
    })

    res.status(200).json({ url })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}