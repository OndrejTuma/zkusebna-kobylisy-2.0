import Grid from '@mui/material/Grid'
import Form from 'Components/generic/Form'
import React from 'react'

const Step2 = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Form.Input name="reservationName" label="Název akce" />
      </Grid>
      <Grid item xs={6}>
        <Form.Input name="name" label="Celé jméno" />
      </Grid>
      <Grid item xs={6}>
        <Form.Input name="phone" label="Telefon" type="tel" />
      </Grid>
      <Grid item xs={6}>
        <Form.Input name="email" label="Email" type="email" />
      </Grid>
    </Grid>
  )
}

export default Step2