import {useState} from 'react';

export type Name = string
export type Value = string | undefined

// form elements in pairs of 'name'=>'initial value'
type KeyValuePair = {
  [name: Name]: Value,
}
type Errors = {
  [name: Name]: boolean,
}

// element validations
// name has to be the same as in initialValues
// takes parameter of element's value
// returns true if is valid, false otherwise
type Validation = {
  [name: Name]: (value: Value, name: Name, values: KeyValuePair, validationOpts: ValidationOptions) => boolean
}

type ValidationOptions = undefined | {}

type OutputProps = {
  values: KeyValuePair,
  errors: Errors,
  validateAll: () => boolean,
  handleChange: (name: Name, value: Value) => void,
  handleValidate: (name: Name, value: Value) => boolean,
  formError: string,
  setFormError: (error: string) => void,
}

function useForm(initialValues: KeyValuePair, validations: Validation = {}, validationOpts?: ValidationOptions): OutputProps {
  const [formError, setFormError] = useState('')
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState(Object.keys(initialValues).reduce<Errors>((res, key) => {
    res[key] = false

    return res
  }, {}))

  const handleChange = (name: Name, value: Value) => setValues(values => ({...values, [name]: value}))

  const handleValidate = (name: Name, value: Value) => {
    const isValid = typeof validations[name] !== 'function' || validations[name](value, name, values, validationOpts)

    setErrors(errors => ({...errors, [name]: !isValid}))

    return isValid
  }

  const validateAll = () => {
    let isValid = true

    Object.keys(initialValues).forEach((name) => {
      if (!handleValidate(name, values[name])) {
        isValid = false
      }
    })

    return isValid
  }

  return {
    values,
    errors,
    handleChange,
    handleValidate,
    validateAll,
    formError,
    setFormError,
  }
}

export default useForm