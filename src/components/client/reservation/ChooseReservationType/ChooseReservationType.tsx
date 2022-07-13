import Stack from '@mui/material/Stack'
import axios, { AxiosError, AxiosResponse } from 'axios'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Form from 'Components/generic/Form'
import { ResponseReservationTypes } from 'LocalTypes'
import React from 'react'
import { useQuery } from 'react-query'

const getAllReservationTypes = () => axios.get('/api/reservation-types?range=[0,99]')

const ChooseReservationType = () => {
  const {
    error,
    isError,
    isSuccess,
    data,
  } = useQuery<AxiosResponse<ResponseReservationTypes>, AxiosError>('getAllReservationTypes', getAllReservationTypes)

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      {isError && <ErrorAxios error={error}/>}
      {isSuccess && (
        <Form.Select label="Typ rezervace" name="reservationType" items={data.data.map(({ title: label, id: value }) => ({
          label,
          value,
        }))}/>
      )}
    </Stack>
  )
}

export default ChooseReservationType