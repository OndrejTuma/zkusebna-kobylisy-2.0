import EmptyList from 'Components/admin/EmptyList'
import React from 'react'
import {
  BooleanField,
  Datagrid,
  ImageField,
  List,
  NumberField,
  TextField,
  ReferenceField,
  TopToolbar,
  CreateButton,
  TextInput,
} from 'react-admin'

const filters = [
  <TextInput key="title" source="title" label="Název" alwaysOn/>,
  <TextInput key="category_name" source="category_name" label="Kategorie" alwaysOn/>,
]

const ListActions = () => (
  <TopToolbar>
    <CreateButton label={'Vytvořit novou položku'} />
  </TopToolbar>
)

const ItemList = (props: {}) => {
  return (
    <List {...props} actions={<ListActions/>} empty={<EmptyList/>} filters={filters}>
      <Datagrid rowClick={'edit'}>
        <TextField label={'Název'} source={'title'} />
        <NumberField label={'Cena'} source={'price'} locales={'cs-CZ'} options={{ style: 'currency', currency: 'CZK', maximumFractionDigits: 0 }} />
        <ReferenceField label={'Kategorie'} reference={'categories'} source={'category_id'}>
          <TextField source={'title'} />
        </ReferenceField>
        <BooleanField label={'Aktivní'} source={'active'} />
        <ImageField label={'Obrázek'} source={'image.src'} />
      </Datagrid>
    </List>
  )
}

export default ItemList