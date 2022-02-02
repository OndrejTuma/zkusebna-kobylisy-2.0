import React, { useContext } from 'react'
import { Button } from '@toptal/picasso'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin'

import { AuthContext } from '../Auth'

const TestList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <DateField source="published_at" />
      <TextField source="category" />
      <BooleanField source="commentable" />
    </Datagrid>
  </List>
)

const Dashboard = () => {
  const { logOut } = useContext(AuthContext)

  return (
    <div>
      <Button onClick={() => logOut()}>Odhlásit</Button>
      <Admin dataProvider={simpleRestProvider('/api')}>
        <Resource name={'items'} list={TestList} />
      </Admin>
    </div>
  )
}

export default Dashboard