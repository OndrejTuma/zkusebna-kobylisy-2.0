import Button from 'Components/generic/Button'
import { useFormikContext } from 'formik'
import React from 'react'

type Props = {
  children?: React.ReactNode,
}

const SubmitButton = ({ children }: Props) => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button disabled={isSubmitting} type={'submit'}>{children}</Button>
  )
}

export default SubmitButton