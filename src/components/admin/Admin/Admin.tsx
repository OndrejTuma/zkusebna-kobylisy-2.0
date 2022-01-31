import React, { useContext } from 'react'
import { Loader } from '@toptal/picasso'

import { AuthContext } from '../Auth'
import Dashboard from '../Dashboard'
import Login from '../Login'

const Admin = () => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return <Loader>Načítá se...</Loader>
  }

  return (
    <div>
      {isLogged ? <Dashboard /> : <Login />}
    </div>
  )
}

export default Admin