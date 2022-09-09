import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'

import { ReservationTypeType } from './'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationTypeType>,
) {
  const { id } = req.query

  await dbConnect()

  try {
    switch (req.method) {
      case 'GET': {
        const reservationType = await ReservationType.findById(id)
  
        res.status(200).json(reservationType)
  
        break
      }
      case 'PUT': {
        authorizeRequest(req)
        
        const { title, discount } = req.body
  
        await ReservationType.findByIdAndUpdate(id, { $set: { title, discount } })
  
        res.status(200).end()
  
        break
      }
      case 'DELETE': {
        authorizeRequest(req)

        await ReservationType.findByIdAndDelete(id)
  
        res.status(200).end()
  
        break
      }
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}