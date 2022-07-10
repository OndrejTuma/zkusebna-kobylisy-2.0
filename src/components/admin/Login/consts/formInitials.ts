import * as Yup from 'yup'

export const formInputs = {
  email: {
    label: 'E-mail',
    type: 'email',
    validationSchema: Yup.string().required('Email je povinný').email('Email není ve správném formátu'),
  },
  password: {
    label: 'Heslo',
    type: 'password',
    validationSchema: Yup.string().required('Heslo je povinné'),
  }
}