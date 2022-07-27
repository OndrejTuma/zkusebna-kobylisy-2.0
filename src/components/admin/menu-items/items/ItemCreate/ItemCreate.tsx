import React from 'react'
import { BooleanInput, Create, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

const ItemCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label={'Název'} source={'title'} validate={required()} />
        <TextInput label={'Kód'} source={'code'} />
        <NumberInput label={'Cena'} source={'price'} validate={required()} />
        <BooleanInput label={'Aktivní'} source={'active'} defaultValue={true} />
        <ImageInput label={'Obrázek'} source={'image'} accept={'image/*'}>
          <ImageField source={'src'} title={'name'} />
        </ImageInput>
        <ReferenceInput reference={'categories'} source={'category_id'}>
          <SelectInput label={'Kategorie'} optionText={'title'} validate={required()} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default ItemCreate