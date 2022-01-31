import React, { useContext } from 'react'
import { Button } from '@toptal/picasso'

import { AuthContext } from '../Auth'

const Login = () => {
  const { logIn } = useContext(AuthContext)
  const email = 'tu.ondrej@gmail.com'
  const password = 'tirisfall'

  return (
    <Button onClick={() => logIn(email, password)}>přihlásit se</Button>
  )
}

export default Login