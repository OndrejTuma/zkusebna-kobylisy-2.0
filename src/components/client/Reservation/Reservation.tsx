import React, { useEffect, useState } from 'react'
import { Grid, Button, Modal, DatePicker, DatePickerValue, Container, TimePicker } from '@toptal/picasso'
import { SlotInfo } from 'react-big-calendar'
import sub from 'date-fns/sub'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const Reservation = ({ onClose, open, slotInfo }: ReservationProps) => {
  const [dates, setDates] = useState<DatePickerValue>()
  const [borrowTime, setBorrowTime] = useState<string>()
  const [returnTime, setReturnTime] = useState<string>()

  useEffect(() => {
    if (!slotInfo || !slotInfo.start || !slotInfo.end) {
      return
    }

    setDates([new Date(slotInfo.start), sub(new Date(slotInfo.end), { seconds: 1 })])
  }, [slotInfo])
  const handleBorrowTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setBorrowTime(e.target.value)
  const handleReturnTimeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setReturnTime(e.target.value)

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Modal onClose={onClose} open={open} onBackdropClick={onClose}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <DatePicker
          range
          value={dates}
          onChange={dates => {
            setDates(dates)
          }}
        />
        <Container gap={'medium'}>
          <div>
            <span>Doba vypůjčení:</span>
            <TimePicker value={borrowTime} onChange={handleBorrowTimeChange} />
          </div>
          <div>
            <span>Doba vrácení:</span>
            <TimePicker value={returnTime} onChange={handleReturnTimeChange} />
          </div>
        </Container>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Zavřít
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Reservation