import * as Yup from 'yup'

export const formInputs = {
  email: {
    initialValue: '',
    validationSchema: Yup.string().required('Email je povinný').email('Email není ve správném formátu'),
  },
  password: {
    initialValue: '',
    validationSchema: Yup.string().required('Heslo je povinné'),
  }
}