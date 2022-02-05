import { NextApiRequest, NextApiResponse } from 'next'
// import formidable from 'formidable'
// import fs from 'fs'

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

  console.log('!GET ONE CATEGORY', req.method, req.query, req.body)

  switch (req.method) {
    case 'GET':
      res.status(200).json({
        id: 2,
        category_id: 2,
        title: 'Basová kytara',
        code: 'NBk01',
        price: 5000,
        active: true
      })
      break
    case 'PUT':
      // const form = new formidable.IncomingForm()
      // form.parse(req, async function (err, fields, files) {
      //   console.log('!!files', files, fields, err)
      //   await saveFile(files.file)
      //   res.status(201).end()
      // })
      break
    case 'DELETE':
  }
}