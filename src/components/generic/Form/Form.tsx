import Grid from '@mui/material/Grid'
import { Form as FormikForm, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { SchemaOf } from 'yup'

export interface FormValues {
  [key: string]: any,
}
type Props = {
  children?: React.ReactNode,
  onSubmit?: (values: FormValues) => void,
  initialValues: FormValues,
  validationSchema?: SchemaOf<FormValues>,
}

const Form = ({ children, initialValues, onSubmit, validationSchema }: Props) => {
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    onSubmit?.(values)
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <FormikForm>
        <Grid container direction={'column'}>
          {children}
        </Grid>
      </FormikForm>
    </Formik>
  )
}

export default Form