import React, { useContext } from 'react'

import { AuthContext } from '../Auth'
import Dashboard from '../Dashboard'
import Login from '../Login'

const Admin = () => {
  const { isLogged, isBusy } = useContext(AuthContext)

  if (isBusy) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {isLogged ? <Dashboard /> : <Login />}
    </div>
  )
}

export default Admin