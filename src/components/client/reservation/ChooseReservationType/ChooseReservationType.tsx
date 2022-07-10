import Stack from '@mui/material/Stack'
import Error from 'Components/generic/Error'
import Form from 'Components/generic/Form'
import { ReservationType } from 'LocalTypes'
import React, { useState, useEffect } from 'react'

const ChooseReservationType = () => {
  const [items, setItems] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    fetch('/api/reservation-types?range=[0,99]').then(res => res.json()).then(reservationTypes => {
      setItems(reservationTypes.map(({ title, id }) => ({
        label: title,
        value: id,
      })))
    }).catch(err => setError(err.message))
  }, [])

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      {error ? <Error>{error}</Error> : (
        <Form.Select name="reservationType" items={items} />
      )}
    </Stack>
  )
}

export default ChooseReservationType