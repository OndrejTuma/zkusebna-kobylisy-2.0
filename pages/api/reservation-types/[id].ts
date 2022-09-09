import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'

import { ReservationTypeType } from './'

type Data = ReservationTypeType

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query

  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const reservationType = await ReservationType.findById(id)

      res.status(200).json(reservationType)

      break
    }
    case 'PUT': {
      const { title, discount } = req.body

      await ReservationType.findByIdAndUpdate(id, { $set: { title, discount } })

      res.status(200).end()

      break
    }
    case 'DELETE': {
      await ReservationType.findByIdAndDelete(id)

      res.status(200).end()

      break
    }
    default:
      res.status(400).end()
  }
}