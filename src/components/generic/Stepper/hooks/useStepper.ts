import { useState } from 'react'

const useStepper = (initialStep = 0) => {
  const [ activeStep, setActiveStep ] = useState(initialStep)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return {
    activeStep,
    handleBack,
    handleNext,
    handleReset
  }
}

export default useStepper