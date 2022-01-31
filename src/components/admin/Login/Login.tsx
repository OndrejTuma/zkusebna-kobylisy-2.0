import React, { useContext } from 'react'

import { AuthContext } from '../Auth'

const Login = () => {
  const { logIn } = useContext(AuthContext)
  const email = 'tu.ondrej@gmail.com'
  const password = 'tirisfall'

  return (
    <button onClick={() => logIn(email, password)}>přihlásit se</button>
  )
}

export default Login