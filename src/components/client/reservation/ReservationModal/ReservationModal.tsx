import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ContinueButton from 'Components/client/reservation/ContinueButton'
import Button from 'Components/generic/Button'
import Form, { FormValues, useFormInitials } from 'Components/generic/Form'
import Modal from 'Components/generic/Modal'
import Stepper, { useStepper } from 'Components/generic/Stepper'
import { FormikHelpers } from 'formik'
import { Reservation } from 'LocalTypes'
import React, { useEffect } from 'react'
import { SlotInfo } from 'react-big-calendar'
import getStartEndDatetimeFromBigCalendarSlotInfo from 'Utils/getStartEndDatetimeFromBigCalendarSlotInfo'
import * as Yup from 'yup'
import Price from '../Price'
import Step1 from '../Step1'
import Step2 from '../Step2'
import Step3 from '../Step3'
import { useCreateReservation } from 'Hooks/queries'
import ErrorAxios from 'Components/generic/ErrorAxios'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const steps = ['Vyber datum a účel', 'Vyplň své údaje', 'Vyber položky']

const formStyle: React.CSSProperties = {
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
}
const formGridStyle: React.CSSProperties = {
  overflow: 'auto',
  flexWrap: 'nowrap',
}

const ReservationModal = ({ onClose, open, slotInfo }: ReservationProps) => {
  const [start, end] = getStartEndDatetimeFromBigCalendarSlotInfo(slotInfo)
  const { initialValues, validationSchema } = useFormInitials({
    dateStart: {
      initialValue: start,
    },
    dateEnd: {
      initialValue: end,
    },
    reservationType: {
      initialValue: '',
      validationSchema: Yup.string().required('Musíte vybrat účel rezervace'),
    },
    reservationName: {
      initialValue: '',
      validationSchema: Yup.string().required('Vyplňte název akce'),
    },
    name: {
      initialValue: '',
      validationSchema: Yup.string()
        .required('Vyplňte své jméno')
        .min(5, 'To se zdá být příliš krátké'),
    },
    phone: {
      initialValue: '',
      validationSchema: Yup.string()
        .required('Vyplňte svůj telefon')
        .matches(
          /^((\+420|1) ?)?([0-9]{3} ?){3}$/,
          'Telefonní číslo není ve správném formátu'
        ),
    },
    email: {
      initialValue: '',
      validationSchema: Yup.string()
        .required('Vyplňte svůj email')
        .email('Email není ve správném formátu'),
    },
    itemIds: {
      initialValue: [],
      validationSchema: Yup.array().min(
        1,
        'Musíte vybrat alespoň jednu položku'
      ),
    },
  })
  const { activeStep, handleNext, handleBack, setStep } = useStepper()

  const { mutate, isError, isLoading, isSuccess, error } =
    useCreateReservation(start)

  const handleSubmit = async (
    values: FormValues,
    { setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    // validate items
    await setFieldTouched('itemIds', true, true)
    // TODO: make Form accept generic Values
    mutate(values as Reservation)
  }

  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess])

  useEffect(() => {
    setStep(0)
  }, [slotInfo, setStep])

  return (
    <Modal onClose={onClose} open={open}>
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        style={formStyle}
        gridStyle={formGridStyle}
      >
        <Modal.Header title='Nová rezervace' />
        <Modal.Content>
          <Box mb={4}>
            <Stepper activeStep={activeStep} steps={steps} />
          </Box>
          {isError && <ErrorAxios error={error} sx={{ marginBottom: 2 }} />}
          {activeStep === 0 ? (
            <Step1 />
          ) : activeStep === 1 ? (
            <Step2 />
          ) : (
            <Step3 />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Stack justifyContent='space-between' direction='row'>
            <Button
              disabled={activeStep === 0}
              variant='outlined'
              onClick={handleBack}
            >
              Zpět
            </Button>
            {activeStep + 1 === steps.length ? (
              <Form.SubmitButton disabled={isLoading}>
                Vytvořit rezervaci (<Price />)
              </Form.SubmitButton>
            ) : (
              <ContinueButton activeStep={activeStep} handleNext={handleNext} />
            )}
          </Stack>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ReservationModal
