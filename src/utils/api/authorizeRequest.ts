import { NextApiRequest } from 'next'

const authorizeRequest = (req: NextApiRequest) => {
    const { authorization } = req.headers
    
    // TODO: validate token in firebase
    if (!authorization) {
        throw new Error('Authorization token is required')
    }
}

export default authorizeRequest