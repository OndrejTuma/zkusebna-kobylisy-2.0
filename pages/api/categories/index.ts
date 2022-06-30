import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'
import transformRAParameters from 'Utils/transformRAParameters'

type Data = CategoryType | CategoryType[]
export type CategoryType = {
  id: string | number,
  title: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()

  console.log('CATEGORIES METHOD', req.method)

  switch (req.method) {
    case 'GET':
      const { filter, range, sort } = req.query
      const transformed = transformRAParameters(filter as string, range as string, sort as string)
      const [from, to] = transformed.parsedRange

      const categories = await Category.find().skip(from).limit(to - from + 1).sort(transformed.sort)
      const categoriesCount = await Category.count()

      res.setHeader('Content-Range', `categories ${transformed.range}/${categoriesCount}`)
      res.status(200).json(categories)

      break
    case 'POST':
      const { title, parent_id } = req.body

      const category = await Category.create({
        title,
        parent_id,
      })

      res.status(201).json(category)

      break
    default:
      res.status(400).end()
  }
}