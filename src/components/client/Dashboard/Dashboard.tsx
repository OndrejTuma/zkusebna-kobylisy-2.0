import Box from '@mui/material/Box'
import Calendar, { onSelectEventType, onSelectSlotType } from 'Components/generic/Calendar'
import useModal from 'Components/generic/Modal/useModal'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import type { Reservation } from 'LocalTypes'
import React, { useState } from 'react'
import { Event, SlotInfo } from 'react-big-calendar'

import EventModal from '../EventModal'
import ReservationModal from '../reservation/ReservationModal'

type DashboardProps = {
  reservations?: Reservation[]
}

const Dashboard = ({ reservations }: DashboardProps) => {
  const {
    showModal: showReservation,
    hideModal: hideReservation,
    isOpen: isOpenReservation,
  } = useModal()
  const {
    showModal: showEvent,
    hideModal: hideEvent,
    isOpen: isOpenEvent,
  } = useModal()
  const [ slotInfo, setSlotInfo ] = useState<SlotInfo>()
  const [ event, setEvent ] = useState<Event>()

  const handleSelectEvent: onSelectEventType = (event) => {
    setEvent(event)
    showEvent()
  }
  const handleSelectSlot: onSelectSlotType = (slotInfo) => {
    if (isBefore(new Date(format(slotInfo.start, 'MM-dd-yyyy')), new Date(format(new Date(), 'MM-dd-yyyy')))) {
      return
    }
    setSlotInfo(slotInfo)
    showReservation()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Calendar
        events={reservations || []}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      <ReservationModal open={isOpenReservation} onClose={hideReservation} slotInfo={slotInfo}/>
      <EventModal open={isOpenEvent} onClose={hideEvent} event={event}/>
    </Box>
  )
}

export default Dashboard