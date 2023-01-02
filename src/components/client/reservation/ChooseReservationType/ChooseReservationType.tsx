import Stack from '@mui/material/Stack'
import { AxiosResponse } from 'axios'
import Error from 'Components/generic/Error'
import Form from 'Components/generic/Form'
import Loader from 'Components/generic/Loader'
import { ResponseReservationTypes } from 'LocalTypes'
import React from 'react'
import { useQuery } from 'react-query'
import { getAllReservationTypes } from 'Lib/queries'

const ChooseReservationType = () => {
  const { error, isError, isSuccess, isLoading, data } = useQuery<
    AxiosResponse<ResponseReservationTypes>,
    string
  >('getAllReservationTypes', getAllReservationTypes)

  return (
    <Stack direction='row' justifyContent='space-between' spacing={2}>
      {isLoading && <Loader />}
      {isError && <Error>{error}</Error>}
      {isSuccess && (
        <Form.Select
          label='Účel rezervace'
          name='reservationType'
          items={data.data.map(({ title: label, id: value }) => ({
            label,
            value,
          }))}
        />
      )}
    </Stack>
  )
}

export default ChooseReservationType
