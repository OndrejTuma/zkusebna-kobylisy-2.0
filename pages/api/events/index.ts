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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseCalendarEvents>,
) {
  await dbConnect()

  console.log('EVENTS METHOD', req.method)

  const tokens = await Token.findOne().sort({ $natural: -1 })

  if (!tokens) {
    const error = 'Chybí token pro Google kalendář a nelze zobrazit eventy. Navštivte stránku /auth kde si token vygenerujete'

    return res.status(401).json({ error })
  }

  if (!tokens.calendar_id) {
    const error = 'Není definovaný kalendář pro rezervace. Navštivte stránku /auth kde si vygenerujete token a zvolíte kalendář'

    return res.status(401).json({ error })
  }

  oAuth2Client.setCredentials({
    refresh_token: tokens.refresh_token,
  })

  switch (req.method) {
    case 'GET':

      try {
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

        const events = await calendar.events.list({
          calendarId: tokens.calendar_id,
        })

        res.status(200).json({ events })
      } catch (err) {
        res.status(400).json({ error: err.message })
      }

      break
    case 'POST':

  }
}
