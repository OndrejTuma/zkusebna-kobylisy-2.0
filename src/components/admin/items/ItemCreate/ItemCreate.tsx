import React from 'react'
import { BooleanInput, Create, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

const ItemCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={'title'} label={'Název'} validate={required()} />
        <TextInput source={'code'} label={'Kód'} />
        <NumberInput label={'Cena'} source={'price'} />
        <BooleanInput label={'Aktivní'} source={'active'} defaultValue={true} />
        <ImageInput source={'image'} label={'Obrázek'} accept={'image/*'}>
          <ImageField source={'src'} title={'name'} />
        </ImageInput>
        <ReferenceInput label={'Kategorie'} reference={'categories'} source={'category_id'} validate={required()}>
          <SelectInput optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default ItemCreate