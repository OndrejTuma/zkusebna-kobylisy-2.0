import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Error from 'Components/generic/Error'
import Form, { FormValues, useFormInitials } from 'Components/generic/Form'
import React, { useContext } from 'react'

import { AuthContext } from '../Auth'
import { formInputs } from './consts/formInitials'

const Login = () => {
  const { error, logIn } = useContext(AuthContext)
  const { initialValues, validationSchema } = useFormInitials(formInputs)

  function handleSubmit(values: FormValues) {
    logIn(values.email, values.password)
  }

  return (
    <Container maxWidth={'xs'} sx={{ marginTop: 4 }}>
      <Form onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Form.Input label="E-mail" name="email" />
        <Form.Input label="Heslo" name="password" />
        {error && (
          <Grid item mb={2}>
            <Error>Nepodařilo se přihlásit. Zkontrolujte jméno a heslo</Error>
          </Grid>
        )}
        <Grid item alignSelf={'center'}>
          <Form.SubmitButton>Přihlásit se</Form.SubmitButton>
        </Grid>
      </Form>
    </Container>
  )
}

export default Login