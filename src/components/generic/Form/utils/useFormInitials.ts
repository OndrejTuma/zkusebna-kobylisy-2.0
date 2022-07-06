import { FormValues } from 'Components/generic/Form'
import { useMemo } from 'react'
import * as Yup from 'yup'

export type Inputs = {
  [key: string]: {
    label?: string,
    type?: string,
    initialValue?: any,
    validationSchema?: any,
  }
}

const useFormInitials = (inputs: Inputs) => {
  const initialValues = useMemo(() => Object.entries(inputs).reduce<FormValues>((values, [ name, { initialValue } ]) => {
    values[name] = initialValue || ''

    return values
  }, {}), [inputs])

  const validationSchema = useMemo(() => Yup.object().shape(Object.entries(inputs).reduce<FormValues>((values, [ name, { validationSchema } ]) => {
    if (validationSchema) {
      values[name] = validationSchema
    }

    return values
  }, {})), [inputs])

  return { initialValues, validationSchema }
}

export default useFormInitials