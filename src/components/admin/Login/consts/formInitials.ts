import * as Yup from 'yup'

export const formInputs = {
  email: {
    label: 'E-mail',
    type: 'email',
    validationSchema: Yup.string().required(),
  },
  password: {
    label: 'Heslo',
    type: 'password',
    validationSchema: Yup.string().required(),
  }
}