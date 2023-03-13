import Typography from '@mui/material/Typography'
import Button from 'Components/generic/Button'
import Modal from 'Components/generic/Modal'
import React from 'react'
import { Event } from 'react-big-calendar'
import formatDateRange from 'Utils/formatDateRange'
import { useGetAllItems } from 'Hooks/queries'
import DataLoader from 'Components/generic/DataLoader'
import EventModalData from './EventModalData'

type EventProps = {
  open: boolean
  onClose: () => void
  event?: Event
}

const EventModal = ({ event, open, onClose }: EventProps) => {
  const itemsQuery = useGetAllItems()

  if (
    event === undefined ||
    event.start === undefined ||
    event.end === undefined ||
    !Array.isArray(event.resource.itemIds)
  ) {
    return null
  }

  const {
    start,
    end,
    title,
    resource: { itemIds },
  } = event
  const startDate = new Date(start)
  const endDate = new Date(end)

  const dateRange = formatDateRange(startDate, endDate)

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>
        {title}
      </Modal.Title>
      <Modal.Content>
        <Typography>{dateRange}</Typography>

        <DataLoader query={itemsQuery}>
          {(items) => (
            <EventModalData items={items} itemIds={itemIds} />
          )}
        </DataLoader>
        
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Zavřít</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EventModal
