import { NetworkState, ReservationItem } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<ReservationItem | null>>,
) {
  const { id } = req.query

  await dbConnect()

  console.log('ITEM METHOD', req.method)

  try {
    switch (req.method) {
      case 'GET': {
        const item = await Item.findById(id)
  
        res.status(200).json(item)
  
        break
      }
      case 'PUT': {
        await authorizeRequest(req)
  
        const { title, category_id, code, price, image, active } = req.body
  
        const item = await Item.findByIdAndUpdate(id, {
          $set: {
            title, category_id, code, price, image, active,
          },
        })
  
        res.status(200).json(item)
  
        break
      }
      case 'DELETE': {
        await authorizeRequest(req)
  
        await Item.findByIdAndDelete(id)
  
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
