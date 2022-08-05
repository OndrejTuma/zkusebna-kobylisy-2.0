import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import axios, { AxiosError, AxiosResponse } from 'axios'
import ContinueButton from 'Components/client/reservation/ContinueButton'
import Button from 'Components/generic/Button'
import ErrorAxios from 'Components/generic/ErrorAxios'
import Form, { FormValues, useFormInitials } from 'Components/generic/Form'
import Modal from 'Components/generic/Modal'
import Stepper, { useStepper } from 'Components/generic/Stepper'
import { FormikHelpers } from 'formik'
import { Reservation } from 'LocalTypes'
import React, { useEffect } from 'react'
import { SlotInfo } from 'react-big-calendar'
import { useMutation, useQueryClient } from 'react-query'
import convertCalendarEventToReservation from 'Utils/convertCalendarEventToReservation'
import getStartEndDatetimeFromBigCalendarSlotInfo from 'Utils/getStartEndDatetimeFromBigCalendarSlotInfo'
import * as Yup from 'yup'
import Step1 from '../Step1'
import Step2 from '../Step2'
import Step3 from '../Step3'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const steps = [
  'Vyber datum a typ',
  'Vyplň své údaje',
  'Vyber položky',
]

const createReservation = (values: Reservation) => axios.post('/api/reservations', values)

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
      initialValue: '62cac3de6c722ddc352a8cea',
      validationSchema: Yup.string().required('Musíte vybrat typ rezervace'),
    },
    reservationName: {
      initialValue: 'Testus',
      validationSchema: Yup.string().required('Vyplňte název akce'),
    },
    name: {
      initialValue: 'Ondřej Tůma',
      validationSchema: Yup.string().required('Vyplňte své jméno').min(5, 'To se zdá být příliš krátké'),
    },
    phone: {
      initialValue: '732524691',
      validationSchema: Yup.string().required('Vyplňte svůj telefon').matches(/^((\+420|1) ?)?([0-9]{3} ?){3}$/, 'Telefonní číslo není ve správném formátu'),
    },
    email: {
      initialValue: 'ondr@centrum.cz',
      validationSchema: Yup.string().required('Vyplňte svůj email').email('Email není ve správném formátu'),
    },
    itemIds: {
      initialValue: [],
      validationSchema: Yup.array().min(1, 'Musíte vybrat alespoň jednu položku'),
    },
  })
  const queryClient = useQueryClient()
  const { activeStep, handleNext, handleBack } = useStepper()

  const {
    mutate,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useMutation<AxiosResponse, AxiosError, Reservation>('createReservation', createReservation, {
    onSuccess: ({ data: { data } }) => {
      const reservations = queryClient.getQueryData<AxiosResponse<Reservation[]>>('getAllReservations')

      reservations && queryClient.setQueryData('getAllReservations', {
        ...reservations,
        data: [
          ...reservations.data,
          {...convertCalendarEventToReservation(data)}
        ],
      })
    }
  })

  const handleSubmit = async (values: FormValues, { setFieldTouched, validateForm }: FormikHelpers<FormValues>) => {
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

  return (
    <Modal onClose={onClose} open={open}>
      <Form onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        <Modal.Title>Nová rezervace</Modal.Title>
        <Modal.Content>
          <Box mb={4}>
            <Stepper activeStep={activeStep} steps={steps}/>
          </Box>
          {isError && <ErrorAxios sx={{ marginBottom: 2 }} error={error}/>}
          {activeStep === 0 ? (
            <Step1/>
          ) : activeStep === 1 ? (
            <Step2/>
          ) : (
                <Step3/>
              )}
        </Modal.Content>
        <Modal.Actions>
          <Stack justifyContent="space-between" direction="row">
            <Button disabled={activeStep === 0} variant="outlined" onClick={handleBack}>Zpět</Button>
            {activeStep + 1 === steps.length ? (
              <Form.SubmitButton disabled={isLoading}>Vytvořit rezervaci</Form.SubmitButton>
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