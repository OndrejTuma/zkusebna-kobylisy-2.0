import React from 'react'
import { BooleanInput, Create, ImageField, ImageInput, NumberInput, required, SimpleForm, TextInput, ReferenceInput, SelectInput } from 'react-admin'

const ItemCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={'title'} validate={required()} />
        <TextInput source={'code'} validate={required()} />
        <NumberInput label={'Cena'} source={'price'} />
        <BooleanInput label={'Aktivní'} source={'active'}/>
        <ImageInput source={'image'} label={'Obrázek'} accept={'image/*'}>
          <ImageField source={'src'} title={'name'} />
        </ImageInput>
        <ReferenceInput label={'Kategorie'} reference={'categories'} source={'category_id'}>
          <SelectInput optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default ItemCreate