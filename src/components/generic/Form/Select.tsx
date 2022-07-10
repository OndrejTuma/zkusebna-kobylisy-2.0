import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import MUISelect from '@mui/material/Select'
import Error from 'Components/generic/Error'
import React from 'react'
import { ErrorMessage, Field } from 'formik'

type SelectItem = {
  label: string,
  value: string | number
}

type Props = {
  name: string,
  items: SelectItem[],
  label?: string,
}

const Select = ({ name, label, items }: Props) => {
  return (
    <FormControl fullWidth>
      <Field as={MUISelect} name={name} label={label}>
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