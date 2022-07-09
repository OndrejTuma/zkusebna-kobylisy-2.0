import { TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker as MUIDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Error from 'Components/generic/Error'
import csLocale from 'date-fns/locale/cs'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import React from 'react'

type Props = {
  name: string,
  label?: string,
  [key: string]: any,
}

const DateTimePicker = ({ label, name, ...rest }: Props) => {
  const {setFieldValue} = useFormikContext()
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={csLocale}>
      <Grid item mb={2}>
        <Field
          label={label}
          as={MUIDateTimePicker}
          name={name}
          displayStaticWrapperAs="desktop"
          renderInput={(props: any) => <TextField {...props} />}
          ampm={false}
          disablePast
          inputFormat={'dd.MM. yyyy H:mm'}
          minutesStep={15}
          onChange={(value: Date) => setFieldValue(name, value)}
          {...rest}
        />
        <Box mt={1}>
          <ErrorMessage name={name} component={Error}/>
        </Box>
      </Grid>
    </LocalizationProvider>
  )
}

export default DateTimePicker