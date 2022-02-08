import React from 'react'
import { calendar_v3 } from 'googleapis'
import Schema$Event = calendar_v3.Schema$Event

import Calendar, { onSelectEventType, onSelectSlotType } from '../Calendar'

type DashboardProps = {
  events: Schema$Event[]
}

const Dashboard = ({ events }: DashboardProps) => {
  const handleSelectEvent: onSelectEventType = (event) => {
    alert(JSON.stringify(event, null, 2))
  }
  const handleSelectSlot: onSelectSlotType = (slotInfo) => {
    alert(JSON.stringify(slotInfo, null, 2))
  }

  return (
    <Calendar
      events={events}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
    />
  )
}

export default Dashboard