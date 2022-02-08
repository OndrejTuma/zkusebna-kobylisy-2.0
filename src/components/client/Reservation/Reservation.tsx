import React from 'react'
import { Button, Modal } from '@toptal/picasso'
import { SlotInfo } from 'react-big-calendar'

type ReservationProps = {
  open: boolean
  onClose: () => void
  slotInfo?: SlotInfo
}

const Reservation = ({ onClose, open, slotInfo }: ReservationProps) => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    <Modal onClose={onClose} open={open} onBackdropClick={onClose}>
      <Modal.Title>Nová rezervace</Modal.Title>
      <Modal.Content>
        <p>helouik</p>
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