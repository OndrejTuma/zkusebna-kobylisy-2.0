import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import transformRAParameters from 'Utils/transformRAParameters'

type Data = ItemType | ItemType[]
export type ItemType = {
  id: string | number,
  category_id: string | number,
  title: string,
  code?: string,
  price: number,
  image?: string,
  active: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()

  console.log('ITEMS METHOD', req.method)

  switch (req.method) {
    case 'GET':
      const { sort, range, parsedRange: [from, to], filter } = transformRAParameters(req.query.filter, req.query.range, req.query.sort)

      // TODO: validate authorization token in firebase
      if (!req.headers.authorization) {
        Object.assign(filter, {
          active: true
        })
      }

      const items = await Item.find(filter).skip(from).limit(to - from + 1).sort(sort)
      const itemsCount = await Item.count()

      res.setHeader('Content-Range', `categories ${range}/${itemsCount}`)
      res.status(200).json(items)

      break
    case 'POST':
      const { title, category_id, code, price, image, active } = req.body

      const item: unknown = await Item.create({
        title,
        category_id,
        code,
        price,
        image,
        active,
      })

      res.status(201).json(item as ItemType)

      break
    default:
      res.status(400).end()
  }
}