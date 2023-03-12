import Typography from '@mui/material/Typography'
import Button from 'Components/generic/Button'
import Error from 'Components/generic/Error'
import Modal from 'Components/generic/Modal'

import React from 'react'
import { Event } from 'react-big-calendar'
import formatDateRange from 'Utils/formatDateRange'
import { useGetAllItems } from 'Hooks/queries'
import isDefined from 'Utils/isDefined'

type EventProps = {
  open: boolean
  onClose: () => void
  event?: Event
}

const EventModal = ({ event, open, onClose }: EventProps) => {
  const { data } = useGetAllItems()

  if (
    event === undefined ||
    event.start === undefined ||
    event.end === undefined
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

  const items = (itemIds as string[])
    ?.map(itemId => data?.data?.find(({ id }) => id === itemId))
    .filter(isDefined)

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>
        {title}
      </Modal.Title>
      <Modal.Content>
        <Typography>{dateRange}</Typography>

        {items.length === 0 ? (
          <Error>Tato rezervace neobsahuje žádné položky</Error>
        ) : (
          <ul>
            {items?.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Zavřít</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EventModal
