import React from 'react'
import { Create, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

const CategoryCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={'title'} validate={required()} />
        <ReferenceInput label={'Nadřazená kategorie'} reference={'categories'} source={'parent_id'}>
          <SelectInput optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

export default CategoryCreate