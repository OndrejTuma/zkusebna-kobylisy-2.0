import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import {
  ChipField,
  Datagrid,
  DateField,
  List, NumberField,
  Pagination,
  ReferenceArrayField,
  ReferenceField,
  SingleFieldList,
  TextField,
} from 'react-admin'

const ReservationList = (props: {}) => {
  return (
    <List {...props} empty={<EmptyList/>}>
      <Datagrid rowClick="edit">
        <TextField label="Název" source="reservationName"/>
        <TextField label="Jméno" source="name"/>
        <TextField label="E-mail" source="email"/>
        <TextField label="Telefon" source="phone"/>
        <NumberField label="Cena" source="price"/>
        <DateField label="Začátek" source="dateStart"/>
        <ReferenceField label="Typ rezervace" reference="reservation-types" source="reservationType">
          <TextField source="title"/>
        </ReferenceField>
        <ReferenceArrayField label="Položky" reference="items" source="itemIds" perPage={5} pagination={<Pagination/>}>
          <SingleFieldList>
            <ChipField source="title"/>
          </SingleFieldList>
        </ReferenceArrayField>
      </Datagrid>
    </List>
  )
}

export default ReservationList