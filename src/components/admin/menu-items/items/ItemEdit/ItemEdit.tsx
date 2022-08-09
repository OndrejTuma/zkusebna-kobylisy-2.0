import React from 'react'
import { BooleanInput, Edit, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

const ItemEdit = (props: {}) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={'id'} />
        <TextInput label={'Název'} source={'title'} validate={required()} />
        <TextInput label={'Kód'} source={'code'} />
        <NumberInput label={'Cena'} source={'price'} />
        <BooleanInput label={'Aktivní'} source={'active'}/>
        <ImageInput label={'Obrázek'} source={'image'} accept={'image/*'}>
          <ImageField source={'src'} title={'name'} />
        </ImageInput>
        <ReferenceInput reference={'categories'} source={'category_id'}>
          <SelectInput label={'Kategorie'} optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}

export default ItemEdit