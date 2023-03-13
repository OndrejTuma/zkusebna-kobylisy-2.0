import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'

import { getLocalFilePath } from 'Utils/api/fileUpload'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { NetworkState } from 'LocalTypes'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<null>>,
) {
  const { id } = req.query

  console.log('IMAGE METHOD', req.method)

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
      case 'DELETE': {
        await authorizeRequest(req)
        
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
