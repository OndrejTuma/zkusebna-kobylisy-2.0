import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import { CreateButton, Datagrid, List, NumberField, TextField, TopToolbar, TextInput } from 'react-admin'

const filters = [
  <TextInput key="title" source="title" label="Název" alwaysOn/>
]

const ListActions = () => (
  <TopToolbar>
    <CreateButton label={'Vytvořit nový účel rezervace'}/>
  </TopToolbar>
)

const ReservationTypeList = (props: object) => {
  return (
    <List {...props} actions={<ListActions/>} empty={<EmptyList/>} filters={filters}>
      <Datagrid rowClick={'edit'}>
        <TextField label={'Název'} source={'title'}/>
        <NumberField label={'Sleva %'} source={'discount'}/>
      </Datagrid>
    </List>
  )
}

export default ReservationTypeList