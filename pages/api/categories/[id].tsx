import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'

import { CategoryType } from './'

type Data = CategoryType

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query

  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const category = await Category.findById(id)

      res.status(200).json(category)

      break
    }
    case 'PUT': {
      const { title } = req.body

      await Category.findByIdAndUpdate(id, { $set: { title } })

      res.status(200).end()

      break
    }
    case 'DELETE': {
      await Category.findByIdAndDelete(id)

      res.status(200).end()

      break
    }
    default:
      res.status(400).end()
  }
}