import React, { useState } from 'react'
import { useModal } from '@toptal/picasso/utils'
import { calendar_v3 } from 'googleapis'
import { SlotInfo, Event } from 'react-big-calendar'
import Schema$Event = calendar_v3.Schema$Event

import Reservation from '../Reservation'
import EventModal from '../EventModal'
import Calendar, { onSelectEventType, onSelectSlotType } from '../Calendar'

type DashboardProps = {
  events?: Schema$Event[]
}

const Dashboard = ({ events }: DashboardProps) => {
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
  const [slotInfo, setSlotInfo] = useState<SlotInfo>()
  const [event, setEvent] = useState<Event>()

  const handleSelectEvent: onSelectEventType = (event) => {
    setEvent(event)
    showEvent()
  }
  const handleSelectSlot: onSelectSlotType = (slotInfo) => {
    setSlotInfo(slotInfo)
    showReservation()
  }

  return (
    <>
      <Calendar
        events={events || []}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
      />
      <Reservation open={isOpenReservation} onClose={hideReservation} slotInfo={slotInfo} />
      <EventModal open={isOpenEvent} onClose={hideEvent} event={event}/>
    </>
  )
}

export default Dashboard