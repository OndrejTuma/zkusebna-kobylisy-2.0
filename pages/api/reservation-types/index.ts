import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { parseRAFilters } from 'Lib/filters'

export type ReservationTypeType = {
  id: string | number
  title: string
  discount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationTypeType | ReservationTypeType[]>
) {
  await dbConnect()

  try {
    switch (req.method) {
      case 'GET':
        const { filter, range, sort } = parseRAFilters(req.query)

        const reservationTypes = await ReservationType.find(filter.mongoFormat())
          .skip(range.from)
          .limit(range.itemsCount())
          .sort(sort.mongoFormat())
        const reservationTypesCount = await ReservationType.find(
          filter.mongoFormat()
        ).count()

        res.setHeader(
          'Content-Range',
          `reservation-types ${range.print()}/${reservationTypesCount}`
        )
        res.status(200).json(reservationTypes)

        break
      case 'POST':
        await authorizeRequest(req)

        const { title, discount } = req.body

        const reservationType = await ReservationType.create({
          title,
          discount,
        })

        res.status(201).json(reservationType)

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
