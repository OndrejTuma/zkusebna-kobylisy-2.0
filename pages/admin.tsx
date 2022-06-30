import React from 'react'

import Auth from 'Components/admin/Auth'
import Admin from 'Components/admin/Admin'

const AdminPage = () => {
  return (
    <Auth>
      <Admin />
    </Auth>
  )
}

export default AdminPage