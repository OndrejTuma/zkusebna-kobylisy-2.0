import formidable from 'formidable'
import sharp from 'sharp'
import type { NextApiRequest, NextApiResponse } from 'next'

import { NetworkState } from 'LocalTypes'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { getFilePath, getLocalFilePath } from 'Utils/api/fileUpload'
import { badRequestCatch, methodNotAllowed } from 'Utils/api/misc'

const uploadFile = async (file: formidable.File): Promise<string> => {
  const fileName = `${file.newFilename}.webp`
  const filePath = getFilePath(fileName)
  const localFilePath = getLocalFilePath(fileName)

  await new Promise<void>(resolve => sharp(file.filepath).resize(500, 500).toFile(localFilePath, (err: Error) => {
    if (err) {
      throw err
    }
    
    resolve()
  }))

  return filePath
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NetworkState<{
    imageName: string,
  }>>,
) {
  console.log('IMAGES METHOD', req.method)

  try {
    await authorizeRequest(req)

    switch (req.method) {
      case 'POST': {
        const form = formidable({ multiples: true })

        const imageName = await new Promise<string>(resolve => {
          form.parse(req, async (err: Error, fields: formidable.Fields, files: formidable.Files) => {
            if (err) {
              throw err
            }
            const image = Array.isArray(files.image) ? files.image[0] : files.image
      
            const imageName = await uploadFile(image)
      
            resolve(imageName)
          })
        })

        res.status(200).json({ imageName })

        break
      }
      default: {
        methodNotAllowed(res)
      }
    }
  } catch (error) {
    badRequestCatch(res, error)
  }
}
