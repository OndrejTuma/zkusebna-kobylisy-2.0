import Stack from '@mui/material/Stack'
import Form from 'Components/generic/Form'
import React from 'react'

const ChooseDate = () => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Form.DateTimePicker label={'Začátek'} name={'dateStart'}/>
      <Form.DateTimePicker label={'Konec'} name={'dateEnd'}/>
    </Stack>
  )
}

export default ChooseDate