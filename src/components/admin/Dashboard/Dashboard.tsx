import React, { useContext } from 'react'
import {Button} from '@toptal/picasso'

import { AuthContext } from '../Auth'

const Dashboard = () => {
  const { logOut } = useContext(AuthContext)

  return (
    <div>
      <Button onClick={() => logOut()}>Odhlásit</Button>
      <p>přihlášený</p>
    </div>
  )
}

export default Dashboard