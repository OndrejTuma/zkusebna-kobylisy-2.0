import React, { useEffect, useState } from 'react'
import { Button, Modal, DatePicker, DatePickerValue } from '@toptal/picasso'
import { SlotInfo } from 'react-big-calendar'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const Reservation = ({ onClose, open, slotInfo }: ReservationProps) => {
  const [value, setValue] = useState<DatePickerValue>()

  useEffect(() => {
    if (!slotInfo || !slotInfo.start || !slotInfo.end) {
      return
    }

    setValue([new Date(slotInfo.start), new Date(slotInfo.end)])
  }, [slotInfo])

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Modal onClose={onClose} open={open} onBackdropClick={onClose}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <DatePicker
          range
          value={value}
          onChange={dates => {
            setValue(dates)
          }}
        />
        <pre>{JSON.stringify(slotInfo, null, 2)}</pre>
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