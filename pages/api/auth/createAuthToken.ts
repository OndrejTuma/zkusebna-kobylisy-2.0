import { NetworkState } from 'LocalTypes'
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

import type { ResponseAuthToken, NetworkFailedState } from 'LocalTypes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseAuthToken | NetworkFailedState>
) {
  const { code } = req.body

  const { tokens } = await oAuth2Client.getToken(code);

  await dbConnect()

  // remove all previous tokens - we want to keep only current one
  await Token.remove({})

  try {
    const { id: tokenId } = await Token.create({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    })

    oAuth2Client.setCredentials({
      refresh_token: tokens.refresh_token,
    })

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    const calendars = await calendar.calendarList.list()

    res.status(200).json({
      calendars,
      tokenId
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}