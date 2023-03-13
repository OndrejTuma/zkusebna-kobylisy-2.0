import { NetworkState, ResponseAuthUrl } from 'LocalTypes'
import type { NextApiRequest, NextApiResponse } from 'next'
import { badRequestCatch } from 'Utils/api/misc'
import oAuth2Client from 'Utils/api/oAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<ResponseAuthUrl>>,
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
  } catch (error) {
    badRequestCatch(res, error)
  }
}