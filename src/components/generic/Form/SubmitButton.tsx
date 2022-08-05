import Button from 'Components/generic/Button'
import { useFormikContext } from 'formik'
import React from 'react'

type Props = {
  children?: React.ReactNode,
  [key: string]: any,
}

const SubmitButton = ({ children, ...rest }: Props) => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button disabled={isSubmitting} type={'submit'} {...rest}>{children}</Button>
  )
}

export default SubmitButton