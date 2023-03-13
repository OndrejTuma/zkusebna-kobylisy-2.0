import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import ReservationType from 'Models/ReservationType'

import { ReservationTypeType } from './'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { NetworkState } from 'LocalTypes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<ReservationTypeType | null>>,
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
        await authorizeRequest(req)
        
        const { title, discount } = req.body
  
        const reservationType = await ReservationType.findByIdAndUpdate(id, { $set: { title, discount } })
  
        res.status(200).json(reservationType)
  
        break
      }
      case 'DELETE': {
        await authorizeRequest(req)

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
