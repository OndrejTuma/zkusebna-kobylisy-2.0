import { ReservationItem } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import authorizeRequest from 'Utils/api/authorizeRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ReservationItem>,
) {
  const { id } = req.query

  await dbConnect()

  console.log('ITEM METHOD', req.method)

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
      await Item.findByIdAndDelete(id)

      res.status(200).end()

      break
    }
    default:
      res.status(400).end()
  }
}