import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import { CreateButton, Datagrid, List, NumberField, TextField, TopToolbar } from 'react-admin'

const ListActions = () => (
  <TopToolbar>
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