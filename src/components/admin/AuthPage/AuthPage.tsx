import React, { useContext } from 'react'
import Box from '@mui/material/Box'

import Loader from 'Components/generic/Loader'

import { AuthContext } from '../Auth'
import Login from '../Login'

type Props = {
  children: React.ReactNode
}

const AuthPage = ({ children }: Props) => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return (
      <Box pt={4}>
        <Loader>Načítá se...</Loader>
      </Box>
    )
  }

  return isLogged ? <>{children}</> : <Login />
}

export default AuthPage