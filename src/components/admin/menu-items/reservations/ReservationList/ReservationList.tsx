import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import { Datagrid, List, TextField, ReferenceField, ReferenceArrayField, ChipField, Pagination, SingleFieldList } from 'react-admin'

const ReservationList = (props: {}) => {
  return (
    <List {...props} empty={<EmptyList/>}>
      <Datagrid rowClick={'edit'}>
        <TextField label={'Název'} source={'reservationName'} />
        <TextField label={'Jméno'} source={'name'} />
        <TextField label={'E-mail'} source={'email'} />
        <TextField label={'Telefon'} source={'phone'} />
        <ReferenceField label={'Typ rezervace'} reference={'reservation-types'} source={'reservationType'}>
          <TextField source={'title'} />
        </ReferenceField>
        <ReferenceArrayField label={'Položky'} reference={'items'} source={'itemIds'} perPage={5} pagination={<Pagination />}>
          <SingleFieldList>
            <ChipField source="title" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Datagrid>
    </List>
  )
}

export default ReservationList