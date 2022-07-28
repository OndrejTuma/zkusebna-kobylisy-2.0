import Layout from 'Components/admin/Layout'
import simpleRestProvider from 'ra-data-simple-rest'
import React from 'react'
import { Admin, Resource } from 'react-admin'

import CategoryCreate from '../menu-items/categories/CategoryCreate'
import CategoryEdit from '../menu-items/categories/CategoryEdit'
import CategoryList from '../menu-items/categories/CategoryList'
import ItemCreate from '../menu-items/items/ItemCreate'
import ItemEdit from '../menu-items/items/ItemEdit'
import ItemList from '../menu-items/items/ItemList'
import ReservationTypeCreate from '../menu-items/reservation-types/ReservationTypeCreate'
import ReservationTypeEdit from '../menu-items/reservation-types/ReservationTypeEdit'
import ReservationTypeList from '../menu-items/reservation-types/ReservationTypeList'
import ReservationList from '../menu-items/reservations/ReservationList'
import ReservationEdit from '../menu-items/reservations/ReservationEdit'

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
        <Resource options={{ label: 'Rezervace' }} name={'reservations'} list={ReservationList} edit={ReservationEdit}/>
      </Admin>
    </div>
  )
}

export default Dashboard