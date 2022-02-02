import { Value } from 'Hooks/useForm'

export const formInputs = [
  { name: 'email', label: 'E-mail', type: 'email' },
  { name: 'password', label: 'Heslo', type: 'password' },
]
export const formInitialValues = {
  email: '',
  password: '',
}
export const formValidations = {
  email: (value: Value) => !!value,
  password: (value: Value) => !!value,
}