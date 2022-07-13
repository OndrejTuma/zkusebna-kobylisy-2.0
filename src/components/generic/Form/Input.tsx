import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Error from 'Components/generic/Error'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

type Props = {
  name: string,
  label?: string,
  type?: string,
  size?: 'small' | 'medium',
}

const Input = ({ name, label, type, size = 'small' }: Props) => {
  return (
    <Grid item mb={2}>
      <Field label={label} as={TextField} size={size} fullWidth type={type} name={name}/>
      <Box mt={1}>
        <ErrorMessage name={name} component={Error}/>
      </Box>
    </Grid>
  )
}

export default Input