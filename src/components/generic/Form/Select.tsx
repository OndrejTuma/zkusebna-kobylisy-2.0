import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import MUISelect from '@mui/material/Select'
import Error from 'Components/generic/Error'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

type SelectItem = {
  label: string,
  value: string | number
}

type Props = {
  name: string,
  items: SelectItem[],
  label?: string,
  size?: 'small' | 'medium',
}

const Select = ({ name, label, items, size = 'small' }: Props) => {
  return (
    <FormControl fullWidth size={size}>
      <InputLabel>{label}</InputLabel>
      <Field as={MUISelect} name={name}>
        {items?.map(({ label, value }) => (
          <MenuItem key={value} value={value}>{label}</MenuItem>
        ))}
      </Field>
      <Box mt={1}>
        <ErrorMessage name={name} component={Error}/>
      </Box>
    </FormControl>
  )
}

export default Select