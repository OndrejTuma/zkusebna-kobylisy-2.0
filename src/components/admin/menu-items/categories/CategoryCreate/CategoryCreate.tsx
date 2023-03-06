import React from 'react'
import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

const CategoryCreate = (props: object) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label={'Název'} source={'title'} validate={required()} />
        <ReferenceInput reference={'categories'} source={'parent_id'}>
          <SelectInput label={'Nadřazená kategorie'} optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default CategoryCreate