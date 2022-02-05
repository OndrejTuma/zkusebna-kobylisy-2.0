import React from 'react'
import { CreateButton, Datagrid, List, TextField, TopToolbar } from 'react-admin'

const ListActions = () => (
  <TopToolbar>
    <CreateButton label={'Vytvořit novou kategorii'} />
  </TopToolbar>
)

const CategoryList = (props: {}) => {
  return (
    <List {...props} actions={<ListActions/>}>
      <Datagrid rowClick={'edit'}>
        <TextField source={'title'} label={'Název'} />
      </Datagrid>
    </List>
  )
}

export default CategoryList