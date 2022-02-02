import { NextApiRequest, NextApiResponse } from 'next'

type Data = {}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('!!GET ITEMS', req.body)
  res.setHeader('Content-Range', 'items 0-24/319')
  res.status(200).json([
    { "id": 0, "author_id": 0, "title": "Anna Karenina" },
    { "id": 1, "author_id": 0, "title": "War and Peace" },
    { "id": 2, "author_id": 1, "title": "Pride and Prejudice" },
    { "id": 3, "author_id": 1, "title": "Sense and Sensibility" }
  ])
}