import Stack from '@mui/material/Stack'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Button from 'Components/generic/Button'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Form from 'Components/generic/Form'
import { useFormikContext } from 'formik'
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
  const { setTouched, validateField, touched, errors } = useFormikContext()

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      {isError && <ErrorAxios error={error} />}
      {isSuccess && (
        <Form.Select name="reservationType" items={data.data.map(({ title: label, id: value }) => ({
          label,
          value
        }))} />
      )}
      <Button onClick={async () => {
        setTouched('reservationType', true)
        validateField('reservationType')
      }}>Test</Button>
    </Stack>
  )
}

export default ChooseReservationType