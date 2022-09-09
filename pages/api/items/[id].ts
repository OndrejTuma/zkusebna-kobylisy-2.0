import { NetworkFailedState, ReservationItem } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationItem | NetworkFailedState>,
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
        authorizeRequest(req)
  
        const { title, category_id, code, price, image, active } = req.body
  
        await Item.findByIdAndUpdate(id, {
          $set: {
            title, category_id, code, price, image, active,
          },
        })
  
        res.status(200).end()
  
        break
      }
      case 'DELETE': {
        authorizeRequest(req)
  
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