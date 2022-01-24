import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { google } from 'googleapis'

import dbConnect from '../../../lib/dbConnect'
import Token from '../../../models/Token'
import keys from '../../../oauth2.keys.json'

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