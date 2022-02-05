import React from 'react'
import { BooleanField, Datagrid, ImageField, List, NumberField, TextField, ReferenceField, TopToolbar, CreateButton } from 'react-admin'

const ListActions = () => (
  <TopToolbar>
    <CreateButton label={'Vytvořit novou položku'} />
  </TopToolbar>
)

const ItemList = (props: {}) => {
  return (
    <List {...props} actions={<ListActions/>}>
      <Datagrid rowClick={'edit'}>
        <TextField source={'id'} />
        <ReferenceField reference={'categories'} source={'category_id'}>
          <TextField source={'title'} />
        </ReferenceField>
        <TextField source={'title'} />
        <NumberField source={'price'} />
        <BooleanField source={'active'} />
        <ImageField source={'image'} />
      </Datagrid>
    </List>
  )
}

export default ItemList