import React, { useContext } from 'react'
import { Container, Grid, Loader } from '@toptal/picasso'

import { AuthContext } from '../Auth'
import Dashboard from '../Dashboard'
import Login from '../Login'

const Admin = () => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return (
      <Grid justifyContent={'center'}>
        <Grid.Item>
          <Container top={4}>
            <Loader>Načítá se...</Loader>
          </Container>
        </Grid.Item>
      </Grid>
    )
  }

  return isLogged ? <Dashboard /> : <Login />
}

export default Admin