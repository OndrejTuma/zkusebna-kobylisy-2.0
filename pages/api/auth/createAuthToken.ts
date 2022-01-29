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
  tokens: {}
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.body

  const { tokens } = await oAuth2Client.getToken(code);

  await dbConnect()
  await Token.create({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  })

  res.status(200).json({ tokens: tokens })
}