import { google } from 'googleapis'
import keys from 'Keys/oauth2.keys.json'

import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ResponseCalendarEvents } from 'LocalTypes'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0],
)

const calendarId = 'n4jnepnqpsl0nbaq0gqf8p7eco@group.calendar.google.com'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseCalendarEvents>,
) {
  await dbConnect()

  console.log('EVENTS METHOD', req.method)

  const tokens = await Token.findOne().limit(1).sort({ $natural: -1 })

  if (!tokens) {
    const error = 'Refresh token to Google Calendar does not exist. Visit /auth page to generate it'

    return res.status(401).json({ events: null, error })
  }

  oAuth2Client.setCredentials({
    refresh_token: tokens.refresh_token,
  })

  switch (req.method) {
    case 'GET':
      const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

      const events = await calendar.events.list({
        calendarId,
      })

      res.status(200).json({ events })

      break
    case 'POST':

  }
}
