import React from 'react'
import { User } from 'firebase/auth'

interface AuthContextInterface {
  isBusy: boolean,
  isLogged: boolean,
  user: null | User,
  logIn: (email: string, password: string) => void,
  logOut: () => void,
}

const AuthContext = React.createContext<AuthContextInterface>({
  isBusy: false,
  isLogged: false,
  user: null,
  logIn: () => {},
  logOut: () => {},
})

export default AuthContext