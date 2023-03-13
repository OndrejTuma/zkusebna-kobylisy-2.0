import Stack from '@mui/material/Stack'
import Form from 'Components/generic/Form'
import React from 'react'
import { useGetAllReservationTypes } from 'Hooks/queries'
import DataLoader from 'Components/generic/DataLoader'

const ChooseReservationType = () => {
  const query = useGetAllReservationTypes()

  return (
    <Stack direction='row' justifyContent='space-between' spacing={2}>
      <DataLoader query={query}>
        {(data) => (
          <Form.Select
            label='Účel rezervace'
            name='reservationType'
            items={data.map(({ title: label, id: value }) => ({
              label,
              value,
            }))}
          />
        )}
      </DataLoader>
    </Stack>
  )
}

export default ChooseReservationType
