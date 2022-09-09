import formidable from 'formidable'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { NetworkFailedState, ResponseAuthUrl } from 'LocalTypes'
import authorizeRequest from 'Utils/api/authorizeRequest'
import { getFilePath } from 'Utils/api/fileUpload'

const uploadFile = (file: formidable.File): string => {
    const fileName = `${uuidv4()}.${file.originalFilename.split('.').pop()}`
    const filePath = getFilePath(fileName)

    const fileContents = fs.readFileSync(file.filepath)
    fs.writeFileSync('./public' + filePath, fileContents)

    return filePath
}

type Response = {
    imageName: string,
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | NetworkFailedState>,
) {
    console.log('UPLOAD IMAGE')
    try {
        authorizeRequest(req)

        const form = formidable({ multiples: true })

        form.parse(req, (err: formidable.err, fields: formidable.fields, files: formidable.files) => {
            if (err) {
                throw err
            }
            const { image } = files

            console.log('IMAGE', image)
            // TODO: minify image

            const imageName = uploadFile(image)

            res.status(200).json({ imageName })
        })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}