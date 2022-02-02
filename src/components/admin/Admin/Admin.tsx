import React, { useContext } from 'react'
import { Container, Grid, Loader } from '@toptal/picasso'

import { AuthContext } from '../Auth'
import Dashboard from '../Dashboard'
import Login from '../Login'

const Admin = () => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return (
      <Container top={4} align={'center'}>
        <Loader>Načítá se...</Loader>
      </Container>
    )
  }

  return isLogged ? <Dashboard /> : <Login />
}

export default Admin