import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { getLocalFilePath } from 'Utils/api/fileUpload'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  console.log('UPLOAD IMAGE', req.method)

  try {
    authorizeRequest(req)
    
    switch (req.method) {
      case 'DELETE': {

        fs.unlinkSync(getLocalFilePath(id as string))
  
        res.status(200).end()
  
        break
      }
      default:
        methodNotAllowed(res)
    }
  } catch (error) { 
    console.error(error.message)
    
    badRequestCatch(res, error)
  }
}
