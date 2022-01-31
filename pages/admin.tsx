import React from 'react'

import Auth from 'components/admin/Auth'
import Admin from 'components/admin/Admin'

const AdminPage = () => {
  return (
    <Auth>
      <Admin />
    </Auth>
  )
}

export default AdminPage