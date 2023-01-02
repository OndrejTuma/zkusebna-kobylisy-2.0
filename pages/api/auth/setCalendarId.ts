import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'

import { NetworkFailedState } from 'LocalTypes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null | NetworkFailedState>,
) {
  const { calendarId: calendar_id, tokenId } = req.body

  await dbConnect()

  try {
    await Token.findByIdAndUpdate(tokenId, {
      $set: {
        calendar_id,
      },
    })

    res.status(200).end()
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}