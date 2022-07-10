import React from 'react'
import MUIStepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

type Props = {
  activeStep: number,
  steps: string[],
}

const Stepper = ({ activeStep, steps }: Props) => {
  return (
    <MUIStepper activeStep={activeStep}>
      {steps.map((label) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </MUIStepper>
  )
}

export default Stepper