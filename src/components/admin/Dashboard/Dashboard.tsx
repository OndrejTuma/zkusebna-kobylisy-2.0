import Layout from 'Components/admin/Layout'
import simpleRestProvider from 'ra-data-simple-rest'
import React, { useCallback } from 'react'
import { Admin, fetchUtils, Resource } from 'react-admin'
import CategoryIcon from '@mui/icons-material/Category'
import EventSeatIcon from '@mui/icons-material/EventSeat'
import PercentIcon from '@mui/icons-material/Percent'
import { useAuth } from '../Auth'
import CategoryCreate from '../menu-items/categories/CategoryCreate'
import CategoryEdit from '../menu-items/categories/CategoryEdit'
import CategoryList from '../menu-items/categories/CategoryList'
import ItemCreate from '../menu-items/items/ItemCreate'
import ItemEdit from '../menu-items/items/ItemEdit'
import ItemList from '../menu-items/items/ItemList'
import ReservationTypeCreate from '../menu-items/reservation-types/ReservationTypeCreate'
import ReservationTypeEdit from '../menu-items/reservation-types/ReservationTypeEdit'
import ReservationTypeList from '../menu-items/reservation-types/ReservationTypeList'
import ReservationEdit from '../menu-items/reservations/ReservationEdit'
import ReservationList from '../menu-items/reservations/ReservationList'

const Dashboard = () => {
  const { isBusy, user } = useAuth()

  const httpClient = useCallback(async (url: any, options?: fetchUtils.Options) => {
    if (!options) {
      options = {}

      if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' })
      }
    }

    options.user = {
      authenticated: true,
      token: await user?.getIdToken(),
    }

    return fetchUtils.fetchJson(url, options)
  }, [isBusy])

  return (
    <div>
      <Admin dataProvider={simpleRestProvider('/api', httpClient)} layout={Layout}>
        <Resource options={{ label: 'Položky' }} name={'items'} list={ItemList} edit={ItemEdit} create={ItemCreate}/>
        <Resource options={{ label: 'Kategorie' }} icon={CategoryIcon} name={'categories'} list={CategoryList} edit={CategoryEdit}
                  create={CategoryCreate}/>
        <Resource options={{ label: 'Účely rezervací' }} icon={PercentIcon} name={'reservation-types'} list={ReservationTypeList}
                  edit={ReservationTypeEdit}
                  create={ReservationTypeCreate}/>
        <Resource options={{ label: 'Rezervace' }} icon={EventSeatIcon} name={'reservations'} list={ReservationList} edit={ReservationEdit}/>
      </Admin>
    </div>
  )
}

export default Dashboard