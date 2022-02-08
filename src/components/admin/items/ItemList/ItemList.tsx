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
        <TextField label={'Název'} source={'title'} />
        <NumberField label={'Cena'} source={'price'} locales={'cs-CZ'} options={{ style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }} />
        <ReferenceField label={'Kategorie'} reference={'categories'} source={'category_id'}>
          <TextField source={'title'} />
        </ReferenceField>
        <BooleanField label={'Aktivní'} source={'active'} />
        <ImageField label={'Obrázek'} source={'image'} />
      </Datagrid>
    </List>
  )
}

export default ItemList