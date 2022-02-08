import React from 'react'
import { Create, NumberInput, required, SimpleForm, TextInput } from 'react-admin'

const ReservationTypeCreate = (props: {}) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source={'title'} label={'Název'} validate={required()} />
        <NumberInput label={'Sleva %'} source={'discount'} validate={required()} />
      </SimpleForm>
    </Create>
  )
}

export default ReservationTypeCreate