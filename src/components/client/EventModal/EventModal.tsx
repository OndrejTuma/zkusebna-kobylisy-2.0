import React from 'react'
import { Button, Modal, Typography } from '@toptal/picasso'
import { Event } from 'react-big-calendar'
import isSameDay from 'date-fns/isSameDay'
import format from 'date-fns/format'

import { dateTimeFormat, timeFormat } from 'Consts/dateTimeFormats'

type EventProps = {
  open: boolean
  onClose: () => void
  event?: Event
}

const EventModal = ({ event, open, onClose }: EventProps) => {
  if (typeof window === 'undefined' || !event) {
    return null
  }

  const { start, end, title, resource: { description } } = event as Event
  const startDate = new Date(start!)
  const endDate = new Date(end!)

  const isOneDayEvent = isSameDay(startDate, endDate)

  return (
    <Modal onClose={onClose} open={open} onBackdropClick={onClose}>
      <Modal.Title>{title}</Modal.Title>
      <Modal.Content>
        {isOneDayEvent ? (
          <Typography>{format(startDate, dateTimeFormat)} - {format(endDate, timeFormat)}</Typography>
        ) : (
          <Typography>{format(startDate, dateTimeFormat)} - {format(endDate, dateTimeFormat)}</Typography>
        )}

        <div dangerouslySetInnerHTML={{ __html: description }}/>
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Zavřít
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EventModal