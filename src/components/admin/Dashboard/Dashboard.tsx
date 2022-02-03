import React, { useContext } from 'react'
import { Button } from '@toptal/picasso'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  NumberField,
  Edit,
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  NumberInput,
  ImageInput,
  ImageField,
} from 'react-admin'

import { AuthContext } from '../Auth'

const ItemList = (props) => (
  <List {...props}>
    <Datagrid rowClick={'edit'}>
      <TextField source={'id'} />
      <TextField source={'title'} />
      <NumberField source={'price'} />
      <BooleanField source={'active'} />
    </Datagrid>
  </List>
)
const ItemEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled label={'Id'} source={'id'} />
      <TextInput source={'title'} validate={required()} />
      <TextInput source={'code'} validate={required()} />
      <NumberInput label={'Cena'} source={'price'} />
      <BooleanInput label={'Aktivní'} source={'active'}/>
      <ImageInput source={'images'} label={'Obrázek'} accept={'image/*'}>
        <ImageField source={'src'} title={'name'} />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
const LogoutButton = () => {
  const { logOut } = useContext(AuthContext)

  return <Button onClick={() => logOut()}>Odhlásit</Button>
}

const Dashboard = () => {
  return (
    <div>
      <Admin dataProvider={simpleRestProvider('/api')} logoutButton={LogoutButton}>
        <Resource name={'items'} list={ItemList} edit={ItemEdit} />
      </Admin>
    </div>
  )
}

export default Dashboard