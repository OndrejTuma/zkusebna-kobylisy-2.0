import React from 'react'
import { CreateButton, Datagrid, List, ReferenceField, TextField, TopToolbar } from 'react-admin'

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
        <ReferenceField label={'Nadřazená kategorie'} reference={'categories'} source={'parent_id'}>
          <TextField source={'title'} />
        </ReferenceField>
      </Datagrid>
    </List>
  )
}

export default CategoryList