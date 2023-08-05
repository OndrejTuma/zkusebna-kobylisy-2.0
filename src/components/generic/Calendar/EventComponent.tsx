import Box from '@mui/material/Box'
import { EventProps, Event } from 'react-big-calendar'

import formatDateRange from 'Utils/formatDateRange'

const borderRadius = 8

const EventComponent = ({
  event,
  continuesPrior,
  continuesAfter,
}: EventProps<Event>) => {
  const { title, start, end } = event

  const dateRange = start && end ? formatDateRange(start, end) : ''

  return (
    <Box
      title={dateRange}
      sx={{
        backgroundColor: 'primary.main',
        py: 0.5,
        px: 1,
        borderTopRightRadius: continuesAfter ? 0 : borderRadius,
        borderBottomRightRadius: continuesAfter ? 0 : borderRadius,
        borderTopLeftRadius: continuesPrior ? 0 : borderRadius,
        borderBottomLeftRadius: continuesPrior ? 0 : borderRadius,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {title}
    </Box>
  )
}

export default EventComponent
