import { NetworkFailedState } from 'LocalTypes'
import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'
import transformRAParameters from 'Utils/transformRAParameters'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'

export type CategoryType = {
  id: string | number,
  parent_id?: string,
  title: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryType | CategoryType[] | NetworkFailedState>
) {
  await dbConnect()

  console.log('CATEGORIES METHOD', req.method)

  try {
    switch (req.method) {
      case 'GET':
        const { sort, range, parsedRange: [from, to], filter } = transformRAParameters(req.query.filter, req.query.range, req.query.sort)
  
        const categories = await Category.find(filter).skip(from).limit(to - from + 1).sort(sort)
        const categoriesCount = await Category.find(filter).count()
  
        res.setHeader('Content-Range', `categories ${range}/${categoriesCount}`)
        res.status(200).json(categories)
  
        break
      case 'POST':
        authorizeRequest(req)
        
        const { title, parent_id } = req.body
  
        const category: unknown = await Category.create({
          title,
          parent_id: parent_id || undefined,
        })
  
        res.status(201).json(category as CategoryType)
  
        break
      default:
        methodNotAllowed(res)
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
