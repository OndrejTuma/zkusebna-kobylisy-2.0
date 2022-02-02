import React from 'react'
import { User } from 'firebase/auth'

interface AuthContextInterface {
  isBusy: boolean,
  isLogged: boolean,
  user: null | User,
  logIn: (email: string, password: string) => void,
  logOut: () => void,
  error: boolean,
}

const AuthContext = React.createContext<AuthContextInterface>({
  isBusy: false,
  isLogged: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
  error: false,
})

export default AuthContext