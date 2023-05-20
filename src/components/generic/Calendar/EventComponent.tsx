import Box from '@mui/material/Box'
import { EventProps, Event } from 'react-big-calendar'

const borderRadius = 8

const EventComponent = ({ event, continuesPrior, continuesAfter }: EventProps<Event>) => {
  const { title } = event

  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      py: 0.5,
      px: 1,
      borderTopRightRadius: continuesAfter ? 0 : borderRadius,
      borderBottomRightRadius: continuesAfter ? 0 : borderRadius,
      borderTopLeftRadius: continuesPrior ? 0 : borderRadius,
      borderBottomLeftRadius: continuesPrior ? 0 : borderRadius,
    }}>
      {title}
    </Box>
  )
}

export default EventComponent
