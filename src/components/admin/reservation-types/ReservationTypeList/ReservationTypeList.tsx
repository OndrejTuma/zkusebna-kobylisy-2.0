import React from 'react'
import { Datagrid, List, NumberField, TextField, TopToolbar, CreateButton } from 'react-admin'

const ListActions = () => (
  <TopToolbar>
    <CreateButton label={'Vytvořit nový účel rezervace'} />
  </TopToolbar>
)

const ReservationTypeList = (props: {}) => {
  return (
    <List {...props} actions={<ListActions/>}>
      <Datagrid rowClick={'edit'}>
        <TextField label={'Název'} source={'title'} />
        <NumberField label={'Sleva %'} source={'discount'} />
      </Datagrid>
    </List>
  )
}

export default ReservationTypeList