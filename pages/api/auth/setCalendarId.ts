import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Token from 'Models/Token'

import { NetworkState } from 'LocalTypes'
import { badRequestCatch } from 'Utils/api/misc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<null>>,
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
  } catch (error) {
    badRequestCatch(res, error)
  }
}