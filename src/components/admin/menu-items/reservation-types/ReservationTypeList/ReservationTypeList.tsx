import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import { CreateButton, Datagrid, List, NumberField, TextField, TopToolbar, FilterButton, FilterForm, TextInput } from 'react-admin'

const filters = [
  <TextInput key="title" source="title" label="Název" alwaysOn/>
]

const ListActions = () => (
  <TopToolbar>
    <FilterForm filters={filters}/>
    <FilterButton filters={filters} />
    <CreateButton label={'Vytvořit nový účel rezervace'}/>
  </TopToolbar>
)

const ReservationTypeList = (props: {}) => {
  return (
    <List {...props} actions={<ListActions/>} empty={<EmptyList/>}>
      <Datagrid rowClick={'edit'}>
        <TextField label={'Název'} source={'title'}/>
        <NumberField label={'Sleva %'} source={'discount'}/>
      </Datagrid>
    </List>
  )
}

export default ReservationTypeList