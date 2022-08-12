import AuthPage from 'Components/admin/AuthPage'
import Auth from 'Components/admin/Auth'
import Dashboard from 'Components/admin/Dashboard'
import Head from 'next/head'
import React from 'react'

const Admin = () => {
  return (
    <Auth>
      <Head>
        <title>Administrace | Zkušebna Kobylisy</title>
      </Head>
      <AuthPage>
        <Dashboard/>
      </AuthPage>
    </Auth>
  )
}

export default Admin