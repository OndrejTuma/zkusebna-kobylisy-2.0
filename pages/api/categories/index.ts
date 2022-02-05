import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'

type Data = CategoryType | CategoryType[]
export type CategoryType = {
  id: string | number,
  title: string,
}

const transformCustoms = (filter: string, range?: string, sort?: string) => {
  const parsedFilter: {} = filter ? JSON.parse(filter) : {}
  const parsedRange: number[] = range ? JSON.parse(range) : [0, 9]
  const parsedSort: string[] = sort ? JSON.parse(sort) : ['id', 'ASC']

  return {
    parsedRange,
    filter: parsedFilter,
    range: parsedRange.join('-'),
    sort: {
      [parsedSort[0]]: parsedSort[1] === 'ASC' ? 1 : -1,
    },
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()
  const { filter, range, sort } = req.query

  console.log('!! CATEGORIES', filter, range, sort)

  switch (req.method) {
    case 'GET':
      const transformed = transformCustoms(filter as string, range as string, sort as string)
      const [from, to] = transformed.parsedRange

      const categories = await Category.find().skip(from).limit(to - from + 1).sort(transformed.sort)
      const allCategories = await Category.count()

      res.setHeader('Content-Range', `categories ${transformed.range}/${allCategories}`)
      res.status(200).json(categories)

      break
    case 'POST':
      const category = await Category.create({
        title: req.body.title,
      })

      res.status(201).json(category)

      break
    default:
      res.status(400).end()
  }
}