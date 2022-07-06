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
      const { filter, range, sort } = req.query
      const transformed = transformRAParameters(filter as string, range as string, sort as string)
      const [from, to] = transformed.parsedRange

      const items = await Item.find().skip(from).limit(to - from + 1).sort(transformed.sort)
      const itemsCount = await Item.count()

      res.setHeader('Content-Range', `categories ${transformed.range}/${itemsCount}`)
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