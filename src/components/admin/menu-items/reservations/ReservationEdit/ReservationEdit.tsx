import React from 'react'
import { Edit, required, SimpleForm, TextInput, ReferenceInput, ReferenceArrayInput, SelectArrayInput, SelectInput, DateTimeInput } from 'react-admin'

const ReservationEdit = (props: {}) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source={'id'} />
        <TextInput label={'Název'} source={'reservationName'} validate={required()} />
        <TextInput label={'Jméno'} source={'name'} validate={required()} />
        <TextInput label={'E-mail'} source={'email'} validate={required()} />
        <TextInput label={'Telefon'} source={'phone'} validate={required()} />
        <DateTimeInput label={'Začátek'} source={'dateStart'} validate={required()} />
        <DateTimeInput label={'Konec'} source={'dateEnd'} validate={required()} />
        <ReferenceInput reference={'reservation-types'} source={'reservationType'}>
          <SelectInput label={'Typ rezervace'} optionText={'title'} />
        </ReferenceInput>
        <ReferenceArrayInput reference={'items'} source={'itemIds'} sort={{ field: 'title', order: 'ASC' }}>
          <SelectArrayInput label={'Položky'} optionText={'title'} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  )
}

export default ReservationEdit