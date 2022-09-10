import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { getLocalFilePath } from 'Utils/api/fileUpload'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  console.log('SERVE IMAGE', req.method)

  try {
    switch (req.method) {
      case 'GET': {
        const imagePath = getLocalFilePath(id as string)

        if (!fs.existsSync(imagePath)) {
          throw new Error('Image not found')
        }

        res.setHeader('Content-Type', 'image/webp')
        fs.createReadStream(imagePath).pipe(res)
  
        break
      }
      default:
        methodNotAllowed(res)
    }
  } catch (error) { 
    badRequestCatch(res, error)
  }
}
