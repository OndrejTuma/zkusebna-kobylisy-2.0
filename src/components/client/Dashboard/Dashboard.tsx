import Box from '@mui/material/Box'
import Calendar, {
  onSelectEventType,
  onSelectSlotType,
} from 'Components/generic/Calendar'
import Loader from 'Components/generic/Loader'
import useModal from 'Components/generic/Modal/useModal'
import format from 'date-fns/format'
import isBefore from 'date-fns/isBefore'
import React, { useCallback, useState } from 'react'
import { Event, SlotInfo } from 'react-big-calendar'

import EventModal from '../EventModal'
import ReservationModal from '../reservation/ReservationModal'
import { useGetMonthReservation } from 'Hooks/queries'
import ErrorAxios from 'Components/generic/ErrorAxios'
import { Button, Container, Typography } from '@mui/material'
import HowToModal from '../HowToModal/HowToModal'

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
  const {
    showModal: showHowTo,
    hideModal: hideHowTo,
    isOpen: isOpenHowTo,
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
      <Container maxWidth={'lg'} sx={{ marginBottom: 5 }}>
        <Typography pt={5} pb={2} variant='h1'>
          Vítejte na rezervační stránce kobyliské zkušebny
        </Typography>
        <Typography>
          Tyto stránky slouží jako rezervační systém{' '}
          <strong>pouze pro potřeby farnosti Kobylisy</strong> nebo výjimečně po
          dohodě se správcem zkušebny i jiným zájemcům.
        </Typography>
        <Typography>
          Zde si můžete k zapůjčení rezervovat zkušebnu, zvukovou techniku a
          hudební nástroje.
        </Typography>
        <Typography variant='body2'>
          Pomoc, dotazy a připomínky na zkusebna.kobylisy@centrum.cz
        </Typography>
        <Button variant='text' onClick={showHowTo}>
          Jak rezervovat?
        </Button>
      </Container>
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
      <HowToModal isOpen={isOpenHowTo} onClose={hideHowTo} />
    </>
  )
}

export default Dashboard
