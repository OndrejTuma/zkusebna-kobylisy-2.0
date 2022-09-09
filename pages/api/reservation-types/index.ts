import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'
import transformRAParameters from 'Utils/transformRAParameters'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'

export type ReservationTypeType = {
  id: string | number,
  title: string,
  discount: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationTypeType | ReservationTypeType[]>
) {
  await dbConnect()

  try {
    switch (req.method) {
      case 'GET':
        const { sort, range, parsedRange: [from, to], filter } = transformRAParameters(
          req.query.filter,
          req.query.range,
          req.query.sort || '["title", "ASC"]'
        )
  
        const reservationTypes = await ReservationType.find(filter).skip(from).limit(to - from + 1).sort(sort)
        const reservationTypesCount = await ReservationType.count()
  
        res.setHeader('Content-Range', `reservation-types ${range}/${reservationTypesCount}`)
        res.status(200).json(reservationTypes)
  
        break
      case 'POST':
        authorizeRequest(req)
        
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
