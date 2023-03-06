import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import {
  BooleanField,
  BooleanInput,
  // ChipField,
  Datagrid,
  DateField,
  List, NumberField,
  // Pagination,
  // ReferenceArrayField,
  ReferenceField,
  // SingleFieldList,
  TextField, TextInput,
} from 'react-admin'

const filters = [
  <TextInput key="title" source="title" label="Název" alwaysOn/>,
  <BooleanInput key="current" source="current" label="Skrýt proběhlé" alwaysOn/>,
]

const ReservationList = (props: object) => {
  return (
    <List {...props} empty={<EmptyList/>} filters={filters}>
      <Datagrid rowClick="edit">
        <TextField label="Název" source="reservationName"/>
        <TextField label="Jméno" source="name"/>
        <TextField label="E-mail" source="email"/>
        <TextField label="Telefon" source="phone"/>
        <NumberField label="Cena" source="price" locales="cs-CZ" options={{ style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }}/>
        <BooleanField label="Archivovaná" source="archived"/>
        <BooleanField label="Zaplacená" source="paid"/>
        <DateField label="Začátek" source="dateStart"/>
        <ReferenceField label="Účel rezervace" reference="reservation-types" source="reservationType">
          <TextField source="title"/>
        </ReferenceField>
        {/*<ReferenceArrayField label="Položky" reference="items" source="itemIds" perPage={5} pagination={<Pagination/>}>*/}
        {/*  <SingleFieldList>*/}
        {/*    <ChipField source="title"/>*/}
        {/*  </SingleFieldList>*/}
        {/*</ReferenceArrayField>*/}
      </Datagrid>
    </List>
  )
}

export default ReservationList