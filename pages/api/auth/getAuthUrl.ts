import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'
import { NetworkFailedState, ResponseAuthUrl } from 'LocalTypes'
import type { NextApiRequest, NextApiResponse } from 'next'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

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
      ],
    })

    res.status(200).json({ url })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
}