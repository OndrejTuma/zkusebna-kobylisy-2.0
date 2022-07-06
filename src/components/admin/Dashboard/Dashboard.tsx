import Layout from 'Components/admin/Layout'
import simpleRestProvider from 'ra-data-simple-rest'
import React from 'react'
import { Admin, Resource } from 'react-admin'

import CategoryCreate from '../categories/CategoryCreate'
import CategoryEdit from '../categories/CategoryEdit'
import CategoryList from '../categories/CategoryList'
import ItemCreate from '../items/ItemCreate'
import ItemEdit from '../items/ItemEdit'
import ItemList from '../items/ItemList'
import ReservationTypeCreate from '../reservation-types/ReservationTypeCreate'
import ReservationTypeEdit from '../reservation-types/ReservationTypeEdit'
import ReservationTypeList from '../reservation-types/ReservationTypeList'

const Dashboard = () => {
  return (
    <div>
      <Admin dataProvider={simpleRestProvider('/api')} layout={Layout}>
        <Resource options={{ label: 'Položky' }} name={'items'} list={ItemList} edit={ItemEdit} create={ItemCreate}/>
        <Resource options={{ label: 'Kategorie' }} name={'categories'} list={CategoryList} edit={CategoryEdit}
                  create={CategoryCreate}/>
        <Resource options={{ label: 'Typy rezervací' }} name={'reservation-types'} list={ReservationTypeList}
                  edit={ReservationTypeEdit}
                  create={ReservationTypeCreate}/>
      </Admin>
    </div>
  )
}

export default Dashboard