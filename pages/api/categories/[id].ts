import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from 'Lib/dbConnect'
import Category from 'Models/Category'

import { CategoryType } from './'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'

type Data = CategoryType

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
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
        authorizeRequest(req)
        
        const { title, parent_id } = req.body
  
        await Category.findByIdAndUpdate(id, { $set: { title, parent_id } })
  
        res.status(200).end()
  
        break
      }
      case 'DELETE': {
        authorizeRequest(req)
        
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