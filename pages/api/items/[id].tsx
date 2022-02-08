import { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable'
// import fs from 'fs'

import dbConnect from 'Lib/dbConnect'
import Item from 'Models/Item'
import { ItemType } from './'

type Data = ItemType

// const saveFile = async (file) => {
//   const data = fs.readFileSync(file.path)
//   fs.writeFileSync(`./public/uploads/${file.name}`, data)
//   await fs.unlinkSync(file.path)
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query

  await dbConnect()

  switch (req.method) {
    case 'GET': {
      const item = await Item.findById(id)

      res.status(200).json(item)

      break
    }
    case 'PUT': {
      const { title, category_id, code, price, image, active } = req.body

      await Item.findByIdAndUpdate(id, {
        $set: {
          title, category_id, code, price, image, active,
        },
      })

      res.status(200).end()

      break
    }
    case 'DELETE': {
      await Item.findByIdAndDelete(id)

      res.status(200).end()

      break
    }
    default:
      res.status(400).end()
  }
}