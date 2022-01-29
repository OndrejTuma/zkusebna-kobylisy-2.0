import React from 'react'

import DataPresenter from 'Components/DataPresenter'
import Dashboard from 'Components/admin/Dashboard'
import Login from 'Components/admin/Login'
import { useAuth } from 'Components/Auth'

const Admin = () => {
  const auth = useAuth()

  return (
    <div>
      <DataPresenter
        data={auth}
        isDataEmpty={({ isLoading }) => isLoading}
      >
        {auth.isLogged ? <Dashboard /> : <Login />}
      </DataPresenter>
    </div>
  )
}

export default Admin