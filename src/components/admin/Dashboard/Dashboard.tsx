import React, { useContext } from 'react'

import { AuthContext } from '../Auth'

const Dashboard = () => {
  const { logOut } = useContext(AuthContext)

  return (
    <div>
      <button onClick={() => logOut()}>Odhlásit</button>
      <p>přihlášený</p>
    </div>
  )
}

export default Dashboard