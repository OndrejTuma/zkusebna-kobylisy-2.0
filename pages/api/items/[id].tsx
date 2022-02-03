import { NextApiRequest, NextApiResponse } from 'next'

import { ItemType } from './'

type Data = ItemType

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query
  console.log('!GET ONE', id)
  res.status(200).json({
    id: 2,
    category_id: 2,
    title: 'Basová kytara',
    code: 'NBk01',
    price: 5000,
    active: true
  })
}