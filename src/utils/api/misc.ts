import { NextApiResponse } from 'next';

export const methodNotAllowed = (res: NextApiResponse) => res.status(405).json({
  message: 'Method not allowed',
})
export const badRequestCatch = (res: NextApiResponse, error: Error) => {
  console.error(error)
  return res.status(400).json({ message: error.message })
}
