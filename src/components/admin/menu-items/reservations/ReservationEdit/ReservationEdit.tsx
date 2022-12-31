import React from 'react'
import {
  BooleanInput,
  DateTimeInput,
  Edit,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from 'react-admin'
import { useWatch } from 'react-hook-form'

const ArchiveReservation = () => {
  const { archived } = useRecordContext()
  const isArchived = useWatch({ name: 'archived' })

  return (
    <>
      <BooleanInput label='Archivovat rezervaci' source='archived' />
      {isArchived && (
        <TextInput label='Cena' source='price' disabled={archived} />
      )}
    </>
  )
}
const ReservedItems = () => {
  const { dateStart, dateEnd, itemIds } = useRecordContext()

  return (
    <ReferenceArrayInput
      reference='items'
      perPage={250}
      source='itemIds'
      sort={{ field: 'title', order: 'ASC' }}
      filter={{
        timeMin: dateStart,
        timeMax: dateEnd,
        ignoreBusyItems: itemIds,
      }}
    >
      <SelectArrayInput disableValue='busy' label='Položky' optionText='title' />
    </ReferenceArrayInput>
  )
}

const ReservationEdit = (props: {}) => {

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <TextInput
          label='Název'
          source='reservationName'
          validate={required()}
        />
        <TextInput label='Jméno' source='name' validate={required()} />
        <TextInput label={'E-mail'} source='email' validate={required()} />
        <TextInput label='Telefon' source='phone' validate={required()} />
        <DateTimeInput
          label='Začátek'
          source='dateStart'
          validate={required()}
        />
        <DateTimeInput label='Konec' source='dateEnd' validate={required()} />
        <ReferenceInput reference='reservation-types' source='reservationType'>
          <SelectInput label='Účel rezervace' optionText='title' />
        </ReferenceInput>
        <ReservedItems />        
        <BooleanInput label='Zaplacená' source='paid' />
        <ArchiveReservation />
      </SimpleForm>
    </Edit>
  )
}

export default ReservationEdit
