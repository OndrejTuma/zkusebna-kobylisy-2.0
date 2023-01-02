import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'

import type { CategoryType } from '.'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryType>,
) {
  const { id } = req.query

  await dbConnect()

  console.log('CATEGORY METHOD', req.method)

  try {
    switch (req.method) {
      case 'GET': {
        const category = await Category.findById(id)
  
        res.status(200).json(category)
  
        break
      }
      case 'PUT': {
        await authorizeRequest(req)
        
        const { title, parent_id } = req.body
  
        const category = await Category.findByIdAndUpdate(id, { $set: { title, parent_id: parent_id || null } })
  
        res.status(200).json(category)
  
        break
      }
      case 'DELETE': {
        await authorizeRequest(req)
        
        await Category.findByIdAndDelete(id)
  
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
