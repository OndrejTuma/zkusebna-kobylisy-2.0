import { NextApiRequest } from 'next'
import getFirebaseAuth from './getFirebaseAuth'

const authorizeRequest = async (req: NextApiRequest) => {
  const auth = getFirebaseAuth()

  const { authorization } = req.headers

  if (!authorization) {
    throw new Error('Authorization token is required')
  }

  try {
    await auth.verifyIdToken(authorization)
  } catch(error) {
    throw new Error(`Authorization error: ${error.message}`)
  }
}

export default authorizeRequest
