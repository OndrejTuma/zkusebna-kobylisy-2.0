import React from 'react'
import {
  BooleanInput,
  Create,
  DateTimeInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin'
import { useFormContext } from 'react-hook-form'

import { AdminReservation } from 'LocalTypes'
import getReservedItemLabel from '../utils/getReservedItemLabel'

const ReservationItems = () => {
  const { dateStart, dateEnd, itemIds } =
    useFormContext<AdminReservation>().getValues()

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
      <SelectArrayInput
        disableValue='busy'
        label='Položky'
        optionText={getReservedItemLabel}
        validate={required()}
      />
    </ReferenceArrayInput>
  )
}
const RecurringReservation = () => {
  const { isRecurring } = useFormContext<AdminReservation>().getValues()

  if (!isRecurring) {
    return null
  }

  return (
    <div>
      <div>
        <SelectInput
          label='Interval'
          source='INTERVAL'
          validate={required()}
          choices={[
            { name: 'Každý', id: 1 },
            { name: 'Každý druhý', id: 2 },
            { name: 'Každý třetí', id: 3 },
            { name: 'Každý čtvrtý', id: 4 },
            { name: 'Každý pátý', id: 5 },
          ]}
        />
        <SelectInput
          label='Frekvence'
          source='FREQ'
          validate={required()}
          choices={[
            { name: 'Den', id: 'DAILY' },
            { name: 'Týden', id: 'WEEKLY' },
            { name: 'Měsíc', id: 'MONTHLY' },
            { name: 'Rok', id: 'YEARLY' },
          ]}
        />
      </div>
      <DateTimeInput label='Opakovat do' source='UNTIL' validate={required()} />
    </div>
  )
}

const ReservationCreate = (props: object) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <DateTimeInput
          label='Začátek'
          source='dateStart'
          validate={required()}
        />
        <DateTimeInput label='Konec' source='dateEnd' validate={required()} />
        <TextInput
          label='Název'
          source='reservationName'
          validate={required()}
        />
        <TextInput label='Jméno' source='name' validate={required()} />
        <TextInput label={'E-mail'} source='email' validate={required()} />
        <TextInput label='Telefon' source='phone' validate={required()} />
        <ReferenceInput reference='reservation-types' source='reservationType'>
          <SelectInput label='Účel rezervace' optionText='title' validate={required()} />
        </ReferenceInput>
        <ReservationItems />
        <BooleanInput label='Zaplacená' source='paid' />
        <BooleanInput label='Opakující se' source='isRecurring' />
        <RecurringReservation />
      </SimpleForm>
    </Create>
  )
}

export default ReservationCreate
