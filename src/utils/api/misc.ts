import { NextApiResponse } from 'next';

export const methodNotAllowed = (res: NextApiResponse) => res.status(405).end()
export const badRequestCatch = (res: NextApiResponse, error: Error) => {
  console.error(error)
  return res.status(400).json({ error: error.message })
}
