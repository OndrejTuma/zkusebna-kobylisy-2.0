import Button from 'Components/generic/Button'
import { useFormikContext } from 'formik'
import React from 'react'

type Props = {
  activeStep: number,
  handleNext: () => void,
}

const areFieldsValid = async (fieldNames: string[], setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void) => {
  let isValid = true

  for (const name of fieldNames) {
    const errors: unknown = await setFieldTouched(name, true, true)
    if ((errors as {}).hasOwnProperty(name)) {
      isValid = false
    }
  }

  return isValid
}

const ContinueButton = ({ activeStep, handleNext }: Props) => {
  const { setFieldTouched } = useFormikContext()

  const handleProgress = async () => {
    switch (activeStep) {
      case 0:
        if (await areFieldsValid(['reservationType'], setFieldTouched)) {
          return handleNext()
        }
      case 1:
        if (await areFieldsValid(['reservationName', 'name', 'phone', 'email'], setFieldTouched)) {
          return handleNext()
        }
    }
  }

  return (
    <Button onClick={handleProgress}>Pokračovat</Button>
  )
}

export default ContinueButton