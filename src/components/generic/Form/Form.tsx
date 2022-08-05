import Grid from '@mui/material/Grid'
import { Form as FormikForm, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { SchemaOf } from 'yup'

export interface FormValues {
  [key: string]: any,
}
type Props = {
  children?: React.ReactNode,
  onSubmit?: (values: FormValues, helpers: FormikHelpers<FormValues>) => void,
  initialValues: FormValues,
  validationSchema?: SchemaOf<FormValues>,
  [key: string]: any,
}

const Form = ({ children, initialValues, onSubmit, validationSchema, ...rest }: Props) => {
  const handleSubmit = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
    onSubmit?.(values, helpers)
    helpers.setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} {...rest}>
      <FormikForm>
        <Grid container direction={'column'}>
          {children}
        </Grid>
      </FormikForm>
    </Formik>
  )
}

export default Form