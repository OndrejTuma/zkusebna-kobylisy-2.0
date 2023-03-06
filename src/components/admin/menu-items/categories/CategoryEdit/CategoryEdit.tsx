import React from 'react'
import { Edit, ReferenceInput, required, SelectInput, SimpleForm, TextInput } from 'react-admin'

const CategoryEdit = (props: object) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={'id'} />
        <TextInput label={'Název'} source={'title'} validate={required()} />
        <ReferenceInput reference={'categories'} source={'parent_id'}>
          <SelectInput label={'Nadřazená kategorie'} optionText={'title'} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit