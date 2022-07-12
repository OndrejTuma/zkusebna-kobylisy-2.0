import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ChooseDate from '../ChooseDate'
import ChooseItems from '../ChooseItems'
import ChooseReservationType from '../ChooseReservationType'
import Button from 'Components/generic/Button'
import Form, { useFormInitials } from 'Components/generic/Form'
import Modal from 'Components/generic/Modal'
import Stepper, { useStepper } from 'Components/generic/Stepper'
import React from 'react'
import { SlotInfo } from 'react-big-calendar'
import * as Yup from 'yup'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const steps = [
  'Vyber datum',
  'Vyber typ rezervace',
  'Vyber položky',
]

const ReservationModal = ({ onClose, open, slotInfo }: ReservationProps) => {
  const { initialValues } = useFormInitials({
    dateStart: {
      initialValue: slotInfo?.start,
    },
    dateEnd: {
      initialValue: slotInfo?.end,
    },
    reservationType: {
      initialValue: '',
      validationSchema: Yup.string().required('Musíte vybrat typ rezervace'),
    }
  })
  const { activeStep, handleNext, handleBack } = useStepper()

  const handleSubmit = (values: {}) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <Box mb={4}>
          <Stepper activeStep={activeStep} steps={steps}/>
        </Box>
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          {activeStep === 0 ? (
            <ChooseDate/>
          ) : activeStep === 1 ? (
            <ChooseReservationType/>
          ) : (
            <ChooseItems/>
          )}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Stack justifyContent="space-between" direction="row">
          <Button disabled={activeStep === 0} variant="outlined" onClick={handleBack}>Zpět</Button>
          {activeStep + 1 === steps.length ? (
            <Form.SubmitButton>Vytvořit rezervaci</Form.SubmitButton>
          ) : (
            <Button onClick={handleNext}>Pokračovat</Button>
          )}
        </Stack>
      </Modal.Actions>
    </Modal>
  )
}

export default ReservationModal