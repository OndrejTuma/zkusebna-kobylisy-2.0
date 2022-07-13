import Grid from '@mui/material/Grid'
import Form from 'Components/generic/Form'
import React from 'react'
import ChooseReservationType from '../ChooseReservationType'

const Step1 = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Form.DateTimePicker label={'Začátek'} name={'dateStart'}/>
      </Grid>
      <Grid item xs={6}>
        <Form.DateTimePicker label={'Konec'} name={'dateEnd'}/>
      </Grid>
      <Grid item xs={12}>
        <ChooseReservationType/>
      </Grid>
    </Grid>
  )
}

export default Step1