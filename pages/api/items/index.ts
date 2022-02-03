import { NextApiRequest, NextApiResponse } from 'next'

type Data = ItemType[]
export type ItemType = {
  id: string | number,
  category_id: string | number,
  title: string,
  code: string,
  price: number,
  images?: string[],
  active: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { filter, range, sort } = req.query
  console.log('!!GET ITEMS', filter, range, sort)
  res.setHeader('Content-Range', 'items 0-24/319')
  res.status(200).json([
    { id: 1, category_id: 1, title: 'Zkušebna', code: '', price: 0, active: true },
    { id: 2, category_id: 2, title: 'Basová kytara', code: 'NBk01', price: 5000, active: true },
    { id: 3, category_id: 2, title: 'Cajón', code: 'NC01', price: 3000, active: true },
    { id: 4, category_id: 2, title: 'Klávesy Roland', code: 'NKl01', price: 7000, active: true },
  ])
}