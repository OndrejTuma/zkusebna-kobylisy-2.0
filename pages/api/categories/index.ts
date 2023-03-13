import { CategoryItem, NetworkState } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { parseRAFilters } from 'Lib/filters'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<CategoryItem | CategoryItem[]>>
) {
  await dbConnect()

  console.log('CATEGORIES METHOD', req.method)

  try {
    switch (req.method) {
      case 'GET':
        const { filter, range, sort } = parseRAFilters(req.query)

        const categories = await Category.find(filter.mongoFormat())
          .skip(range.from)
          .limit(range.itemsCount())
          .sort(sort.mongoFormat())
        const categoriesCount = await Category.find(
          filter.mongoFormat()
        ).count()

        res.setHeader(
          'Content-Range',
          `categories ${range.print()}/${categoriesCount}`
        )
        res.status(200).json(categories)

        break
      case 'POST':
        await authorizeRequest(req)

        const { title, parent_id } = req.body

        const category = await Category.create({
          title,
          parent_id: parent_id || undefined,
        })

        res.status(201).json(category)

        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
