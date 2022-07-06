import Button from 'Components/generic/Button'
import Form from 'Components/generic/Form'
import useFormInitials from 'Components/generic/Form/utils/useFormInitials'
import Modal from 'Components/generic/Modal'
import React from 'react'
import { SlotInfo } from 'react-big-calendar'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const Reservation = ({ onClose, open, slotInfo }: ReservationProps) => {
  const { initialValues } = useFormInitials({
    dateStart: {
      initialValue: slotInfo?.start,
    },
    dateEnd: {
      initialValue: slotInfo?.end,
    },
  })

  const handleSubmit = (values: {}) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <Form onSubmit={handleSubmit} initialValues={initialValues}>
          <Form.DateTimePicker label={'Začátek'} name={'dateStart'} />
          <Form.DateTimePicker label={'Konec'} name={'dateEnd'} />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>
          Zavřít
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Reservation