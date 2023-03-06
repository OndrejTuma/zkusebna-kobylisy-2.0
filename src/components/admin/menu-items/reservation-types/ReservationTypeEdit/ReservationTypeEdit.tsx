import React from 'react'
import { Edit, NumberInput, required, SimpleForm, TextInput } from 'react-admin'

const ReservationTypeEdit = (props: object) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled label={'Id'} source={'id'} />
        <TextInput source={'title'} label={'Název'} validate={required()} />
        <NumberInput label={'Sleva %'} source={'discount'} />
      </SimpleForm>
    </Edit>
  )
}

export default ReservationTypeEdit