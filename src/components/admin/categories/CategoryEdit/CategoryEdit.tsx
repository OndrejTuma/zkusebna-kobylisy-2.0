import React from 'react'
import { Edit, required, SimpleForm, TextInput } from 'react-admin'

const CategoryEdit = (props: {}) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled label={'Id'} source={'id'} />
        <TextInput source={'title'} label={'Název'} validate={required()} />
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit