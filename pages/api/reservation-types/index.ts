import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'
import transformRAParameters from 'Utils/transformRAParameters'

type Data = ReservationTypeType | ReservationTypeType[]
export type ReservationTypeType = {
  id: string | number,
  title: string,
  discount: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()

  switch (req.method) {
    case 'GET':
      const { range, parsedRange: [ from, to ], sort } = transformRAParameters(req.query.filter as string, req.query.range as string, req.query.sort as string)

      const reservationTypes = await ReservationType.find().skip(from).limit(to - from + 1).sort(sort)
      const reservationTypesCount = await ReservationType.count()

      res.setHeader('Content-Range', `reservation-types ${range}/${reservationTypesCount}`)
      res.status(200).json(reservationTypes)

      break
    case 'POST':
      const { title, discount } = req.body

      const reservationType = await ReservationType.create({
        title,
        discount,
      })

      res.status(201).json(reservationType)

      break
    default:
      res.status(400).end()
  }
}