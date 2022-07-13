import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ContinueButton from 'Components/client/reservation/ContinueButton'
import Button from 'Components/generic/Button'
import Form, { useFormInitials } from 'Components/generic/Form'
import Modal from 'Components/generic/Modal'
import Stepper, { useStepper } from 'Components/generic/Stepper'
import React from 'react'
import { SlotInfo } from 'react-big-calendar'
import * as Yup from 'yup'
import ChooseDate from '../ChooseDate'
import ChooseItems from '../ChooseItems'
import ChooseReservationType from '../ChooseReservationType'
import FillReservationInfo from '../FillReservationInfo'

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
  const { initialValues, validationSchema } = useFormInitials({
    dateStart: {
      initialValue: slotInfo?.start,
    },
    dateEnd: {
      initialValue: slotInfo?.end,
    },
    reservationType: {
      initialValue: '',
      validationSchema: Yup.string().required('Musíte vybrat typ rezervace'),
    },
    reservationName: {
      initialValue: '',
      validationSchema: Yup.string().required('Vyplňte název akce'),
    },
    name: {
      initialValue: '',
      validationSchema: Yup.string().required('Vyplňte své jméno').min(5, 'To se zdá být příliš krátké'),
    },
    phone: {
      initialValue: '',
      validationSchema: Yup.string().required('Vyplňte svůj telefon').matches(/^((\+420|1) ?)?([0-9]{3} ?){3}$/, 'Telefonní číslo není ve správném formátu'),
    },
    email: {
      initialValue: '',
      validationSchema: Yup.string().required('Vyplňte svůj email').email('Email není ve správném formátu'),
    },
  })
  const { activeStep, handleNext, handleBack } = useStepper()

  const handleSubmit = (values: {}) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Form onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Modal.Title>Nová rezervace</Modal.Title>
        <Modal.Content>
          <Box mb={4}>
            <Stepper activeStep={activeStep} steps={steps}/>
          </Box>
          {activeStep === 0 ? (
            <>
              <ChooseDate/>
              <ChooseReservationType/>
            </>
          ) : activeStep === 1 ? (
            <FillReservationInfo/>
          ) : (
            <ChooseItems/>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Stack justifyContent="space-between" direction="row">
            <Button disabled={activeStep === 0} variant="outlined" onClick={handleBack}>Zpět</Button>
            {activeStep + 1 === steps.length ? (
              <Form.SubmitButton>Vytvořit rezervaci</Form.SubmitButton>
            ) : (
              <ContinueButton activeStep={activeStep} handleNext={handleNext}/>
            )}
          </Stack>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ReservationModal