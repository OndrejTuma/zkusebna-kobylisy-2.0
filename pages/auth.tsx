import AuthPage from 'Components/admin/AuthPage'
import Auth from 'Components/admin/Auth'
import GenerateToken from 'Components/admin/GenerateToken'
import React from 'react'

const Admin = () => {
  return (
    <Auth>
      <AuthPage>
        <GenerateToken/>
      </AuthPage>
    </Auth>
  )
}

export default Admin