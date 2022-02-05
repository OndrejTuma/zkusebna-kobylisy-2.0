import React from 'react'
import { Create, required, SimpleForm, TextInput } from 'react-admin'

const CategoryCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={'title'} validate={required()} />
      </SimpleForm>
    </Create>
  )
}

export default CategoryCreate