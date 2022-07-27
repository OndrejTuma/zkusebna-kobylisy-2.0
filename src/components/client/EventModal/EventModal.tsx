import Typography from '@mui/material/Typography'
import { AxiosResponse } from 'axios'
import Button from 'Components/generic/Button'
import Error from 'Components/generic/Error'
import Modal from 'Components/generic/Modal'

import { dateTimeFormat, timeFormat } from 'Consts/dateTimeFormats'
import format from 'date-fns/format'
import isSameDay from 'date-fns/isSameDay'
import { ReservationItem } from 'LocalTypes'
import React from 'react'
import { Event } from 'react-big-calendar'
import { useQuery } from 'react-query'

const parseItemIds = (resource: { [key: string]: string }) => {
  if (!resource) {
    return []
  }

  return Object.entries(resource).filter(([ key ]) => key.startsWith('items_')).reduce<string[]>((allItems, [ , partial ]) => allItems.concat(partial.split(',')), [])
}

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

  const { start, end, title, resource: { shared } } = event as Event
  const startDate = new Date(start!)
  const endDate = new Date(end!)

  const isOneDayEvent = isSameDay(startDate, endDate)

  const itemIds = parseItemIds(shared)
  const items = itemIds.map(itemId => data?.data?.find(({ id }) => id === itemId)) as ReservationItem[]

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Title>
        {title as string}
      </Modal.Title>
      <Modal.Content>
        {isOneDayEvent ? (
          <Typography>{format(startDate, dateTimeFormat)} - {format(endDate, timeFormat)}</Typography>
        ) : (
           <Typography>{format(startDate, dateTimeFormat)} - {format(endDate, dateTimeFormat)}</Typography>
         )}

        {items.length === 0 ? <Error>Tato rezervace neobsahuje žádné položky</Error> : (
          <ul>
            {items.map(({ id, title }) => (
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