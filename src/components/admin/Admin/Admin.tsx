import React, { useContext } from 'react'
import Box from '@mui/material/Box'

import Loader from 'Components/generic/Loader'

import { AuthContext } from '../Auth'
import Dashboard from '../Dashboard'
import Login from '../Login'

const Admin = () => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return (
      <Box pt={4}>
        <Loader>Načítá se...</Loader>
      </Box>
    )
  }

  return isLogged ? <Dashboard /> : <Login />
}

export default Admin