import { NextApiResponse } from 'next';

export const methodNotAllowed = (res: NextApiResponse) => res.status(405).end()
export const badRequestCatch = (res: NextApiResponse, error: Error) => res.status(400).json({ error: error.message })
