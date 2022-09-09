import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { getLocalFilePath } from 'Utils/api/fileUpload'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  console.log('UPLOAD IMAGE', req.method)

  try {
    switch (req.method) {
      case 'DELETE': {
        authorizeRequest(req)

        fs.unlinkSync(getLocalFilePath(id as string))
  
        res.status(200).end()
  
        break
      }
      default:
        res.status(405).json({ error: 'Method not allowed' })
    }
  } catch (error) { 
    console.error(error.message)
    
    res.status(400).json({ error: error.message })
  }
}