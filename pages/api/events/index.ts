import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'
import keys from 'Keys/oauth2.keys.json'

const oAuth2Client = new google.auth.OAuth2(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);


type Data = {
  events: {  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()

  const tokens = await Token.findOne().limit(1).sort({$natural:-1})

  oAuth2Client.setCredentials({
    refresh_token: tokens.refresh_token
  });

  const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

  const events = await calendar.events.list({
    calendarId: 'n4jnepnqpsl0nbaq0gqf8p7eco@group.calendar.google.com'
  })

  res.status(200).json({ events })
}
