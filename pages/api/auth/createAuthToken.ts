import { NetworkState } from 'LocalTypes'
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'
import type { ResponseAuthToken, NetworkFailedState } from 'LocalTypes'
import oAuth2Client, { setOAuthCredentials } from 'Utils/api/oAuth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseAuthToken | NetworkFailedState>
) {
  const { code } = req.body


  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens.refresh_token) {
      throw new Error('Google Refresh Token nebyl vygenerován. Zkuste odhlásit aplikaci Zkušebna Kobylisy zde: https://myaccount.google.com/u/0/permissions')
    }

    await dbConnect()

    // remove all previous tokens - we want to keep only current one
    await Token.remove({})

    const { id: tokenId } = await Token.create({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    })

    setOAuthCredentials(tokens.refresh_token)

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