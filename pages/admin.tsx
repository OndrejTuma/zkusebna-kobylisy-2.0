import AuthPage from 'Components/admin/AuthPage'
import Auth from 'Components/admin/Auth'
import Dashboard from 'Components/admin/Dashboard'
import React from 'react'

const Admin = () => {
  return (
    <Auth>
      <AuthPage>
        <Dashboard/>
      </AuthPage>
    </Auth>
  )
}

export default Admin