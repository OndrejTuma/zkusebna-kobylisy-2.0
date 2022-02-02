import React, { FormEventHandler, useContext } from 'react'
import { Container, Grid, Form, Button, Input } from '@toptal/picasso'

import useForm from 'Hooks/useForm'
import { AuthContext } from '../Auth'
import { formInitialValues, formValidations, formInputs } from './consts/formInitials'

const Login = () => {
  const { error, logIn } = useContext(AuthContext)
  const { values, errors, handleChange, validateAll } = useForm(formInitialValues, formValidations)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!validateAll()) {
      return
    }

    logIn(values.email!, values.password!)
  }

  return (
    <Grid justifyContent={'center'}>
      <Grid.Item>
        <Container top={4}>
          <Form onSubmit={handleSubmit} method={'post'}>
            {formInputs.map(({ name, label, type }) => (
              <Form.Field key={name}>
                <Form.Label htmlFor={name}>{label}</Form.Label>
                <Input
                  id={name}
                  error={errors[name]}
                  enableReset
                  name={name}
                  type={type}
                  value={values[name]}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
              </Form.Field>
            ))}
            <Container flex direction={'column'} top={'small'} align={'center'} gap={'small'}>
              {error && (
                <Form.Error>
                  Nepodařilo se přihlásit. Zkontrolujte jméno a heslo
                </Form.Error>
              )}
              <Button type={'submit'}>Přihlásit se</Button>
            </Container>
          </Form>
        </Container>
      </Grid.Item>
    </Grid>
  )
}

export default Login