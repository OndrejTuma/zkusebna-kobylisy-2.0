import { Button, Container, DatePickerValue, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import sub from 'date-fns/sub'
import React, { useEffect, useState } from 'react'
import { SlotInfo } from 'react-big-calendar'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const Reservation = ({ onClose, open, slotInfo }: ReservationProps) => {
  const [ dates, setDates ] = useState<DatePickerValue>()

  const handleSubmit = (values: {}) => {
    alert(JSON.stringify(values, null, 2))
  }

  useEffect(() => {
    if (!slotInfo || !slotInfo.start || !slotInfo.end) {
      return
    }

    setDates([ new Date(slotInfo.start), sub(new Date(slotInfo.end), { seconds: 1 }) ])
  }, [ slotInfo ])

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Modal onClose={onClose} open={open} onBackdropClick={onClose}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <Form onSubmit={handleSubmit} initialValues={{
          date: dates,
        }}>
          <Form.DatePicker
            name={'date'}
            range
            required
          />
          <Container gap={'small'}>
            <datalist id={'times'}>
              <option value={'07:00'}/>
              <option value={'08:00'}/>
              <option value={'09:00'}/>
              <option value={'10:00'}/>
              <option value={'11:00'}/>
              <option value={'12:00'}/>
              <option value={'13:00'}/>
              <option value={'14:00'}/>
              <option value={'15:00'}/>
              <option value={'16:00'}/>
              <option value={'17:00'}/>
              <option value={'18:00'}/>
              <option value={'19:00'}/>
              <option value={'20:00'}/>
              <option value={'21:00'}/>
              <option value={'22:00'}/>
            </datalist>
            <Form.TimePicker
              label={'Doba vypůjčení'}
              name={'borrowTime'}
              list={'times'}
              required
            />
            <Form.TimePicker
              label={'Doba vrácení'}
              name={'returnTime'}
              list={'times'}
              required
            />
          </Container>
          <Container top="small">
            <Form.SubmitButton>Submit</Form.SubmitButton>
          </Container>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button variant="secondary" onClick={onClose}>
          Zavřít
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Reservation