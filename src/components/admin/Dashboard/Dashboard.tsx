import React, { useContext } from 'react'
import { Button } from '@toptal/picasso'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'

import { AuthContext } from '../Auth'
import ItemCreate from '../items/ItemCreate'
import ItemEdit from '../items/ItemEdit'
import ItemList from '../items/ItemList'
import CategoryCreate from '../categories/CategoryCreate'
import CategoryEdit from '../categories/CategoryEdit'
import CategoryList from '../categories/CategoryList'

const LogoutButton = () => {
  const { logOut } = useContext(AuthContext)

  return <Button onClick={() => logOut()}>Odhlásit</Button>
}

const Dashboard = () => {
  return (
    <div>
      <Admin dataProvider={simpleRestProvider('/api')} logoutButton={LogoutButton}>
        <Resource name={'items'} list={ItemList} edit={ItemEdit} create={ItemCreate} />
        <Resource name={'categories'} list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
      </Admin>
    </div>
  )
}

export default Dashboard