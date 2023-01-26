import Auth from 'Components/admin/Auth'
import AuthPage from 'Components/admin/AuthPage'
import PickCalendar from 'Components/admin/PickCalendar'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Oauth2callback: NextPage = () => {
  const { query: { code } } = useRouter()

  return (
    <Auth>
      <AuthPage>
        <PickCalendar code={code as string}/>
      </AuthPage>
    </Auth>
  )
}

export default Oauth2callback
