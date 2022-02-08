import React from 'react'
import { Edit, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

const CategoryEdit = (props: {}) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled label={'Id'} source={'id'} />
        <TextInput source={'title'} label={'Název'} validate={required()} />
        <ReferenceInput label={'Nadřazená kategorie'} reference={'categories'} source={'parent_id'}>
          <SelectInput optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit