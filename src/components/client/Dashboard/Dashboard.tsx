import Box from '@mui/material/Box'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import React, { useCallback, useState } from 'react'
import { Event, SlotInfo } from 'react-big-calendar'

import Loader from 'Components/generic/Loader'
import useModal from 'Components/generic/Modal/useModal'
import Calendar, {
  onSelectEventType,
  onSelectSlotType,
} from 'Components/generic/Calendar'
import { useGetMonthReservation } from 'Hooks/queries'
import ErrorAxios from 'Components/generic/ErrorAxios'
import EventModal from '../EventModal'
import ReservationModal from '../reservation/ReservationModal'
import Information from '../Information/Information'

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { error, isError, isFetching, data } =
    useGetMonthReservation(currentDate)

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
    if (
      isBefore(
        new Date(format(slotInfo.start, 'MM-dd-yyyy')),
        new Date(format(new Date(), 'MM-dd-yyyy'))
      )
    ) {
      return
    }
    setSlotInfo(slotInfo)
    showReservation()
  }
  const handleNavigate = useCallback(
    (date: Date) => setCurrentDate(date),
    [setCurrentDate]
  )

  return (
    <>
      <Information />
      <Box sx={{ position: 'relative' }}>
        {isFetching && (
          <Loader
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: '-50% -50%',
              zIndex: 1,
            }}
          />
        )}
        {isError && <ErrorAxios sx={{ marginBottom: 2 }} error={error} />}
        <Calendar
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onNavigate={handleNavigate}
          reservations={data?.data}
        />
      </Box>
      <ReservationModal
        open={isOpenReservation}
        onClose={hideReservation}
        slotInfo={slotInfo}
      />
      <EventModal open={isOpenEvent} onClose={hideEvent} event={event} />
    </>
  )
}

export default Dashboard
