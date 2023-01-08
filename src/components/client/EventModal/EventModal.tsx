import Typography from '@mui/material/Typography'
import { AxiosResponse } from 'axios'
import Button from 'Components/generic/Button'
import Error from 'Components/generic/Error'
import Modal from 'Components/generic/Modal'

import { ReservationItem } from 'LocalTypes'
import React from 'react'
import { Event } from 'react-big-calendar'
import { useQuery } from 'react-query'
import formatDateRange from 'Utils/formatDateRange'

type EventProps = {
  open: boolean
  onClose: () => void
  event?: Event
}

const EventModal = ({ event, open, onClose }: EventProps) => {
  const { data } = useQuery<AxiosResponse<ReservationItem[]>>('getAllItems')
  if (!event) {
    return null
  }

  const { start, end, title, resource: { itemIds } } = event as Event
  const startDate = new Date(start!)
  const endDate = new Date(end!)

  const dateRange = formatDateRange(startDate, endDate)

  const items = itemIds?.map((itemId: string) => data?.data?.find(({ id }) => id === itemId)).filter(Boolean) as ReservationItem[]

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>
        {title as string}
      </Modal.Title>
      <Modal.Content>
         <Typography>{dateRange}</Typography>

        {items.length === 0 ? <Error>Tato rezervace neobsahuje žádné položky</Error> : (
          <ul>
            {items?.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>
          Zavřít
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EventModal