import React, { ReactNode } from 'react'

import useAuth from './hooks/useAuth'
import AuthContext from './store/AuthContext'

const Auth = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth